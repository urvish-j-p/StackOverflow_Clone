import React from "react";
import { useSelector } from "react-redux";
import User from "./User";
import "./Users.css";
import { Spin } from "antd";

const UsersList = () => {
  const users = useSelector((state) => state.usersReducer);
  const searchQuery = useSelector((state) => state.searchQuery);
  const questionsList = useSelector((state) => state.questionsReducer);

  const filteredUsers = users.filter((user) =>
    user?.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      {questionsList.data === null && (
        <div className="spinner-container">
          <Spin size="large" style={{ fontSize: "50px" }} />
        </div>
      )}
      {questionsList.data !== null && (
        <div className="user-list-container">
          {filteredUsers.map((user) => (
            <User user={user} key={user?._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;
