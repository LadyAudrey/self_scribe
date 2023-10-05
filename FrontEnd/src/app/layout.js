import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen bg-gradient-to-b from-stone-900 to-stone-950">
      <img src="/Buttons/Hamburger.svg" className="fixed right-0 top-0 sm:m-5 btn-fx " alt="hamburger menu"/>
        {children}
      </body>
    </html>
  );
}
