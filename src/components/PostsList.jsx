import { useState, useEffect } from "react";
import Post from "./Post";
import classes from "./PostsLists.module.css";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:8080/posts");
        const responseData = await response.json();
        setPosts(responseData.posts);
        setIsFetching(false);
      } catch (e) {
        setIsFetching(false);
      }
    }
    fetchPosts();
  }, []);

  function addPostHandler(postData) {
    try {
      fetch("http://localhost:8080/posts", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPosts((existingPosts) => [postData, ...existingPosts]);
    } catch (e) {}
  }

  return (
    <>
      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post, key) => (
            <Post key={key} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {!isFetching && posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
      {isFetching && (
        <div style={{ textAlign: "center", color: "white" }}>
          <p>Loading posts...</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
