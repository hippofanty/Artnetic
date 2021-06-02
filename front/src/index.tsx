import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
// import { rootReducer } from "./redux/reducers/rootReducer";
import { initialState } from "./redux/init/index";
// import TodoSagaWatcher from "./redux/saga/TodoSaga";
import thunk from "redux-thunk";
import { userReducer } from "./redux/reducers/userReducer";


const store = createStore(
  userReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
