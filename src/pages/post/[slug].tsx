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
import Link from 'next/link';
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
  preview: boolean;
}

export default function Post({ post, preview }: PostProps): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  const avgWordPerMinute = 200;

  const numberOfWords = post.data.content.reduce((acc, content) => {
    const word = acc;
    const wordsAtHeading = content.heading.split(' ').length;

    const wordsAtBody = RichText.asText(content.body).split(' ').length;

    return word + wordsAtHeading + wordsAtBody;
  }, 0);

  const readingTime = Math.ceil(numberOfWords / avgWordPerMinute);

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

            <div>
              <FiUser size={20} />
              {post.data.author}
            </div>

            <div>
              <FiClock size={20} />
              {`${readingTime} min`}
            </div>
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

        {preview && (
          <aside>
            <Link href="/api/exit-preview">
              <a className={commonStyles.preview}>Sair do modo Preview</a>
            </Link>
          </aside>
        )}
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

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {
    ref: previewData?.ref ?? null,
  });

  return {
    props: { post: response, preview },
    revalidate: 60 * 30, // 30 minutes
  };
};
