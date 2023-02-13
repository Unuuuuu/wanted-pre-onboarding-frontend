import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import { useAccessToken } from "../context";

const Home = () => {
  const { accessToken, actions } = useAccessToken();

  const handleClearButtonClick = () => {
    if (accessToken === null) {
      toast("토큰이 저장되어 있지 않습니다.");
      return;
    }

    toast("토큰을 제거했습니다.");
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
            로컬 스토리지에서 액세스 토큰 제거하기
          </button>
        </li>
      </ul>
    </main>
  );
};

export default Home;
