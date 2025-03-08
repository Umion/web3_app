import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Form from "./components/Form";
import Link from "next/link";
import { DocumentType, getDocuments } from "@/db/db";

export default async function Home() {
  const docs = getDocuments();

  return (
    <>
      <Form />
      <p>---------</p>
      <Table>
        <TableCaption>A list of your documents.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>slug</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {docs.map((d: DocumentType) => (
            <TableRow key={d.slug}>
              <TableCell className="font-medium">{d.title}</TableCell>
              <TableCell>{d.slug}</TableCell>
              <TableCell>
                <Link href={`/documents/${d.slug}`} prefetch={false}>
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
