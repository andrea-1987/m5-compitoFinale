import { ListGroup } from 'react-bootstrap'
import { SingleComment } from './SingleComment'

export const CommentList = ({ commentsToShow }) => (
  <ListGroup style={{ color: 'black' }} className="mt-2">
    {commentsToShow.map((comment) => (
      <SingleComment comment={comment} key={comment._id} />
    ))}
  </ListGroup>
)

