import React from 'react'

const UserCard = ({userInfo}) => {
  return (
    <div className="user-card p-2">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

            <img 
            src={userInfo?.profileImageUrl}
            alt={`Avatar`}
            className="w-12 h-12 rounded-full border-2 border-white"
            />

            <div>
                <p className="text-sm font-medium">{userInfo?.name}</p>
                <p className="text-xs text-gray-500">{userInfo?.email}</p>
            </div>

        </div>

      </div>

      <div className="grid grid-cols-3 gap-2 mt-5">

        <StatCard
        label="Pending"
        count={userInfo?.pendingTasks || 0}
        status="Pending"
        />

        <StatCard
        label="In Progress"
        count={userInfo?.inProgressTasks || 0}
        status="In Progress"
        />

        <StatCard
        label="Completed"
        count={userInfo?.completedTasks || 0}
        status="Completed"
        />
      </div>

    </div>
  )
}

export default UserCard

const StatCard = ({ label, count, status }) => {

  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-600 bg-cyan-50";
      case "Completed":
        return "text-indigo-600 bg-indigo-50";
      default:
        return "text-violet-600 bg-violet-50"; 
    }
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center py-2  rounded-lg ${getStatusTagColor()}`}>
      <span className="text-sm font-semibold">{count}</span>
      <span className="text-[10px] whitespace-nowrap">{label}</span>
    </div>
  );
};