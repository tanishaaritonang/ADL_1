"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BlogPost } from "@/server/_data/blog";

interface BlogPostListProps {
  posts: BlogPost[];
  onDelete?: (id: string) => void;
  onEdit?: (post: BlogPost) => void;
}

export default function BlogPostList({ posts, onDelete, onEdit }: BlogPostListProps) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>
              <Link 
                href={`/blog/${post.slug}`} 
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {post.title}
              </Link>
            </CardTitle>
            <CardDescription>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>By {post.author}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
          </CardContent>
          {(onDelete || onEdit) && (
            <CardFooter className="flex justify-end space-x-2">
              {onEdit && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onEdit(post)}
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => onDelete(post.id)}
                >
                  Delete
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}