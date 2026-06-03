import { useState } from "react";
import { Plus, Tags, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import DataTable from "../components/DataTable";

const initialCategories = [
  { name: "Електроніка", products: 435, status: "Активна" },
  { name: "Побутова техніка", products: 310, status: "Активна" },
  { name: "Офісна техніка", products: 250, status: "Активна" },
  { name: "Аксесуари", products: 255, status: "Активна" },
  { name: "Комп'ютери та ноутбуки", products: 168, status: "Активна" },
  { name: "Мобільні пристрої", products: 142, status: "Активна" },
  { name: "Мережеве обладнання", products: 86, status: "Активна" },
  { name: "Програмне забезпечення", products: 54, status: "Активна" },
  { name: "Витратні матеріали", products: 214, status: "Активна" },
  { name: "Меблі для офісу", products: 73, status: "Активна" },
  { name: "Системи безпеки", products: 49, status: "Активна" },
  { name: "Складське обладнання", products: 62, status: "Активна" },
];

const columns = [
  { key: "name", label: "Категорія" },
  { key: "products", label: "Кількість товарів" },
  { key: "status", label: "Статус" },
];

const emptyCategory = {
  name: "",
  products: "",
  status: "Активна",
};

export default function Categories() {
  const [rows, setRows] = useState(initialCategories);
  const [form, setForm] = useState(emptyCategory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isAddAction = searchParams.get("action") === "add";
  const isModalVisible = isModalOpen || isAddAction;

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setForm(emptyCategory);
    if (isAddAction) {
      navigate("/categories", { replace: true });
    }
  }

  function addCategory(event) {
    event.preventDefault();
    setRows((current) => [{ ...form, products: Number(form.products) }, ...current]);
    closeModal();
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Категорії</h1>
          <p>Структура товарного каталогу</p>
        </div>
        <button className="primary-button" type="button" onClick={openModal}>
          <Plus size={18} />
          <span>Додати категорію</span>
        </button>
      </header>
      <section className="panel">
        <div className="panel-heading">
          <h2>Категорії товарів</h2>
          <Tags size={22} />
        </div>
        <DataTable columns={columns} rows={rows} />
      </section>

      {isModalVisible ? (
        <div className="modal-backdrop" role="presentation">
          <section className="modal-card" aria-labelledby="category-modal-title" role="dialog" aria-modal="true">
            <header className="modal-header">
              <div>
                <h2 id="category-modal-title">Додати категорію</h2>
                <p>Нова категорія одразу з'явиться у структурі каталогу.</p>
              </div>
              <button type="button" aria-label="Закрити форму" onClick={closeModal}>
                <X size={20} />
              </button>
            </header>

            <form className="product-form" onSubmit={addCategory}>
              <label htmlFor="category-name">
                Назва категорії
                <input id="category-name" name="name" value={form.name} onChange={updateField} required placeholder="Наприклад, Периферія" />
              </label>

              <label htmlFor="category-products">
                Кількість товарів
                <input id="category-products" name="products" type="number" min="0" value={form.products} onChange={updateField} required placeholder="0" />
              </label>

              <label htmlFor="category-status">
                Статус
                <select id="category-status" name="status" value={form.status} onChange={updateField}>
                  <option value="Активна">Активна</option>
                  <option value="Архівна">Архівна</option>
                  <option value="На перевірці">На перевірці</option>
                </select>
              </label>

              <div className="modal-actions">
                <button className="secondary-button" type="button" onClick={closeModal}>
                  Скасувати
                </button>
                <button className="primary-button" type="submit">
                  Зберегти категорію
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </div>
  );
}
