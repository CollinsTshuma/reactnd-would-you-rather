import { getInceptiveData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";

export const handleInceptiveData = () => {
  return (dispatch) => {
    return getInceptiveData().then(({ users, questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
    });
  };
};
