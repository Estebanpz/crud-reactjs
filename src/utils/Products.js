export const getProductsFromLocalStorage = ()=>{
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [];
}

export const editProductInLocalStorage = (editProduct, setProducts) =>{
    const storedProducts = getProductsFromLocalStorage();
    const updatedProducts = storedProducts.map((product)=>{
        if(product.id === editProduct.id){
            return editProduct;
        }
        return product;
    })
    setProducts(updatedProducts);
}