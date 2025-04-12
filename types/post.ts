export interface Post {
    id: number;
    date: string;
    slug: string;
    title: {
      rendered: string;
    };
    content: {
      rendered: string;
    };
    excerpt: {
      rendered: string;
    };
    featured_media?: number;
  }
  