import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// ===== Cart Slice =====
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToBag(state, action) {
      const res = state.find((e) => e.id === action.payload.id);
      if (!res) {
        state.push(action.payload);
      }
    },
    deleteCartData(state, action) {
      return state.filter((e) => e.id !== action.payload);
    },
  },
});

// ===== Auth Slice =====
const initialAuthState = {
    user: JSON.parse(localStorage.getItem("currentUser")) || null,
    isLoggedIn: !!localStorage.getItem("currentUser"),
    users: JSON.parse(localStorage.getItem("users")) || [], // all registered users
  };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    register: (state, action) => {
        const exists = state.users.find(u => u.email === action.payload.email);
        if (exists) {
          alert("User already registered!");
          return;
        }
      
        state.user = action.payload;
        state.isLoggedIn = true;
        state.users.push(action.payload);
      
        localStorage.setItem("users", JSON.stringify(state.users));
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
      },
      
      login: (state, action) => {
        const foundUser = state.users.find(u => u.email === action.payload.email && u.password === action.payload.password);
      
        if (foundUser) {
          state.user = foundUser;
          state.isLoggedIn = true;
          localStorage.setItem("currentUser", JSON.stringify(foundUser));
        } else {
          toast.error("User not found or wrong password!"); // you can use toast instead
        }
      },
      
      logout: (state) => {
        state.user = null;
        state.isLoggedIn = false;
        localStorage.removeItem("currentUser"); // fix here
      },
      
  },
});

// ===== Exports =====
export const { addToBag, deleteCartData } = cartSlice.actions;
export const { register, login, logout } = authSlice.actions;

export const cartReducer = cartSlice.reducer;
export const authReducer = authSlice.reducer;
