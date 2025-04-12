const BASE_URL = 'https://public-api.wordpress.com/wp/v2/sites/megurdeep.wordpress.com';

export async function getPosts(page: number = 1, perPage: number = 5) {
  const res = await fetch(`${BASE_URL}/posts?page=${page}&per_page=${perPage}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const message = errorData?.message || `Failed to fetch posts (Status: ${res.status})`;
    throw new Error(message);
  }
  const posts = await res.json();
  const total = Number(res.headers.get('X-WP-Total')) || 0;
  return { posts, total };
}

export async function getPost(id: string | number) {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const message = errorData?.message || `Failed to fetch post ID ${id}`;
    throw new Error(message);
  }
  return res.json();
}

export async function searchPosts(query: string) {
  const res = await fetch(`${BASE_URL}/posts?search=${encodeURIComponent(query)}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const message = errorData?.message || 'Search request failed';
    throw new Error(message);
  }
  return res.json();
}
