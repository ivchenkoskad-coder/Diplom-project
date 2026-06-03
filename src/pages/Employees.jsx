import { UserCog } from "lucide-react";

import DataTable from "../components/DataTable";

const rows = [
  { name: "Марина Бойко", role: "Менеджер з продажів", department: "Відділ продажів", status: "Працює" },
  { name: "Олександр Дяченко", role: "Аналітик", department: "Фінансовий відділ", status: "Працює" },
  { name: "Ірина Савчук", role: "Адміністратор", department: "IT-відділ", status: "Працює" },
  { name: "Дмитро Коваль", role: "Логіст", department: "Склад", status: "Працює" },
];

const columns = [
  { key: "name", label: "Працівник" },
  { key: "role", label: "Посада" },
  { key: "department", label: "Підрозділ" },
  { key: "status", label: "Статус" },
];

export default function Employees() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Працівники</h1>
          <p>Персонал підприємства та службові ролі</p>
        </div>
      </header>
      <section className="panel">
        <div className="panel-heading">
          <h2>Список працівників</h2>
          <UserCog size={22} />
        </div>
        <DataTable columns={columns} rows={rows} />
      </section>
    </div>
  );
}
