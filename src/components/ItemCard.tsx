import { Item } from '../types/index';

interface ItemCardProps {
  item: Item;
  onSelect: (item: Item) => void;
  children?: React.ReactNode;
}

const ItemCard = ({ item, onSelect, children }: ItemCardProps) => {
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onSelect(item); 
  };

  const handleClaimClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    console.log("Claim ID:", item.id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("Search:", e.target.value);
  };

  return (
    <div>

      <button onClick={handleClick}>Select</button>
      <input onChange={handleChange} placeholder="Search..." />
      
      <h3 style={{ color: 'White' }}>Item Name: {item.title}</h3>
      <p>Item Description: {item.description}</p>
      
      <br></br>
      <button onClick={handleClaimClick}>Claim</button>
      {children}
    </div>
  );
};

export default ItemCard;


