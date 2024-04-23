import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";

type ProtectedPageProps = {
  children: JSX.Element;
};

const ProtectedPage = ({ children }: ProtectedPageProps) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(setAuthModalOpen(!user));
  }, [user, dispatch]);

  return user ? children : null;
};

export default ProtectedPage;
