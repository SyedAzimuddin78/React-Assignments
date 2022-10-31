import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { BubblyContainer } from "react-bubbly-transitions";
import { Provider } from "react-redux";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import store from "./redux/store/store";
import Todolist from "./components/Todo/Todolist";
import Header from "./components/Header/Header";
import "./App.css";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          {" "}
          <Header />
          <main className="main-section">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/todo" element={<Todolist />} />
              <Route path="/About" element={<About />} />
              <Route path="/Contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
