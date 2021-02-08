import React, { useEffect, useState } from "react";
import {
  getPainting,
  getAllGalleries,
  createPainting,
  updatePainting,
  getAllDimensions,
  createDimension
} from "../actions/resthandler";
import Form from "react-bootstrap/Form";
import ImageThumb from "./ImageThumb";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { BASE_API_URL } from "../util/constants";
import { Col, Row } from "react-bootstrap";
import { handleError } from "../util/errorutil";

function ManagePainting(props) {
  const [galleries, setGalleries] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [showDimensionDialog, setShowDimensionDialog] = useState(false);
  const [dimensions, setDimensions] = useState([]);
  const [painting, setPainting] = useState({
    name: "",
    file: "",
    description: "",
    galleryIds: [],
    dimensionId: ""
  });

  const [dimension, setDimension] = useState({
    length: 0,
    breadth: 0,
    unit: "cm"
  });

  useEffect(() => {
    const paintingId = props.match.params.id;
    let galleriesPromise = getAllGalleries();
    if (paintingId) {
      setIsEdit(true);
      let paintingPromise = getPainting(paintingId);
      Promise.all([galleriesPromise, paintingPromise]).then((results) => {
        setPainting(results[1]);
        for (let gallery of results[0]) {
          gallery.selected = results[1].galleryIds.includes(gallery.id);
        }
        setGalleries(results[0]);
      });
    } else {
      galleriesPromise.then((galleries) => setGalleries(galleries));
    }
    fetchDimensions();
  }, [props.match.params.id]);

  const fetchDimensions = () => {
    getAllDimensions().then((dimensions) => setDimensions(dimensions));
  };

  const handleUpload = (event) => {
    const updatedPainting = {
      ...painting,
      file: event.target.files[0]
    };
    setPainting(updatedPainting);
  };

  const handleChange = ({ target }) => {
    const updatedPainting = {
      ...painting,
      [target.name]: target.value
    };
    setPainting(updatedPainting);
  };

  const handleGallerySelect = (event, galleryId) => {
    const updatedGalleries = galleries;
    const galleryIds = painting.galleryIds;
    if (event.target.checked) {
      galleryIds.push(event.target.name);
      for (let gallery of updatedGalleries) {
        if (gallery.id === galleryId) {
          gallery.selected = true;
        }
      }
    } else {
      galleryIds.splice(
        galleryIds.findIndex((item) => item === event.target.name)
      );
      for (let gallery of updatedGalleries) {
        if (gallery.id === galleryId) {
          gallery.selected = false;
        }
      }
    }
    const updatedPainting = {
      ...painting,
      galleryIds: galleryIds
    };
    setPainting(updatedPainting);
    setGalleries(updatedGalleries);
  };

  const updateOldPainting = () => {
    updatePainting(painting.id, painting)
      .then(() => {
        console.log("updated the painting");
        props.history.push("/paintings");
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const openDimensionDialog = () => {
    setShowDimensionDialog(true);
  };

  const handleDimensionDialogClose = () => {
    const updatedDimension = { length: 0, breadth: 0, unit: "cm" };
    setShowDimensionDialog(false);
    setDimension(updatedDimension);
  };

  const handleDimensionChange = (event) => {
    const updatedDimension = {
      ...dimension,
      [event.target.name]: event.target.value
    };
    setDimension(updatedDimension);
  };
  const saveDimension = () => {
    createDimension(dimension)
      .then((data) => {
        console.log(data);
        toast.success("The dimension is successfully created");
        handleDimensionDialogClose();
        fetchDimensions();
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleDimensionIdChange = ({ target }) => {
    const updatedPainting = {
      ...painting,
      dimensionId: target.value
    };
    setPainting(updatedPainting);
  };

  const savePainting = () => {
    const data = new FormData();
    data.append("content", painting.file);
    data.append("name", painting.name);
    data.append("description", painting.description);
    data.append("galleryIds", painting.galleryIds);
    data.append("dimensionId", painting.dimensionId);

    createPainting(data)
      .then((data) => {
        console.log(data);
        props.history.push("/paintings");
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const validateForm = () => {
    if (!painting.name || painting.name === "") {
      toast.error("Name is required");
      return false;
    }
    if (!isEdit && (!painting.file || painting.file === "")) {
      toast.error("Painting  is required");
      return false;
    }
    if (!painting.galleryIds || painting.galleryIds.length === 0) {
      toast.error("One gallery is required");
      return false;
    }
    if (!painting.dimensionId || painting.dimensionId === "") {
      toast.error("Dimension is required");
      return false;
    }
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      isEdit ? updateOldPainting() : savePainting();
      console.log(painting);
    }
  };

  return (
    <>
      <h3>Manage Painting</h3>

      <div className="forms">
        <Form onSubmit={handleSubmit}>
          {!isEdit && (
            <>
              <Form.Group>
                <Form.Label>File:</Form.Label>
                <Form.File onChange={handleUpload} />
              </Form.Group>
              <Form.Group>
                {painting.file && <ImageThumb image={painting.file} />}
              </Form.Group>
            </>
          )}
          {isEdit && (
            <img
              src={BASE_API_URL + "/paintings/" + painting.url}
              alt={painting.name}
              className="thumb-medium"
            />
          )}
          <Form.Group>
            <Form.Label>Name</Form.Label>
            {isEdit && (
              <Form.Control
                type="text"
                onChange={handleChange}
                value={painting.name}
                name="name"
                readOnly
              />
            )}
            {!isEdit && (
              <Form.Control
                type="text"
                onChange={handleChange}
                value={painting.name}
                name="name"
              />
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              onChange={handleChange}
              value={painting.description}
              name="description"
            />
          </Form.Group>
          <Form.Row>
            <Col sm="1">
              <Form.Label>Galleries:</Form.Label>
            </Col>
            <Col sm="11">
              {galleries &&
                galleries.map((gallery) => {
                  return (
                    <Form.Check
                      inline
                      type="checkbox"
                      name={gallery.id}
                      checked={gallery.selected}
                      onChange={(event) =>
                        handleGallerySelect(event, gallery.id)
                      }
                      label={gallery.name}
                    />
                  );
                })}
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm="1">
              <Form.Label>Dimension:</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Control
                as="select"
                value={painting.dimensionId}
                onChange={handleDimensionIdChange}
              >
                <option>Select Dimension</option>
                {dimensions &&
                  dimensions.map((dimension) => {
                    return (
                      <option value={dimension.id}>
                        {dimension.length} X {dimension.breadth}{" "}
                        {dimension.unit}
                      </option>
                    );
                  })}
              </Form.Control>
            </Col>
            <Col sm="6">
              <Button variant="warning" onClick={openDimensionDialog}>
                Add Dimension
              </Button>
            </Col>
          </Form.Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <Modal show={showDimensionDialog} onHide={handleDimensionDialogClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Dimension</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Length
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  onChange={handleDimensionChange}
                  value={dimension.length}
                  name="length"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Breadth
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  onChange={handleDimensionChange}
                  value={dimension.breadth}
                  name="breadth"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Unit
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="select"
                  name="unit"
                  onChange={handleDimensionChange}
                >
                  <option value="cm">Centimetres</option>
                  <option value="inch">Inches</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDimensionDialogClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveDimension}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ManagePainting;
