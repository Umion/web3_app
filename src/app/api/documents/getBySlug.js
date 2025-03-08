// pages/api/documents/getBySlug.js

import { prisma } from "../../../db"; // Подключаем prisma

export async function handler(req, res) {
  // Проверяем, что метод запроса - POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не разрешен" });
  }

  const { slug } = req.body; // Получаем slug из тела запроса

  if (!slug) {
    return res.status(400).json({ error: "Необходимо указать slug" });
  }

  try {
    // Ищем документ по slug
    const document = await prisma.document.findUnique({
      where: { slug },
    });

    if (!document) {
      return res.status(404).json({ error: "Документ не найден" });
    }

    return res.status(200).json(document);
  } catch (error) {
    console.error("Ошибка при получении документа", error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}
