import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

function AddPostForm() {
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [postAddRequestStatus, setPostAddRequestStatus] = useState("idle");

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  const canSave = [title, content, userId].every(Boolean) && postAddRequestStatus === "idle";

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleUserIdChange = (e) => setUserId(e.target.value);
  const handlePostSave = () => {
    if(canSave) {
      try {
        setPostAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId})).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.log("Failed to save the post!");
      } finally {
        setPostAddRequestStatus("idle");
      }
    }
  };

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
      
        <button type="button" onClick={handlePostSave} disabled={!canSave}>Save Post</button>
      </form>
    </section>
  );
}

export default AddPostForm;
