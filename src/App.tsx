import { UserCard } from './components/UserCard';
import { ItemCard } from './components/ItemCard';
import { ClaimBadge } from './components/ClaimBadge';
import { User, Item, Claim, ItemStatus } from './types';

// Mock Data
const mockUser: User = { id: 1, name: "Juan dela Cruz", email: "juan@example.com", role: "student", isActive: true };
const mockItem: Item = { id: 101, title: "Student ID", description: "Found near library.", location: "Library", reportedByUserId: 1, status: ItemStatus.Lost };
const mockClaim: Claim = { id: 500, itemId: 101, claimerUserId: 1, dateClaimed: "2026-07-17" };

function App() {
  const handleClaim = (id: number) => console.log(`Claiming item: ${id}`);

  return (
    <div>
      <UserCard user={mockUser} />
      <ItemCard item={mockItem} onClaim={handleClaim} />
      <ClaimBadge claim={mockClaim} />
    </div>
  );
}

export default App;