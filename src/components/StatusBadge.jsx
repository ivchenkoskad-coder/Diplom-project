const statusMap = {
  Виконано: "success",
  "В обробці": "info",
  Очікує: "warning",
  Скасовано: "danger",
};

export default function StatusBadge({ status }) {
  return <span className={`status-badge ${statusMap[status] ?? "info"}`}>{status}</span>;
}
