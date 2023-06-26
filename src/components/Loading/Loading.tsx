import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <ScaleLoader color={'#cf9aff'} />
    </div>
  );
};

export default Loading;
