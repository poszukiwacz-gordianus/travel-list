import { useState } from "react";
import Item from "./item";

export default function PackingList({
  items,
  onDeleteItems,
  onToogleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  switch (sortBy) {
    case "input":
      sortedItems = items;
      break;

    case "description":
      sortedItems = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));

      break;

    case "packed":
      sortedItems = items
        .slice()
        .sort((a, b) => Number(b.packed) - Number(a.packed));

      break;

    default:
      break;
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToogleItem={onToogleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={items.length ? onClearList : null}>Clear list</button>
      </div>
    </div>
  );
}
