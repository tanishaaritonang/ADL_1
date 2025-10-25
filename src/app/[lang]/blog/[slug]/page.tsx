import DetailBlog from "./__component/DetailBlog";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  return <DetailBlog params={{ slug }} />;
}
