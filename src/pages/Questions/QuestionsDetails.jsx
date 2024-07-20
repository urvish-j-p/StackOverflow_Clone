import React, { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import copy from "copy-to-clipboard";
import { message } from "antd";
import "./Questions.css";
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import {
  deleteQuestion,
  postAnswer,
  voteQuestion,
  fetchAllQuestions
} from "../../actions/question.js";

const QuestionsDetails = () => {
  const { id } = useParams();

  const questionsList = useSelector((state) => state.questionsReducer);

  const [Answer, setAnswer] = useState("");
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const url = "https://stack-overflow-by-urvish.netlify.app";

  const handlePostAns = async (e, answerLength) => {
    e.preventDefault();
    if (User === null) {
      message.error("Please login or signup to answer a question.");
      navigate("/Auth");
    } else {
      if (Answer === "") {
        message.error("Enter an answer before posting.");
      } else {
        try {
          await dispatch(
            postAnswer({
              id,
              noOfAnswers: answerLength + 1,
              answerBody: Answer,
              userAnswered: User.result.name,
              userId: User.result._id,
            })
          );
          message.success("Answer posted successfully!");
          setAnswer("");
        } catch (error) {
          console.error("Failed to post answer:", error);
        }
      }
    }
  };

  const handleShare = () => {
    copy(url + location.pathname);
    message.success("URL Copied!");
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteQuestion(id, navigate));
      message.success("Question deleted successfully!");
    } catch (error) {
      message.error("Failed to delete the question. Please try again.");
    }
  };

  const handleUpVote = async () => {
    try {
      await dispatch(voteQuestion(id, "upVote", User.result._id));
      // Refetch questions to get the updated data
      dispatch(fetchAllQuestions());
    } catch (error) {
      message.error("Failed to upvote the question. Please try again.");
    }
  };

  const handleDownVote = async () => {
    try {
      await dispatch(voteQuestion(id, "downVote", User.result._id));
      // Refetch questions to get the updated data
      dispatch(fetchAllQuestions());
    } catch (error) {
      message.error("Failed to downvote the question. Please try again.");
    }
  };

  return (
    <div className="question-details-page">
      {questionsList.data === null || questionsList.data === undefined ? (
        <h1>Loading...Please wait for a while...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upvote}
                        alt="up"
                        width="18"
                        onClick={handleUpVote}
                        className="votes-icon"
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={downvote}
                        alt="down"
                        width="18"
                        onClick={handleDownVote}
                        className="votes-icon"
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>
                          {User?.result?._id === question?.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar backgroundColor="orange" px="8px" py="5px">
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}

                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => {
                      handlePostAns(e, question.answer.length);
                    }}
                  >
                    <textarea
                      cols="30"
                      rows="10"
                      value={Answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="Submit"
                      className="post-ans-btn"
                      defaultValue="Post Your Answer"
                    />
                  </form>
                  <p>
                    Browse other Question tagged
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      ask your own question.
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionsDetails;
