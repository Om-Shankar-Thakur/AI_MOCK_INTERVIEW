import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="dashboard-shell">
      <Sidebar />
      <div className="dashboard-content">
        <TopNavbar />
        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
