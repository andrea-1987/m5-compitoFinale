import { useEffect, useState } from 'react';
import { CommentList } from './CommentList';
import { AddComment } from './AddComment';
import { Loader } from '../loader/Loading';
import { Error } from '../Error';
import { SingleComment } from './SingleComment';

export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxZGNiNDRjNTllYzAwMTk5MGQ5NDAiLCJpYXQiOjE3MDkzMDA5MTYsImV4cCI6MTcxMDUxMDUxNn0.yVctJ5RC5E3MnCjvjiZR1DTY4a6uqSEjrjws92B9-mA";

export const CommentArea = ({ asin }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [updateComments, setUpdateComments] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/comments/${asin}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const comment = await response.json();
          setComments(comment);
          setIsLoading(false);
          setIsError(false);
        } else {
          setIsLoading(false);
          setIsError(true);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    if (asin) {
      getComments();
    }
  }, [asin, updateComments]);

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
    setUpdateComments((prev) => !prev);
  };

  const handleCommentDeleted = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
    setUpdateComments((prev) => !prev);
    console.log('Commento eliminato con successo:', commentId);
  };

  return (
    <div className="text-center">
      {isLoading && <Loader />}
      {isError && <Error />}
      <AddComment onCommentAdded={handleCommentAdded} asin={asin} />
      <CommentList commentsToShow={comments} />
      {comments.map((comment) => (
        <SingleComment
          key={comment._id}
          comment={comment}
          onCommentDeleted={handleCommentDeleted}
        />
      ))}
    </div>
  );
};
