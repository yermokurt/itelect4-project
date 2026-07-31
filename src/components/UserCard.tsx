import { User } from '../types/index';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="user-details">
        <h3 className="user-name">User: {user.name}</h3>
        <p className="user-role">
          Role: <span className={`role-badge ${user.role}`}>{user.role}</span>
        </p>
      </div>
    </div>
  );
};

export default UserCard;