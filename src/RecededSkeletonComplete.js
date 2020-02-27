import React, { useState, Suspense } from "react";

import { fetchProfileData } from "./fakeApi";

const initialResource = fetchProfileData();

export default function App() {
  const [tab, setTab] = useState("home");
  const [resource, setResource] = useState(
    initialResource
  );

  function showProfile() {
    setResource(fetchProfileData());
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
      <button onClick={showProfile}>
        Open Profile
      </button>
    </>
  );
}

function ProfilePage({ resource, showProfile }) {
  return (
    <>
      <ProfileDetails resource={resource} />
      <button onClick={showProfile}>
        Refresh
      </button>
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
