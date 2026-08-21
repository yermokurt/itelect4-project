import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ItemCard from "../components/ItemCard";
import { fetchItems } from "../api/client";
import usePrevious from "../hooks/usePrevious";
import useToggle from "../hooks/useToggle";
import { useUIStore } from "../store/useUIStore";
import { ItemStatus, type ApiItem } from "../types";

function ItemsPage() {
  const { data, isPending, isError, error } = useQuery<ApiItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });
  const [showOnlyLost, toggleShowOnlyLost] = useToggle(false);
  const searchQuery = useUIStore((state) => state.searchQuery);
  const setSearchQuery = useUIStore((state) => state.setSearchQuery);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const items = data ?? [];
  const previousItemCount = usePrevious<number>(items.length);

  useEffect(() => {
    if (!isPending) {
      searchInputRef.current?.focus();
    }
  }, [isPending]);

  const filteredItems = items.filter((item) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.id.toLowerCase().includes(normalizedQuery);
    const matchesLostFilter = showOnlyLost ? item.status === ItemStatus.Lost : true;

    return matchesSearch && matchesLostFilter;
  });

  const handleSelectItem = (selectedItem: ApiItem): void => {
    navigate(`/item/${selectedItem.id}`);
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <section className="flex flex-col items-center gap-3 rounded-xl border border-stone-300 bg-stone-100 p-4 shadow-md transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900 sm:flex-row">
        <div className="relative w-full flex-1">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-stone-400">🔍</span>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search items by item number or title..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            disabled={isPending}
            className="w-full rounded-lg border border-stone-300 bg-orange-50/50 py-2 pr-4 pl-9 text-sm text-stone-800 placeholder-stone-400 transition-colors duration-300 ease-in-out focus:ring-2 focus:ring-teal-600 focus:outline-none disabled:opacity-50 dark:border-stone-800 dark:bg-stone-950 dark:text-orange-50 dark:focus:ring-teal-400"
          />
        </div>
        <button
          onClick={toggleShowOnlyLost}
          disabled={isPending}
          className={`w-full whitespace-nowrap rounded-lg border px-4 py-2 text-xs font-semibold transition-colors duration-300 ease-in-out disabled:opacity-50 sm:w-auto ${
            showOnlyLost
              ? "border-rose-600 bg-rose-600 text-white hover:bg-rose-700"
              : "border-stone-300 bg-stone-200 text-stone-800 hover:bg-stone-300 dark:border-stone-700 dark:bg-stone-800 dark:text-orange-50 dark:hover:bg-stone-700"
          }`}
        >
          {showOnlyLost ? "Show All Items" : "Show Only Lost"}
        </button>
      </section>

      <section className="flex flex-1 flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wider text-stone-500 uppercase transition-colors duration-300 ease-in-out dark:text-stone-400">
            Reported Items {!isPending && `(${filteredItems.length})`}
          </h2>
          {!isPending && !isError && (
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Previous count: {previousItemCount ?? 0}
            </span>
          )}
        </div>

        {isPending && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((skeletonId) => (
              <div key={skeletonId} className="flex flex-col gap-4 rounded-xl border border-stone-300 bg-stone-100 p-5 shadow-md transition-colors duration-300 ease-in-out animate-pulse dark:border-stone-800 dark:bg-stone-900">
                <div className="h-5 w-1/2 rounded-md bg-stone-200 dark:bg-stone-800" />
                <div className="h-4 w-full rounded-md bg-stone-200 dark:bg-stone-800" />
                <div className="h-4 w-3/4 rounded-md bg-stone-200 dark:bg-stone-800" />
                <div className="h-8 w-full rounded-lg bg-stone-200 dark:bg-stone-800" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="my-auto flex flex-1 flex-col items-center justify-center rounded-xl border border-rose-300 bg-rose-100 p-12 text-center shadow-md transition-colors duration-300 ease-in-out dark:border-rose-800 dark:bg-rose-950/60">
            <h3 className="mb-1 text-base font-semibold text-rose-700 dark:text-rose-400">Unable to load items</h3>
            <p className="max-w-sm text-xs text-stone-600 dark:text-stone-300">{error.message}</p>
          </div>
        )}

        {!isPending && !isError && filteredItems.length === 0 && (
          <div className="my-auto flex flex-1 flex-col items-center justify-center rounded-xl border border-stone-300 bg-stone-100 p-12 text-center shadow-md transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900">
            <div className="mb-3 text-4xl">🔍</div>
            <h3 className="mb-1 text-base font-semibold text-stone-800 transition-colors duration-300 ease-in-out dark:text-orange-50">No Items Found</h3>
            <p className="max-w-sm text-xs text-stone-500 transition-colors duration-300 ease-in-out dark:text-stone-400">Try another title, location, or filter.</p>
          </div>
        )}

        {!isPending && !isError && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} onSelect={handleSelectItem} variant="default" />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ItemsPage;
