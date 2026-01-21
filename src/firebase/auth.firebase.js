import { app } from "./firebase";
import { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut } from "firebase/auth";

const auth = getAuth(app);

export const registerWithEmailAndPassword = async (email, password) => {
    try {
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw new Error(error);
    };
};

export const loginWithEmailAndPassword = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw new Error(error);
    }
};

export const logOut = async () => {
    return await signOut(auth);
};