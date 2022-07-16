import React from "react";
import "./style.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postNewComment } from "../../store/cat/thunks";

export default function CommentForm() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewComment(text));
    setText("");
  };

  return (
    <div>
      <>
        {showForm ? (
          <form onSubmit={onFormSubmit}>
            <div>
              <label>Text</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button type="submit" className="Btn">
              Post
            </button>
            <button onClick={() => setShowForm(false)} className="Btn">
              Discard
            </button>
          </form>
        ) : (
          <button onClick={() => setShowForm(true)} className="Btn">
            Add a comment
          </button>
        )}
      </>
    </div>
  );
}
