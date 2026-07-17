import { User } from '../types/index';

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>Role: {user.role}</p>
    </div>
  );
};