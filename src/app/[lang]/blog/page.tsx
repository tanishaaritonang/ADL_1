"use client";

import { useState, useMemo } from "react";
import BlogSearch from "@/components/custom/BlogSearch";
import BlogPostList from "@/components/custom/BlogPostList";
import { useBlogs } from "@/features/blog/api/get-blogs";

export default function BlogPage() {
  const { data: posts, isLoading, isError, error } = useBlogs({});
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    if (!searchQuery) return posts.data;

    const query = searchQuery.toLowerCase();
    return posts.data.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        <div className="mb-8">
          <div className="flex w-full max-w-md mx-auto space-x-2 animate-pulse">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </div>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">
            Failed to load blog posts: {error?.message || "Unknown error"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      {/* Search Component */}
      <div className="mb-8">
        <BlogSearch onSearch={handleSearch} />
      </div>

      {/* Results count */}
      {searchQuery && (
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Found {filteredPosts.length} result
          {filteredPosts.length !== 1 ? "s" : ""} for "{searchQuery}"
        </div>
      )}

      {/* Blog Posts */}
      {filteredPosts.length > 0 ? (
        <BlogPostList posts={filteredPosts} />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No posts found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery
              ? `No blog posts match your search for "${searchQuery}". Try different keywords.`
              : "There are no blog posts available at the moment."}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
