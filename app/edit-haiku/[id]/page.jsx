import HaikuForm from "@/components/haikuForm";
import { getUser } from "@/lib/getUser";
import { redirect, notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/db";

// Separate database logic into a service function
async function getHaikuById(id) {
  try {
    const haikusCollection = await getCollection("haikus");
    const haiku = await haikusCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (!haiku) {
      return null;
    }

    return {
      ...haiku,
      _id: haiku._id.toString(),
      author: haiku.author.toString(),
    };
  } catch (error) {
    console.error("Error fetching haiku:", error);
    return null;
  }
}

export default async function EditHaiku({ params }) {
  // Authentication check
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  // Validate and fetch haiku
  const { id } = await params;
  if (!id || !ObjectId.isValid(id)) {
    notFound();
  }

  const haiku = await getHaikuById(id);
  if (!haiku) {
    notFound();
  }

  // Authorization check
  if (haiku.author !== user.userId) {
    console.error("Unauthorized access attempt to edit haiku");
    redirect("/");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-center text-2xl font-bold text-primary">
        Edit Haiku
      </h1>
      <HaikuForm action="edit-haiku" haiku={haiku} />
    </div>
  );
}
