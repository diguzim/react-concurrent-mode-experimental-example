import React, { Suspense } from "react";

import { fetchProfileDataWithTriviaRandomTime } from "./fakeApi";

const initialResource = fetchProfileDataWithTriviaRandomTime();

export default function() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ProfilePage resource={initialResource} />
    </Suspense>
  );
}

function ProfilePage({ resource }) {
  return (
    <>
      <ProfileDetails resource={resource} />
      <Suspense
        fallback={<h2>Loading posts...</h2>}
      >
        <ProfileTimeline resource={resource} />
      </Suspense>
      <Suspense
        fallback={<h2>Loading fun facts...</h2>}
      >
        <ProfileTrivia resource={resource} />
      </Suspense>
    </>
  );
}

function ProfileDetails({ resource }) {
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline({ resource }) {
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

function ProfileTrivia({ resource }) {
  const trivia = resource.trivia.read();
  return (
    <>
      <h2>Fun Facts</h2>
      <ul>
        {trivia.map(fact => (
          <li key={fact.id}>{fact.text}</li>
        ))}
      </ul>
    </>
  );
}
