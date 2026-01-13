import StudentNavigation from "@/components/navigations/StudentNavigation";


export default function StudentLayout({ children }) {
  return (
    <div className="min-h-screen ">
      <main className="pb-20">
        {children}
      </main>
      <StudentNavigation/>
    </div>
  );
}