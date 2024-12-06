"use server";

import { getUser } from "../../lib/getUser";
import { redirect } from "next/navigation";
import HaikuForm from "../../components/haikuForm";

export default async function CreateHaiku() {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <h1 className="text-center text-2xl font-bold text-primary">
        Create Haiku
      </h1>
      <HaikuForm action="create-haiku" />
    </>
  );
}
