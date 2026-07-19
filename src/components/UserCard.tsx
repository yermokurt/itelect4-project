import { User } from '../types/index';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div>
      <h3 style={{ color: 'White' }}>User: {user.name}</h3>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default UserCard;