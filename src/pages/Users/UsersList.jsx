import React from "react";
import { useSelector } from "react-redux";
import User from "./User";
import "./Users.css";

const UsersList = () => {
  const users = useSelector((state) => state.usersReducer);
  const searchQuery = useSelector((state) => state.searchQuery);

  const filteredUsers = users.filter((user) =>
    user?.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="user-list-container">
      {filteredUsers.map((user) => (
        <User user={user} key={user?._id} />
      ))}
    </div>
  );
};

export default UsersList;
