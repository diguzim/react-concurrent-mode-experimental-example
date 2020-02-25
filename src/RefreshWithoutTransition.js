import React, { Suspense, useState } from "react";

import { fetchProfileDataTransition } from "./fakeApi";

const initialResource = fetchProfileDataTransition();

export default function ProfilePage() {
  const [resource, setResource] = useState(
    initialResource
  );

  function handleRefreshClick() {
    setResource(fetchProfileDataTransition());
  }

  return (
    <Suspense
      fallback={<h1>Loading profile...</h1>}
    >
      <ProfileDetails resource={resource} />
      <button onClick={handleRefreshClick}>
        Refresh
      </button>
      <Suspense
        fallback={<h1>Loading posts...</h1>}
      >
        <ProfileTimeline resource={resource} />
      </Suspense>
    </Suspense>
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
