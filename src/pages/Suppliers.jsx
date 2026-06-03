import { Truck } from "lucide-react";

import DataTable from "../components/DataTable";

const rows = [
  { name: 'ТОВ "Технопоставка"', manager: "Олена Кравчук", phone: "+380 44 223 10 12", status: "Активний" },
  { name: 'ПП "Склад-Сервіс"', manager: "Ігор Руденко", phone: "+380 67 440 20 18", status: "Активний" },
  { name: 'ТОВ "Офіс Маркет"', manager: "Наталія Шевченко", phone: "+380 50 882 19 45", status: "Перевірка" },
];

const columns = [
  { key: "name", label: "Постачальник" },
  { key: "manager", label: "Контактна особа" },
  { key: "phone", label: "Телефон" },
  { key: "status", label: "Статус" },
];

export default function Suppliers() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Постачальники</h1>
          <p>Договори, контакти та умови постачання</p>
        </div>
      </header>
      <section className="panel">
        <div className="panel-heading">
          <h2>База постачальників</h2>
          <Truck size={22} />
        </div>
        <DataTable columns={columns} rows={rows} />
      </section>
    </div>
  );
}
