import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import PaintingPage from "./pages/PaintingPage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import ManageGallery from "./components/ManageGallery";
import ManagePainting from "./components/ManagePainting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import GalleryViewPage from "./pages/GalleryViewPage";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer
        autoClose={3000}
        hideProgressBar
        position="top-right"
        closeOnClick
      />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/galleries" exact component={GalleryPage} />
        <Route path="/gallery" exact component={ManageGallery} />
        <Route path="/gallery/:id/paintings" component={GalleryViewPage} />
        <Route path="/gallery/:id" component={ManageGallery} />
        <Route path="/paintings" exact component={PaintingPage} />
        <Route path="/painting" exact component={ManagePainting} />
        <Route path="/painting/:id" component={ManagePainting} />
      </Switch>
    </Router>
  );
}

export default App;
