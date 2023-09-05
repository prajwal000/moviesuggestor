import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

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
      <br />
      <div>
        {movieData.name}
        <br />
        {movieData.desc}
        <br />
        <br />
        {movieData.info}
        <br />
        <img alt="" src={movieData.image} />
      </div>
    </>
  );
};
export default ViewMovies;
