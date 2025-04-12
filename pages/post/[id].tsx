import { GetServerSideProps } from 'next';
import { getPost } from '../../utils/api';
import { Post } from '../../types/post';
import Layout from '@/components/Layout';
import ErrorBanner from '@/components/ErrorBanner';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface PostPageProps {
    post?: Post;
    error?: string;
}

export default function PostPage({ post, error }: PostPageProps) {
    const router = useRouter();
    const page = router.query.page || 1;
    if (error) {
        return (
            <Layout>
                <ErrorBanner message={error} />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="mt-6">
                <Link href={`/?page=${page}`} className="text-blue-600 hover:underline">
                    ← Back to Posts
                </Link>
            </div>
            <article className="max-w-3xl mx-auto px-4 py-8">
                <h1
                    className="text-3xl font-bold mb-4"
                    dangerouslySetInnerHTML={{ __html: post?.title.rendered || '' }}
                />
                <p className="text-sm text-gray-500 mb-4">
                    Published on{' '}
                    {new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    }).format(new Date(post?.date || ''))}
                </p>
                <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post?.content.rendered || '' }}
                />
            </article>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params?.id;
    try {
        const post = await getPost(id as string);
        return { props: { post } };
    } catch (error: any) {
        return { props: { error: error.message || 'Failed to load post' } };
    }
};
