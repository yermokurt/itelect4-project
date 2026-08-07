import { useState, useEffect, useRef } from 'react';
import UserCard from './components/UserCard';
import ItemCard from './components/ItemCard';
import ClaimBadge from './components/ClaimBadge';
import useToggle from './hooks/useToggle';
import usePrevious from './hooks/usePrevious';
import { User, Item, ItemStatus } from './types/index';

const mockUser: User = {
  id: 1,
  name: "Kurt Yermo",
  email: "kurt@example.com",
  role: "student",
  isActive: true,
};

const mockItems: Item[] = [
  {
    id: 101,
    title: "Student ID",
    description: "Found near library main door.",
    location: "Library",
    reportedByUserId: 1,
    status: ItemStatus.Lost,
  },
  {
    id: 102,
    title: "Wireless Earbuds",
    description: "Left at the table on the student center.",
    location: "Student Center",
    reportedByUserId: 2,
    status: ItemStatus.Found,
  },
  {
    id: 103,
    title: "Tumbler",
    description: "Returned to owner after verification.",
    location: "Sports Complex",
    reportedByUserId: 3,
    status: ItemStatus.Claimed,
  },
];

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDarkMode, toggleDarkMode] = useToggle(false);

  const [showOnlyLost, toggleShowOnlyLost] = useToggle(false);
  const prevItemCount = usePrevious<number>(items.length);
  const searchInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(mockItems);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      searchInputRef.current?.focus();
    }
  }, [isLoading]);

  const filteredItems: Item[] = items.filter((item: Item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLostFilter = showOnlyLost ? item.status === ItemStatus.Lost : true;
    return matchesSearch && matchesLostFilter;
  });

  const handleSelectItem = (selectedItem: Item): void => {
    console.log("Selected item:", selectedItem);
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-stone-950 text-stone-800 dark:text-orange-50 font-sans transition-colors duration-300 ease-in-out">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col min-h-screen gap-6">

          {/* Header */}
          <header className="bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 shadow-md p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 transition-colors duration-300 ease-in-out">
            <div className="flex items-center justify-between w-full md:w-auto">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-teal-600 dark:text-teal-400 transition-colors duration-300 ease-in-out">
                  CAMPUS LOST & FOUND
                </h1>
                <p className="text-xs text-stone-500 dark:text-stone-400 transition-colors duration-300 ease-in-out">Campus Inventory System</p>
              </div>
              <button
                onClick={toggleDarkMode}
                className="md:hidden px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-white transition-colors duration-300 ease-in-out"
              >
                {isDarkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button
                onClick={toggleDarkMode}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-white shadow-sm transition-colors duration-300 ease-in-out"
              >
                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
              <UserCard user={mockUser} />
            </div>
          </header>

          <main className="flex-1 flex flex-col gap-6">
            {/* Search & Filter Controls */}
            <section className="bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 p-4 rounded-xl shadow-md flex flex-col sm:flex-row items-center gap-3 transition-colors duration-300 ease-in-out">
              <div className="relative flex-1 w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">🔍</span>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search items by title..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-orange-50/50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg text-stone-800 dark:text-orange-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400 transition-colors duration-300 ease-in-out disabled:opacity-50"
                />
              </div>
              <button
                onClick={toggleShowOnlyLost}
                disabled={isLoading}
                className={`w-full sm:w-auto whitespace-nowrap px-4 py-2 text-xs font-semibold rounded-lg border transition-colors duration-300 ease-in-out disabled:opacity-50 ${
                  showOnlyLost
                    ? "bg-rose-600 text-white border-rose-600 hover:bg-rose-700"
                    : "bg-stone-200 dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-800 dark:text-orange-50 hover:bg-stone-300 dark:hover:bg-stone-700"
                }`}
              >
                {showOnlyLost ? "Show All Items" : "Show Only Lost"}
              </button>
            </section>

            {/* Items Grid Section */}
            <section className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 transition-colors duration-300 ease-in-out">
                  Reported Items {!isLoading && `(${filteredItems.length})`}
                </h2>
              </div>

              {/* Skeleton Loading State */}
              {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className="bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 p-5 rounded-xl animate-pulse flex flex-col gap-4 shadow-md transition-colors duration-300 ease-in-out"
                    >
                      <div className="flex justify-between items-center">
                        <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded-md w-1/2"></div>
                        <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded-md w-1/4"></div>
                      </div>
                      <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded-md w-full"></div>
                      <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded-md w-3/4"></div>
                      <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded-md w-1/3 mt-1"></div>
                      <div className="flex gap-2 mt-2">
                        <div className="h-8 bg-stone-200 dark:bg-stone-800 rounded-lg flex-1"></div>
                        <div className="h-8 bg-stone-200 dark:bg-stone-800 rounded-lg flex-1"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!isLoading && filteredItems.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-xl shadow-md my-auto transition-colors duration-300 ease-in-out">
                  <div className="text-4xl mb-3">🔍</div>
                  <h3 className="font-semibold text-stone-800 dark:text-orange-50 text-base mb-1 transition-colors duration-300 ease-in-out">
                    No Items Found
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm transition-colors duration-300 ease-in-out">
                    We couldn't find any items matching your search criteria or active filters. Try resetting your query.
                  </p>
                </div>
              )}

              {/* Item Cards Grid */}
              {!isLoading && filteredItems.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item: Item) => (
                    <ItemCard key={item.id} item={item} onSelect={handleSelectItem} variant="default">
                      {item.status === ItemStatus.Claimed && (
                        <ClaimBadge
                          claim={{
                            id: 500 + item.id,
                            itemId: item.id,
                            claimerUserId: item.reportedByUserId,
                            dateClaimed: "2026-07-17",
                          }}
                        />
                      )}
                    </ItemCard>
                  ))}
                </div>
              )}
            </section>
          </main>

          {/* Footer */}
          <footer className="py-4 border-t border-stone-300 dark:border-stone-800 text-center text-xs text-stone-500 dark:text-stone-400 transition-colors duration-300 ease-in-out">
            <p>Total Items Loaded: {items.length} (Previous: {prevItemCount ?? 0})</p>
          </footer>
        </div>
      </div>
  );
}

export default App;



