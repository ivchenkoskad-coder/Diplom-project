import { BarChart3, Download, FileSpreadsheet, PieChart } from "lucide-react";

const reports = [
  { title: "Продажі за місяць", text: "Фінансові показники, динаміка доходу та кількість замовлень.", icon: BarChart3 },
  { title: "Залишки товарів", text: "Поточний стан складу, дефіцитні позиції та оборотність.", icon: FileSpreadsheet },
  { title: "Категорії продажів", text: "Порівняння продажів за основними товарними групами.", icon: PieChart },
];

export default function Reports() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Звіти</h1>
          <p>Аналітика діяльності підприємства</p>
        </div>
        <button className="primary-button" type="button">
          <Download size={18} />
          <span>Експорт даних</span>
        </button>
      </header>

      <section className="report-grid">
        {reports.map(({ title, text, icon: Icon }) => (
          <article className="panel report-card" key={title}>
            <Icon size={30} />
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
