import { Col, Row } from "react-bootstrap";
import { MyCard } from "../components/card/MyCard";
import { CommentArea } from "../components/comment/CommentArea";
import { Loader } from "../components/loader/Loading";
import { useState,useEffect } from "react";

export const HomePage = ({ searchQuery }) => {
  const [selected, setSelected] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [someError, setSomeError] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://epibooks.onrender.com/");
        const data = await response.json();
        setBooks(data);
        
      } catch (error) {
        setSomeError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getBooks();
  }, []);

  return (
    <>
      {someError && <div>Ops...Something went wrong</div>}
      {loading && !someError && <Loader />}
      {!loading && !someError && (
        <Row>
          <Col md={8}>
            <Row className="g-2 mt-3">
              {books
                .filter((b) => b.title.toLowerCase().includes(searchQuery))
                .map((book) => {
                  return (
                    <Col xs={12} md={4} key={book.asin}>
                      <MyCard
                        key={book.asin}
                        book={book}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </Col>
                  );
                })}
            </Row>
          </Col>
          <Col md={4}>
            <CommentArea asin={selected} />
          </Col>
        </Row>
      )}
    </>
  );
};
