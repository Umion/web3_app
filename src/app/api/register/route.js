import { prisma } from "@/db/db.ts";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json(); // Use req.json() to parse the request body

  if (!email) {
    return NextResponse.json(
      { error: "Введите email и пароль" },
      { status: 400 }
    );
  }

  try {
    // Проверяем, есть ли уже юзер в БД
    const existingUser = await prisma.user.findFirst();
    if (existingUser) {
      return NextResponse.json(
        { error: "Регистрация закрыта. Уже есть админ." },
        { status: 403 }
      );
    }

    // Создаём первого юзера (админа)
    const newUser = await prisma.user.create({
      data: {
        email,
      },
    });

    return NextResponse.json(
      { message: "Первый пользователь создан", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);

    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// Если кто-то отправит GET-запрос, вернем ошибку
export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
