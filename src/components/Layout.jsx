import { useState } from "react";
import { Bell, ChevronDown, LogOut, Menu, Settings, UserCircle, Users } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";

export default function Layout() {
  const location = useLocation();
  const showDashboardTitle = location.pathname === "/" || location.pathname === "/dashboard";
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

            <div className="profile-menu">
              <button
                className="profile-button"
                type="button"
                aria-expanded={isProfileOpen}
                onClick={() => setIsProfileOpen((isOpen) => !isOpen)}
              >
                <UserCircle size={24} />
                <span>Адміністратор</span>
                <ChevronDown size={16} />
              </button>

              {isProfileOpen ? (
                <div className="profile-dropdown">
                  <div className="profile-card">
                    <UserCircle size={34} />
                    <div>
                      <strong>Адміністратор системи</strong>
                      <span>admin@enterprise.local</span>
                    </div>
                  </div>
                  <Link to="/users" onClick={() => setIsProfileOpen(false)}>
                    <Users size={17} />
                    <span>Користувачі</span>
                  </Link>
                  <Link to="/settings" onClick={() => setIsProfileOpen(false)}>
                    <Settings size={17} />
                    <span>Налаштування</span>
                  </Link>
                  <Link to="/login" onClick={() => setIsProfileOpen(false)}>
                    <LogOut size={17} />
                    <span>Вийти</span>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
