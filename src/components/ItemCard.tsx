import { Item, ItemStatus } from '../types/index';

interface ItemCardProps {
  item: Item;
  onSelect: (item: Item) => void;
  variant?: "default" | "compact";
  children?: React.ReactNode;
}

const ItemCard = ({ item, onSelect, variant = "default", children }: ItemCardProps) => {
  const isCompact = variant === "compact";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onSelect(item);
  };

  const handleClaimClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    console.log("Claim ID:", item.id);
  };

  const statusStyles = {
    [ItemStatus.Lost]: "bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800",
    [ItemStatus.Found]: "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800",
    [ItemStatus.Claimed]: "bg-stone-200 text-stone-700 border-stone-300 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700",
  };

  return (
    <div
      className={`bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 shadow-md rounded-xl text-left flex flex-col justify-between transition-colors duration-300 ease-in-out ${
        isCompact ? "p-3 gap-2" : "p-5 gap-4"
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className={`font-bold text-stone-800 dark:text-orange-50 transition-colors duration-300 ease-in-out ${isCompact ? "text-sm" : "text-base"}`}>
            {item.title}
          </h3>
          <span
            className={`font-semibold uppercase tracking-wider border rounded-md px-2 py-0.5 text-xs whitespace-nowrap transition-colors duration-300 ease-in-out ${
              statusStyles[item.status]
            }`}
          >
            {item.status}
          </span>
        </div>

        {!isCompact && (
          <p className="text-stone-600 dark:text-stone-400 text-xs leading-relaxed transition-colors duration-300 ease-in-out">
            Description: {item.description}
          </p>
        )}

        <div className="inline-flex items-center gap-1.5 bg-orange-50/60 dark:bg-stone-950/60 border border-dashed border-stone-300 dark:border-stone-800 px-2.5 py-1 rounded-md text-xs text-stone-600 dark:text-stone-400 w-fit transition-colors duration-300 ease-in-out">
          <span>📍</span>
          <span>Location: {item.location}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-1">
        <div className="flex gap-2">
          <button
            className="flex-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-orange-50 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors duration-300 ease-in-out"
            onClick={handleClick}
          >
            Select
          </button>
          <button
            className="flex-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-white shadow-sm transition-colors duration-300 ease-in-out"
            onClick={handleClaimClick}
          >
            Claim
          </button>
        </div>

        {children && <div className="border-t border-dashed border-stone-300 dark:border-stone-800 pt-1 transition-colors duration-300 ease-in-out">{children}</div>}
      </div>
    </div>
  );
};

export default ItemCard;
