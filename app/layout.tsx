import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "./components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo List App",
  description: "A simple todo list application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main className="min-h-screen bg-gray-100">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
