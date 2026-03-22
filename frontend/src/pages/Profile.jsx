import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 text-center">
        <p className="text-neutral-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">

      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-sm border border-neutral-100 dark:border-neutral-800 overflow-hidden mb-12">
        {/* Profile Header Background */}
        <div className="h-32 bg-gradient-to-r from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 relative">
          <div className="absolute -bottom-12 left-8 w-24 h-24 bg-white dark:bg-[#121212] rounded-full p-1 border-4 border-white dark:border-[#1a1a1a]">
            <div className="w-full h-full bg-[var(--color-accent)] rounded-full flex justify-center items-center text-3xl text-white font-serif font-bold">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            {user.name}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            {user.occupation || "Lover of languages and profound thoughts."}
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-neutral-100 dark:border-neutral-800 pt-8">
            <div className="space-y-1">
              <p className="text-sm font-medium text-neutral-500">Mobile</p>
              <p className="text-lg font-semibold text-neutral-900 dark:text-white">{user.mobile}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-neutral-500">City</p>
              <p className="text-lg font-semibold text-neutral-900 dark:text-white">{user.city || "Not specified"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-neutral-500">Age / Gender</p>
              <p className="text-lg font-semibold text-neutral-900 dark:text-white">
                {user.age || "N/A"} / {user.gender || "Other"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-neutral-500">Role</p>
              <p className="text-lg font-semibold text-neutral-900 dark:text-white capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-serif font-bold mb-6 text-neutral-800 dark:text-neutral-200">
            Account Details
          </h2>
          <div className="space-y-4">

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] shadow-sm border border-neutral-100 dark:border-neutral-800">
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">Account Type</p>
              <p className="text-neutral-900 dark:text-white font-medium capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold mb-6 text-neutral-800 dark:text-neutral-200">
            Your Insights
          </h2>
          <div className="bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-10 text-center flex flex-col items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 font-medium italic">
              "Words are the mirrors of the soul."
            </p>
            <p className="text-sm text-neutral-400 mt-4">
              Keep exploring categories to build your collection.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Profile;