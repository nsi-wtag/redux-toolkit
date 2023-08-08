import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

function PostsList () {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if(postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let renderedContent;

  if(postsStatus === "loading") {
    renderedContent = <p>Loading...</p>;
  } else if(postsStatus === "failed") {
    renderedContent = <p>{error}</p>;
  } else if(postsStatus === "succeeded") {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    
    renderedContent = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  }
  
  return (
    <section>
      <h2>Posts</h2>
      {renderedContent}
    </section>
  );
}

export default PostsList;
