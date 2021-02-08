import React, { useEffect, useState } from "react";
import { getAllGalleries, deleteGallery } from "../actions/resthandler";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { handleError } from "../util/errorutil";

function GalleryPage() {
  const [galleries, setGalleries] = useState([]);

  const fetchGalleries = () => {
    getAllGalleries().then((response) => setGalleries(response));
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const onDeleteGallery = (event, id) => {
    deleteGallery(id)
      .then(() => {
        toast.success("The galllery was successfully deleted");
        setGalleries(galleries.filter((gallery) => gallery.id !== id));
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <>
      <h1>Galleries</h1>
      <div className="right-align">
        <Button variant="primary" href="/gallery">
          Add a new Gallery
        </Button>
      </div>

      {!galleries || galleries.length === 0 ? (
        <div>No galleries found</div>
      ) : (
        <Table striped border hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {galleries &&
              galleries.map((gallery) => {
                return (
                  <tr>
                    <td>{gallery.name}</td>
                    <td>{gallery.description}</td>
                    <td>
                      <Link to={"/gallery/" + gallery.id}>Update</Link>
                    </td>
                    <td>
                      <Link
                        onClick={(event) => onDeleteGallery(event, gallery.id)}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default GalleryPage;
