import { useEffect, useState } from "react";

type Item = {
  _id: string; // ✅ MongoDB id
  name: string;
  price: number;
};

const API = "http://localhost:5000/api";

function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [editId, setEditId] = useState<string | null>(null);

  // ✅ GET ITEMS FROM BACKEND
  const fetchItems = async () => {
    const res = await fetch(`${API}/items`);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ✅ ADD / UPDATE
  const handleAddOrUpdate = async () => {
    if (!name) {
      alert("Enter item name");
      return;
    }

    if (editId) {
      // UPDATE
      await fetch(`${API}/items/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price }),
      });
      setEditId(null);
    } else {
      // ADD
      await fetch(`${API}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price }),
      });
    }

    setName("");
    setPrice(0);
    fetchItems(); // refresh
  };

  // ✅ EDIT
  const handleEdit = (item: Item) => {
    setName(item.name);
    setPrice(item.price);
    setEditId(item._id);
  };

  // ✅ DELETE
  const handleDelete = async (id: string) => {
    await fetch(`${API}/items/${id}`, {
      method: "DELETE",
    });

    fetchItems();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📦 Water Purifier Items</h2>

      {/* FORM */}
      <div className="card shadow p-3 mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          <div className="col-md-4">
            <button
              className={`btn w-100 ${editId ? "btn-warning" : "btn-primary"}`}
              onClick={handleAddOrUpdate}
            >
              {editId ? "Update Item" : "Add Item"}
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow">
        <div className="card-body table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center">
                    No Items
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Items;
