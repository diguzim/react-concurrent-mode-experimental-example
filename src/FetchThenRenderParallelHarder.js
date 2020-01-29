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
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <h1>{user.name}</h1>
        <Likes posts={posts} />
      </div>
      <ProfileTimeline posts={posts} />
    </>
  );
}

function Likes({ posts }) {
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    if (!posts) return;

    setTimeout(
      () => {
        setLikes(12);
      },
      [1000]
    )
  }, [posts]);

  if (!likes) return <p>(...)</p>;

  return <p>({likes})</p>;
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
