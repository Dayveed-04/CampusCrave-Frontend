import "./globals.css";
import { Pacifico } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/authContext";
import RouteGuard from "@/components/routeGuard";

{
  /*const inter = Inter({
  subsets: ['latin'],
  variable: '--font-rounded',
})*/
}
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-logo",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={pacifico.variable}>
      <body>
        <AuthProvider>
          <RouteGuard>{children}</RouteGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
