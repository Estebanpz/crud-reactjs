import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "./ItemForm.css";
export default function ItemForm({
  addProduct,
  editProduct,
  setEditProduct,
  editProductInLocalStorage,
  setProducts,
}) {
  const [product, setProduct] = useState({
    name: editProduct ? editProduct.name : "",
    price: editProduct ? editProduct.price : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editProduct !== null) {
      console.log("Editando:", editProduct);
      if (editProduct.name.trim() === "" || editProduct.price === "") {
        Swal.fire({
          title: "Error",
          text: "Por favor, complete todos los campos.",
          icon: "error",
          confirmButtonColor: "#7c3aed",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      const updatedProduct = {
        ...editProduct,
        name: editProduct.name,
        price: parseFloat(editProduct.price),
      };
      // Actualizar el producto en el localStorage
      editProductInLocalStorage(updatedProduct, setProducts);

      Swal.fire({
        title: "¡Éxito!",
        text: "El producto ha sido editado correctamente.",
        icon: "success",
        confirmButtonColor: "#7c3aed",
        confirmButtonText: "Aceptar",
      });

      setEditProduct(null);
    } else {
      console.log("Estamos creando", product);
      if (product.name.trim() === "" || product.price === "") {
        Swal.fire({
          title: "Error",
          text: "Por favor, complete todos los campos.",
          icon: "error",
          confirmButtonColor: "#7c3aed",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      const newProduct = {
        id: Date.now(),
        name: product.name,
        price: parseFloat(product.price),
      };

      addProduct(newProduct);
      setProduct({ name: "", price: "" });

      Swal.fire({
        title: "¡Éxito!",
        text: "El producto ha sido agregado correctamente.",
        icon: "success",
        confirmButtonColor: "#7c3aed",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="form-container">
      <h3 className="mb-4">
        {editProduct != null ? "🖋️Editar Producto" : "➕ Agregar Producto"}
      </h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del Producto</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="Ingrese el nombre"
            value={editProduct != null ? editProduct.name : product.name}
            onChange={
              !editProduct
                ? (e) => setProduct({ ...product, name: e.target.value })
                : (e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            id="price"
            placeholder="Ingrese el precio"
            step="0.01"
            value={editProduct != null ? editProduct.price : product.price}
            onChange={
              !editProduct
                ? (e) => setProduct({ ...product, price: e.target.value })
                : (e) =>
                    setEditProduct({ ...editProduct, price: e.target.value })
            }
          />
        </Form.Group>

        <Button type="submit" className="btn-primary-custom w-100">
          {!editProduct ? "Agregar Producto" : "Editar Producto"}
        </Button>
      </Form>
    </div>
  );
}
