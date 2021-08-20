import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/root/App';
import "bootstrap/dist/css/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/default.min.css";
import "./css/global.css";
import "./css/mobile.css";
import { Provider } from "react-redux"; 
import configureStore from "./redux/reducers/configureStore";
import { BrowserRouter } from "react-router-dom";

const store = configureStore();
console.log("Coded By MKZ");

ReactDOM.render(
  <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);
