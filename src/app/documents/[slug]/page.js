// src/app/documents/[slug]/page.js
import { prisma } from "../../../db/db"; // Подключаем Prisma
import { notFound } from "next/navigation"; // Для возврата 404, если документ не найден

// Асинхронный компонент для страницы документа
export default async function DocumentPage({ params }) {
  const { slug } = await params; // Получаем слаг из URL

  // Запрашиваем документ по слагу из базы данных
  const document = await prisma.document.findUnique({
    where: { slug },
  });

  // Если документ не найден, возвращаем 404
  if (!document) {
    notFound(); // Это вызывает страницу 404
  }

  // Отображаем данные документа
  return (
    <div>
      <h1>{document.title}</h1>
      <p>{document.content}</p>
    </div>
  );
}
