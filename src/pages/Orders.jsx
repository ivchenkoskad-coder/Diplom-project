import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock3,
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
  XCircle,
} from "lucide-react";

import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { orders, orderStats } from "../data/mockData";

const statIcons = {
  total: ClipboardList,
  done: CheckCircle2,
  processing: Clock3,
  cancelled: XCircle,
};

const emptyOrder = {
  number: "",
  client: "",
  date: "",
  amount: "",
  status: "В обробці",
};

const statusOptions = ["Виконано", "В обробці", "Очікує", "Скасовано"];
const statusFilterMap = {
  all: "",
  done: "Виконано",
  process: "В обробці",
  waiting: "Очікує",
  cancelled: "Скасовано",
};

export default function Orders() {
  const [rows, setRows] = useState(orders);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState("01.06.2024 - 30.06.2024");
  const [message, setMessage] = useState("Список замовлень готовий до роботи");
  const [modalMode, setModalMode] = useState(null);
  const [form, setForm] = useState(emptyOrder);
  const pageSize = 5;

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const status = statusFilterMap[statusFilter];

    return rows.filter((order) => {
      const matchesQuery =
        !normalizedQuery ||
        order.number.toLowerCase().includes(normalizedQuery) ||
        order.client.toLowerCase().includes(normalizedQuery);
      const matchesStatus = !status || order.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, rows, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function nextOrderNumber() {
    const maxNumber = rows.reduce((max, order) => {
      const value = Number(order.number.replace("#", ""));
      return Number.isNaN(value) ? max : Math.max(max, value);
    }, 10000);
    return `#${maxNumber + 1}`;
  }

  function openAddModal() {
    setForm({ ...emptyOrder, number: nextOrderNumber(), date: "08.06.2024" });
    setModalMode("add");
  }

  function openViewModal(order) {
    setForm(order);
    setModalMode("view");
  }

  function openEditModal(order) {
    setForm(order);
    setModalMode("edit");
  }

  function closeModal() {
    setModalMode(null);
    setForm(emptyOrder);
  }

  function saveOrder(event) {
    event.preventDefault();

    if (modalMode === "edit") {
      setRows((current) => current.map((order) => (order.number === form.number ? form : order)));
      setMessage(`Замовлення ${form.number} оновлено`);
    } else {
      setRows((current) => [form, ...current]);
      setMessage(`Замовлення ${form.number} додано`);
    }

    setPage(1);
    closeModal();
  }

  function deleteOrder(orderNumber) {
    setRows((current) => current.filter((order) => order.number !== orderNumber));
    setMessage(`Замовлення ${orderNumber} видалено`);
  }

  function changeDateRange() {
    setDateRange((current) =>
      current === "01.06.2024 - 30.06.2024" ? "01.07.2024 - 31.07.2024" : "01.06.2024 - 30.06.2024",
    );
    setMessage("Період замовлень змінено");
  }

  function changePage(nextPage) {
    setPage(Math.min(Math.max(nextPage, 1), pageCount));
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Управління замовленнями</h1>
      </header>

      <section className="stats-grid order-stats">
        {orderStats.map((stat) => (
          <StatCard key={stat.id} icon={statIcons[stat.id]} label={stat.label} value={stat.value} tone={stat.tone} />
        ))}
      </section>

      <div className="settings-status">
        <ClipboardList size={18} />
        <span>{message}</span>
      </div>

      <section className="panel orders-panel">
        <div className="panel-heading">
          <h2>Список замовлень</h2>
        </div>

        <div className="toolbar">
          <label className="search-control">
            <Search size={18} />
            <input
              placeholder="Пошук замовлення..."
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
            />
          </label>

          <select
            aria-label="Фільтр статусу"
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
          >
            <option value="all">Усі статуси</option>
            <option value="done">Виконано</option>
            <option value="process">В обробці</option>
            <option value="waiting">Очікує</option>
            <option value="cancelled">Скасовано</option>
          </select>

          <button className="date-filter" type="button" onClick={changeDateRange}>
            <span>{dateRange}</span>
            <CalendarDays size={18} />
          </button>

          <button className="primary-button" type="button" onClick={openAddModal}>
            <Plus size={18} />
            <span>Додати замовлення</span>
          </button>
        </div>

        <div className="table-wrap orders-table">
          <table className="data-table">
            <thead>
              <tr>
                <th>№ замовлення</th>
                <th>Клієнт</th>
                <th>Дата</th>
                <th>Сума</th>
                <th>Статус</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((order) => (
                <tr key={order.number}>
                  <td>{order.number}</td>
                  <td>{order.client}</td>
                  <td>{order.date}</td>
                  <td>{order.amount}</td>
                  <td>
                    <StatusBadge status={order.status} />
                  </td>
                  <td>
                    <div className="row-actions">
                      <button type="button" aria-label={`Переглянути замовлення ${order.number}`} onClick={() => openViewModal(order)}>
                        <Eye size={17} />
                      </button>
                      <button type="button" aria-label={`Редагувати замовлення ${order.number}`} onClick={() => openEditModal(order)}>
                        <Pencil size={16} />
                      </button>
                      <button type="button" aria-label={`Видалити замовлення ${order.number}`} onClick={() => deleteOrder(order.number)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-row">
          <span>
            Показано {visibleRows.length ? (currentPage - 1) * pageSize + 1 : 0}-
            {Math.min(currentPage * pageSize, filteredRows.length)} з {filteredRows.length}
          </span>
          <div className="pagination">
            <button type="button" aria-label="Попередня сторінка" onClick={() => changePage(currentPage - 1)}>
              <ChevronLeft size={17} />
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
              <button
                className={pageNumber === currentPage ? "active" : ""}
                key={pageNumber}
                type="button"
                onClick={() => changePage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button type="button" aria-label="Наступна сторінка" onClick={() => changePage(currentPage + 1)}>
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {modalMode ? (
        <div className="modal-backdrop" role="presentation">
          <section className="modal-card" aria-labelledby="order-modal-title" role="dialog" aria-modal="true">
            <header className="modal-header">
              <div>
                <h2 id="order-modal-title">
                  {modalMode === "add" ? "Додати замовлення" : modalMode === "edit" ? "Редагувати замовлення" : "Перегляд замовлення"}
                </h2>
                <p>{form.number}</p>
              </div>
              <button type="button" aria-label="Закрити форму" onClick={closeModal}>
                <X size={20} />
              </button>
            </header>

            <form className="product-form" onSubmit={saveOrder}>
              <label htmlFor="order-number">
                № замовлення
                <input id="order-number" disabled name="number" value={form.number} onChange={updateField} />
              </label>
              <label htmlFor="order-client">
                Клієнт
                <input id="order-client" disabled={modalMode === "view"} name="client" value={form.client} onChange={updateField} required />
              </label>
              <label htmlFor="order-date">
                Дата
                <input id="order-date" disabled={modalMode === "view"} name="date" value={form.date} onChange={updateField} required />
              </label>
              <label htmlFor="order-amount">
                Сума
                <input id="order-amount" disabled={modalMode === "view"} name="amount" value={form.amount} onChange={updateField} required />
              </label>
              <label htmlFor="order-status">
                Статус
                <select id="order-status" disabled={modalMode === "view"} name="status" value={form.status} onChange={updateField}>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <div className="modal-actions">
                <button className="secondary-button" type="button" onClick={closeModal}>
                  {modalMode === "view" ? "Закрити" : "Скасувати"}
                </button>
                {modalMode !== "view" ? (
                  <button className="primary-button" type="submit">
                    Зберегти замовлення
                  </button>
                ) : null}
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </div>
  );
}
