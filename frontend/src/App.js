import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import { AuthContextProvider } from "./MainContext";
import HomePage from "./components/Home/HomePage";
import Protected from "./Protected";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route
            path="/Home"
            element={
              <Protected>
                <HomePage />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
