import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import "./AskQuestion.css";
import { askQuestion } from "../../actions/question";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure variables are strings before calling trim()
    const title = typeof questionTitle === "string" ? questionTitle.trim() : "";
    const body = typeof questionBody === "string" ? questionBody.trim() : "";

    // Ensure questionTags is an array and remove any empty tags
    const tagsArray = Array.isArray(questionTags)
      ? questionTags.filter((tag) => tag.trim() !== "")
      : [];

    if (!title) {
      message.error("Title is mandatory.");
      return;
    }
    if (!body) {
      message.error("Description is mandatory.");
      return;
    }
    if (tagsArray.length === 0) {
      message.error("At least one tag is mandatory.");
      return;
    }

    // Dispatch action if all fields are valid
    dispatch(
      askQuestion(
        {
          questionTitle: title,
          questionBody: body,
          questionTags: tagsArray,
          userPosted: User.result.name,
          userId: User?.result?._id,
        },
        navigate
      )
    )
      .then(() => {
        message.success("Question posted successfully!");
      })
      .catch((error) => {
        message.error("Failed to post question. Please try again.");
        console.error("Error posting question:", error);
      });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };
  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you're asking a question to another
                person.
              </p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Description</h4>
              <p>
                Include all the information someone would need to answer your
                question.
              </p>
              <textarea
                name=""
                id="ask-ques-body"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                cols="30"
                rows="10"
                onKeyPress={handleEnter}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about.</p>
              <input
                type="text"
                id="ask-ques-tags"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                placeholder="e.g. (xml typescript wordpress)"
              />
            </label>
          </div>
          <input type="submit" value="Post question" className="review-btn" />
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
