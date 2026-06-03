import { PackagePlus, Plus } from "lucide-react";

import DataTable from "../components/DataTable";
import { products } from "../data/mockData";

const columns = [
  { key: "name", label: "Назва товару" },
  { key: "sku", label: "Артикул" },
  { key: "category", label: "Категорія" },
  { key: "stock", label: "Залишок" },
  { key: "price", label: "Ціна" },
];

export default function Products() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Товари</h1>
          <p>Облік товарів, залишків і цін підприємства</p>
        </div>
        <button className="primary-button" type="button">
          <Plus size={18} />
          <span>Додати товар</span>
        </button>
      </header>

      <section className="panel">
        <div className="panel-heading">
          <h2>Каталог товарів</h2>
          <PackagePlus size={22} />
        </div>
        <DataTable columns={columns} rows={products} />
      </section>
    </div>
  );
}
