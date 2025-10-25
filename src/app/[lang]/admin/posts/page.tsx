"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BlogPost } from "@/lib/blogData";
import BlogPostList from "@/components/custom/BlogPostList";

// Mock data for blog posts
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 15',
    excerpt: 'Learn the fundamentals of Next.js 15 and how to build modern web applications.',
    content: 'Next.js 15 content...',
    date: '2025-09-15',
    author: 'Alex Johnson',
    slug: 'getting-started-nextjs-15'
  },
  {
    id: '2',
    title: 'Mastering Tailwind CSS in 2025',
    excerpt: 'Discover the latest features and best practices for using Tailwind CSS in modern web development.',
    content: 'Tailwind CSS content...',
    date: '2025-09-10',
    author: 'Sam Smith',
    slug: 'mastering-tailwind-css-2025'
  },
  {
    id: '3',
    title: 'Building Accessible React Components',
    excerpt: 'Learn how to create React components that are accessible to all users, including those using assistive technologies.',
    content: 'React accessibility content...',
    date: '2025-09-05',
    author: 'Taylor Reed',
    slug: 'building-accessible-react-components'
  }
];

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);

  const handleEdit = (post: BlogPost) => {
    router.push(`/dashboard/blog/edit/${post.id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Posts</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create, edit, and delete blog posts
          </p>
        </div>
        <Button onClick={() => router.push("/dashboard/blog/create")}>
          Create New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>
            Manage all blog posts in your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          {posts.length > 0 ? (
            <BlogPostList 
              posts={posts} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No posts found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You haven't created any blog posts yet.
              </p>
              <Button onClick={() => router.push("/dashboard/blog/create")}>
                Create Your First Post
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}