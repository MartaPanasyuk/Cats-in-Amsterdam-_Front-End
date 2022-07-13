import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
import { Routes, Route } from "react-router-dom";
import { Navigation, MessageBox } from "./components";
import { HomePage, Login, SignUp, CatRadar } from "./pages";
import CatPageDetails from "./pages/CatPageDetails";
import AddCatForm from "./components/AddCatForm";
import MySpace from "./pages/MySpace";
import CataLog from "./pages/CataLog";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      <MessageBox />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cats/:id" element={<CatPageDetails />} />
        <Route path="/catRadar" element={<CatRadar />} />
        <Route path="/CataLog" element={<CataLog />} />
        <Route path="/addCat" element={<AddCatForm />} />
        <Route path="/cats/me" element={<MySpace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
