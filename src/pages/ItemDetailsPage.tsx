import { useParams, useNavigate } from 'react-router-dom';
import { mockItems } from './ItemsPage';
import ClaimBadge from '../components/ClaimBadge';
import { ItemStatus } from '../types/index';

const ItemDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const itemId = id ? parseInt(id, 10) : NaN;
  const item = mockItems.find((i) => i.id === itemId);

  if (!item || Number.isNaN(itemId)) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-2xl shadow-md transition-colors duration-300 ease-in-out my-auto">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-stone-800 dark:text-orange-50 mb-2 transition-colors duration-300 ease-in-out">
          Item Not Found
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mb-6 transition-colors duration-300 ease-in-out">
          The requested item ID <span className="font-mono bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded text-rose-600 dark:text-rose-400">"{id}"</span> does not exist or has been removed from the inventory.
        </p>
        <button
          onClick={() => navigate('/items')}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-white shadow-sm transition-colors duration-300 ease-in-out"
        >
          ← Back to Inventory
        </button>
      </div>
    );
  }

  const statusStyles = {
    [ItemStatus.Lost]: "bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800",
    [ItemStatus.Found]: "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800",
    [ItemStatus.Claimed]: "bg-stone-200 text-stone-700 border-stone-300 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700",
  };

  return (
    <div className="flex-1 flex flex-col gap-6 max-w-3xl mx-auto w-full">
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate('/items')}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-orange-50 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors duration-300 ease-in-out"
        >
          ← Back to Inventory
        </button>
      </div>

      <div className="bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 p-8 rounded-2xl shadow-xl flex flex-col gap-6 transition-colors duration-300 ease-in-out">
        <div className="flex justify-between items-start gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Item #{item.id}
            </span>
            <h1 className="text-2xl font-bold text-stone-800 dark:text-orange-50 mt-1 transition-colors duration-300 ease-in-out">
              {item.title}
            </h1>
          </div>
          <span
            className={`font-semibold uppercase tracking-wider border rounded-md px-3 py-1 text-xs transition-colors duration-300 ease-in-out ${statusStyles[item.status]}`}
          >
            {item.status}
          </span>
        </div>

        <div className="border-t border-stone-300 dark:border-stone-800 pt-4 flex flex-col gap-4 text-left transition-colors duration-300 ease-in-out">
          <div>
            <h3 className="text-xs font-semibold uppercase text-stone-500 dark:text-stone-400 mb-1">
              Description
            </h3>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed transition-colors duration-300 ease-in-out">
              {item.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="inline-flex items-center gap-2 bg-orange-50/60 dark:bg-stone-950/60 border border-dashed border-stone-300 dark:border-stone-800 px-3 py-1.5 rounded-lg text-xs text-stone-700 dark:text-stone-300 transition-colors duration-300 ease-in-out">
              <span>📍</span>
              <span>Location: <strong>{item.location}</strong></span>
            </div>

            <div className="inline-flex items-center gap-2 bg-orange-50/60 dark:bg-stone-950/60 border border-dashed border-stone-300 dark:border-stone-800 px-3 py-1.5 rounded-lg text-xs text-stone-700 dark:text-stone-300 transition-colors duration-300 ease-in-out">
              <span>👤</span>
              <span>Reported By User ID: <strong>{item.reportedByUserId}</strong></span>
            </div>
          </div>

          {item.status === ItemStatus.Claimed && (
            <div className="mt-2">
              <ClaimBadge
                claim={{
                  id: 500 + item.id,
                  itemId: item.id,
                  claimerUserId: item.reportedByUserId,
                  dateClaimed: "2026-07-17",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
