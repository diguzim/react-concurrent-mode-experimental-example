import React, { useState, useEffect } from 'react';
import { fetchUser, fetchPosts, fetchNumberOfLikes } from './fakeApi';

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
        <ProfileDetails name={user.name} />
        <Likes posts={posts} />
      </div>
      <ProfileTimeline posts={posts} />
    </>
  );
}

// In this example to get the likes you need first to have the posts
function Likes({ posts }) {
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    if (!posts) return;
    fetchNumberOfLikes(posts).then(l => setLikes(l))
  }, [posts]);

  if (!likes) return <p>(...)</p>;

  return <p>({likes})</p>;
}

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

function ProfileDetails({name}) {
  return <h1>{name}</h1>;
}
