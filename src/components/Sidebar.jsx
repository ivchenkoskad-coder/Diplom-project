import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "250px",
        background: "#1f2937",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>Enterprise System</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/users">Users</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </aside>
  );
}