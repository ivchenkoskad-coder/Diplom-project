import {
  BriefcaseBusiness,
  CircleDollarSign,
  PackageOpen,
  ShoppingCart,
  UsersRound,
} from "lucide-react";
import { useState } from "react";

import DataTable from "../components/DataTable";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import {
  categorySales,
  dashboardStats,
  orders,
  salesPoints,
  topProducts,
} from "../data/mockData";

const statIcons = {
  products: BriefcaseBusiness,
  orders: ShoppingCart,
  clients: UsersRound,
  income: CircleDollarSign,
};

const recentOrderColumns = [
  { key: "number", label: "№ замовлення" },
  { key: "client", label: "Клієнт" },
  { key: "date", label: "Дата" },
  { key: "amount", label: "Сума" },
  { key: "status", label: "Статус", render: (row) => <StatusBadge status={row.status} /> },
];

const topProductColumns = [
  { key: "product", label: "Товар" },
  { key: "sold", label: "Продано" },
];

function SalesChart() {
  const maxValue = 200000;
  const points = salesPoints.map((point, index) => {
    const x = 62 + index * 74;
    const y = 210 - (point.value / maxValue) * 170;
    return { ...point, x, y };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `62,210 ${line} ${points[points.length - 1].x},210`;

  return (
    <div className="chart-shell">
      <svg viewBox="0 0 500 258" role="img" aria-label="Динаміка продажів за шість місяців">
        {[0, 50000, 100000, 150000, 200000].map((value) => {
          const y = 210 - (value / maxValue) * 170;
          return (
            <g key={value}>
              <line className="grid-line" x1="62" x2="464" y1={y} y2={y} />
              <text className="axis-label" x="18" y={y + 4}>
                {value.toLocaleString("uk-UA")}
              </text>
            </g>
          );
        })}

        {points.map((point) => (
          <text className="axis-label" key={point.month} x={point.x - 10} y="236">
            {point.month}
          </text>
        ))}

        <polygon className="area-fill" points={area} />
        <polyline className="chart-line" points={line} />
        {points.map((point) => (
          <circle className="chart-dot" key={point.month} cx={point.x} cy={point.y} r="5" />
        ))}
      </svg>
    </div>
  );
}

function CategoryDonut() {
  return (
    <div className="donut-layout">
      <div className="donut" aria-hidden="true" />
      <ul className="legend-list">
        {categorySales.map((item) => (
          <li key={item.label}>
            <span style={{ backgroundColor: item.color }} />
            <strong>
              {item.label} ({item.value})
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Dashboard() {
  const [period, setPeriod] = useState("За 6 місяців");
  const periods = ["За 6 місяців", "За рік", "За місяць"];

  function changePeriod() {
    const currentIndex = periods.indexOf(period);
    setPeriod(periods[(currentIndex + 1) % periods.length]);
  }

  return (
    <div className="page dashboard-page">
      <section className="stats-grid">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.id}
            icon={statIcons[stat.id] ?? PackageOpen}
            label={stat.label}
            value={stat.value}
            hint={stat.hint}
            tone={stat.tone}
          />
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="panel large-panel">
          <div className="panel-heading">
            <h2>Динаміка продажів</h2>
            <button className="select-button" type="button" onClick={changePeriod}>
              {period}
            </button>
          </div>
          <SalesChart />
        </article>

        <article className="panel">
          <div className="panel-heading">
            <h2>Продажі за категоріями</h2>
          </div>
          <CategoryDonut />
        </article>

        <article className="panel">
          <div className="panel-heading">
            <h2>Останні замовлення</h2>
          </div>
          <DataTable columns={recentOrderColumns} rows={orders.slice(0, 5)} />
          <a className="panel-link" href="/orders">
            Переглянути всі замовлення →
          </a>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <h2>Найпопулярніші товари</h2>
          </div>
          <DataTable columns={topProductColumns} rows={topProducts} />
          <a className="panel-link" href="/products">
            Переглянути всі товари →
          </a>
        </article>
      </section>
    </div>
  );
}
