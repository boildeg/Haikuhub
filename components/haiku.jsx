"use client";

import Link from "next/link";
import { deleteHaiku } from "@/actions/haikuController";
import { CldImage } from "next-cloudinary";

export default function Haiku({ haiku }) {
  console.log(haiku);

  if (!haiku.photo) {
    haiku.photo = "fallback";
  }
  return (
    <div className="relative rounded-xl overflow-hidden w-[650px] h-[300px] mx-auto mb-7">
      <img src="/aspect-ratio.png" />

      <div className="absolute inset-0 bg-gray-200 grid">
        <span className="loading loading-dots loading-lg m-auto"></span>
      </div>
      <CldImage
        src={haiku.photo}
        width="650"
        height="300"
        alt="haiku"
        sizes="100vw"
        crop={{ type: "pad", source: true }}
        fillBackground
        overlays={[
          {
            position: {
              x: 38,
              y: 158,
              angle: -20,
              gravity: "north_west",
            },
            text: {
              color: "black",
              fontFamily: "Source Sans Pro",
              fontSize: 200,
              fontWeight: "bold",
              text: `${haiku.line1}%0A${haiku.line2}%0A${haiku.line3}`,
            },
          },
          {
            position: {
              x: 34,
              y: 154,
              angle: -20,
              gravity: "north_west",
            },
            text: {
              color: "white",
              fontFamily: "Source Sans Pro",
              fontSize: 200,
              fontWeight: "bold",
              text: `${haiku.line1}%0A${haiku.line2}%0A${haiku.line3}`,
            },
          },
        ]}
        className="absolute inset-0"
      />
      <p>{haiku.line1}</p>
      <p>{haiku.line2}</p>
      <p>{haiku.line3}</p>
      <div className="absolute bottom-2 right-2 flex gap-2 items-center justify-center">
        <Link
          href={`/edit-haiku/${haiku._id.toString()}`}
          className="bg-black/40 hover:bg-black/80 rounded p-2 text-white hover:text-white/60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </Link>
        <form action={deleteHaiku}>
          <input type="hidden" name="haikuId" value={haiku._id.toString()} />
          <button className="bg-black/40 hover:bg-black/80 rounded p-2 text-white hover:text-white/60 hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
