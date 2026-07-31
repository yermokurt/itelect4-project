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
    <div className="item-card">
      <div className="item-search-bar">
        <span className="search-icon">🔍</span>
        <input onChange={handleChange} placeholder="Search items..." className="item-search-input" />
      </div>

      <div className="item-content">
        <div className="item-header">
          <h3 className="item-title">Item Name: {item.title}</h3>
          <span className={`status-badge status-${item.status.toLowerCase()}`}>{item.status}</span>
        </div>
        <p className="item-description">Description: {item.description}</p>
        <div className="item-location">
          <span className="location-icon">📍</span>
          <span>Location: {item.location}</span>
        </div>
      </div>

      <div className="item-actions">
        <button className="btn btn-secondary" onClick={handleClick}>Select</button>
        <button className="btn btn-primary" onClick={handleClaimClick}>Claim</button>
      </div>

      {children && <div className="item-children">{children}</div>}
    </div>
  );
};

export default ItemCard;
