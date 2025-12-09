import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 size={50} className="animate-spin" />
    </div>
  );
};

export default Loader;
