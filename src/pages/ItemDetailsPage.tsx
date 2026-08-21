import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { createClaim, fetchItemById, updateItemStatus } from "../api/client";
import { useAuthStore } from "../store/useAuthStore";
import { ItemStatus, type ApiItem } from "../types";

function ItemDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const { data, isPending, isError, error } = useQuery<ApiItem>({
    queryKey: ["items", id],
    queryFn: () => fetchItemById(id!),
    enabled: id !== undefined,
  });

  const claimMutation = useMutation({
    mutationFn: async (item: ApiItem): Promise<ApiItem> => {
      await createClaim({
        itemId: item.id,
        claimerUserId: user?.id ?? 1,
        dateClaimed: new Date().toISOString().slice(0, 10),
      });

      return updateItemStatus(item.id, ItemStatus.Claimed);
    },
    onSuccess: async (_, claimedItem) => {
      await queryClient.invalidateQueries({ queryKey: ["items"] });
      await queryClient.invalidateQueries({ queryKey: ["items", id] });
      await queryClient.invalidateQueries({ queryKey: ["claims"] });
      queryClient.setQueryData<ApiItem>(["items", claimedItem.id], claimedItem);
    },
  });

  const handleBackToItems = (): void => {
    navigate("/items");
  };

  const handleClaimItem = (): void => {
    if (data !== undefined) {
      claimMutation.mutate(data);
    }
  };

  if (isPending) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-1 animate-pulse flex-col gap-6">
        <div className="h-8 w-32 rounded-lg bg-stone-200 dark:bg-stone-800" />
        <div className="flex flex-col gap-5 rounded-2xl border border-stone-300 bg-stone-100 p-8 shadow-xl transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900">
          <div className="h-8 w-1/2 rounded-md bg-stone-200 dark:bg-stone-800" />
          <div className="h-4 w-full rounded-md bg-stone-200 dark:bg-stone-800" />
          <div className="h-10 w-full rounded-lg bg-stone-200 dark:bg-stone-800" />
        </div>
      </div>
    );
  }

  if (isError || data === undefined) {
    return (
      <div className="my-auto flex flex-1 flex-col items-center justify-center rounded-2xl border border-rose-300 bg-rose-100 p-8 text-center shadow-md transition-colors duration-300 ease-in-out dark:border-rose-800 dark:bg-rose-950/60">
        <h2 className="mb-2 text-xl font-bold text-rose-700 dark:text-rose-400">Item Not Found</h2>
        <p className="mb-6 max-w-sm text-xs text-stone-600 dark:text-stone-300">{error?.message ?? "The item ID is missing from the URL."}</p>
        <button onClick={handleBackToItems} className="rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors duration-300 ease-in-out hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600">
          Back to Inventory
        </button>
      </div>
    );
  }

  const statusStyles = {
    [ItemStatus.Lost]: "border-rose-300 bg-rose-100 text-rose-700 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-400",
    [ItemStatus.Found]: "border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400",
    [ItemStatus.Claimed]: "border-stone-300 bg-stone-200 text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300",
  };
  const canClaimItem = data.status !== ItemStatus.Claimed;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6">
      <button onClick={handleBackToItems} className="w-fit rounded-lg border border-stone-300 bg-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-800 transition-colors duration-300 ease-in-out hover:bg-stone-300 dark:border-stone-700 dark:bg-stone-800 dark:text-orange-50 dark:hover:bg-stone-700">
        ← Back to Inventory
      </button>

      <article className="flex flex-col gap-6 rounded-2xl border border-stone-300 bg-stone-100 p-8 shadow-xl transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-mono tracking-wider text-teal-600 uppercase dark:text-teal-400">Item # {data.id}</span>
            <h1 className="mt-1 text-2xl font-bold text-stone-800 transition-colors duration-300 ease-in-out dark:text-orange-50">{data.title}</h1>
          </div>
          <span className={`rounded-md border px-3 py-1 text-xs font-semibold tracking-wider transition-colors duration-300 ease-in-out ${statusStyles[data.status]}`}>{data.status}</span>
        </div>

        <div className="flex flex-col gap-4 border-t border-stone-300 pt-4 transition-colors duration-300 ease-in-out dark:border-stone-800">
          <div>
            <h2 className="mb-1 text-xs font-semibold text-stone-500 uppercase dark:text-stone-400">Description</h2>
            <p className="text-sm leading-relaxed text-stone-700 transition-colors duration-300 ease-in-out dark:text-stone-300">{data.description}</p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-dashed border-stone-300 bg-orange-50/60 px-3 py-1.5 text-xs text-stone-700 transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-950/60 dark:text-stone-300">
            <span>📍</span>
            <span>Location: <strong>{data.location}</strong></span>
          </div>
        </div>

        {claimMutation.isError && (
          <p className="rounded-lg border border-rose-300 bg-rose-100 p-3 text-xs text-rose-700 transition-colors duration-300 ease-in-out dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-400">
            {claimMutation.error.message}
          </p>
        )}

        <button
          onClick={handleClaimItem}
          disabled={!canClaimItem || claimMutation.isPending}
          className="w-full rounded-lg bg-teal-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors duration-300 ease-in-out hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-teal-700 dark:hover:bg-teal-600"
        >
          {data.status === ItemStatus.Claimed
            ? "Already Claimed"
            : claimMutation.isPending
              ? "Saving Claim..."
              : "Mark as Claimed"}
        </button>
      </article>
    </div>
  );
}

export default ItemDetailsPage;
