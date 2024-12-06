import Link from "next/link";
import { getUser } from "@/lib/getUser";
import { logoutUser } from "@/actions/userControler";

export default async function Navbar() {
  const user = await getUser();

  return (
    <header>
      <div className="navbar flex justify-between max-w-screen-xl mx-auto bg-base-100 ">
        <div className="">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>
          <Link href="/" className="btn btn-ghost text-xl">
            HaikuHub
          </Link>
        </div>
        {!user && (
          <div className="">
            <Link href="/login" className="btn">
              Log in
            </Link>
          </div>
        )}
        {user && (
          <div className="">
            <div className="mr-3">
              <Link href="/create-haiku" className="btn">
                Create Haiku
              </Link>
            </div>
            <form action={logoutUser}>
              <button type="submit" className="btn">
                Log Out
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
