import axios from "axios";
import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Navbar,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Index = () => {
  const [errorText, setErrorText] = useState("");
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchMovieText, setSearchMovieText] = useState("");
  const [searhErrorText, setsearchErrorText] = useState();
  const [loading, setLoading] = useState(false);
  const [firstrun, setFirstRun] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);
  useEffect(() => {
    const fetchTimer = setTimeout(() => {
      if (!firstrun) {
        if (searchMovieText && searchMovieText.length > 2) {
          fetchMovies();
        } else if (searchMovieText.length < 1) {
          fetchMovies();
        } else {
          setsearchErrorText("please enter at least 3 character");
        }
      }
    }, 1000);

    // //cleanup function

    return () => {
      clearTimeout(fetchTimer);
    };
  }, [searchMovieText]);

  const fetchMovies = async () => {
    setLoading(true);
    //fetch resource
    setsearchErrorText();
    try {
      const response = await axios.get(
        ` https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovieText}`
      );

      setMovies(response.data.moviesData);
      setIsError(false);
      setLoading(false);
      setFirstRun(false);
    } catch (error) {
      setIsError(true);
      setErrorText("cannot get movies data");
      setLoading(false);
      setFirstRun(false);
    }
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <Link to="/" className="text-decoration-none">
              <span className="text-info me-2 ">Movie</span>
              <Badge bg="info">Suggestor</Badge>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end  gap-4">
            <Navbar.Text>
              <Link to="/" className="text-info text-decoration-none">
                Home
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link to="/add" className="text-info text-decoration-none">
                Add Movie
              </Link>
            </Navbar.Text>
            <Navbar.Text className="text-info">
              {localStorage.getItem("accesstoken") ? (
                <span>
                  <Link
                    to="/profile"
                    className="text-info text-decoration-none"
                  >
                    Profile
                  </Link>
                </span>
              ) : (
                <div>
                  <Link to="/login" className="text-info text-decoration-none">
                    Login
                  </Link>
                </div>
              )}
            </Navbar.Text>
            <Navbar.Text>
              <input
                type="text"
                value={searchMovieText}
                placeholder="search movies"
                onChange={(e) => setSearchMovieText(e.target.value)}
                className="border border-info p-2 rounded"
              />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section>
        <div>
          {loading ? <>loading...</> : <></>}
          {loading && movies.length < 1 ? (
            <div>No movies found</div>
          ) : (
            <Container>
              <div>
                <Row>
                  {movies.map((a) => {
                    return (
                      <Col key={a.id}>
                        <Card style={{ width: "18rem" }}>
                          <Card.Img variant="top" src={a.image} />
                          <Card.Body>
                            <Card.Title className="text-info">
                              {a.name}
                            </Card.Title>
                            <Card.Text className="p-2">{a.info}</Card.Text>
                            <Card.Text>{a.rating}</Card.Text>

                            <Link to={`view/${a.id}`}>
                              <Button variant="dark">View Details</Button>
                            </Link>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Container>
          )}
        </div>
      </section>

      <div>
        <span style={{ background: "red" }}>{searhErrorText}</span>
        <br />

        {isError ? (
          <div>
            <div
              style={{
                background: "red",
                color: "white",
                padding: "10px",
                margin: "10px",
              }}
            >
              {errorText}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};
export default Index;
