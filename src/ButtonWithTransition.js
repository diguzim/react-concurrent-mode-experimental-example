import React, {
  Suspense,
  useState,
  useTransition
} from "react";

import { fetchProfileDataTransition } from "./fakeApi";

const initialResource = fetchProfileDataTransition();

function Button({ children, onClick }) {
  const [
    startTransition,
    isPending
  ] = useTransition({
    timeoutMs: 10000
  });

  function handleClick() {
    startTransition(() => {
      onClick();
    });
  }

  const spinner = (
    <span
      className="fa fa-circle-o-notch fa-spin"
      style={{
        marginLeft: 4,
        fontSize: "small",
        visibility: isPending
          ? "visible"
          : "hidden"
      }}
    />
  );

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isPending}
      >
        {children}
      </button>
      {isPending ? spinner : null}
    </>
  );
}

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
      <Button onClick={handleRefreshClick}>
        Refresh
      </Button>
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
