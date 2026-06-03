import { Plus, UsersRound } from "lucide-react";

import DataTable from "../components/DataTable";
import { clients } from "../data/mockData";

const columns = [
  { key: "name", label: "Клієнт" },
  { key: "contact", label: "Контакт" },
  { key: "orders", label: "Замовлень" },
  { key: "segment", label: "Сегмент" },
];

export default function Clients() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Клієнти</h1>
          <p>Клієнтська база та історія взаємодії</p>
        </div>
        <button className="primary-button" type="button">
          <Plus size={18} />
          <span>Додати клієнта</span>
        </button>
      </header>

      <section className="panel">
        <div className="panel-heading">
          <h2>Список клієнтів</h2>
          <UsersRound size={22} />
        </div>
        <DataTable columns={columns} rows={clients} />
      </section>
    </div>
  );
}
