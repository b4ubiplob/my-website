import React, { useEffect, useState } from "react";
import { getAllPaintingsOfGallery, getGallery } from "../actions/resthandler";
import Painting from "../components/Painting";

function GalleryViewPage(props) {
  const [paintings, setPaintings] = useState("");
  const [gallery, setGallery] = useState("");

  useEffect(() => {
    const id = props.match.params.id;
    if (id) {
      getGallery(id).then((gallery) => setGallery(gallery));
      getAllPaintingsOfGallery(id).then((paintings) => setPaintings(paintings));
    }
  }, [props.match.params.id]);

  const onDeletePainting = (id) => {
    setPaintings(paintings.filter((painting) => painting.id !== id));
  };

  return (
    <div>
      <h1>Paintings of {gallery.name}</h1>

      {!paintings || paintings.length === 0 ? (
        <p>No paintings found</p>
      ) : (
        <div className="painting-list">
          {paintings.map((painting) => {
            return (
              <Painting
                painting={painting}
                onDeletePainting={onDeletePainting}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GalleryViewPage;
