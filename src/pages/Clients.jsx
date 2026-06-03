import { useState } from "react";
import { Plus, UsersRound, X } from "lucide-react";

import DataTable from "../components/DataTable";
import { clients } from "../data/mockData";

const columns = [
  { key: "name", label: "Клієнт" },
  { key: "contact", label: "Контакт" },
  { key: "orders", label: "Замовлень" },
  { key: "segment", label: "Сегмент" },
];

const emptyClient = {
  name: "",
  contact: "",
  orders: 0,
  segment: "Роздрібний",
};

export default function Clients() {
  const [rows, setRows] = useState(clients);
  const [form, setForm] = useState(emptyClient);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: name === "orders" ? Number(value) : value }));
  }

  function closeModal() {
    setIsModalOpen(false);
    setForm(emptyClient);
  }

  function addClient(event) {
    event.preventDefault();
    setRows((current) => [form, ...current]);
    closeModal();
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Клієнти</h1>
          <p>Клієнтська база та історія взаємодії</p>
        </div>
        <button className="primary-button" type="button" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>Додати клієнта</span>
        </button>
      </header>

      <section className="panel">
        <div className="panel-heading">
          <h2>Список клієнтів</h2>
          <UsersRound size={22} />
        </div>
        <DataTable columns={columns} rows={rows} />
      </section>

      {isModalOpen ? (
        <div className="modal-backdrop" role="presentation">
          <section className="modal-card" aria-labelledby="client-modal-title" role="dialog" aria-modal="true">
            <header className="modal-header">
              <div>
                <h2 id="client-modal-title">Додати клієнта</h2>
                <p>Новий клієнт буде доданий до клієнтської бази.</p>
              </div>
              <button type="button" aria-label="Закрити форму" onClick={closeModal}>
                <X size={20} />
              </button>
            </header>
            <form className="product-form" onSubmit={addClient}>
              <label htmlFor="client-name">
                Клієнт
                <input id="client-name" name="name" value={form.name} onChange={updateField} required placeholder='ТОВ "Клієнт"' />
              </label>
              <label htmlFor="client-contact">
                Контакт
                <input id="client-contact" name="contact" value={form.contact} onChange={updateField} required placeholder="client@example.com" />
              </label>
              <label htmlFor="client-orders">
                Замовлень
                <input id="client-orders" min="0" name="orders" type="number" value={form.orders} onChange={updateField} />
              </label>
              <label htmlFor="client-segment">
                Сегмент
                <select id="client-segment" name="segment" value={form.segment} onChange={updateField}>
                  <option value="Роздрібний">Роздрібний</option>
                  <option value="Корпоративний">Корпоративний</option>
                  <option value="Партнер">Партнер</option>
                </select>
              </label>
              <div className="modal-actions">
                <button className="secondary-button" type="button" onClick={closeModal}>
                  Скасувати
                </button>
                <button className="primary-button" type="submit">
                  Зберегти клієнта
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </div>
  );
}
