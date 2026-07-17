import { Claim } from '../types/index';

interface ClaimBadgeProps {
  claim: Claim;
}

export const ClaimBadge: React.FC<ClaimBadgeProps> = ({ claim }) => {
  return (
    <div>
      <p>Claim Date: {claim.dateClaimed}</p>
    </div>
  );
};