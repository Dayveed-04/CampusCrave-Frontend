
export default function AdminLayout({ children }) {
  return (
     <div className="min-h-screen ">
      <main className="pb-20">
        {children}
      </main>
    </div>
  );
}