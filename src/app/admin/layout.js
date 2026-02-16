// Admin routes and layout

import AdminNavigation from "@/components/navigations/AdminNavigation";

export default function StudentLayout({ children }) {
  return (
    <div className="min-h-screen ">
      <main className="pb-20">{children}</main>
      <AdminNavigation />
    </div>
  );
}
