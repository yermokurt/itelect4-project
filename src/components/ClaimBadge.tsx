import type { Claim } from '../types/index';

interface ClaimBadgeProps {
  claim: Claim;
  children?: React.ReactNode;
}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({ claim, children }) => {
  return (
    <div className="bg-emerald-100/60 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 p-3 rounded-lg text-center mt-3 transition-colors duration-300 ease-in-out">
      <div className="flex items-center justify-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400 text-xs uppercase tracking-wider mb-1 transition-colors duration-300 ease-in-out">
        <span>✔</span>
        <span>Claim Details</span>
      </div>
      <p className="text-xs text-stone-600 dark:text-stone-400 transition-colors duration-300 ease-in-out">
        Claim Date: <strong className="font-semibold text-stone-800 dark:text-orange-50 transition-colors duration-300 ease-in-out">{claim.dateClaimed}</strong>
      </p>
      {children && <div className="mt-2 pt-2 border-t border-emerald-200 dark:border-emerald-900 transition-colors duration-300 ease-in-out">{children}</div>}
    </div>
  );
};

export default ClaimBadge;
