 
import Navbar from "@/components/Home/Navbar/Navbar";
import "./globals.css";
import { ToastProvider } from "@/hooks/ToastProvider";
import { AuthProvider } from "@/Context/AuthContext";
import ReduxProvider from "@/store/provider";

 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <ToastProvider>
        <Navbar/>
        <ReduxProvider>
        {children}
        </ReduxProvider>
        </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
