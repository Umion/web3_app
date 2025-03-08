import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/db/db";
import Form from "./components/Form";
import Link from "next/link";

async function getUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
    },
  });

  return users;
}
async function getDocs() {
  const documents = await prisma.document.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      isPublished: true,
      slug: true,
      user: {
        select: {
          email: true, // Get the email of the user associated with the document
        },
      },
    },
  });

  return documents;
}

export default async function Home() {
  const users = await getUsers();
  const docs = await getDocs();
  console.log(users);
  console.log(docs);

  return (
    <>
      <Form />
      <p>---------</p>
      <Table>
        <TableCaption>A list of your documents.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Date created</TableHead>
            <TableHead>slug</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {docs.map((d) => (
            <TableRow key={d.id}>
              <TableCell className="font-medium">{d.title}</TableCell>
              <TableCell>{new Date(d.createdAt).toISOString()}</TableCell>
              <TableCell>{d.slug}</TableCell>
              <TableCell>
                <Link href={`/documents/${d.slug}`}>Edit</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
