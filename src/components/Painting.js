import React, { useState } from "react";
import { Card, Modal, Image, Button } from "react-bootstrap";
import { BASE_API_URL } from "../util/constants";
import { handleError } from "../util/errorutil";
import { deletePainting, saveGallery } from "../actions/resthandler";
import { toast } from "react-toastify";

function Painting({ painting, onDeletePainting, gallery }) {
  const [showPainting, setShowPainting] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState({});

  const handlePaintingClick = (event, painting) => {
    setShowPainting(true);
    setSelectedPainting(painting);
  };

  const removePainting = (event, id) => {
    deletePainting(id)
      .then(() => {
        toast.success("The painting was successfully deleted");
        onDeletePainting(id);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const updateGalleryCover = (event, url) => {
    gallery.coverImageUrl = url;
    saveGallery(gallery)
      .then((data) => {
        console.log(data);
        toast.success("The cover pic was updated");
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handlePaintingClose = () => {
    setShowPainting(false);
  };

  return (
    <>
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
          {gallery && (
            <Button
              variant="secondary"
              className="painting-buttons"
              onClick={(event) => updateGalleryCover(event, painting.url)}
            >
              Make Cover
            </Button>
          )}
        </Card.Body>
      </Card>
      <Modal show={showPainting} onHide={handlePaintingClose}>
        <Image
          src={BASE_API_URL + "/paintings/" + selectedPainting.url}
          fluid
        />
      </Modal>
    </>
  );
}

export default Painting;
