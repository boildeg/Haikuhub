"use client";

import { createHaiku, editHaiku } from "@/actions/haikuController";
import { useActionState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { CldImage } from "next-cloudinary";

export default function HaikuForm({ action, haiku }) {
  const [publicId, setPublicId] = useState(null);
  const [signature, setSignature] = useState(null);
  const [version, setVersion] = useState(null);

  let actualAction;

  if (action === "create-haiku") {
    actualAction = createHaiku.bind(null, publicId, signature, version);
  } else if (action === "edit-haiku") {
    actualAction = editHaiku.bind(null, haiku._id);
  }

  const [formState, formAction] = useActionState(actualAction, {});

  return (
    <form action={formAction} className="mx-auto max-w-sm p-4">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Line #1"
          className="input input-bordered w-full "
          autoComplete="off"
          name="line1"
          defaultValue={haiku?.line1}
        />
        {formState?.errors?.line1 && (
          <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{formState?.errors?.line1}</span>
          </div>
        )}
        <input
          type="text"
          placeholder="Line #2"
          className="input input-bordered w-full "
          autoComplete="off"
          name="line2"
          defaultValue={haiku?.line2}
        />
        {formState?.errors?.line2 && (
          <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{formState?.errors?.line2}</span>
          </div>
        )}
        <input
          type="text"
          placeholder="Line #3"
          className="input input-bordered w-full "
          autoComplete="off"
          name="line3"
          defaultValue={haiku?.line3}
        />
        {formState?.errors?.line3 && (
          <div role="alert" className="alert alert-warning">
            \
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{formState?.errors?.line3}</span>
          </div>
        )}
      </div>
      <div className="mb-4">
        <CldUploadWidget
          signatureEndpoint="/widget-signature"
          onQueuesEnd={(result, { widget }) => {
            widget.close();
          }}
          onSuccess={(result) => {
            console.log(result?.info);
            setPublicId(result?.info?.public_id);
            setSignature(result?.info?.signature);
            setVersion(result?.info?.version);
          }}
        >
          {({ open }) => {
            function handleClick(e) {
              e.preventDefault();
              open();
            }

            return (
              <button className="btn btn-primary mt-2" onClick={handleClick}>
                Upload an Images
              </button>
            );
          }}
        </CldUploadWidget>
      </div>
      {publicId && (
        <CldImage
          width="960"
          height="600"
          src={publicId}
          sizes="100vw"
          alt=""
        />
      )}
      <button className="btn btn-primary mt-2 w-full">
        {action === "create-haiku" ? "Create Haiku" : "Edit Haiku"}
      </button>
    </form>
  );
}
