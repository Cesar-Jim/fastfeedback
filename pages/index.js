import Head from 'next/head';
import { useAuth } from '../lib/auth';

const Home = () => {
  const auth = useAuth();

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Fast Feedback</h1>

        <p className="description">
          Current user: <code>{auth?.user ? auth.user.email : 'None'}</code>
        </p>
        {auth?.user ? (
          <button onClick={(e) => auth.signout()}>Sign Out</button>
        ) : (
          <button onClick={(e) => auth.signinWithGithub()}>Sign In</button>
        )}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" />
        </a>
      </footer>
    </div>
  );
};

export default Home;
