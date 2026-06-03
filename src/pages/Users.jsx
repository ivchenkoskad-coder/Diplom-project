import { ShieldCheck, UserPlus } from "lucide-react";

import DataTable from "../components/DataTable";

const rows = [
  { name: "admin", role: "Адміністратор", access: "Повний доступ", status: "Активний" },
  { name: "manager", role: "Менеджер", access: "Продажі та замовлення", status: "Активний" },
  { name: "analyst", role: "Керівник", access: "Звіти та аналітика", status: "Активний" },
];

const columns = [
  { key: "name", label: "Логін" },
  { key: "role", label: "Роль" },
  { key: "access", label: "Права доступу" },
  { key: "status", label: "Статус" },
];

export default function Users() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Користувачі</h1>
          <p>Ролі, права доступу та облікові записи</p>
        </div>
        <button className="primary-button" type="button">
          <UserPlus size={18} />
          <span>Додати користувача</span>
        </button>
      </header>
      <section className="panel">
        <div className="panel-heading">
          <h2>Облікові записи</h2>
          <ShieldCheck size={22} />
        </div>
        <DataTable columns={columns} rows={rows} />
      </section>
    </div>
  );
}
