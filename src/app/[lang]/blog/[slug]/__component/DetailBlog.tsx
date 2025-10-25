"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import BlogComments from "@/components/custom/BlogComments";
import { useState } from "react";
import { useBlog } from "@/features/blog/api/get-blog";

export default function DetailBlog({ params }: { params: { slug: string } }) {
  const { data, isLoading, isError, error } = useBlog({
    blogId: params.slug,
  });
  
  const [comments, setComments] = useState([
    {
      id: "1",
      author: "Alice Johnson",
      content:
        "Great post! I learned a lot about Next.js 15. Looking forward to trying out Turbopack.",
      date: "2025-09-16",
      likes: 5,
    },
    {
      id: "2",
      author: "Bob Smith",
      content:
        "The section on React Server Components was particularly helpful. Do you have any examples of when NOT to use them?",
      date: "2025-09-17",
      likes: 3,
    },
  ]);

  const handleAddComment = (content: string) => {
    const newComment = {
      id: (comments.length + 1).toString(),
      author: "You",
      content,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
    };

    setComments([...comments, newComment]);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          ← Back to Blog
        </Link>

        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          ← Back to Blog
        </Link>

        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">
            Failed to load blog post: {error?.message || "Unknown error"}
          </span>
        </div>
      </div>
    );
  }

  if (!data) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/blog"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
      >
        ← Back to Blog
      </Link>

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{data.data.title}</h1>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <span>{data.data.date}</span>
            <span className="mx-2">•</span>
            <span>By {data.data.author}</span>
          </div>
        </header>

        <div className="whitespace-pre-line mb-12">{data.data.content}</div>
      </article>

      {/* Comments Section */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <BlogComments comments={comments} onAddComment={handleAddComment} />
      </div>
    </div>
  );
}
