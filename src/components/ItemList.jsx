import React from "react";
import Swal from "sweetalert2";
import "./ItemList.css";
import { formatPrices } from "../utils/formatPrices";
export default function ItemList({ products, deleteProduct, setEditProduct }) {
  const handleDelete = (id, productName) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el producto "${productName}". Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#7c3aed',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El producto ha sido eliminado correctamente.',
          icon: 'success',
          confirmButtonColor: '#7c3aed',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  };


  return (
    <div className="list-container">
      <h2>📋 Lista de Productos</h2>
      {products && products.length > 0 ? (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <div className="product-info">
                <span className="product-name">{product.name}</span>
                <span className="product-price">{formatPrices(product.price)}</span>
              </div>
              <button
                className="btn-delete"
                onClick={() => handleDelete(product.id, product.name)}
              >
                🗑️ Eliminar
              </button>
              <button
                className="btn-edit"
                onClick={()=> setEditProduct(product)}
              >
                🖋️ Editar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-message">
          <div className="empty-icon">📭</div>
          <p>No hay productos agregados aún. ¡Crea el primero!</p>
        </div>
      )}
    </div>
  );
}
