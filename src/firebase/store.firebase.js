import { db } from "./firebase";
import { doc, setDoc, getDocs, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
// Save a product to a specific store's
export const saveProduct = async (storeId, product) => {
    try {
        const docRef = doc(db, `stores/${storeId}/products`);
        return await setDoc(docRef, product);
    } catch (error) {
        throw new Error("Error saving product:" + error);
    };
};

// GET a products from a specific store's
export const getProductsByStore = async (storeId) => {
    try {
        const docsRef = doc(db, `stores/${storeId}/products`);
        return await getDocs(docsRef);
    } catch (error) {
        throw new Error("Error getting products:" + error);
    }
};
// GET product by ID from a specific store's
export const getProductById = async (storeId, productId) => {
    try {
        const docRef = doc(db, `stores/${storeId}/products/${productId}`);
        return await getDoc(docRef);
    } catch (error) {

    };
};
// DELETE product by ID
export const deleteProduct = async (storedId, productId) => {
    try {
        const docRef = doc(db, `stores/${storedId}/products/${productId}`);
        return await deleteDoc(docRef);
    } catch (error) {
        throw new Error("Error deleting product" + error)
    };
};

// SAVE user information to Firestore
export const saveUserInfo = async (userId, userInfo) => {
    try {
        const docRef = doc(db, `users/${userId}`);
        return await setDoc(docRef, userInfo);
    } catch (error) {
        throw new Error("Error saving user info:" + error);
    };
};

// GET user information
export const getUserInfo = async (userId) => {
    const docRef = doc(db, `users/${userId}`)
    return await getDoc(docRef);
};

// UPDATE user information
export const updateUserInfo = async (userId, updatedInfo) => {
    try {
        const docRef = doc(db, `users/${userId}`);
        return await updateDoc(docRef, updatedInfo);
    } catch (error) {
        throw new Error("Error updating user info:" + error)
    };
};