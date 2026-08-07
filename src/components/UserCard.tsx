import { User } from '../types/index';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 shadow-md p-4 flex items-center gap-3.5 rounded-xl transition-colors duration-300 ease-in-out">
      <div className="w-10 h-10 border border-teal-600/40 dark:border-teal-400/40 bg-teal-100/60 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold text-lg rounded-lg shrink-0 transition-colors duration-300 ease-in-out">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-stone-800 dark:text-orange-50 text-sm leading-tight transition-colors duration-300 ease-in-out">
          User: {user.name}
        </h3>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 transition-colors duration-300 ease-in-out">
          Role: <span className="font-medium underline uppercase tracking-wider text-teal-600 dark:text-teal-400">{user.role}</span>
        </p>
      </div>
    </div>
  );
};

export default UserCard;