import React, {
  useState,
  useTransition,
  Suspense
} from "react";

import { fetchProfileData } from "./fakeApi";

const initialResource = fetchProfileData(0);

export default function App() {
  const [tab, setTab] = useState("home");
  const [resource, setResource] = useState(
    initialResource
  );

  function showProfile(id) {
    setResource(fetchProfileData(id));
    setTab("profile");
  }

  let page;
  if (tab === "home") {
    page = <HomePage showProfile={showProfile} />;
  } else if (tab === "profile") {
    page = (
      <ProfilePage
        resource={resource}
        showProfile={showProfile}
      />
    );
  }
  return (
    <Suspense
      fallback={<h1>Loading the app...</h1>}
    >
      {page}
    </Suspense>
  );
}

function HomePage({ showProfile }) {
  return (
    <>
      <h1>Home Page</h1>
      <Button onClick={showProfile}>
        Open Profile
      </Button>
    </>
  );
}

function ProfilePage({ resource, showProfile }) {
  return (
    <>
      <ProfileDetails resource={resource} />
      <Button onClick={showProfile}>
        Refresh
      </Button>
      <Suspense
        fallback={<h2>Loading posts...</h2>}
      >
        <ProfileTimeline resource={resource} />
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
