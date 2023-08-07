import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

function AddPostForm() {
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  const isValidPost = Boolean(title) && Boolean(content) && Boolean(userId);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handlePostSave = () => {
    if(title && content) {
      dispatch(postAdded(title, content, userId));

      setTitle("");
      setContent("");
      setUserId("");
    }
  };
  const handleUserIdChange = (e) => setUserId(e.target.value);

  return (
    <section>
      <h2>Add a New Post</h2>
      
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={handleTitleChange} />

        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={handleUserIdChange}>
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Post Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={handleContentChange} />
      
        <button type="button" onClick={handlePostSave} disabled={!isValidPost}>Save Post</button>
      </form>
    </section>
  );
}

export default AddPostForm;
