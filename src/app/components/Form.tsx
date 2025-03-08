"use client";
import React, { useState } from "react";

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const createUser = async () => {
    setIsLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@example.com",
        password: "supersecure",
      }),
      cache: "no-store", // чтобы всегда был свежий запрос
    });
    setIsLoading(false);
    console.log(res);
  };
  const createDoc = async () => {
    setIsLoading(true);
    const res = await fetch("/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `Document ${Math.random()}`,
        content: `This is the content of the new document. ${Math.random()}`,
        userId: "21880bfb-dc79-4670-8ed5-26f80b8b9d17",
        slug: "my-new-document-2",
        isPublished: false,
      }),
      cache: "no-store", // чтобы всегда был свежий запрос
    });
    setIsLoading(false);
    console.log(res);
  };
  return (
    <div>
      <div>{isLoading ? "loader" : "data"}</div>
      <button onClick={createUser}>create user</button>
      <div></div>
      <button onClick={createDoc}>create doc</button>
    </div>
  );
};

export default Form;
