// Vendor routes and layout


import VendorNavigation from "@/components/navigations/VendorNavigation";


export default function StudentLayout({ children }) {
  return (
    <div className="min-h-screen ">
      <main className="pb-20">
        {children}
      </main>
      <VendorNavigation/>
    </div>
  );
}