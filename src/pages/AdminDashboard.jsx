import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts';

function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await api.get('/explore/admin/summary');
        setSummary(data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex justify-center items-center">
        <p className="text-neutral-500 animate-pulse">Gathering insights...</p>
      </div>
    );
  }

  const categoryData = summary ? Object.keys(summary.categoryCounts).map(cat => ({
    name: cat,
    value: summary.categoryCounts[cat]
  })) : [];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981'];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-neutral-900 dark:text-white mb-4">Analytics Overview</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Deep dive into user responses and category distributions.</p>
        </div>
        <Link to="/admin/responses" className="px-6 py-3 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold shadow-lg hover:scale-105 transition-transform">
          View Raw Responses Table
        </Link>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-100 dark:border-neutral-800 text-center">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2 block">Total Users</span>
          <p className="text-5xl font-bold text-neutral-900 dark:text-white">{summary?.totalUsers || 0}</p>
        </div>
        <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-100 dark:border-neutral-800 text-center">
          <span className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-2 block">Total Responses</span>
          <p className="text-5xl font-bold text-neutral-900 dark:text-white">{summary?.totalResponses || 0}</p>
        </div>
        <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-100 dark:border-neutral-800 text-center">
          <span className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2 block">Total Questions</span>
          <p className="text-5xl font-bold text-neutral-900 dark:text-white">{summary?.totalQuestions || 0}</p>
        </div>
        <div className="p-8 rounded-3xl bg-linear-to-br from-accent/20 to-purple-500/20 shadow-xl border border-accent/10 flex flex-col justify-center items-center text-center">
          <span className="text-xs font-bold text-accent uppercase tracking-widest mb-2 block">Data Analytics</span>
          <p className="text-sm font-medium italic text-neutral-600 dark:text-neutral-400">Real-time insights across 3 categories.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Bar Chart */}
        <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-100 dark:border-neutral-800">
          <h2 className="text-xl font-bold mb-8">Category Popularity (Bar)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-100 dark:border-neutral-800">
          <h2 className="text-xl font-bold mb-8">Category Distribution (Pie)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Link to Detailed Insights */}
      <div className="p-12 rounded-[40px] bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-2xl flex flex-col items-center text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">Masterpiece Analysis</h2>
        <p className="max-w-xl text-neutral-400 dark:text-neutral-500 mb-8 font-medium">
          Explore the profound connection between words and human experience with our question-by-question statistical breakdown.
        </p>
        <Link to="/admin/question-insights" className="px-10 py-4 rounded-full bg-accent text-white font-bold hover:scale-105 transition-transform shadow-xl">
          Deep Dive into Insights
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
