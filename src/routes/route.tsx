import ProtectedPage from "../components/common/ProtectedPage";
import AdminDashboard from "../pages/AdminDashboard";
import AdminMoviePage from "../pages/AdminMoviePage";
import AdminUserPage from "../pages/AdminUserPage";
import ChatPage from "../pages/ChatPage";
import FavouriteList from "../pages/FavouriteList";
import HomePage from "../pages/HomePage";
import MovieDetail from "../pages/MovieDetail";
import MovieList from "../pages/MovieList";
import MovieSearch from "../pages/MovieSearch";
import PersonDetail from "../pages/PersonDetail";
import Profile from "../pages/Profile";
import ReviewList from "../pages/ReviewList";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Subscription from "../pages/Subscription";
import WatchingPage from "../pages/WatchingPage";

export const routesGen = {
  home: "/",
  movieList: "/explore",
  movieDetail: (id: string) => `/movie/${id}`,
  movieSearch: "/search",
  person: (id: string) => `/actor/${id}`,
  favouriteList: "/favourites",
  reviewList: "/reviews",
  signUp: "/sign-up",
  signIn: "/sign-in",
  profile: "/profile",
  message: "/message",
  dashboard: "/admin/dashboard"
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

  {
    path: "/movie/watch/:movieId",
    element: <WatchingPage />,
    state: "movies.watch",
  },

  {
    path: "/profile",
    element: <Profile />,
    state: "profile",
  },

  {
    path: "/subscription",
    element: <Subscription />,
    state: "subscription",
  },

  {
    path: "/message",
    element: <ChatPage />,
    state: "message",
  },

  {
    path: "/actor/:actorId",
    element: <PersonDetail />,
    state: "actor",
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

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    state: "admin.dashboard",
  },

  {
    path: "/admin/movie",
    element: <AdminMoviePage />,
    state: "admin.movie",
  },

  {
    path: "/admin/user",
    element: <AdminUserPage />,
    state: "admin.user",
  },
];

export default routes;
