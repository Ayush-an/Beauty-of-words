import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function AdminQuestionInsights() {
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
        <p className="text-neutral-500 animate-pulse">Deep diving into data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-bold text-neutral-900 dark:text-white mb-4">Question Insights</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Detailed distribution of responses for every question and option.</p>
        </div>
        <Link to="/admin-dashboard" className="text-accent hover:underline font-bold">← Back to Dashboard</Link>
      </div>

      <div className="space-y-12">
        {summary && Object.keys(summary.questionStats).map(category => (
          <div key={category} className="mb-12 p-8 rounded-[40px] bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-100 dark:border-neutral-800">
            <h3 className={`text-2xl font-serif font-bold mb-8 flex items-center`}>
              <span className={`w-4 h-4 rounded-full mr-4 ${
                category === 'Healing' ? 'bg-orange-500' : category === 'Comfort' ? 'bg-blue-500' : 'bg-green-500'
              }`}></span>
              {category} Statistics
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.keys(summary.questionStats[category]).map((question, qIdx) => {
                const options = summary.questionStats[category][question];
                const totalQ = Object.values(options).reduce((a, b) => a + b, 0);
                
                return (
                  <div key={qIdx} className="p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <p className="text-md font-semibold mb-6 text-neutral-800 dark:text-neutral-100 leading-tight">{question}</p>
                    <div className="space-y-4">
                      {Object.keys(options).map(opt => {
                        const percentage = totalQ > 0 ? Math.round((options[opt] / totalQ) * 100) : 0;
                        return (
                          <div key={opt}>
                            <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-2 text-neutral-500">
                              <span>{opt}</span>
                              <span className="text-neutral-900 dark:text-white">{percentage}%</span>
                            </div>
                            <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                  category === 'Healing' ? 'bg-orange-400' : category === 'Comfort' ? 'bg-blue-400' : 'bg-green-400'
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminQuestionInsights;
