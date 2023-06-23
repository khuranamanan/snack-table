import { useState } from "react";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";

export default function SnacksTable({ snacks }) {
  const [searchKey, setSearchKey] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const tableHeaders = [
    { column: "id", label: "ID", sortable: true },
    { column: "product_name", label: "Product Name", sortable: true },
    { column: "product_weight", label: "Product Weight", sortable: true },
    { column: "price", label: "Price (In INR)", sortable: true },
    { column: "calories", label: "Calories", sortable: true },
    { column: "ingredients", label: "Ingredients", sortable: false },
  ];

  const handleSearch = (event) => {
    setSearchKey(event.target.value);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const filteredSnacks = snacks.filter(
    (snack) =>
      snack.product_name.toLowerCase().includes(searchKey.toLowerCase()) ||
      snack.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchKey.toLowerCase())
      )
  );

  const sortedSnacks = [...filteredSnacks].sort((a, b) => {
    const columnA = a[sortColumn];
    const columnB = b[sortColumn];

    if (columnA === columnB) return 0;

    if (sortOrder === "asc") {
      if (typeof columnA === "string") {
        return columnA.localeCompare(columnB);
      } else {
        return columnA - columnB;
      }
    } else {
      if (typeof columnB === "string") {
        return columnB.localeCompare(columnA);
      } else {
        return columnB - columnA;
      }
    }
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by product name or ingredients..."
          className="px-2 py-1 w-96 border border-gray-300 rounded"
          value={searchKey}
          onChange={handleSearch}
        />
      </div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header.column}
                className={`py-2 px-3 select-none cursor-pointer text-left border border-gray-300 ${
                  sortColumn === header.column &&
                  "font-bold flex justify-start items-center"
                }`}
                onClick={() => handleSort(header.column)}
              >
                {header.label}{" "}
                {header.sortable &&
                  sortColumn === header.column &&
                  sortOrder === "asc" && <TbTriangleFilled className="ml-1" />}
                {header.sortable &&
                  sortColumn === header.column &&
                  sortOrder === "desc" && (
                    <TbTriangleInvertedFilled className="ml-1" />
                  )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedSnacks.map((snack) => (
            <tr key={snack.id}>
              <td className="py-2 px-3 border border-gray-300">{snack.id}</td>
              <td className="py-2 px-3 border border-gray-300">
                {snack.product_name}
              </td>
              <td className="py-2 px-3 border border-gray-300">
                {snack.product_weight}
              </td>
              <td className="py-2 px-3 border border-gray-300">
                {snack.price}
              </td>
              <td className="py-2 px-3 border border-gray-300">
                {snack.calories}
              </td>
              <td className="py-2 px-3 border border-gray-300">
                {snack.ingredients.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
