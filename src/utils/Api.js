import { request } from "../Auth";
const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

export const getItems = () => {
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addItem = ({ name, weather, imageUrl }) => {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  });
};

export const deleteItem = (selectedCard) => {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items/${selectedCard._id} `, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const addCardLike = (item) => {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items/${item._id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const removeCardLike = (item) => {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items/${item._id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
