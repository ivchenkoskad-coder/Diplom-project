import { useState } from "react";
import { PackagePlus, Plus, X } from "lucide-react";

import DataTable from "../components/DataTable";
import { products } from "../data/mockData";

const columns = [
  { key: "name", label: "Назва товару" },
  { key: "sku", label: "Артикул" },
  { key: "category", label: "Категорія" },
  { key: "stock", label: "Залишок" },
  { key: "price", label: "Ціна" },
];

const emptyProduct = {
  name: "",
  sku: "",
  category: "",
  stock: "",
  price: "",
};

export default function Products() {
  const [productRows, setProductRows] = useState(products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyProduct);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function closeModal() {
    setIsModalOpen(false);
    setForm(emptyProduct);
  }

  function addProduct(event) {
    event.preventDefault();
    setProductRows((current) => [
      {
        ...form,
        stock: Number(form.stock),
        price: form.price.includes("₴") ? form.price : `${form.price} ₴`,
      },
      ...current,
    ]);
    closeModal();
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Товари</h1>
          <p>Облік товарів, залишків і цін підприємства</p>
        </div>
        <button className="primary-button" type="button" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>Додати товар</span>
        </button>
      </header>

      <section className="panel">
        <div className="panel-heading">
          <h2>Каталог товарів</h2>
          <PackagePlus size={22} />
        </div>
        <DataTable columns={columns} rows={productRows} />
      </section>

      {isModalOpen ? (
        <div className="modal-backdrop" role="presentation">
          <section className="modal-card" aria-labelledby="product-modal-title" role="dialog" aria-modal="true">
            <header className="modal-header">
              <div>
                <h2 id="product-modal-title">Додати товар</h2>
                <p>Заповніть дані нового товару для каталогу.</p>
              </div>
              <button type="button" aria-label="Закрити форму" onClick={closeModal}>
                <X size={20} />
              </button>
            </header>

            <form className="product-form" onSubmit={addProduct}>
              <label>
                Назва товару
                <input name="name" value={form.name} onChange={updateField} required placeholder="Наприклад, Ноутбук Acer" />
              </label>

              <label>
                Артикул
                <input name="sku" value={form.sku} onChange={updateField} required placeholder="NB-1200" />
              </label>

              <label>
                Категорія
                <input name="category" value={form.category} onChange={updateField} required placeholder="Електроніка" />
              </label>

              <label>
                Залишок
                <input name="stock" type="number" min="0" value={form.stock} onChange={updateField} required placeholder="25" />
              </label>

              <label>
                Ціна
                <input name="price" value={form.price} onChange={updateField} required placeholder="15 000" />
              </label>

              <div className="modal-actions">
                <button className="secondary-button" type="button" onClick={closeModal}>
                  Скасувати
                </button>
                <button className="primary-button" type="submit">
                  Зберегти товар
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </div>
  );
}
