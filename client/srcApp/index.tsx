/*import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

import "./index.css";
import App from "./App";
import PostList from "./pages/PostList";

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PostList />
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
*/

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from "./App";
import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
);
