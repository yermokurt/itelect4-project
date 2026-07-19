import type { Claim } from '../types/index';

interface ClaimBadgeProps {
  claim: Claim;
  children?: React.ReactNode;
}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({ claim , children}) => {
  return (
    <div>
      <p>Claim Date: {claim.dateClaimed}</p>
      {children}
    </div>
  );
};

export default ClaimBadge;