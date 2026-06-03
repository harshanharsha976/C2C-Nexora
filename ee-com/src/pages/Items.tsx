import { useEffect, useState } from "react";

type Item = {
  id: string;
  name: string;
  price: number;
};

const API = "http://localhost:5000/api";

function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const res = await fetch(`${API}/items`);

        if (!res.ok) {
          throw new Error("Failed to fetch items");
        }

        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    loadItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API}/items`);

      if (!res.ok) {
        throw new Error("Failed to fetch items");
      }

      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!name || price <= 0) {
      alert("Enter item name and price");
      return;
    }

    try {
      if (editId) {
        await fetch(`${API}/items/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            price,
          }),
        });

        setEditId(null);
      } else {
        await fetch(`${API}/items`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            price,
          }),
        });
      }

      setName("");
      setPrice(0);

      fetchItems();
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  const handleEdit = (item: Item) => {
    setName(item.name);
    setPrice(item.price);
    setEditId(item.id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await fetch(`${API}/items/${id}`, {
        method: "DELETE",
      });

      fetchItems();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📦 Water Purifier Items</h2>

      
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-2">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Item Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-5">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            <div className="col-md-2">
              <button
                className={`btn w-100 ${
                  editId ? "btn-warning" : "btn-primary"
                }`}
                onClick={handleAddOrUpdate}
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Price</th>
                <th style={{ width: "180px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No Items Found
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
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
