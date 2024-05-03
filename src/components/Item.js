import React from "react";
const BaseUrl='http://localhost:4000/items'
function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleDeleteClick() {
    fetch(`${BaseUrl}/${item.id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(() => onDeleteItem(item));
  }

  function handleAddToCartClick() {
    fetch(`${BaseUrl}/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((resp) => resp.json())
      .then((updatedItem) => onUpdateItem(updatedItem));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;