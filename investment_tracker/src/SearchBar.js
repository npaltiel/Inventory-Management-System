import { useState } from "react";

function SearchBar(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");

  const searchMade = (value, state, setUpdate) => {
    setUpdate(value);

    let searchParams = {
      name: name,
      price: price,
      type: type,
      brand: brand,
    };

    searchParams[state] = value;

    props.updateSearchParams(searchParams);
  };

  return (
    <div className="container">
      <div className="row">
        <h2>Search for an Item</h2>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="name-field">Name:</label>
          <input
            id="name-field"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => {
              searchMade(e.target.value, "name", setName);
            }}
          />
        </div>
        <div className="col">
          <label htmlFor="price-field">Max Price:</label>
          <input
            id="price-field"
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => {
              searchMade(e.target.value, "price", setPrice);
            }}
          />
        </div>
        <div className="col">
          <label htmlFor="type-field">Type</label>
          <input
            id="type-field"
            type="text"
            className="form-control"
            value={type}
            onChange={(e) => {
              searchMade(e.target.value, "type", setType);
            }}
          />
        </div>
        <div className="col">
          <label htmlFor="brand-field">Brand:</label>
          <input
            id="brand-field"
            type="text"
            className="form-control"
            value={brand}
            onChange={(e) => {
              searchMade(e.target.value, "brand", setBrand);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
