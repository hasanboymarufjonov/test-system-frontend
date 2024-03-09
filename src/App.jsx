import "./App.css";
import Navbar from "./components/Navbar";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { Route, Routes } from "react-router-dom";
import TestList from "./pages/TestList.jsx";
import Test from "./pages/Test.jsx";
import CreateTest from "./pages/CreateTest.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/" element={<TestList />} />
          <Route path="/tests/:subjectId" element={<Test />} />
          <Route path="/tests/create-test" element={<CreateTest />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
