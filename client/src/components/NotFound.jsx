import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="flex justify-center items-center font-semibold text-6xl gap-4 antialiased text-violet-500">
          <h1 >404</h1><span>|</span><h1 >Page not found</h1>
        </div>
      </div>
    </>
  );
};

export default NotFound;
