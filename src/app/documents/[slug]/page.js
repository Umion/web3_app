import { getDocument } from "@/db/db";

// Асинхронный компонент для страницы документа
export default async function DocumentPage({ params }) {
  const { slug } = await params;
  const document = getDocument(slug);

  if (!document) {
    return <h1>Документ не найден</h1>;
  }

  return (
    <div>
      <h1>{document.title}</h1>
      <p>{document.content}</p>
    </div>
  );
}
