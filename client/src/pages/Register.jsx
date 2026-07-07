import { HelpCircle, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import nexaLogo from "../assets/nexahome-logo.png";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", role: "Homeowner" });
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setInfo("");
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="auth-screen">
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-logo"><img src={nexaLogo} alt="NexaHome logo" /></div>
        <h1>Create Account</h1>
        <p>Admin role is assigned from the admin user management panel.</p>
        {error && <div className="alert error">{error}</div>}
        <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
        <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
        <label>Phone<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
        <label>Password<input type="password" minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
        <label>Role
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option>Homeowner</option>
            <option>Guest</option>
          </select>
        </label>
        {info && <div className="alert info">{info}</div>}
        <button
          type="button"
          className="link-button auth-help-button"
          onClick={() => setInfo("If this is your first NexaHome account, it becomes Admin automatically. Later users can be changed by Admin in User Management.")}
        >
          <HelpCircle size={16} /> Need help choosing role?
        </button>
        <button className="primary-btn" type="submit"><UserPlus size={18} /> Register</button>
        <div className="auth-support">
          <strong>Account setup</strong>
          <span>Use Homeowner for family members and Guest for temporary limited access.</span>
        </div>
        <span className="auth-link">Already registered? <Link to="/login">Login</Link></span>
      </form>
    </main>
  );
};

export default Register;
