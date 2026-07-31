import { useState, useEffect, useRef } from 'react';
import UserCard from './components/UserCard';
import ItemCard from './components/ItemCard';
import ClaimBadge from './components/ClaimBadge';
import useToggle from './hooks/useToggle';
import usePrevious from './hooks/usePrevious';
import { User, Item, ItemStatus } from './types/index';

const mockUser: User = {
  id: 1,
  name: "Kurt Yermo",
  email: "kurt@example.com",
  role: "student",
  isActive: true,
};

const mockItems: Item[] = [
  {
    id: 101,
    title: "Student ID",
    description: "Found near library main door.",
    location: "Library",
    reportedByUserId: 1,
    status: ItemStatus.Lost,
  },
  {
    id: 102,
    title: "Wireless Earbuds",
    description: "Left at the table on the student center.",
    location: "Student Center",
    reportedByUserId: 2,
    status: ItemStatus.Found,
  },
  {
    id: 103,
    title: "Tumbler",
    description: "Returned to owner after verification.",
    location: "Sports Complex",
    reportedByUserId: 3,
    status: ItemStatus.Claimed,
  },
];

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [showOnlyLost, toggleShowOnlyLost] = useToggle(false);
  const prevItemCount = usePrevious<number>(items.length);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(mockItems);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      searchInputRef.current?.focus();
    }
  }, [isLoading]);

  const filteredItems: Item[] = items.filter((item: Item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLostFilter = showOnlyLost ? item.status === ItemStatus.Lost : true;
    return matchesSearch && matchesLostFilter;
  });

  const handleSelectItem = (selectedItem: Item): void => {
    console.log("Selected item:", selectedItem);
  };

  if (isLoading) {
    return (
      <div className="app-container">
        <p className="loading-text">Wait loading HAHAHAHAAHAHA</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-text">
          <h1>LOST AND FOUND TRACKER</h1>
          <p className="subtitle">Campus Inventory System</p>
        </div>
        <UserCard user={mockUser} />
      </header>

      <main className="main-content">
        <section className="search-section">
          <div className="item-search-bar">
            <span className="search-icon">🔍</span>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search items by title..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="item-search-input"
            />
          </div>
          <button onClick={toggleShowOnlyLost} className="btn btn-secondary">
            {showOnlyLost ? "Show All Items" : "Show Only Lost"}
          </button>
        </section>

        <section className="items-section">
          <h2 className="section-title">
            Reported Items ({filteredItems.length})
          </h2>
          <div className="item-grid">
            {filteredItems.map((item: Item) => (
              <ItemCard key={item.id} item={item} onSelect={handleSelectItem}>
                {item.status === ItemStatus.Claimed && (
                  <ClaimBadge
                    claim={{
                      id: 500 + item.id,
                      itemId: item.id,
                      claimerUserId: item.reportedByUserId,
                      dateClaimed: "2026-07-17",
                    }}
                  />
                )}
              </ItemCard>
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Total Items Loaded: {items.length} (Previous: {prevItemCount ?? 0})</p>
      </footer>
    </div>
  );
}

export default App;
