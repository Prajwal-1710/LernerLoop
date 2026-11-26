import FeedbackClient from "./FeedbackClient";

export function generateStaticParams() {
  return [
    { lessonId: "les-001" },
    { lessonId: "les-002" },
  ];
}

export default async function Page({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  return <FeedbackClient lessonId={lessonId} />;
}
