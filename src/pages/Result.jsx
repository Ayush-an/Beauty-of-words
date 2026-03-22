import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

function Result() {
  const { category } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get(`/explore/stats/${category}`);
        setData(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex justify-center items-center">
        <p className="text-neutral-500 animate-pulse">Analyzing your path...</p>
      </div>
    );
  }

  if (!data || !data.stats) {
    return (
      <div className="min-h-screen pt-28 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">No data found</h2>
        <Link to="/explore" className="text-accent underline">Back to Explore</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
          Discovery Complete
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-white mb-4">
          Your {category} Journey
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          See how your reflections compare with 30+ other explorers.
        </p>
      </div>

      <div className="space-y-8">
        {Object.keys(data.stats).map((questionText, idx) => {
          const options = data.stats[questionText];
          const userChoice = data.userResponse?.answer; // This is a bit simplified, but works for the latest response
          
          return (
            <div key={idx} className="p-8 rounded-3xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-100 dark:border-neutral-800 animate-fade-in-up" 
                 style={{ animationDelay: `${idx * 100}ms` }}>
              <h3 className="text-xl font-serif font-bold mb-6 text-neutral-800 dark:text-neutral-200">
                {questionText}
              </h3>
              
              <div className="space-y-4">
                {Object.keys(options).map((opt) => (
                  <div key={opt} className="relative">
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span className={`font-medium ${opt === userChoice ? 'text-accent font-bold' : 'text-neutral-600 dark:text-neutral-400'}`}>
                        {opt} {opt === userChoice && <span className="ml-2 text-[10px] bg-accent/10 px-2 py-0.5 rounded-full">Your Choice</span>}
                      </span>
                      <span className="font-bold">{options[opt]}%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ease-out rounded-full ${opt === userChoice ? 'bg-accent' : 'bg-neutral-300 dark:bg-neutral-700'}`}
                        style={{ width: `${options[opt]}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <Link to="/explore" className="px-10 py-4 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold shadow-xl hover:scale-105 transition-transform">
          Explore Another Category
        </Link>
      </div>
    </div>
  );
}

export default Result;
