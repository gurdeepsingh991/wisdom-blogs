import React from 'react';
import Link from 'next/link';
import { Post } from '../types/post';

export default function PostCard({ post, page }: { post: Post, page: number}) {

    const date = post?.date ? new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(post.date))
        : 'Unknown Date';

    return (
        <div className="mb-6 p-4 border rounded hover:shadow transition">
            <Link href={`/post/${post.id}?page=${page}`}>
                <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                    {post.title.rendered}
                </h2>
            </Link>

            <p className="text-sm text-gray-500 mb-2">
                Published on {date}
            </p>

            <div
                className="text-gray-700 text-base"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
        </div>
    );
}
