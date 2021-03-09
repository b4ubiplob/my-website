import { BASE_API_URL } from "../util/constants";

export const getAllGalleries = () => {
  return getAllCall(BASE_API_URL + "/galleries");
};

export const getAllPaintings = () => {
  return getAllCall(BASE_API_URL + "/paintings");
};

export const getAllDimensions = () => {
  return getAllCall(BASE_API_URL + "/dimensions");
};

export const getAllPaintingsOfGallery = (gallleryId) => {
  return getAllCall(BASE_API_URL + "/galleries/" + gallleryId + "/paintings");
};

export const getAllCall = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const saveGallery = (data) => {
  const method = data.id ? "PUT" : "POST";
  const url = data.id
    ? BASE_API_URL + "/galleries/" + data.id
    : BASE_API_URL + "/galleries";

  const requestOptions = {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

export const createDimension = (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };

  return fetch(BASE_API_URL + "/dimensions", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

export const deleteCall = (url) => {
  const requestOptions = {
    method: "DELETE"
  };
  return fetch(url, requestOptions).then((response) => {
    if (!response.ok) {
      throw response;
    }
  });
};

export const deleteGallery = (id) => {
  return deleteCall(BASE_API_URL + "/galleries/" + id);
};

export const deletePainting = (id) => {
  return deleteCall(BASE_API_URL + "/paintings/" + id);
};

const getCall = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const getGallery = (id) => {
  return getCall(BASE_API_URL + "/galleries/" + id);
};

export const getPainting = (id) => {
  return getCall(BASE_API_URL + "/paintings/" + id);
};

export const createPainting = (data) => {
  return fetch(BASE_API_URL + "/paintings", {
    method: "POST",
    body: data
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response;
    })
    .then((data) => {
      return data;
    });
};

export const updatePainting = (id, data) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };

  return fetch(BASE_API_URL + "/paintings/" + id, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
};
