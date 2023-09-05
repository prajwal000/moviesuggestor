import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, Container, Navbar } from "react-bootstrap";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";

const ViewMovies = () => {
  const getParams = useParams();
  const [movieData, setMovieData] = useState({});
  const getId = getParams.id;
  const getSingleMovieInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getId}`
      );
      setMovieData(response.data.singleMovieData);
    } catch (error) {
      alert("error");
    }
  };
  useEffect(() => {
    getSingleMovieInfo();
  }, []);
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
      <section className="container_desc my-5 p-5">
        <h2 className="text-center py-2">{movieData.name}</h2>
        <div className="text-center pb-3">
          <img alt="" src={movieData.image} width="300px" />
        </div>
        <p className="px-5 text-secondary"> {movieData.desc}</p>
        <p className="px-5 text-secondary">" {movieData.info} "</p>
      </section>

      <div>
        <br />
        <br />

        <br />
      </div>
    </>
  );
};
export default ViewMovies;
