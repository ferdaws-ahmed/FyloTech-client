import "./globals.css";
import Navbar from "@/component/Navbar/Navbar";
import Footer from "@/component/Footer/Footer";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { Toaster, toast } from "react-hot-toast";

export const metadata = {
  title: "FyloTech - Modern Gadget Shop",
  description: "Your hub for the latest tech gear.",
  icons: {
    icon: "/fylo-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>FyloTech</title>
        <link rel="icon" type="image/png" href="/fylo-icon.png" />

      </head>
      <body className="antialiased bg-gray-900 text-gray-100">
        <AuthContextProvider>
          {/* Custom animated Toaster */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1e293b", 
                color: "#f1f5f9", 
                padding: "12px 20px",
                borderRadius: "12px",
                fontWeight: "500",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              },
              success: {
                iconTheme: {
                  primary: "#10b981", // green
                  secondary: "#f1f5f9",
                },
                style: {
                  border: "1px solid #10b981",
                  background: "#0f172a",
                  color: "#10b981",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444", // red
                  secondary: "#f1f5f9",
                },
                style: {
                  border: "1px solid #ef4444",
                  background: "#0f172a",
                  color: "#ef4444",
                },
              },
            }}
          />

          <Navbar />

          <main className="w-10/12 max-w-[1200px] mx-auto pt-16 pb-12">
            {children}
          </main>

          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
