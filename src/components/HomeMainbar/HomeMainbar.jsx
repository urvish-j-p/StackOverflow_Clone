import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./HomeMainbar.css";
import QuestionList from "./QuestionsList";
import { useSelector } from "react-redux";
import { Spin, message } from "antd";

const HomeMainbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const questionsList = useSelector((state) => state.questionsReducer);
  const searchQuery = useSelector((state) => state.searchQuery);
  const user = useSelector((state) => state.currentUserReducer);

  const checkAuth = () => {
    if (!user) {
      message.warning("login or signup to ask a question!");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };

  const filteredQuestions = questionsList?.data?.filter((question) =>
    question?.questionTitle?.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={checkAuth} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <div className="loading-container">
            <Spin size="large" style={{ fontSize: "50px" }} />
            <h1 className="loading-text">
              It may take few seconds<span className="dots">...</span>
            </h1>
          </div>
        ) : (
          <>
            <p>{filteredQuestions.length} questions</p>
            <QuestionList questionsList={filteredQuestions} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
