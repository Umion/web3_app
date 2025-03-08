// src/app/documents/[slug]/page.js
import { prisma } from "@/db/db"; // Подключаем Prisma
import { notFound } from "next/navigation"; // Для возврата 404, если документ не найден

// Асинхронный компонент для страницы документа
export default async function DocumentPage({ params }) {
  try {
    const { slug } = await params; // Получаем слаг из URL
    console.log("SERvR Log", slug);

    if (!slug) {
      <h1>Ошибка сервера no slug</h1>;
    }

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
  } catch (error) {
    console.error("Ошибка при загрузке документа:", error);
    return <h1>Ошибка сервера</h1>;
  }
}
