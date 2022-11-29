import { useState, useEffect, useCallback } from "react";

import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api.js";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import CommentList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const { quoteId } = params;
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  let comments;
  if (status === "pending") {
    return (comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    ));
  }
  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    return (comments = <CommentList comments={loadedComments} />);
  }
  if (
    status === "completed" &&
    !loadedComments &&
    loadedComments.length === 0
  ) {
    return (comments = (
      <div className="centered">No Comments Were Added yet</div>
    ));
  }
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={params.quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      <p>Comments...</p>
    </section>
  );
};

export default Comments;
