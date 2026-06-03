import { useState } from "react";
import { Plus, UserCog, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import DataTable from "../components/DataTable";

const initialEmployees = [
  { name: "Марина Бойко", role: "Менеджер з продажів", department: "Відділ продажів", status: "Працює" },
  { name: "Олександр Дяченко", role: "Аналітик", department: "Фінансовий відділ", status: "Працює" },
  { name: "Ірина Савчук", role: "Адміністратор", department: "IT-відділ", status: "Працює" },
  { name: "Дмитро Коваль", role: "Логіст", department: "Склад", status: "Працює" },
  { name: "Вікторія Лисенко", role: "Бухгалтер", department: "Бухгалтерія", status: "Працює" },
  { name: "Андрій Мороз", role: "Комірник", department: "Склад", status: "Працює" },
  { name: "Сергій Павленко", role: "Оператор", department: "Відділ замовлень", status: "Працює" },
];

const columns = [
  { key: "name", label: "Працівник" },
  { key: "role", label: "Посада" },
  { key: "department", label: "Підрозділ" },
  { key: "status", label: "Статус" },
];

const positions = [
  "Адміністратор",
  "Керівник",
  "Менеджер з продажів",
  "Аналітик",
  "Логіст",
  "Бухгалтер",
  "Комірник",
  "Оператор",
  "HR-менеджер",
];

const departments = [
  "IT-відділ",
  "Відділ продажів",
  "Відділ замовлень",
  "Фінансовий відділ",
  "Бухгалтерія",
  "Склад",
  "Логістика",
  "Адміністрація",
  "Відділ персоналу",
];

const emptyEmployee = {
  name: "",
  role: "Менеджер з продажів",
  department: "Відділ продажів",
  status: "Працює",
};

export default function Employees() {
  const [rows, setRows] = useState(initialEmployees);
  const [form, setForm] = useState(emptyEmployee);
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
    setForm(emptyEmployee);
    if (isAddAction) {
      navigate("/employees", { replace: true });
    }
  }

  function addEmployee(event) {
    event.preventDefault();
    setRows((current) => [form, ...current]);
    closeModal();
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Працівники</h1>
          <p>Персонал підприємства та службові ролі</p>
        </div>
        <button className="primary-button" type="button" onClick={openModal}>
          <Plus size={18} />
          <span>Додати працівника</span>
        </button>
      </header>
      <section className="panel">
        <div className="panel-heading">
          <h2>Список працівників</h2>
          <UserCog size={22} />
        </div>
        <DataTable columns={columns} rows={rows} />
      </section>

      {isModalVisible ? (
        <div className="modal-backdrop" role="presentation">
          <section className="modal-card" aria-labelledby="employee-modal-title" role="dialog" aria-modal="true">
            <header className="modal-header">
              <div>
                <h2 id="employee-modal-title">Додати працівника</h2>
                <p>Адміністратор може призначити працівнику посаду та підрозділ.</p>
              </div>
              <button type="button" aria-label="Закрити форму" onClick={closeModal}>
                <X size={20} />
              </button>
            </header>

            <form className="product-form" onSubmit={addEmployee}>
              <label htmlFor="employee-name">
                Працівник
                <input id="employee-name" name="name" value={form.name} onChange={updateField} required placeholder="Ім'я та прізвище" />
              </label>

              <label htmlFor="employee-role">
                Посада
                <select id="employee-role" name="role" value={form.role} onChange={updateField}>
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="employee-department">
                Підрозділ
                <select id="employee-department" name="department" value={form.department} onChange={updateField}>
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="employee-status">
                Статус
                <select id="employee-status" name="status" value={form.status} onChange={updateField}>
                  <option value="Працює">Працює</option>
                  <option value="Відпустка">Відпустка</option>
                  <option value="Стажування">Стажування</option>
                </select>
              </label>

              <div className="modal-actions">
                <button className="secondary-button" type="button" onClick={closeModal}>
                  Скасувати
                </button>
                <button className="primary-button" type="submit">
                  Зберегти працівника
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </div>
  );
}
