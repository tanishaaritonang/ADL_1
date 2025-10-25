import { blogPosts } from '@/server/_data/blog';
import { NextResponse } from 'next/server';

export async function GET() {
  // Return all blog posts
  return NextResponse.json({
    data: blogPosts,
  });
}