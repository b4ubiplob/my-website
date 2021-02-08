import React from "react";

function ImageThumb({ image }) {
  return (
    <img
      src={URL.createObjectURL(image)}
      alt={image.name}
      className="thumb-small"
    />
  );
}

export default ImageThumb;
