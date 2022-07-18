import React from "react";
import "./style.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postNewComment } from "../../store/category/thunks";

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
      <div className="wrapper">
        {showForm ? (
          <form onSubmit={onFormSubmit}>
            <div>
              <input
                type="text"
                value={text}
                className="comment-input"
                placeholder="Place for your comment*"
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-wrapper">
              <h2 className="button-title"> Post</h2>
            </button>
            <button onClick={() => setShowForm(false)} className="btn-wrapper">
              <h2 className="button-title">Discard</h2>
            </button>
          </form>
        ) : (
          <button onClick={() => setShowForm(true)} className="btn-wrapper">
            <h3 className="button-title"> Add a comment</h3>
          </button>
        )}
      </div>
    </div>
  );
}
