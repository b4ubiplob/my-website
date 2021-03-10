import React from "react";
import { Card, Button } from "react-bootstrap";
import { BASE_API_URL } from "../util/constants";

function Gallery({ gallery, onDeleteGallery }) {
  return (
    <Card className="painting" bg="dark" text="white">
      <Card.Img
        variant="top"
        src={BASE_API_URL + "/paintings/" + gallery.coverImageUrl}
        className="image"
      />
      <Card.Body>
        <Card.Title>{gallery.name}</Card.Title>
        <Card.Text>{gallery.description}</Card.Text>
        <Button variant="primary" href={"/gallery/" + gallery.id}>
          Update
        </Button>
        <Button
          variant="danger"
          className="painting-buttons"
          onClick={(event) => onDeleteGallery(event, gallery.id)}
        >
          Delete
        </Button>
        <Button
          variant="secondary"
          href={"/gallery/" + gallery.id + "/paintings"}
        >
          View
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Gallery;
