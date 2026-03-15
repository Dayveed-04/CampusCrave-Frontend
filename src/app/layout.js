import "./globals.css";

import "./globals.css";
import { AuthProvider } from "@/contexts/authContext";
import RouteGuard from "@/components/routeGuard";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <RouteGuard>{children}</RouteGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
