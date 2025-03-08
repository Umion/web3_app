import fs from "fs";
import path from "path";

export interface DocumentType {
  title: string;
  content: string;
  isPublished: boolean;
  slug: string;
}

const filePath = path.join(process.cwd(), "data.json");

// Функция для чтения данных из файла
export function getDocuments() {
  try {
    const jsonData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Ошибка чтения файла:", error);
    return [];
  }
}

// Функция для получения документа по slug
export function getDocument(slug: string) {
  const documents = getDocuments();
  return documents.find((doc: DocumentType) => doc.slug === slug);
}

// Функция для сохранения нового документа
export function saveDocument(newDoc: DocumentType) {
  const documents = getDocuments();
  documents.push(newDoc);

  try {
    fs.writeFileSync(filePath, JSON.stringify(documents, null, 2));
  } catch (error) {
    console.error("Ошибка записи в файл:", error);
  }
}
export function updateDocument(slug: string, updatedData: DocumentType) {
  const documents = getDocuments();
  const index = documents.findIndex((doc: DocumentType) => doc.slug === slug);

  if (index === -1) {
    console.error("Документ не найден:", slug);
    return false;
  }

  // Обновляем только переданные поля
  documents[index] = { ...documents[index], ...updatedData };

  try {
    fs.writeFileSync(filePath, JSON.stringify(documents, null, 2));
    return true;
  } catch (error) {
    console.error("Ошибка при обновлении файла:", error);
    return false;
  }
}
