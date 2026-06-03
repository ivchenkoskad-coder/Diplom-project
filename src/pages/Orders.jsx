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

export default function Orders() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Управління замовленнями</h1>
      </header>

      <section className="stats-grid order-stats">
        {orderStats.map((stat) => (
          <StatCard
            key={stat.id}
            icon={statIcons[stat.id]}
            label={stat.label}
            value={stat.value}
            tone={stat.tone}
          />
        ))}
      </section>

      <section className="panel orders-panel">
        <div className="panel-heading">
          <h2>Список замовлень</h2>
        </div>

        <div className="toolbar">
          <label className="search-control">
            <Search size={18} />
            <input placeholder="Пошук замовлення..." />
          </label>

          <select aria-label="Фільтр статусу" defaultValue="all">
            <option value="all">Усі статуси</option>
            <option value="done">Виконано</option>
            <option value="process">В обробці</option>
            <option value="waiting">Очікує</option>
            <option value="cancelled">Скасовано</option>
          </select>

          <button className="date-filter" type="button">
            <span>01.06.2024 - 30.06.2024</span>
            <CalendarDays size={18} />
          </button>

          <button className="primary-button" type="button">
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
              {orders.map((order) => (
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
                      <button type="button" aria-label="Переглянути замовлення">
                        <Eye size={17} />
                      </button>
                      <button type="button" aria-label="Редагувати замовлення">
                        <Pencil size={16} />
                      </button>
                      <button type="button" aria-label="Видалити замовлення">
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
          <span>Показано 1-10 з 320</span>
          <div className="pagination">
            <button type="button" aria-label="Попередня сторінка">
              <ChevronLeft size={17} />
            </button>
            <button className="active" type="button">
              1
            </button>
            <button type="button">2</button>
            <button type="button">3</button>
            <button type="button">...</button>
            <button type="button">32</button>
            <button type="button" aria-label="Наступна сторінка">
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
