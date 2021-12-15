import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FiUser, FiCalendar } from 'react-icons/fi';

import Header from '../components/Header';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <>
      <Head>
        <title> spacetraveling. | Home</title>
      </Head>

      <main className={commonStyles.content}>
        <Header />

        <ul>
          <li className={styles.post}>
            <Link href="/post/teste">
              <a>
                <strong>Como utilizar hooks</strong>
              </a>
            </Link>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>

            <div className={styles.postInfo}>
              <time>
                <FiCalendar size={20} />
                14 Dez 2021
              </time>

              <small>
                <FiUser size={20} />
                Flávio Arêas
              </small>
            </div>
          </li>
          <li className={styles.post}>
            <strong>Como utilizar hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>

            <div>
              <time>
                <FiCalendar size={20} />
                14 Dez 2021
              </time>

              <small>
                <FiUser size={20} />
                Flávio Arêas
              </small>
            </div>
          </li>
          <li className={styles.post}>
            <strong>Como utilizar hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>

            <div>
              <time>
                <FiCalendar size={20} />
                14 Dez 2021
              </time>

              <small>
                <FiUser size={20} />
                Flávio Arêas
              </small>
            </div>
          </li>
          <li className={styles.post}>
            <strong>Como utilizar hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>

            <div>
              <time>
                <FiCalendar size={20} />
                14 Dez 2021
              </time>

              <small>
                <FiUser size={20} />
                Flávio Arêas
              </small>
            </div>
          </li>
          <li className={styles.post}>
            <strong>Como utilizar hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>

            <div>
              <time>
                <FiCalendar size={20} />
                14 Dez 2021
              </time>

              <small>
                <FiUser size={20} />
                Flávio Arêas
              </small>
            </div>
          </li>
        </ul>

        <button type="button" className={styles.nextPage}>
          Carregar mais posts
        </button>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
