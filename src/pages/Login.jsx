import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.mobile, formData.password);
    
    if (result.success) {
      if (result.role === 'admin') {
        navigate("/admin-dashboard");
      } else {
        navigate("/explore");
      }
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center items-center px-4 bg-brand-light dark:bg-brand-dark">
      <div className="w-full max-w-md p-8 rounded-3xl backdrop-blur-xl bg-white/40 dark:bg-neutral-900/40 border border-white/20 dark:border-white/10 shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-neutral-900 dark:text-white">Welcome Back</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 ml-1">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full px-5 py-3 rounded-2xl bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 ml-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-5 py-3 rounded-2xl bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
          >
            Login
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-neutral-600 dark:text-neutral-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-accent font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
