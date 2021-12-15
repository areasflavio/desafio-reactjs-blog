import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiUser, FiCalendar, FiClock } from 'react-icons/fi';

import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post() {
  return (
    <>
      <Head>
        <title> spacetraveling. | Post</title>
      </Head>

      <Header />

      <img
        className={styles.banner}
        src="https://images.unsplash.com/photo-1564865878688-9a244444042a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="code"
      />

      <main className={commonStyles.content}>
        <article className={styles.postContainer}>
          <h1>Criando um app CRA do zero</h1>

          <div className={styles.postInfo}>
            <time>
              <FiCalendar size={20} />
              14 Dez 2021
            </time>

            <small>
              <FiUser size={20} />
              Flávio Arêas
            </small>

            <small>
              <FiClock size={20} />4 min
            </small>
          </div>

          <div className={styles.postContent}>
            <h2>Lorem, ipsum.</h2>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
              expedita dolore explicabo qui iusto quam nulla placeat voluptas
              quod et.
            </p>

            <h2>Lorem, ipsum.</h2>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
              nisi at dolor asperiores laudantium corporis laborum dicta in
              dolores numquam itaque illo non modi temporibus deserunt sed natus
              dolorum, magni vitae nihil, eaque nobis consequatur impedit ut.
              Atque laboriosam porro at quaerat odit in labore beatae id!
              Architecto, nostrum temporibus.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              temporibus non, quasi aperiam in repellendus explicabo.
              Reprehenderit nostrum sequi quae deserunt voluptas magnam
              blanditiis alias modi, in at repudiandae fugiat magni excepturi
              sapiente obcaecati cum unde. Temporibus assumenda <a>lorem</a>
              minus ab veniam. Sapiente qui inventore est quo accusamus quaerat
              dolorem quisquam alias fuga nesciunt? Minima minus quas animi unde
              eum. Iusto sequi, consequuntur ipsam voluptatum voluptatem ex.
              Nesciunt eius tempora error quos minima, at eos officiis
              perferendis ullam, voluptas sed tenetur aliquid debitis. Obcaecati
              cumque blanditiis quia repudiandae libero non, eaque ullam odit
              vel natus perspiciatis totam dicta voluptates voluptate quasi?
            </p>
          </div>
        </article>
      </main>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
