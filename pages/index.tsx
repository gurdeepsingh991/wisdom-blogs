import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { getPosts, searchPosts } from '../utils/api';
import { Post } from '../types/post';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';
import ErrorBanner from '@/components/ErrorBanner';

interface HomeProps {
  initialPosts: Post[];
  totalPosts: number;
  initialPage: number;
  error?: string;
}

export default function Home({ initialPosts, totalPosts: initialTotal, initialPage, error: serverError }: HomeProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [totalPosts, setTotalPosts] = useState<number>(initialTotal);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(initialPage);
  const [error, setError] = useState(serverError || '');
  const [loading, setLoading] = useState(false);

  const postsPerPage = 5;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.length >= 3) {
        setLoading(true);
        try {
          const results = await searchPosts(query);
          setPosts(results);
          setTotalPosts(results.length); // Reset to search count
          setError(results.length === 0 ? 'No posts found for the search text' : '');
        } catch (err: any) {
          setError(err.message || 'Search failed');
        } finally {
          setLoading(false);
        }
      }

      if (query.length === 0) {
        setLoading(true);
        try {
          const { posts, total } = await getPosts(page, postsPerPage);
          setPosts(posts);
          setTotalPosts(total);
          setError('');
        } catch (err: any) {
          setError(err.message || 'Failed to reload posts');
        } finally {
          setLoading(false);
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, page]);

  return (
    <Layout>
      <main className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Latest Blogs</h1>
        {error && <ErrorBanner message={error} />}

        <div className="mb-4 flex gap-2 items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="border p-2 flex-grow"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-sm text-gray-500 underline hover:text-gray-700"
            >
              Clear
            </button>
          )}
        </div>

        {loading && <p className="text-gray-500">Loading posts...</p>}

        {posts.map((post) => (
          <PostCard key={post.id} post={post} page={page} />
        ))}

        {totalPages > 1 && (
          <div className="flex gap-2 mt-6 justify-center items-center flex-wrap">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="border px-3 py-1 rounded cursor-pointer disabled:cursor-not-allowed"
            >
              First
            </button>
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="border px-3 py-1 rounded cursor-pointer disabled:cursor-not-allowed"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 border rounded cursor-pointer ${p === page ? 'bg-blue-600 text-white' : ''
                    }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="border px-3 py-1 rounded cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="border px-3 py-1 rounded cursor-pointer disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        )}
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query.page) || 1;
  const perPage = 5;
  try {
    const { posts, total } = await getPosts(page, perPage);
    return {
      props: { 
        initialPosts: posts,
        totalPosts: total,
        initialPage: page,
      }
    };
  } catch (err: any) {
    return {
      props: {
        initialPosts: [],
        totalPosts: 0,
        initialPage: page,
        error: err.message || 'Failed to load posts',
      }
    };
  }
};