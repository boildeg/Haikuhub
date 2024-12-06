import RegisterForm from "@/components/registerForm";
import { getUser } from "@/lib/getUser";
import Dashboard from "@/components/dashboard";

export default async function Home() {
  const user = await getUser();

  return (
    <>
      {user && (
        <>
          <Dashboard user={user} />
        </>
      )}
      {!user && (
        <>
          <p className="text-center text-2xl font-bold text-primary">
            Create an account to start writing haikus!
          </p>
          <RegisterForm />
        </>
      )}
    </>
  );
}
