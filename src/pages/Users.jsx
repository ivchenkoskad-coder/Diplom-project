import { useState } from "react";
import { ShieldCheck, UserPlus, X } from "lucide-react";

import DataTable from "../components/DataTable";

const initialUsers = [
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

const roleAccess = {
  Адміністратор: "Повний доступ",
  Менеджер: "Продажі та замовлення",
  Керівник: "Звіти та аналітика",
  Комірник: "Товари та склад",
};

const emptyUser = {
  name: "",
  role: "Менеджер",
  status: "Активний",
};

export default function Users() {
  const [rows, setRows] = useState(initialUsers);
  const [form, setForm] = useState(emptyUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function closeModal() {
    setIsModalOpen(false);
    setForm(emptyUser);
  }

  function addUser(event) {
    event.preventDefault();
    setRows((current) => [{ ...form, access: roleAccess[form.role] }, ...current]);
    closeModal();
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Користувачі</h1>
          <p>Ролі, права доступу та облікові записи</p>
        </div>
        <button className="primary-button" type="button" onClick={() => setIsModalOpen(true)}>
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

      {isModalOpen ? (
        <div className="modal-backdrop" role="presentation">
          <section className="modal-card" aria-labelledby="user-modal-title" role="dialog" aria-modal="true">
            <header className="modal-header">
              <div>
                <h2 id="user-modal-title">Додати користувача</h2>
                <p>Права доступу визначаються обраною роллю.</p>
              </div>
              <button type="button" aria-label="Закрити форму" onClick={closeModal}>
                <X size={20} />
              </button>
            </header>
            <form className="product-form" onSubmit={addUser}>
              <label htmlFor="user-login">
                Логін
                <input id="user-login" name="name" value={form.name} onChange={updateField} required placeholder="new_user" />
              </label>
              <label htmlFor="user-role">
                Роль
                <select id="user-role" name="role" value={form.role} onChange={updateField}>
                  {Object.keys(roleAccess).map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="user-status">
                Статус
                <select id="user-status" name="status" value={form.status} onChange={updateField}>
                  <option value="Активний">Активний</option>
                  <option value="Заблокований">Заблокований</option>
                </select>
              </label>
              <div className="modal-actions">
                <button className="secondary-button" type="button" onClick={closeModal}>
                  Скасувати
                </button>
                <button className="primary-button" type="submit">
                  Зберегти користувача
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </div>
  );
}
