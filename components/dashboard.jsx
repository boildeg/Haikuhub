import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import Haiku from "@/components/haiku";

const getHaiku = async function (userId) {
  const haikuCollection = await getCollection("haikus");
  const results = await haikuCollection
    .find({ author: ObjectId.createFromHexString(userId) })
    .sort({ _id: -1 })
    .toArray();

  return results;
};

export default async function Dashboard({ user }) {
  const haiku = await getHaiku(user.userId);

  return (
    <>
      <h1 className="text-center text-2xl font-bold text-primary">
        {haiku.length > 0 ? "Your Haikus" : "No haikus found"}
      </h1>
      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        {haiku.map(
          (haiku, index) => (
            (haiku._id = haiku._id.toString()),
            (haiku.author = haiku.author.toString()),
            (<Haiku haiku={haiku} key={index} />)
          )
        )}
      </div>
    </>
  );
}
