import React, {
  useState,
  useTransition,
  useDeferredValue,
  Suspense
} from "react";

import { fetchProfileDataByUserId } from "./fakeApi";

function getNextId(id) {
  return id === 3 ? 0 : id + 1;
}

const initialResource = fetchProfileDataByUserId(0);

export default function () {
  const [resource, setResource] = useState(
    initialResource
  );
  const [
    startTransition,
    isPending
  ] = useTransition({
    timeoutMs: 3000
  });
  return (
    <>
      <button
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            const nextUserId = getNextId(
              resource.userId
            );
            setResource(
              fetchProfileDataByUserId(nextUserId)
            );
          });
        }}
      >
        Next
      </button>
      {isPending ? " Loading..." : null}
      <ProfilePage resource={resource} />
    </>
  );
}

function ProfilePage({ resource }) {
  const deferredResource = useDeferredValue(
    resource,
    {
      timeoutMs: 1000
    }
  );
  return (
    <Suspense
      fallback={<h1>Loading profile...</h1>}
    >
      <ProfileDetails resource={resource} />
      <Suspense
        fallback={<h1>Loading posts...</h1>}
      >
        <ProfileTimeline
          resource={deferredResource}
          isStale={deferredResource !== resource}
        />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails({ resource }) {
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline({ isStale, resource }) {
  const posts = resource.posts.read();
  return (
    <ul style={{ opacity: isStale ? 0.4 : 1 }}>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
