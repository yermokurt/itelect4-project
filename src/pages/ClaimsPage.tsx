import { useQuery } from "@tanstack/react-query";
import ClaimBadge from "../components/ClaimBadge";
import { fetchClaims } from "../api/client";
import type { ApiClaim } from "../types";

function ClaimsPage() {
  const { data, isPending, isError, error } = useQuery<ApiClaim[]>({
    queryKey: ["claims"],
    queryFn: fetchClaims,
  });

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[1, 2].map((skeletonId) => (
          <div key={skeletonId} className="h-32 animate-pulse rounded-xl border border-stone-300 bg-stone-100 shadow-md transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-rose-300 bg-rose-100 p-6 text-center transition-colors duration-300 ease-in-out dark:border-rose-800 dark:bg-rose-950/60">
        <h1 className="mb-1 text-lg font-bold text-rose-700 dark:text-rose-400">Unable to load claims</h1>
        <p className="text-xs text-stone-600 dark:text-stone-300">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-stone-800 transition-colors duration-300 ease-in-out dark:text-orange-50">My Claims</h1>
        <p className="mt-1 text-xs text-stone-500 transition-colors duration-300 ease-in-out dark:text-stone-400">Claims submitted from the item details page appear here.</p>
      </div>
      {data.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-stone-300 bg-stone-100 p-12 text-center shadow-md transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900">
          <p className="text-sm font-semibold text-stone-800 dark:text-orange-50">No claims submitted yet</p>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">Choose a found item and submit a claim from its details page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.map((claim) => <ClaimBadge key={claim.id} claim={claim} />)}
        </div>
      )}
    </div>
  );
}

export default ClaimsPage;
