import UserCard from './components/UserCard';
import ItemCard from './components/ItemCard';
import ClaimBadge from './components/ClaimBadge';
import { User, Item, Claim, ItemStatus } from './types';

const mockUser: User = { id: 1, name: "Juan dela Cruz", email: "juan@example.com", role: "student", isActive: true };
const mockItem: Item = { id: 101, title: "Student ID", description: "Found near library.", location: "Library", reportedByUserId: 1, status: ItemStatus.Lost };
const mockClaim: Claim = { id: 500, itemId: 101, claimerUserId: 1, dateClaimed: "2026-07-17" };

function App() {
  return (
    <div>
      <div>
        <h1>LOST AND FOUND TRACKER</h1>
        <p>By: Kurt Yermo</p>
      </div>
      <hr></hr>
      <UserCard user={mockUser} />
      <hr></hr>
      <ItemCard item={mockItem} onSelect={(item) => console.log(item)}>
        <ClaimBadge claim={mockClaim} />
      </ItemCard>
    </div>
  );
}

export default App;

