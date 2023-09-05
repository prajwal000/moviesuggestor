import axios from "axios";
import { useRef } from "react";
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
