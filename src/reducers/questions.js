const questionsReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case "FETCH_ALL_QUESTIONS":
      return { ...state, data: action.payload };

    case "POST_QUESTION":
      return { ...state, data: [...state.data, action.payload] };

    case "POST_ANSWER":
      return {
        ...state,
        data: state.data.map((question) =>
          question._id === action.payload._id ? action.payload : question
        ),
      };

    case "DELETE_ANSWER":
      return {
        ...state,
        data: state.data.map((question) =>
          question._id === action.payload.questionId
            ? {
                ...question,
                answer: question.answer.filter(
                  (ans) => ans._id !== action.payload.answerId
                ),
              }
            : question
        ),
      };

    case "DELETE_QUESTION":
      return {
        ...state,
        data: state.data.filter((question) => question._id !== action.payload),
      };

    default:
      return state;
  }
};

export default questionsReducer;
