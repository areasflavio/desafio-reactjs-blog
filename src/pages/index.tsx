import { GetStaticProps } from 'next';
import Head from 'next/head';
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

      <div className={styles.content}>
        <Header />

        <ul>
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
      </div>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
