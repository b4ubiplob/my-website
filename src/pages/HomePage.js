import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

function HomePage() {
  return (
    <div>
      <Jumbotron>
        <h1>Welcome to my Art Gallery</h1>
        <p>This is my online art gallery. </p>
        <p>
          <Button variant="primary" href="/paintings">
            View Paintings
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default HomePage;
