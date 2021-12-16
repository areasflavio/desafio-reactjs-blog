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
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  useEffect(() => {
    setPosts(postsPagination.results);
    setNextPage(postsPagination.next_page);
  }, [postsPagination.next_page, postsPagination.results]);

  function handleLoadMorePosts() {
    fetch(nextPage)
      .then(res => res.json())
      .then(data => {
        const newPosts = data.results.map(post => {
          return {
            uid: post.uid,
            first_publication_date: post.first_publication_date,
            // first_publication_date: format(
            //   new Date(post.first_publication_date),
            //   'dd MMM yyyy',
            //   {
            //     locale: ptBR,
            //   }
            // ),
            data: {
              title: post.data.title,
              subtitle: post.data.subtitle,
              author: post.data.author,
            },
          };
        });

        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setNextPage(data.next_page);
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
          {posts.map(post => (
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

        {nextPage && (
          <button
            type="button"
            className={styles.nextPage}
            onClick={handleLoadMorePosts}
          >
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 1,
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      // first_publication_date: format(
      //   new Date(post.first_publication_date),
      //   'dd MMM yyyy',
      //   {
      //     locale: ptBR,
      //   }
      // ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return {
    props: {
      postsPagination: {
        results: posts,
        next_page: postsResponse.next_page,
      },
    },
  };
};
