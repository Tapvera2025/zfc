import { BlogEditor } from "@/components/admin/blog-editor";

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  return <BlogEditor postId={id} />;
}
