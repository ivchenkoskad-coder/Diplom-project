import { Tags } from "lucide-react";

import DataTable from "../components/DataTable";

const rows = [
  { name: "Електроніка", products: 435, status: "Активна" },
  { name: "Побутова техніка", products: 310, status: "Активна" },
  { name: "Офісна техніка", products: 250, status: "Активна" },
  { name: "Аксесуари", products: 255, status: "Активна" },
];

const columns = [
  { key: "name", label: "Категорія" },
  { key: "products", label: "Кількість товарів" },
  { key: "status", label: "Статус" },
];

export default function Categories() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Категорії</h1>
          <p>Структура товарного каталогу</p>
        </div>
      </header>
      <section className="panel">
        <div className="panel-heading">
          <h2>Категорії товарів</h2>
          <Tags size={22} />
        </div>
        <DataTable columns={columns} rows={rows} />
      </section>
    </div>
  );
}
