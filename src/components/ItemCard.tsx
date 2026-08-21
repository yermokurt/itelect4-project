import type { ApiItem } from "../types";

interface ItemCardProps {
  item: ApiItem;
  onSelect: (item: ApiItem) => void;
  variant?: "default" | "compact";
}

function ItemCard({ item, onSelect, variant = "default" }: ItemCardProps) {
  const isCompact = variant === "compact";

  const handleSelect = (): void => {
    onSelect(item);
  };

  const statusStyles = {
    LOST: "border-rose-300 bg-rose-100 text-rose-700 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-400",
    FOUND: "border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400",
    CLAIMED: "border-stone-300 bg-stone-200 text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300",
  };

  return (
    <article className={`flex flex-col justify-between rounded-xl border border-stone-300 bg-stone-100 text-left shadow-md transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900 ${isCompact ? "gap-2 p-3" : "gap-4 p-5"}`}>
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold tracking-wider text-teal-600 uppercase transition-colors duration-300 ease-in-out dark:text-teal-400">Item # {item.id}</p>
            <h3 className={`mt-1 font-bold text-stone-800 transition-colors duration-300 ease-in-out dark:text-orange-50 ${isCompact ? "text-sm" : "text-base"}`}>{item.title}</h3>
          </div>
          <span className={`rounded-md border px-2 py-0.5 text-xs font-semibold tracking-wider whitespace-nowrap transition-colors duration-300 ease-in-out ${statusStyles[item.status]}`}>{item.status}</span>
        </div>
        {!isCompact && <p className="text-xs leading-relaxed text-stone-600 transition-colors duration-300 ease-in-out dark:text-stone-400">Description: {item.description}</p>}
        <div className="inline-flex w-fit items-center gap-1.5 rounded-md border border-dashed border-stone-300 bg-orange-50/60 px-2.5 py-1 text-xs text-stone-600 transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-950/60 dark:text-stone-400">
          <span>📍</span>
          <span>Location: {item.location}</span>
        </div>
      </div>
      <button onClick={handleSelect} className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors duration-300 ease-in-out hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600">
        View Details
      </button>
    </article>
  );
}

export default ItemCard;
