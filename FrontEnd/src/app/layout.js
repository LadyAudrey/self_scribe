import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen bg-gradient-to-b from-stone-800 to-stone-950 text-white">
        <Link href="/lists">
          <Image
            src="/Buttons/List.svg"
            height={200}
            width={200}
            className="fixed right-0 top-0 sm:m-5 btn-fx"
            alt="hamburger menu"
          />
        </Link>
        {children}
      </body>
    </html>
  );
}
