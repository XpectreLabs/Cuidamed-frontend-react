import React from "react";
import AppRouter from "./routers/AppRouter";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
