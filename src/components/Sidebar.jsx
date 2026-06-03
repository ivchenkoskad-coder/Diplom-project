import {
  BarChart3,
  Boxes,
  Building2,
  Home,
  LogOut,
  MessageSquareText,
  Package,
  Settings,
  ShoppingBag,
  Tags,
  Truck,
  UserCog,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Головна", path: "/dashboard", icon: Home },
  { label: "Товари", path: "/products", icon: ShoppingBag },
  { label: "Категорії", path: "/categories", icon: Tags },
  { label: "Чат", path: "/chat", icon: MessageSquareText },
  { label: "Замовлення", path: "/orders", icon: Package },
  { label: "Клієнти", path: "/clients", icon: Users },
  { label: "Постачальники", path: "/suppliers", icon: Truck },
  { label: "Працівники", path: "/employees", icon: UserCog },
  { label: "Звіти", path: "/reports", icon: BarChart3 },
  { label: "Користувачі", path: "/users", icon: Boxes },
  { label: "Налаштування", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <Building2 size={25} />
        </div>
        <div>
          <strong>АС Управління</strong>
          <span>підприємством</span>
        </div>
      </div>

      <nav className="side-nav" aria-label="Основна навігація">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink key={path} className="side-link" to={path}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <NavLink className="side-link logout-link" to="/login">
        <LogOut size={18} />
        <span>Вийти</span>
      </NavLink>
    </aside>
  );
}
