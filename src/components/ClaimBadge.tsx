import type { Item } from "../types";

interface ClaimBadgeProps {
  item: Item;
}

function ClaimBadge({ item }: ClaimBadgeProps) {
  return (
    <article className="rounded-xl border border-emerald-300 bg-emerald-100/60 p-4 text-left shadow-md transition-colors duration-300 ease-in-out dark:border-emerald-800 dark:bg-emerald-950/40">
      <h2 className="text-xs font-semibold tracking-wider text-emerald-700 uppercase transition-colors duration-300 ease-in-out dark:text-emerald-400">Claimed item</h2>
      <dl className="mt-3 space-y-1 text-xs text-stone-600 transition-colors duration-300 ease-in-out dark:text-stone-400">
        <div><dt className="inline font-medium">Item ID: </dt><dd className="inline">{item.id}</dd></div>
        <div><dt className="inline font-medium">Title: </dt><dd className="inline">{item.title}</dd></div>
        <div><dt className="inline font-medium">Location: </dt><dd className="inline">{item.location}</dd></div>
        <div><dt className="inline font-medium">Status: </dt><dd className="inline font-semibold uppercase">{item.status}</dd></div>
      </dl>
    </article>
  );
}

export default ClaimBadge;
