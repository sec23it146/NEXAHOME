import { HelpCircle, KeyRound, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import nexaLogo from "../assets/nexahome-logo.png";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "admin@smarthome.com", password: "Admin123" });
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setInfo("");
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="auth-screen">
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-logo"><img src={nexaLogo} alt="NexaHome logo" /></div>
        <h1>NexaHome</h1>
        <p>Sign in to control devices, rules, alerts, and activity.</p>
        {error && <div className="alert error">{error}</div>}
        <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
        {info && <div className="alert info">{info}</div>}
        <div className="auth-actions">
          <button
            type="button"
            className="link-button"
            onClick={() => setInfo("Password reset is handled by the Admin from User Management. Contact your NexaHome admin to reset your password.")}
          >
            <KeyRound size={16} /> Forgot password?
          </button>
          <button
            type="button"
            className="link-button"
            onClick={() => setInfo("Need help? Check backend health, internet connection, or contact the house Admin for account access.")}
          >
            <HelpCircle size={16} /> Help
          </button>
        </div>
        <button className="primary-btn" type="submit"><LogIn size={18} /> Login</button>
        <div className="auth-support">
          <strong>New to NexaHome?</strong>
          <span>Create your house account or ask the Admin to invite you.</span>
        </div>
        <span className="auth-link">New user? <Link to="/register">Create account</Link></span>
      </form>
    </main>
  );
};

export default Login;
