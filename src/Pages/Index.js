import axios from "axios";
import { useEffect, useState } from "react";
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
      <div>
        <div>
          <Link to="/add">Add Movie</Link>

          {localStorage.getItem("accesstoken") ? (
            <>
              <Link to="/profile">Profile</Link>
            </>
          ) : (
            <div>
              <Link to="/login"> login</Link>
            </div>
          )}
        </div>
        <input
          type="text"
          value={searchMovieText}
          placeholder="search movies"
          onChange={(e) => setSearchMovieText(e.target.value)}
        />
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

        <div style={{ background: "#cccccc", padding: "10px" }}>
          {loading ? <>loading...</> : <></>}
          {loading && movies.length < 1 ? (
            <div>No movies found</div>
          ) : (
            <div>
              {movies.map((a) => {
                return (
                  <div key={a.id}>
                    <Link to={`/view/${a.id}`}>
                      <span style={{ fontWeight: "bolder" }}> {a.name}</span>
                    </Link>
                    <br />
                    <img
                      src={a.image}
                      alt="movie-img"
                      style={{ height: "100px" }}
                    />
                    <br />
                    Info:{a.info}
                    <br />
                    {a.rating}
                    <hr />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <section></section>
    </>
  );
};
export default Index;
