const userSeeds = [
  {
    username: "Ray",
    email: "ray@gmail.com",
    thoughts: ["hello world", "i like Neo"],
    friends: [
      {
        username: "jay",
        email: "jay@gmail.com",
        thoughts: ["hello jungle", "i like computers"],
        friends: ["ray", "kay", "may"],
      },
      {
        username: "kay",
        email: "kay@gmail.com",
        thoughts: ["hello paradise", "i like chickens"],
        friends: ["jay", "ray", "may"],
      },
      {
        username: "may",
        email: "may@gmail.com",
        thoughts: ["hello new york city", "i like fruit"],
        friends: ["jay", "kay", "ray"],
      },
    ],
  },
  {
    username: "jay",
    email: "jay@gmail.com",
    thoughts: ["hello jungle", "i like computers"],
    friends: ["ray", "kay", "may"],
  },
  {
    username: "kay",
    email: "kay@gmail.com",
    thoughts: ["hello paradise", "i like chickens"],
    friends: ["jay", "ray", "may"],
  },
  {
    username: "may",
    email: "may@gmail.com",
    thoughts: ["hello new york city", "i like fruit"],
    friends: ["jay", "kay", "ray"],
  },
];

const thoughtSeeds = [
  {
    content: "hello new york city",
    username: "may",
  },
  {
    content: "i like fruit",
    username: "may",
  },
  {
    content: "hello jungle",
    username: "jay",
  },
  {
    content: "i like computers",
    username: "jay",
  },
  {
    content: "hello world",
    username: "ray",
  },
  {
    content: "i like Neo",
    username: "ray",
  },
  {
    content: "hello paradise",
    username: "kay",
  },
  {
    content: "i like chickens",
    username: "kay",
  },
];

module.exports = { userSeeds, thoughtSeeds };
