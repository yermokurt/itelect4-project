import { Item, ItemStatus } from '../types/index';

interface ItemCardProps {
  item: Item;
  onClaim: (id: number) => void;
}

export const ItemCard = ({ item, onClaim }: ItemCardProps) => {
  
  const handleClaimClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClaim(item.id); 
  };

  return (
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      
      {item.status === ItemStatus.Lost && (
        <button onClick={handleClaimClick}>Claim Item</button>
      )}
    </div>
  );
};