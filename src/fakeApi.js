import YT from "yandex-translate";

export function fetchUser() {
  console.log("fetch user...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetched user");
      resolve({
        name: "Ringo Starr"
      });
    }, 1000);
  });
}

export function fetchPosts() {
  console.log("fetch posts...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetched posts");
      resolve([
        {
          id: 0,
          text:
            "I get by with a little help from my friends"
        },
        {
          id: 1,
          text:
            "I'd like to be under the sea in an octupus's garden"
        },
        {
          id: 2,
          text:
            "You got that sand all over your feet"
        }
      ]);
    }, 2000);
  });
}

export function fetchProfileDataPromiseAll() {
  return Promise.all([
    fetchUser(),
    fetchPosts()
  ]).then(([user, posts]) => {
    return {user, posts};
  })
}

export function fetchNumberOfLikes(posts) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(42);
    }, 2000);
  })
}

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}

export function fetchProfileData() {
  let userPromise = fetchUser();
  let postsPromise = fetchPosts();
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise)
  };
}

export function fetchProfileDataByUserId(userId) {
  let userPromise = fetchUserById(userId);
  let postsPromise = fetchPostsFromUser(userId);
  return {
    userId,
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise)
  };
}

export function fetchUserById(userId) {
  console.log("fetch user " + userId + "...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetched user " + userId);
      switch (userId) {
        case 0:
          resolve({
            name: "Ringo Starr"
          });
          break;
        case 1:
          resolve({
            name: "George Harrison"
          });
          break;
        case 2:
          resolve({
            name: "John Lennon"
          });
          break;
        case 3:
          resolve({
            name: "Paul McCartney"
          });
          break;
        default:
          throw Error("Unknown user.");
      }
    }, 2000 * Math.random());
  });
}

export function fetchPostsFromUser(userId) {
  console.log(
    "fetch posts for " + userId + "..."
  );
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetched posts for " + userId);
      switch (userId) {
        case 0:
          resolve([
            {
              id: 0,
              text:
                "I get by with a little help from my friends"
            },
            {
              id: 1,
              text:
                "I'd like to be under the sea in an octupus's garden"
            },
            {
              id: 2,
              text:
                "You got that sand all over your feet"
            }
          ]);
          break;
        case 1:
          resolve([
            {
              id: 0,
              text:
                "Turn off your mind, relax, and float downstream"
            },
            {
              id: 1,
              text: "All things must pass"
            },
            {
              id: 2,
              text:
                "I look at the world and I notice it's turning"
            }
          ]);
          break;
        case 2:
          resolve([
            {
              id: 0,
              text:
                "Living is easy with eyes closed"
            },
            {
              id: 1,
              text:
                "Nothing's gonna change my world"
            },
            {
              id: 2,
              text: "I am the walrus"
            }
          ]);
          break;
        case 3:
          resolve([
            {
              id: 0,
              text: "Woke up, fell out of bed"
            },
            {
              id: 1,
              text: "Here, there, and everywhere"
            },
            {
              id: 2,
              text:
                "Two of us sending postcards, writing letters"
            }
          ]);
          break;
        default:
          throw Error("Unknown user.");
      }
    }, 5000 * Math.random());
  });
}

export function fetchProfileDataWithError() {
  let userPromise = fetchUser();
  let postsPromise = Promise.reject(
    "Cannot fetch posts"
  );
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise)
  };
}

let ringoPosts = [
  {
    id: 0,
    text:
      "I get by with a little help from my friends"
  },
  {
    id: 1,
    text:
      "I'd like to be under the sea in an octupus's garden"
  },
  {
    id: 2,
    text: "You got that sand all over your feet"
  }
];

// Simulate new posts being added over time
let i = 3;
setInterval(() => {
  ringoPosts = [
    {
      id: i++,
      text: "My new post #" + i
    },
    ...ringoPosts
  ];
}, 3000);

export function fetchProfileDataTransition() {
  let userPromise = fetchUser();
  let postsPromise = fetchPostsTransition();
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise)
  };
}

function fetchPostsTransition() {
  let ringoPostsAtTheTime = ringoPosts;
  console.log("fetch posts...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetched posts");
      resolve(ringoPostsAtTheTime);
    }, 5000 * Math.random());
  });
}

function fetchTrivia() {
  console.log("fetching trivia...")
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetched trivia")
      resolve([
        {
          id: 1,
          text:
            'The nickname "Ringo" came from his habit of wearing numerous rings.'
        },
        {
          id: 2,
          text:
            "Plays the drums left-handed with a right-handed drum set."
        },
        {
          id: 3,
          text:
            "Nominated for one Daytime Emmy Award, but did not win"
        }
      ]);
    }, 7000);
  });
}

export function fetchProfileDataWithTrivia() {
  let userPromise = fetchUser();
  let postsPromise = fetchPostsTransition();
  let triviaPromise = fetchTrivia();
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise),
    trivia: wrapPromise(triviaPromise)
  };
}

export function fetchPosts1300() {
  console.log("fetch posts...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetched posts");
      resolve([
        {
          id: 0,
          text:
            "I get by with a little help from my friends"
        },
        {
          id: 1,
          text:
            "I'd like to be under the sea in an octupus's garden"
        },
        {
          id: 2,
          text:
            "You got that sand all over your feet"
        }
      ]);
    }, 1300);
  });
}

function fetchTrivia1400() {
  console.log('fetching trivia...')
  return new Promise(resolve => {
    console.log('fetched trivia')
    setTimeout(() => {
      resolve([
        {
          id: 1,
          text:
            'The nickname "Ringo" came from his habit of wearing numerous rings.'
        },
        {
          id: 2,
          text:
            "Plays the drums left-handed with a right-handed drum set."
        },
        {
          id: 3,
          text:
            "Nominated for one Daytime Emmy Award, but did not win"
        }
      ]);
    }, 1400);
  });
}

export function fetchProfileDataSimilarTimes() {
  let userPromise = fetchUser();
  let postsPromise = fetchPosts1300();
  let triviaPromise = fetchTrivia1400();
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise),
    trivia: wrapPromise(triviaPromise)
  };
}

const { translate } = YT(
  "trnsl.1.1.20191024T065420Z.b1864d8992684387.41b0675c02ee20c3e71c53077224b1bfdaea19bd"
);

export function fetchTranslation(text) {
  const promise = new Promise(
    (resolve, reject) => {
      translate(
        text,
        {
          to: "fr"
        },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.text);
          }
        }
      );
    }
  );
  return wrapPromise(promise);
}

function fetchTriviaRandomTime() {
  console.log("fetching trivia...")
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetched trivia")
      resolve([
        {
          id: 1,
          text:
            'The nickname "Ringo" came from his habit of wearing numerous rings.'
        },
        {
          id: 2,
          text:
            "Plays the drums left-handed with a right-handed drum set."
        },
        {
          id: 3,
          text:
            "Nominated for one Daytime Emmy Award, but did not win"
        }
      ]);
    }, 5000 * Math.random());
  });
}

export function fetchProfileDataWithTriviaRandomTime() {
  let userPromise = fetchUser();
  let postsPromise = fetchPosts();
  let triviaPromise = fetchTriviaRandomTime();
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise),
    trivia: wrapPromise(triviaPromise)
  };
}
