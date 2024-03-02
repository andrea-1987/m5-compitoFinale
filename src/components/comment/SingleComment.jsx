import { Button, ListGroup } from 'react-bootstrap';
import { token } from './CommentArea';

export const SingleComment = ({ comment, onCommentDeleted }) => {
  const deleteComment = async (id) => {
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' + id,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        alert('La recensione è stata eliminata!');
        if (onCommentDeleted) {
          onCommentDeleted(id);
        }
      } else {
        throw new Error('La recensione non è stata eliminata!');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ListGroup.Item>
      {comment.comment}
      <Button
        variant="danger"
        className="ms-2"
        onClick={() => deleteComment(comment._id)}
      >
        Elimina
      </Button>
    </ListGroup.Item>
  );
};
