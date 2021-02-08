import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import PaintingPage from "./pages/PaintingPage";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import ManageGallery from "./components/ManageGallery";
import ManagePainting from "./components/ManagePainting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">My Art Gallery</Navbar.Brand>
      </Navbar>
      <ToastContainer
        autoClose={3000}
        hideProgressBar
        position="top-right"
        closeOnClick
      />
      <Container fluid h-100>
        <Row h-100>
          <Col sm={2} className="sidebar">
            <Nav defaultActiveKey="/" className="flex-column">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/galleries">Galleries</Nav.Link>
              <Nav.Link href="/paintings">Paintings</Nav.Link>
            </Nav>
          </Col>
          <Col sm={10}>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/galleries" exact component={GalleryPage} />
              <Route path="/gallery" exact component={ManageGallery} />
              <Route path="/gallery/:id" component={ManageGallery} />
              <Route path="/paintings" exact component={PaintingPage} />
              <Route path="/painting" exact component={ManagePainting} />
              <Route path="/painting/:id" component={ManagePainting} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
