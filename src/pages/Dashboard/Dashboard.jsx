import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../../components/Sidebar.jsx";
import ItemForm from "../../components/ItemForm.jsx";
import ItemList from "../../components/ItemList.jsx";
import { editProductInLocalStorage } from "../../utils/Products.js";
import "./Dashboard.css";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const isFirstRender = useRef(true);
  const [editProduct, setEditProduct] = useState(null);

  // Cargar los products desde el localStorage
  useEffect(() => {
    const storedproducts = localStorage.getItem("products");
    if (storedproducts) {
      setProducts(JSON.parse(storedproducts));
    }
  }, []);

  useEffect(() => {
    // Evitar que se guarde en el primer render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Container className="py-5">
          <h1 className="mb-5">📦 CRUD ReactJS</h1>
          <div className="row">
            <div className="col-lg-4 mb-4">
              <ItemForm
                addProduct={addProduct}
                editProduct={editProduct}
                setEditProduct={setEditProduct}
                editProductInLocalStorage={editProductInLocalStorage}
                setProducts={setProducts}
              />
            </div>
            <div className="col-lg-8">
              <ItemList
                products={products}
                deleteProduct={deleteProduct}
                setEditProduct={setEditProduct}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
