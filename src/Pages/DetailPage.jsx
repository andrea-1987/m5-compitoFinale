import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {CommentArea} from "../components/comment/CommentArea";
import { useState, useEffect } from "react";
import { Loader } from "../components/loader/Loading";

export const DetailPage = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [someError, setSomeError] = useState(null);

  const { asin } = useParams()
  
  useEffect(() => {
  const getDetailBook = async () => {
      setLoading(true);
      try {
          const response = await fetch(`https://epibooks.onrender.com/${asin}`);
          const data = await response.json();
          setBook(data.at(0));
        } catch (error) {
            setSomeError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    getDetailBook();
  }, [asin]);

  return (
    <>
      {someError && <div>Ops.... Something went wrong</div>}
      {loading && !someError && (
        <div>
          <Loader /> Loading...
        </div>
      )}

      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Img variant="top" src={book && book.img} />
            <Card.Body>
              <Card.Title style={{ color: "black" }}>{book && book.title}</Card.Title>
            </Card.Body>
          </Card>
          <CommentArea asin={asin} />
        </Col>
      </Row>
    </>
  );
};
