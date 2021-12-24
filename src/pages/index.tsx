/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiUser, FiCalendar } from 'react-icons/fi';

import { useEffect, useState } from 'react';
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
  preview: boolean;
}

export default function Home({
  postsPagination,
  preview,
}: HomeProps): JSX.Element {
  const [pagination, setPagination] = useState<PostPagination>(postsPagination);

  useEffect(() => {
    setPagination(postsPagination);
  }, [postsPagination]);

  function handleLoadMorePosts() {
    fetch(postsPagination.next_page)
      .then(res => res.json())
      .then(data => {
        const newPagination: PostPagination = {
          next_page: data.next_page,
          results: [...pagination.results, ...data.results],
        };
        setPagination(newPagination);
      });
  }

  return (
    <>
      <Head>
        <title>Home | spacetraveling.</title>
      </Head>

      <main className={commonStyles.content}>
        <Header />

        <ul>
          {pagination.results.map(post => (
            <li key={post.uid} className={styles.post}>
              <Link href={`/post/${post.uid}`}>
                <a>
                  <strong>{post.data?.title}</strong>
                </a>
              </Link>
              <p>{post.data?.subtitle}</p>

              <div className={styles.postInfo}>
                <time>
                  <FiCalendar size={20} />
                  {format(
                    new Date(post.first_publication_date),
                    'dd MMM yyyy',
                    {
                      locale: ptBR,
                    }
                  )}
                </time>

                <small>
                  <FiUser size={20} />
                  {post.data?.author}
                </small>
              </div>
            </li>
          ))}
        </ul>

        {pagination.next_page && (
          <button
            type="button"
            className={styles.nextPage}
            onClick={handleLoadMorePosts}
          >
            Carregar mais posts
          </button>
        )}

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

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 1,
    }
  );

  return {
    props: {
      postsPagination: postsResponse,
      preview,
    },
  };
};
