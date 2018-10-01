import React from "react";
import ReactDOM from "react-dom";
import PriceCheck from "./components/PriceCheck/PriceCheck";
import { Provider } from "react-redux";
import store from "./store/store";

const app = document.getElementById('app');
ReactDOM.render(<Provider store={store}><PriceCheck/></Provider>, app);