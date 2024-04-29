import { useState, useEffect, Suspense } from "react";
import { useParams, Link, NavLink, Outlet } from "react-router-dom";
import { filmIdData } from "../../api-movies";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState();
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setError(false);
        setLoading(true);
        const response = await filmIdData(movieId);
        setMovie(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return;
  }

  const { title, genres, overview, vote_average, poster_path } = movie;
  // const userScore = `${vote_average * 10}%`;
  const userScore = `${Math.round(vote_average * 10)}%`;

  return (
    <div className={css.container}>
      <Link className={css.linkHome} to="/">
        Go Back
      </Link>
      <div className={css.wrap}>
        <div className={css.img}>
          <img
            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
            alt={title}
          />
        </div>

        <div className={css.info}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.score}>User Score: {userScore}</p>
          <h3 className={css.overviewTitle}>Overview:</h3>
          <p className={css.overview}>{overview}</p>
          <h3 className={css.genresTitle}>Genres:</h3>
          <p className={css.genres}>
            {genres.map((genre) => genre.name).join(" ")}
          </p>
        </div>
      </div>
      <ul className={css.moreInfo}>
        <NavLink className={css.link} to="cast">
          Cast{" "}
        </NavLink>
        <NavLink className={css.link} to="reviews">
          Reviews
        </NavLink>
      </ul>
      <div>
        <Suspense
          fallback={
            <div>
              <p>Loading...</p>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
