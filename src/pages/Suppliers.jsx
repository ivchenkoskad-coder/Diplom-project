import { useState } from "react";
import { Plus, Truck, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import DataTable from "../components/DataTable";

const initialSuppliers = [
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

const emptySupplier = {
  name: "",
  manager: "",
  phone: "",
  status: "Активний",
};

export default function Suppliers() {
  const [rows, setRows] = useState(initialSuppliers);
  const [form, setForm] = useState(emptySupplier);
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
    setForm(emptySupplier);
    if (isAddAction) {
      navigate("/suppliers", { replace: true });
    }
  }

  function addSupplier(event) {
    event.preventDefault();
    setRows((current) => [form, ...current]);
    closeModal();
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Постачальники</h1>
          <p>Договори, контакти та умови постачання</p>
        </div>
        <button className="primary-button" type="button" onClick={openModal}>
          <Plus size={18} />
          <span>Додати постачальника</span>
        </button>
      </header>
      <section className="panel">
        <div className="panel-heading">
          <h2>База постачальників</h2>
          <Truck size={22} />
        </div>
        <DataTable columns={columns} rows={rows} />
      </section>

      {isModalVisible ? (
        <div className="modal-backdrop" role="presentation">
          <section className="modal-card" aria-labelledby="supplier-modal-title" role="dialog" aria-modal="true">
            <header className="modal-header">
              <div>
                <h2 id="supplier-modal-title">Додати постачальника</h2>
                <p>Постачальник одразу з'явиться у базі.</p>
              </div>
              <button type="button" aria-label="Закрити форму" onClick={closeModal}>
                <X size={20} />
              </button>
            </header>

            <form className="product-form" onSubmit={addSupplier}>
              <label htmlFor="supplier-name">
                Постачальник
                <input id="supplier-name" name="name" value={form.name} onChange={updateField} required placeholder='ТОВ "Новий постачальник"' />
              </label>
              <label htmlFor="supplier-manager">
                Контактна особа
                <input id="supplier-manager" name="manager" value={form.manager} onChange={updateField} required placeholder="Ім'я менеджера" />
              </label>
              <label htmlFor="supplier-phone">
                Телефон
                <input id="supplier-phone" name="phone" value={form.phone} onChange={updateField} required placeholder="+380..." />
              </label>
              <label htmlFor="supplier-status">
                Статус
                <select id="supplier-status" name="status" value={form.status} onChange={updateField}>
                  <option value="Активний">Активний</option>
                  <option value="Перевірка">Перевірка</option>
                  <option value="Призупинено">Призупинено</option>
                </select>
              </label>
              <div className="modal-actions">
                <button className="secondary-button" type="button" onClick={closeModal}>
                  Скасувати
                </button>
                <button className="primary-button" type="submit">
                  Зберегти постачальника
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </div>
  );
}
