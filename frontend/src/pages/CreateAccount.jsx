import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function CreateAccount() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    city: "",
    occupation: "",
    mobile: "",
    password: "",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signupData = { ...formData };
    if (formData.adminCode === "Admin9657") {
      signupData.role = "admin";
    }
    const result = await signup(signupData);
    if (result.success) {
      if (signupData.role === "admin") {
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
      <div className="w-full max-w-2xl p-8 md:p-12 rounded-3xl backdrop-blur-xl bg-white/40 dark:bg-neutral-900/40 border border-white/20 dark:border-white/10 shadow-2xl animate-fade-in-up">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-serif font-bold text-neutral-900 dark:text-white mb-2">Create Account</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Join our community of word enthusiasts</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-5 py-3 rounded-2xl bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 ml-1">Age</label>
            <input
              type="number"
              name="age"
              required
              value={formData.age}
              onChange={handleChange}
              placeholder="Your age"
              className="w-full px-5 py-3 rounded-2xl bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 ml-1">Gender</label>
            <select
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-2xl bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 appearance-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 ml-1">City</label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              placeholder="Your city"
              className="w-full px-5 py-3 rounded-2xl bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 ml-1">Occupation</label>
            <input
              type="text"
              name="occupation"
              required
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Your occupation"
              className="w-full px-5 py-3 rounded-2xl bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 ml-1">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile number"
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
              placeholder="Create password"
              className="w-full px-5 py-3 rounded-2xl bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 ml-1">Admin Code (Optional)</label>
            <input
              type="text"
              name="adminCode"
              value={formData.adminCode || ""}
              onChange={handleChange}
              placeholder="Enter code for admin access"
              className="w-full px-5 py-3 rounded-2xl bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
            />
          </div>

          <div className="col-span-1 md:col-span-2 pt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-neutral-600 dark:text-neutral-400">
            Already have an account?{" "}
            <Link to="/login" className="text-accent font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
