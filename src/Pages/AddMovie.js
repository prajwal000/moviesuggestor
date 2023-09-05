import axios from "axios";
import { useRef } from "react";
import { Badge, Button, Container, Form, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddMovie = () => {
  const history = useHistory();
  const movie_Name_refrence = useRef();
  const movie_Rating = useRef();
  const movieDescription = useRef();
  const addMovieHandler = async (e) => {
    e.preventDefault();
    const movieData = {
      movie_name: movie_Name_refrence.current.value,
      rating: movie_Rating.current.value,
      description: movieDescription.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        {
          timeout: 10000,
        }
      );
      alert(response.data.message);
      history.replace("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("unknown error occured");
      }
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section className="bg-info py-5">
        <div className="container_form bg-body -teritiary ">
          <form onSubmit={addMovieHandler} className="p-5">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                ref={movie_Name_refrence}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="text"
                placeholder="Rating"
                ref={movie_Rating}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={9}
                placeholder="Description"
                ref={movieDescription}
              />
            </Form.Group>
            <Button variant="info" type="submit">
              Add Movie
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};
export default AddMovie;
