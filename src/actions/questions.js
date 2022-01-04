import { addQuestionToUser } from "./users";
import { saveQuestion } from "../utils/api";

export const receiveQuestions = (questions) => {
  return {
    type: "RECEIVE_QUESTIONS",
    questions,
  };
};

export const addAnswerToQuestion = (authUser, qid, answer) => {
  return {
    type: "ADD_ANSWER_TO_QUESTION",
    authUser,
    qid,
    answer,
  };
};

const addQuestion = (question) => {
  return {
    type: "ADD_QUESTION",
    question,
  };
};

export const handleSaveQuestion = (optionOneText, optionTwoText, author) => {
  return (dispatch) => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      (question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      }
    );
  };
};

