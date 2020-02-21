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
    }, 2000 * Math.random());
  });
}
