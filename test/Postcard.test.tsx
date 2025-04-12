import React from 'react';
import { render, screen } from '@testing-library/react';
import PostCard from '@/components/PostCard';
import { Post } from '@/types/post';


const mockPost: Post = {
  id: 1,
  title: { rendered: 'Test Blog Post' },
  slug: 'test-blog-post',
  date: '2025-04-12',
  content: { rendered: 'Post content' },
  excerpt: { rendered: 'Post excerpt' },
};

describe('PostCard', () => {
  it('renders the post title', () => {
    render(<PostCard post={mockPost} page={2} />);
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
  });

  it('links to correct post with page param', () => {
    render(<PostCard post={mockPost} page={2} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/post/1?page=2');
  });
});
