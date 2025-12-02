import React from "react";
import Router from "./routes/Router";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Router />
    </div>
  );
};

export default App;
