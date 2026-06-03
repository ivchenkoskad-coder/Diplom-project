import { Bell, ChevronDown, Menu, UserCircle } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";

export default function Layout() {
  const location = useLocation();
  const showDashboardTitle = location.pathname === "/" || location.pathname === "/dashboard";

  return (
    <div className="app-shell">
      <Sidebar />

      <section className="workspace">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button" aria-label="Відкрити меню">
              <Menu size={21} />
            </button>
            {showDashboardTitle ? <h1 className="topbar-title">Панель керування</h1> : null}
          </div>

          <div className="topbar-actions">
            <button className="icon-button notification" aria-label="Сповіщення">
              <Bell size={20} />
              <span>3</span>
            </button>

            <button className="profile-button" type="button">
              <UserCircle size={24} />
              <span>Адміністратор</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
