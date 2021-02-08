import React, { useState, useEffect } from "react";
import { getAllPaintings, deletePainting } from "../actions/resthandler";
import { Card, Modal, Image, Button } from "react-bootstrap";
import { BASE_API_URL } from "../util/constants";
import { toast } from "react-toastify";
import { handleError } from "../util/errorutil";

function PaintingPage() {
  const [paintings, setPaintings] = useState("");

  const [showPainting, setShowPainting] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState({});

  useEffect(() => {
    getAllPaintings().then((response) => setPaintings(response));
  }, []);

  const handlePaintingClick = (event, painting) => {
    setShowPainting(true);
    setSelectedPainting(painting);
  };

  const handlePaintingClose = () => {
    setShowPainting(false);
  };

  const removePainting = (event, id) => {
    deletePainting(id)
      .then(() => {
        toast.success("The painting was successfully deleted");
        setPaintings(paintings.filter((painting) => painting.id !== id));
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div>
      <h1>Paintings</h1>

      <div className="right-align">
        <Button variant="primary" href="painting">
          Add a new Painting
        </Button>
      </div>

      {!paintings || paintings.length === 0 ? (
        <p>No paintings found</p>
      ) : (
        <div className="painting-list">
          {paintings.map((painting) => {
            return (
              <Card className="painting" bg="dark" text="white">
                <Card.Img
                  variant="top"
                  src={BASE_API_URL + "/paintings/" + painting.url}
                  onClick={(event) => handlePaintingClick(event, painting)}
                  className="image"
                />
                <Card.Body>
                  <Card.Title>{painting.name}</Card.Title>
                  <Card.Text>
                    {painting.description}
                    <p>
                      {" "}
                      {painting.length} X {painting.breadth} {painting.unit}
                    </p>
                  </Card.Text>
                  <Button variant="primary" href={"/painting/" + painting.id}>
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    className="painting-buttons"
                    onClick={(event) => removePainting(event, painting.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
      <Modal show={showPainting} onHide={handlePaintingClose}>
        <Image
          src={BASE_API_URL + "/paintings/" + selectedPainting.url}
          fluid
        />
      </Modal>
    </div>
  );
}

export default PaintingPage;
