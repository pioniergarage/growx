const { spawn } = require('node:child_process');
const { once } = require('node:events');
const { createServer } = require('node:http');

const eventDetails = {
    location: 'CI venue',
    description: 'Synthetic event for the CI build.',
    duration: 60,
    mandatory: false,
    type: 'Offline',
    available_seats: 20,
    event_category: 'Grow',
    href: null,
    videoUrl: null,
};

// The public data used by getStaticProps during the Next.js build.
const fixtures = new Map([
    ['/rest/v1/faqs', []],
    ['/rest/v1/sponsors', []],
    [
        '/rest/v1/events',
        [
            {
                ...eventDetails,
                id: 1,
                ref: 'kickoff',
                title: 'CI Kickoff',
                date: '2026-10-01T18:00:00',
            },
            {
                ...eventDetails,
                id: 2,
                ref: 'midterm',
                title: 'CI Midterm',
                date: '2026-10-29T18:00:00',
            },
            {
                ...eventDetails,
                id: 3,
                ref: 'final',
                title: 'CI Final',
                date: '2026-11-26T18:00:00',
            },
        ],
    ],
]);

const server = createServer((request, response) => {
    const { pathname } = new URL(request.url, 'http://127.0.0.1');
    const rows = request.method === 'GET' ? fixtures.get(pathname) : undefined;
    response.setHeader('Content-Type', 'application/json');
    if (rows === undefined) {
        response.writeHead(404).end(
            JSON.stringify({
                message: `No build fixture for ${request.method} ${pathname}`,
            })
        );
        return;
    }
    response.end(JSON.stringify(rows));
});

async function build() {
    try {
        await once(server.listen(0, '127.0.0.1'), 'listening');

        const child = spawn(
            process.execPath,
            [process.env.npm_execpath, 'run', 'build'],
            {
                env: {
                    ...process.env,
                    NEXT_PUBLIC_SUPABASE_URL: `http://127.0.0.1:${
                        server.address().port
                    }`,
                    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'ci-fixture-anon-key',
                },
                stdio: 'inherit',
            }
        );
        const [exitCode] = await once(child, 'exit');
        process.exitCode = exitCode ?? 1;
    } finally {
        server.close();
    }
}

build().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
