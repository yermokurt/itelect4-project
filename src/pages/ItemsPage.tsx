import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import ClaimBadge from '../components/ClaimBadge';
import useToggle from '../hooks/useToggle';
import usePrevious from '../hooks/usePrevious';
import { Item, ItemStatus } from '../types/index';
import { mockItems } from '../data/MockData';


const ItemsPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOnlyLost, toggleShowOnlyLost] = useToggle(false);
  const prevItemCount = usePrevious<number>(items.length);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(mockItems);
      setIsLoading(false);
    }, 1200);

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
    navigate(`/item/${selectedItem.id}`);
  };

  return (
    <div className="flex-1 flex flex-col gap-6">
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
          {!isLoading && (
            <span className="text-xs text-stone-500 dark:text-stone-400">
              (Previous count: {prevItemCount ?? 0})
            </span>
          )}
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
    </div>
  );
};

export default ItemsPage;
