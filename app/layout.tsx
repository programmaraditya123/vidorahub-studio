 
import Navbar from "@/components/Home/Navbar/Navbar";
import "./globals.css";
import { ToastProvider } from "@/hooks/ToastProvider";

 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
        <Navbar/>
        {children}
        </ToastProvider>
      </body>
    </html>
  );
}
