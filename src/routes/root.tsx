import { Link, Outlet } from "react-router-dom";
import { useAccessToken } from "../context";

const Root = () => {
  const { accessToken } = useAccessToken();
  const isSignedIn = !!accessToken;

  return (
    <div className="mx-auto w-full max-w-sm px-4 pt-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="btn btn-sm btn-primary">
          Home
        </Link>
        <nav>
          <ul className="flex gap-2">
            {isSignedIn ? (
              <li>
                <Link to="/todo" className="btn btn-sm">
                  TODO
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/signin" className="btn btn-sm">
                    로그인
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="btn btn-sm">
                    회원가입
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default Root;
