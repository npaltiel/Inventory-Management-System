import SearchBar from "./SearchBar";
import AddItem from "./AddItem";
import ItemsDisplay from "./ItemsDisplay";
import { useState, useEffect } from "react";

function App() {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({ items: [] });

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => setData({ items: data }));
  }, []);

  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  };

  const deleteItem = (item) => {
    const items = data["items"];
    const requestOptions = {
      method: "DELETE",
    };
    fetch(`http://localhost:3000/items/${item.id}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          const idx = items.indexOf(item);
          items.splice(idx, 1);
          setData({ items: items });
        }
      }
    );
  };

  const addItemToData = (item) => {
    let items = data["items"];

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };

    fetch("http://localhost:3000/items", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        items.push(data);
        setData({ items: items });
      });
  };

  const filterData = (data) => {
    const filteredData = [];

    if (filters.name == null) {
      return data;
    }

    for (const item of data) {
      if (!item.name.toLowerCase().includes(filters.name.toLowerCase())) {
        continue;
      }

      if (filters.price != "" && item.price * 1 > filters.price * 1) {
        continue;
      }

      if (!item.type.toLowerCase().includes(filters.type.toLowerCase())) {
        continue;
      }

      if (!item.brand.toLowerCase().includes(filters.brand.toLowerCase())) {
        continue;
      }

      filteredData.push(item);
    }

    return filteredData;
  };

  return (
    <div className="container">
      <div className="row mt-2">
        <ItemsDisplay
          deleteItems={deleteItem}
          items={filterData(data["items"])}
        />
      </div>
      <div className="row mt-2">
        <SearchBar updateSearchParams={updateFilters} />
      </div>
      <div className="row mt-2">
        <AddItem addItem={addItemToData} />
      </div>
    </div>
  );
}

export default App;
