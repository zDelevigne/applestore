import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/StoreContext";
import Cart from "@/components/Cart/Cart";
import Login from "@/components/Login/Login";

export const metadata: Metadata = {
  title: "Apple Store Premium | Nuevos y Usados",
  description: "Productos Apple nuevos y usados premium con accesorios de regalo.",
  icons: {
    icon: "/images/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
          <Cart />
          <Login />
        </StoreProvider>
      </body>
    </html>
  );
}
