import { Link } from "react-router-dom";
import Title from "../components/Title";
import { useAccessToken } from "../context";

const Home = () => {
  const { actions } = useAccessToken();

  const handleClearButtonClick = () => {
    actions.delete();
  };

  return (
    <main className="py-8">
      <Title text="Home" />
      <ul className="flex flex-col gap-4">
        <li>
          <Link className="btn w-full" to="signup">
            /signup
          </Link>
        </li>
        <li>
          <Link className="btn w-full" to="signin">
            /signin
          </Link>
        </li>
        <li>
          <Link className="btn w-full" to="todo">
            /todo
          </Link>
        </li>
        <li>
          <button
            className="btn btn-error w-full"
            onClick={handleClearButtonClick}
          >
            Clear Local Storage
          </button>
        </li>
      </ul>
    </main>
  );
};

export default Home;
