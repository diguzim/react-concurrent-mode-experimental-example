import React, { Suspense, useState } from 'react';
import { fetchProfileDataByUserId } from './fakeApi';

// This is not a Promise. It's a special object from our Suspense integration.
const initialResource = fetchProfileDataByUserId(0);

function getNextId(id) {
  return id === 3 ? 0 : id + 1;
}

export default function SomeWrapperThatControlsTheUserNavigation() {
  const [resource, setResource] = useState(initialResource);

  return (
    <>
      <button
        onClick={() => {
          const nextUserId = getNextId(
            resource.userId
          );
          setResource(
            fetchProfileDataByUserId(nextUserId)
          );
        }}
      >
        Next
      </button>
      <ProfilePage resource={resource} />
    </>
  );
}

function ProfilePage({ resource }) {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails({ resource }) {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

  function ProfileTimeline({ resource }) {
  // Try to read posts, although they might not have loaded yet
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
