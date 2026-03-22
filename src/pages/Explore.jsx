import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import WordCard from "../components/WordCard";
import api from "../api/api";

function Explore() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = [
    {
      id: "Healing",
      title: "Healing",
      meaning: "These words validate pain, encourage forgiveness, and help process grief. They are empathetic and compassionate, providing a 'soft place to land'."
    },
    {
      id: "Comfort",
      title: "Comfort",
      meaning: "These words provide reassurance that one is not alone and that their struggle is recognized. They act as a safe harbor during a storm."
    },
    {
      id: "Motivation",
      title: "Motivation",
      meaning: "These words ignite passion, remind individuals of their resilience, and encourage them to move forward."
    }
  ];

  const fetchQuestions = async (category) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/questions/${category}`);
      setQuestions(data);
      setSelectedCategory(category);
      setCurrentQuestionIdx(0);
      setSubmitted(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to load questions for this category.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = async (option) => {
    const question = questions[currentQuestionIdx];

    try {
      await api.post('/explore/response', {
        category: selectedCategory,
        question: question.text,
        answer: option
      });

      if (currentQuestionIdx < questions.length - 1) {
        setCurrentQuestionIdx(currentQuestionIdx + 1);
      } else {
        setSubmitted(true);
        setTimeout(() => {
          navigate(`/result/${selectedCategory}`);
        }, 1500);
      }
    } catch (error) {
      console.error("Error saving response:", error);
      alert("Failed to save response. Please try again.");
    }
  };

  const resetExplore = () => {
    setSelectedCategory(null);
    setQuestions([]);
    setCurrentQuestionIdx(0);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {!selectedCategory ? (
        <>
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-white">
              Explore the Unspoken
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
              A collection of meanings, thoughts, and profound words that capture the human experience.
            </p>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-semibold mb-8 text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-800 pb-2">
              Beautiful Concepts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => fetchQuestions(cat.id)}
                  className="h-full"
                >
                  <WordCard
                    title={cat.title}
                    meaning={cat.meaning}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-2xl mx-auto pt-10">
          {!isLoggedIn ? (
            <div className="text-center p-12 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border-2 border-dashed border-neutral-200 dark:border-neutral-800 animate-pulse">
              <div className="text-4xl mb-6">🔒</div>
              <h2 className="text-2xl font-bold mb-4">Deep Insights Locked</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                To explore {selectedCategory} questions and get personalized responses, please create an account or login.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/login" className="px-6 py-3 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold">
                  Login
                </Link>
                <Link to="/signup" className="px-6 py-3 rounded-full border border-neutral-200 font-bold">
                  Sign Up
                </Link>
              </div>
              <button onClick={resetExplore} className="mt-8 text-sm text-neutral-500 hover:underline">
                Back to Categories
              </button>
            </div>
          ) : (
            <div className="p-10 rounded-3xl backdrop-blur-xl bg-white/60 dark:bg-neutral-900/60 border border-white/20 shadow-2xl animate-fade-in-up">
              {loading ? (
                <div className="text-center py-10">
                  <p className="text-neutral-500">Loading your path...</p>
                </div>
              ) : questions.length === 0 ? (
                <div className="text-center py-8">
                  <h2 className="text-2xl font-serif font-bold mb-4">No questions yet</h2>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                    Our curators are still working on the {selectedCategory} path.
                  </p>
                  <button onClick={resetExplore} className="px-8 py-3 rounded-full bg-accent text-white font-bold">
                    Go Back
                  </button>
                </div>
              ) : submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-6">🙏</div>
                  <h2 className="text-3xl font-serif font-bold mb-4">Response Captured</h2>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                    Thank you for sharing your thoughts. Your responses are being used to curate a special word collection for you.
                  </p>
                  <button
                    onClick={resetExplore}
                    className="px-8 py-3 rounded-full bg-accent text-white font-bold hover:opacity-90 transition-all"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-xs font-bold text-accent uppercase tracking-widest">Step {currentQuestionIdx + 1} of {questions.length}</span>
                    <button onClick={resetExplore} className="text-neutral-400 hover:text-neutral-600">✕</button>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900 dark:text-white mb-10 leading-tight">
                    {questions[currentQuestionIdx].text}
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {questions[currentQuestionIdx].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className="w-full p-5 text-left rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-accent hover:bg-accent/5 transition-all group relative overflow-hidden"
                      >
                        <span className="relative z-10 font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-accent transition-colors">
                          {option}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Explore;