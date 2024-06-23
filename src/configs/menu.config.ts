import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import ForumIcon from "@mui/icons-material/Forum";
import PersonIcon from "@mui/icons-material/Person";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";

type MainProps = {
  display: string;
  path: string;
  icon: any;
  state: string;
};

const main: MainProps[] = [
  {
    display: "home",
    path: "/",
    icon: HomeOutlinedIcon,
    state: "home",
  },

  {
    display: "movies",
    path: "/movies",
    icon: SlideshowOutlinedIcon,
    state: "movies",
  },

  {
    display: "search",
    path: "/search",
    icon: SearchOutlinedIcon,
    state: "search",
  },

  {
    display: "subscription",
    path: "/subscription",
    icon: AppRegistrationIcon,
    state: "subscription",
  },
];

const user: MainProps[] = [
  {
    display: "profile",
    path: "/profile",
    icon: PersonIcon,
    state: "profile",
  },

  {
    display: "favourites",
    path: "/favourites",
    icon: FavoriteOutlinedIcon,
    state: "favourites",
  },

  // {
  //   display: "reviews",
  //   path: "/reviews",
  //   icon: RateReviewOutlinedIcon,
  //   state: "reviews",
  // },

  {
    display: "messages",
    path: "/message",
    icon: ForumIcon,
    state: "message",
  },
];

const admin: MainProps[] = [
  {
    display: "dashboard",
    path: "/admin/dashboard",
    icon: PollOutlinedIcon,
    state: "admin.dashboard",
  },

  {
    display: "user",
    path: "/admin/user",
    icon: Person4OutlinedIcon,
    state: "admin.user",
  },

  {
    display: "movie",
    path: "/admin/movie",
    icon: SlideshowOutlinedIcon,
    state: "admin.movie",
  },
];

const menuConfigs = { main, user, admin };

export default menuConfigs;
