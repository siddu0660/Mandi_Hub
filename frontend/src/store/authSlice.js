import { createSlice } from "@reduxjs/toolkit";
import { ref, set, get } from "firebase/database";
import { database } from "../components/firebase";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: false,
        uid: "",
        name: "",
        email: "",
        type: "",
        contact: "",
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setContact: (state, action) => {
            state.contact = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setUserProfile: (state, action) => {
            const { name, email, contact, type, uid } = action.payload;
            state.status = true;
            state.uid = uid;
            state.name = name;
            state.email = email;
            state.contact = contact;
            state.type  = type;
        },
        resetAuth: (state) => {
            state.status = false;
            state.uid = "";
            state.name = "";
            state.email = "";
            state.contact = "";
            state.type = "";
        },
    },
});

export const fetchUserProfile = (uid) => async (dispatch) => {
    try {
        const userRef = ref(database, "users/" + uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
        const userData = snapshot.val();
        dispatch(setUserProfile({uid,...userData}));
        } else {
        console.log("No user data available.");
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
};

export const getUserProfile = async (uid) => {
  try {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val(); // Return the fetched user data
    } else {
      console.log("No user data available.");
      return null; // Return null if no data exists
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error; // Re-throw the error for handling upstream if needed
  }
};

export const updateUserProfile = (userData, uid) => async (dispatch) => {
    try {
        const userRef = ref(database, "users/" + uid);

        await set(userRef, userData);
        dispatch(setUserProfile(userData));
    } catch (error) {
        console.error("Error updating user profile:", error);
    }
};

export const {
    setStatus,
    setContact,
    setEmail,
    setName,
    setUserProfile,
    resetAuth
} = authSlice.actions;
export default authSlice.reducer;
