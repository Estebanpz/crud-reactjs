
# CRUD React.js

This project is a CRUD development in React.js.
It was developed using the following technologies:

- [React.js](https://react.dev/)
- [Bootstrap@5.3.8](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [React-bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction)
- [sweetalert2](https://sweetalert2.github.io/)

<img width="1169" height="615" alt="Image" src="https://github.com/user-attachments/assets/5e90d35a-e1ec-47be-a1c1-69a235e7d14f" />


I'm using the **Local Storage** API to store data. This is a simple project where I wanted to try storing a list of products to perform basic operations: Create, Read, Update, and Delete. 

## Create ( Product ):
First, this method was create in the App.jsx where it's passed as a function and prop called _'addProduct'_. This method receives an object as a param to create a new product in the LocalStorage.

```
const addProduct = (product) => {
    setProducts([...products, product]);
  };
```

## Read ( Products ):
This method get all the products stored in the **Local Storage**

```
useEffect(() => {
    const storedproducts = localStorage.getItem("products");
    if (storedproducts) {
      setProducts(JSON.parse(storedproducts));
    }
  }, []);
```

## Update ( Product by Id):
This method finds the product by Id in  LocalStorage to retrieve it, and then is updated with the new details you provide via props.
The following param to "editProduct" is the function that it will update the state of the page.
```
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
```
## Delete ( Product ):
This method filter in the all products by id prop.
```
 const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };
```

Thanks for read this basic documentation, and too I apologize for my errors writing in English, since my language native is Spanish.




## Author

- [Github - EstebanPz](https://github.com/Estebanpz)


## Feedback

If you have any feedback, please reach out to us at estebanpaezl90@gmail.com

