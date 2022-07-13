/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    plugins: [require("daisyui")],
    purge: {
        options: {
            safelist: ['grid-cols-2', 'grid-cols-3', 'grid-cols-4']
        }
    },
    daisyui: {
        themes: [
            {
                growDark: {
                    ...require("daisyui/src/colors/themes")["[data-theme=night]"],
                    primary: "#8355f7",
                    secondary: "rgb(211, 77, 188)"
                }
            }
        ]
    }
};
