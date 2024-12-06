import "@/app/global.css";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "HaikuHub",
  description: "Create and share your haikus",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col ">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          {children}
        </main>
        <footer className=" border-t ">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600">
            Copyright © {new Date().getFullYear()} all rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
