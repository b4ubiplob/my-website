import React, { useEffect, useState } from "react";
import { getGallery, saveGallery } from "../actions/resthandler";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

function ManageGallery(props) {
  const [gallery, setGallery] = useState({
    id: null,
    name: "",
    description: ""
  });

  useEffect(() => {
    const galleryId = props.match.params.id;
    if (galleryId) {
      getGallery(galleryId).then((gallery) => setGallery(gallery));
    }
  }, [props.match.params.id]);

  const onChange = ({ target }) => {
    const updatedGallery = {
      ...gallery,
      [target.name]: target.value
    };
    setGallery(updatedGallery);
  };

  const validdateForm = () => {
    if (!gallery.name || gallery.name === "") {
      toast.error("Name of the gallery is required");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validdateForm()) {
      saveGallery(gallery)
        .then((data) => {
          console.log(data);
          props.history.push("/galleries");
        })
        .catch((error) => {
          console.log("there was an error" + error);
        });
    }
  };

  return (
    <>
      <h3>Manage Gallery</h3>
      <div className="forms">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={onChange}
              value={gallery.name}
              name="name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={gallery.description}
              onChange={onChange}
              name="description"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ManageGallery;
