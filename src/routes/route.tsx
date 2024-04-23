import ProtectedPage from "../components/common/ProtectedPage";
import FavouriteList from "../pages/FavouriteList";
import HomePage from "../pages/HomePage";
import MovieDetail from "../pages/MovieDetail";
import MovieList from "../pages/MovieList";
import MovieSearch from "../pages/MovieSearch";
import PasswordUpdate from "../pages/PasswordUpdate";
import PersonDetail from "../pages/PersonDetail";
import ReviewList from "../pages/ReviewList";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export const routesGen = {
  home: "/",
  movieList: "/explore",
  movieDetail: (id: string) => `/movie/${id}`,
  movieSearch: "/search",
  person: (id: string) => `/person/${id}`,
  favouriteList: "/favourites",
  reviewList: "/reviews",
  passwordUpdate: "password-update",
  signUp: "/sign-up",
  signIn: "/sign-in",
};

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/person/:personId",
    element: <PersonDetail />,
    state: "person.detail",
  },

  {
    path: "/search",
    element: <MovieSearch />,
    state: "search",
  },

  {
    path: "/password-update",
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: "password.update",
  },

  {
    path: "/favourites",
    element: (
      <ProtectedPage>
        <FavouriteList />
      </ProtectedPage>
    ),
    state: "favourites",
  },

  {
    path: "/reviews",
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: "reviews",
  },

  {
    path: "/movies",
    element: <MovieList />,
    state: "movies",
  },

  {
    path: "/movie/:movieId",
    element: <MovieDetail />,
    state: "movies.detail",
  },
];

export const authRoutes = [
  {
    path: "/sign-in",
    element: <SignIn />,
    state: "sign-in",
  },

  {
    path: "/sign-up",
    element: <SignUp />,
    state: "sign-up",
  },
];

export default routes;
