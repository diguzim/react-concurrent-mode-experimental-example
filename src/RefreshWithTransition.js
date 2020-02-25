import React, {
  Suspense,
  useState,
  useTransition
} from "react";

import { fetchProfileDataTransition } from "./fakeApi";

const initialResource = fetchProfileDataTransition();

export default function ProfilePage() {
  const [
    startTransition,
    isPending
  ] = useTransition({
    // Wait 10 seconds before fallback
    timeoutMs: 10000
  });
  const [resource, setResource] = useState(
    initialResource
  );

  function handleRefreshClick() {
    startTransition(() => {
      setResource(fetchProfileDataTransition());
    });
  }

  return (
    <Suspense
      fallback={<h1>Loading profile...</h1>}
    >
      <ProfileDetails resource={resource} />
      <button
        onClick={handleRefreshClick}
        disabled={isPending}
      >
        {isPending ? "Refreshing..." : "Refresh"}
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
