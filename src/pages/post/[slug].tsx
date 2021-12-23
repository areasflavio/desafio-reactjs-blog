/* eslint-disable testing-library/no-await-sync-query */
/* eslint-disable react/no-danger */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiUser, FiCalendar, FiClock } from 'react-icons/fi';

import { RichText } from 'prismic-dom';
import { useRouter } from 'next/router';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  uid: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
    banner: {
      url: string;
    };
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

export default function Post({ post }: PostProps): JSX.Element {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <h1>Carregando...</h1>;
  }

  const numberOfWords = post.data.content.reduce((acc, content) => {
    let word = acc;
    const wordsAtHeading = content.heading.split(' ');

    const wordsAtBody = RichText.asText(content.body).split(' ');

    word += wordsAtHeading.length + wordsAtBody.length;

    return word;
  }, 0);

  const readingTime = Math.ceil(numberOfWords / 200);

  const formattedDate = format(
    new Date(post.first_publication_date),
    'dd MMM yyyy',
    {
      locale: ptBR,
    }
  );

  return (
    <>
      <Head>
        <title>{post.data.title} | spacetraveling.</title>
      </Head>

      <Header />

      <img className={styles.banner} src={post.data.banner.url} alt="Banner" />

      <main className={commonStyles.content}>
        <article className={styles.postContainer}>
          <h1>{post.data.title}</h1>

          <div className={styles.postInfo}>
            <time>
              <FiCalendar size={20} />
              {formattedDate}
            </time>

            <small>
              <FiUser size={20} />
              {post.data.author}
            </small>

            <small>
              <FiClock size={20} />
              {readingTime} min
            </small>
          </div>

          <div className={styles.postContent}>
            {post.data.content.map(({ heading, body }) => (
              <div key={heading}>
                <h2>{heading}</h2>

                <div
                  className={styles.postSection}
                  dangerouslySetInnerHTML={{ __html: RichText.asHtml(body) }}
                />
              </div>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([
    Prismic.predicates.at('document.type', 'posts'),
  ]);

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content.map(({ heading, body }) => ({
        heading,
        body: [...body],
      })),
    },
  };

  return {
    props: { post },
    revalidate: 60 * 30, // 30 minutes
  };
};
