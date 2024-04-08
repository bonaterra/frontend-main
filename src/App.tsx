import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import MissingRoute from "./components/hocs/MissingRoute/MissingRoute";
import ProtectedRoute from "./components/hocs/ProtectedRoute/ProtectedRoute";
import AdsPage from "./pages/Ads/Ads";
import LoginPage from "./pages/Login";
import { selectUser, setUser } from "./state/userSlice";
import { User } from "./types/user";
import { getLocalStorage } from "./utils/localStorage";
import TvPage from "./pages/TV/Tv";

const App = () => {
  const dispatch = useDispatch();
  const userState = useSelector(selectUser);
  useEffect(() => {
    const getUserData = async () => {
      const user: User = await getLocalStorage("user");
      if (!user) return;
      dispatch(setUser(user));
    };

    if (!userState) {
      getUserData();
    }
  }, [dispatch, userState]);

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="ads">
          <Route index element={<AdsPage />} />
        </Route>
        <Route path="*" element={<MissingRoute path={"/ads"} />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="tv" element={<TvPage />} />
      <Route path="*" element={<MissingRoute path="/login" />} />
    </Routes>
  );
};

export default App;
