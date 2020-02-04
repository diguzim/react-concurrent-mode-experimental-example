import React, { useState, useEffect } from 'react';
import { fetchUser, fetchPosts } from './fakeApi';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchUser().then(u => setUser(u));
  }, []);

  useEffect(() => {
    fetchPosts().then(p => setPosts(p));
  }, []);

  if (user === null) {
    return <p>Loading profile...</p>;
  }
  return (
    <>
      <ProfileDetails name={user.name} /> {/* Luckly this doesn't break due to the return above */}
      <ProfileTimeline posts={posts} />
    </>
  );
}

// The child doesn't trigger fetching anymore
function ProfileTimeline({ posts }) {
  if (posts === null) {
    return <h2>Loading posts...</h2>;
  }
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

// Neither this one
function ProfileDetails({name}) {
  return <h1>{name}</h1>;
}
