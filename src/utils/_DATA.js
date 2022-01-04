let users = {
  sbu: {
    id: "sbu",
    name: "Sbu",
    avatarURL: "/images/avatars/dog.png",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionTwo",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
  thando: {
    id: "thando",
    name: "Thando",
    avatarURL: "/images/avatars/cat.png",
    answers: {
      vthrdm985a262al8qx3do: "optionOne",
      xj352vofupe1dqz9emx13r: "optionTwo",
    },
    questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
  },
  mbali: {
    id: "mbali",
    name: "Mbali",
    avatarURL: "/images/avatars/lion.png",
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
      "6ni6ok3ym7mf1p33lnez": "optionTwo",
    },
    questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
  },
  dumi: {
    id: "dumi",
    name: "Dumi",
    avatarURL: "/images/avatars/gorilla.png",
    answers: {},
    questions: [],
  },
  langa: {
    id: "langa",
    name: "Langa",
    avatarURL: "/images/avatars/koala.png",
    answers: {},
    questions: [],
  },
  sizo: {
    id: "sizo",
    name: "Sizo",
    avatarURL: "/images/avatars/rabbit.png",
    answers: {},
    questions: [],
  },
  rato: {
    id: "rato",
    name: "Rato",
    avatarURL: "/images/avatars/tiger.png",
    answers: {},
    questions: [],
  },
  bonang: {
    id: "bonang",
    name: "Bonang",
    avatarURL: "/images/avatars/fox.png",
    answers: {},
    questions: [],
  },
};

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "sbu",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["sbu"],
      text: "have horrible short term memory",
    },
    optionTwo: {
      votes: [],
      text: "have horrible long term memory",
    },
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    author: "mbali",
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: "become a superhero",
    },
    optionTwo: {
      votes: ["mbali", "sbu"],
      text: "become a supervillain",
    },
  },
  am8ehyc8byjqgar0jgpub9: {
    id: "am8ehyc8byjqgar0jgpub9",
    author: "sbu",
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: "be telekinetic",
    },
    optionTwo: {
      votes: ["sbu"],
      text: "be telepathic",
    },
  },
  loxhs1bqm25b708cmbf3g: {
    id: "loxhs1bqm25b708cmbf3g",
    author: "thando",
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: "be a front-end developer",
    },
    optionTwo: {
      votes: ["sbu"],
      text: "be a back-end developer",
    },
  },
  vthrdm985a262al8qx3do: {
    id: "vthrdm985a262al8qx3do",
    author: "thando",
    timestamp: 1489579767190,
    optionOne: {
      votes: ["thando"],
      text: "find $50 yourself",
    },
    optionTwo: {
      votes: ["mbali"],
      text: "have your best friend find $500",
    },
  },
  xj352vofupe1dqz9emx13r: {
    id: "xj352vofupe1dqz9emx13r",
    author: "mbali",
    timestamp: 1493579767190,
    optionOne: {
      votes: ["mbali"],
      text: "write JavaScript",
    },
    optionTwo: {
      votes: ["thando"],
      text: "write Swift",
    },
  },
};

function generateUID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _getQuestions() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...questions }), 1000);
  });
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

export function _saveQuestion(question) {
  return new Promise((res, rej) => {
    const authUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion,
      };

      users = {
        ...users,
        [authUser]: {
          ...users[authUser],
          questions: users[authUser].questions.concat([formattedQuestion.id]),
        },
      };

      res(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({ authUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authUser]: {
          ...users[authUser],
          answers: {
            ...users[authUser].answers,
            [qid]: answer,
          },
        },
      };

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authUser]),
          },
        },
      };

      res();
    }, 500);
  });
}
