import type { ApiClaim } from "../types";

interface ClaimBadgeProps {
  claim: ApiClaim;
}

function ClaimBadge({ claim }: ClaimBadgeProps) {
  return (
    <article className="rounded-xl border border-emerald-300 bg-emerald-100/60 p-4 text-left shadow-md transition-colors duration-300 ease-in-out dark:border-emerald-800 dark:bg-emerald-950/40">
      <h2 className="text-xs font-semibold tracking-wider text-emerald-700 uppercase transition-colors duration-300 ease-in-out dark:text-emerald-400">Claim submitted</h2>
      <dl className="mt-3 space-y-1 text-xs text-stone-600 transition-colors duration-300 ease-in-out dark:text-stone-400">
        <div><dt className="inline font-medium">Item ID: </dt><dd className="inline">{claim.itemId}</dd></div>
        <div><dt className="inline font-medium">Claimant: </dt><dd className="inline">{claim.claimerName}</dd></div>
        <div><dt className="inline font-medium">Email: </dt><dd className="inline">{claim.claimerEmail}</dd></div>
        <div><dt className="inline font-medium">Claim date: </dt><dd className="inline">{claim.dateClaimed}</dd></div>
        <div><dt className="inline font-medium">Ownership details: </dt><dd className="inline">{claim.ownershipDetails}</dd></div>
      </dl>
    </article>
  );
}

export default ClaimBadge;
