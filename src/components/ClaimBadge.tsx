import type { Claim } from '../types/index';

interface ClaimBadgeProps {
  claim: Claim;
  children?: React.ReactNode;
}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({ claim , children}) => {
  return (
    <div className="claim-badge-container">
      <div className="claim-badge-header">
        <span className="claim-icon">✔</span>
        <span className="claim-text">Claim Details</span>
      </div>
      <p className="claim-date">Claim Date: <strong>{claim.dateClaimed}</strong></p>
      {children && <div className="claim-badge-children">{children}</div>}
    </div>
  );
};

export default ClaimBadge;


