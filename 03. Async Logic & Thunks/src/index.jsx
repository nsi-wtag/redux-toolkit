import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { fetchUsers } from "./features/users/usersSlice.js";
import App from "./App.jsx";
import "./index.css";

store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
