import { useState, useEffect } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

function AdminResponses() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const { data } = await api.get('/explore/admin/responses');
        setResponses(data);
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-bold text-neutral-900 dark:text-white mb-4">Detailed Responses</h1>
          <p className="text-neutral-600 dark:text-neutral-400">View every thought shared by your users.</p>
        </div>
        <Link to="/admin-dashboard" className="text-accent hover:underline font-bold">← Back to Dashboard</Link>
      </div>

      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-neutral-500 text-xs font-bold uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Question</th>
                <th className="px-6 py-4">User Response</th>
                <th className="px-6 py-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center text-neutral-400 italic">
                    Loading responses...
                  </td>
                </tr>
              ) : responses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center text-neutral-400 italic">
                    No responses captured yet.
                  </td>
                </tr>
              ) : (
                responses.slice().reverse().map((res) => (
                  <tr key={res._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono text-neutral-400">#{res._id.toString().slice(-4)}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-neutral-900 dark:text-white">
                      {res.user?.name || 'Guest User'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                        res.category === 'Healing' ? 'bg-orange-100 text-orange-600' :
                        res.category === 'Comfort' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {res.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300 max-w-xs truncate">
                      {res.question}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-neutral-900 dark:text-white">
                      {res.answer}
                    </td>
                    <td className="px-6 py-4 text-xs text-neutral-500">
                      {new Date(res.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminResponses;
