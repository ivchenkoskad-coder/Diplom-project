import { Building2, Eye, LockKeyhole, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main className="login-screen">
      <section className="login-card" aria-labelledby="login-title">
        <Building2 className="login-logo" size={70} />

        <h1 id="login-title">Вхід у систему</h1>
        <p>Будь ласка, увійдіть у свій обліковий запис</p>

        <form className="login-form">
          <label htmlFor="login">Логін</label>
          <div className="input-control">
            <UserRound size={19} />
            <input id="login" type="text" placeholder="Введіть логін" />
          </div>

          <label htmlFor="password">Пароль</label>
          <div className="input-control">
            <LockKeyhole size={18} />
            <input id="password" type="password" placeholder="Введіть пароль" />
            <button type="button" aria-label="Показати пароль">
              <Eye size={19} />
            </button>
          </div>

          <Link className="primary-action" to="/dashboard">
            Увійти
          </Link>

          <div className="login-options">
            <label className="check-line">
              <input type="checkbox" />
              <span>Запам'ятати мене</span>
            </label>
            <a href="/login">Забули пароль?</a>
          </div>
        </form>

        <footer>© 2024 Автоматизована система управління підприємством</footer>
      </section>
    </main>
  );
}
