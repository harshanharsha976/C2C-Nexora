import { useState } from "react";
import { orders } from "../store/orderStore";
import type { Order } from "../store/orderStore";
import { items } from "../store/itemStore"; // 🔥 IMPORT ITEMS

function Orders() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [orderList, setOrderList] = useState<Order[]>(orders);
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddOrUpdate = () => {
    if (!product) {
      alert("Select product");
      return;
    }

    if (editId !== null) {
      // ✏️ UPDATE
      const index = orders.findIndex((o) => o.id === editId);

      if (index !== -1) {
        orders[index] = {
          ...orders[index],
          product,
          quantity,
        };
      }

      setEditId(null);
    } else {
      // ➕ ADD
      const newOrder: Order = {
        id: Date.now(),
        product,
        quantity,
      };

      orders.push(newOrder);
    }

    setOrderList([...orders]);
    setProduct("");
    setQuantity(1);
  };

  const handleEdit = (order: Order) => {
    setProduct(order.product);
    setQuantity(order.quantity);
    setEditId(order.id);
  };

  const handleDelete = (id: number) => {
    const index = orders.findIndex((o) => o.id === id);

    if (index !== -1) {
      orders.splice(index, 1);
      setOrderList([...orders]);
    }
  };

  return (
    <div>
      <h2>Orders CRUD</h2>

      {/* 🔥 DROPDOWN FROM ITEMS */}
      <select value={product} onChange={(e) => setProduct(e.target.value)}>
        <option value="">Select Item</option>
        {items.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <br />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <br />

      <button onClick={handleAddOrUpdate}>
        {editId !== null ? "Update Order" : "Add Order"}
      </button>

      <hr />

      <ul>
        {orderList.map((order) => (
          <li key={order.id}>
            {order.product} - Qty: {order.quantity}{" "}
            <button onClick={() => handleEdit(order)}>Edit</button>{" "}
            <button onClick={() => handleDelete(order.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
