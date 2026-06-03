import { useState } from "react";
import {
  BarChart3,
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  Tags,
  Truck,
  UserCog,
  UserCircle,
  Users,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";

export default function Layout() {
  const location = useLocation();
  const showDashboardTitle = location.pathname === "/" || location.pathname === "/dashboard";
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([
    "Нове замовлення #10046 очікує обробки",
    "Залишок товару Монітор Dell нижче норми",
    "Резервну копію створено успішно",
  ]);

  function clearNotifications() {
    setNotifications([]);
  }

  return (
    <div className={`app-shell ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar />

      <section className="workspace">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button"
              aria-label="Відкрити меню"
              onClick={() => setIsSidebarCollapsed((isCollapsed) => !isCollapsed)}
            >
              <Menu size={21} />
            </button>
            {showDashboardTitle ? <h1 className="topbar-title">Панель керування</h1> : null}
          </div>

          <div className="topbar-actions">
            <div className="notification-menu">
              <button
                className="icon-button notification"
                aria-expanded={isNotificationsOpen}
                aria-label="Сповіщення"
                onClick={() => setIsNotificationsOpen((isOpen) => !isOpen)}
              >
                <Bell size={20} />
                {notifications.length ? <span>{notifications.length}</span> : null}
              </button>

              {isNotificationsOpen ? (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <strong>Сповіщення</strong>
                    <button type="button" onClick={clearNotifications}>
                      Очистити
                    </button>
                  </div>
                  {notifications.length ? (
                    notifications.map((item) => <p key={item}>{item}</p>)
                  ) : (
                    <p>Нових сповіщень немає</p>
                  )}
                </div>
              ) : null}
            </div>

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

                  <span className="profile-section-label">Швидкі дії</span>
                  <Link to="/employees?action=add" onClick={() => setIsProfileOpen(false)}>
                    <UserCog size={17} />
                    <span>Додати працівника</span>
                  </Link>
                  <Link to="/categories?action=add" onClick={() => setIsProfileOpen(false)}>
                    <Tags size={17} />
                    <span>Додати категорію</span>
                  </Link>
                  <Link to="/suppliers?action=add" onClick={() => setIsProfileOpen(false)}>
                    <Truck size={17} />
                    <span>Додати постачальника</span>
                  </Link>
                  <Link to="/reports" onClick={() => setIsProfileOpen(false)}>
                    <BarChart3 size={17} />
                    <span>Переглянути звіти</span>
                  </Link>

                  <span className="profile-section-label">Адміністрування</span>
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
