import axios from "axios";
import { useRef } from "react";
import { Badge, Container, Navbar } from "react-bootstrap";
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
              <Link to="/add" className="text-info text-decoration-none">
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
      <Link to="/">Home</Link>
      <br />
      <br />
      <form onSubmit={addMovieHandler}>
        MovieName
        <br />
        <input
          type="text"
          placeholder="Movie Name"
          ref={movie_Name_refrence}
        ></input>
        <br></br>
        Rating
        <br />
        <input type="text" placeholder="rating" ref={movie_Rating}></input>
        <br></br>
        Description
        <br />
        <textarea rows="10" cols="10" ref={movieDescription}></textarea>
        <br />
        <br />
        <button type="submit">submit</button>
      </form>
    </>
  );
};
export default AddMovie;
