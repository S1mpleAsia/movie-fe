import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";

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
];

const user: MainProps[] = [
  {
    display: "favourites",
    path: "/favourites",
    icon: FavoriteOutlinedIcon,
    state: "favourites",
  },

  {
    display: "reviews",
    path: "/reviews",
    icon: RateReviewOutlinedIcon,
    state: "reviews",
  },

  {
    display: "password update",
    path: "/password-update",
    icon: LockResetOutlinedIcon,
    state: "password.update",
  },
];

const menuConfigs = { main, user };

export default menuConfigs;
