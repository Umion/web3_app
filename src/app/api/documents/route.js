import { prisma } from "@/db/db.ts"; // Import your Prisma client
import { NextResponse } from "next/server"; // For creating responses

export async function POST(req) {
  const { title, content, userId, slug, isPublished } = await req.json();

  // Check if all required fields are provided
  if (!title || !content || !userId) {
    return NextResponse.json(
      { error: "Title, content, and userId are required" },
      { status: 400 }
    );
  }

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create a new document
    const newDocument = await prisma.document.create({
      data: {
        title,
        content,
        userId,
        slug, // Optional: Can be passed as null or a generated value
        isPublished: isPublished || false, // Default to false if not provided
      },
    });

    // Return the newly created document as a response
    return NextResponse.json(
      { message: "Document created successfully", document: newDocument },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json(
      { error: "Server error while creating document" },
      { status: 500 }
    );
  }
}
