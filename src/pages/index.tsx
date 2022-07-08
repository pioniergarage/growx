import type { NextPage } from 'next';
import Head from 'next/head';
import NavBar from '../components/layout/NavBar';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>GrowX</title>
                <meta name='description' content='GrowX - Founding Contest' />
            </Head>
            <main>
                <NavBar />
                <h1 className='text-3xl font-bold underline'>
                    Welcome to grow!
                </h1>
            </main>
        </div>
    );
};

export default Home;
