import React, { useState, useEffect } from "react";
import { getAllPaintings } from "../actions/resthandler";
import { Button } from "react-bootstrap";
import Painting from "../components/Painting";

function PaintingPage() {
  const [paintings, setPaintings] = useState("");

  useEffect(() => {
    getAllPaintings().then((response) => setPaintings(response));
  }, []);

  const onDeletePainting = (id) => {
    setPaintings(paintings.filter((painting) => painting.id !== id));
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

export default PaintingPage;
