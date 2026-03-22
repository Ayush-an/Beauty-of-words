import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import api from "../api/api";

function Create() {
  const { isLoggedIn, userRole } = useAuth();
  const [loading, setLoading] = useState(false);

  const [questionData, setQuestionData] = useState({
    category: "Healing",
    text: "",
    options: ["", "", "", ""]
  });

  if (!isLoggedIn || userRole !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleQuestionChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...questionData.options];
    newOptions[index] = value;
    setQuestionData({ ...questionData, options: newOptions });
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!questionData.text || questionData.options.some(opt => !opt)) {
      alert("Please provide a question and all 4 options.");
      return;
    }

    setLoading(true);
    try {
      await api.post('/questions', questionData);
      alert("Question added successfully!");
      setQuestionData({
        category: questionData.category,
        text: "",
        options: ["", "", "", ""]
      });
    } catch (error) {
      console.error("Error adding question:", error);
      alert(error.response?.data?.message || "Failed to add question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-brand-dark flex flex-col items-center">

      <div className="w-full max-w-2xl bg-white dark:bg-[#1a1a1a] p-8 md:p-12 rounded-3xl shadow-xl border border-neutral-100 dark:border-neutral-800">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-white mb-3">
            Interactive Questions
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            Add questions and options to the Explore interactive paths.
          </p>
        </div>

        <form onSubmit={handleQuestionSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Explore Category</label>
            <select
              name="category"
              value={questionData.category}
              onChange={handleQuestionChange}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white outline-none"
            >
              <option value="Healing">Healing</option>
              <option value="Comfort">Comfort</option>
              <option value="Motivation">Motivation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Question Text</label>
            <input
              type="text"
              name="text"
              value={questionData.text}
              onChange={handleQuestionChange}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white outline-none"
              placeholder="e.g., How are you feeling today?"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Options</label>
            {questionData.options.map((option, idx) => (
              <input
                key={idx}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white outline-none text-sm"
                placeholder={`Option ${idx + 1}`}
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white font-bold py-4 rounded-xl shadow-md disabled:opacity-50 hover:scale-105 transition-transform"
          >
            {loading ? "Adding..." : "Add Question to Path"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;