import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="mx-auto w-full max-w-sm px-4">
      <Outlet />
    </div>
  );
};

export default Root;
