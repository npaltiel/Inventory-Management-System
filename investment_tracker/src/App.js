import SearchBar from "./SearchBar";
import AddItem from "./AddItem";
import ItemsDisplay from "./ItemsDisplay";
import { useState } from "react";

function App() {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({ items: [] });

  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  };

  const addItemToData = (item) => {
    let items = data["items"];
    item.id = items.length;
    items.push(item);
    setData({ items: items });
    console.log(data);
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
        <ItemsDisplay items={filterData(data["items"])} />
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
