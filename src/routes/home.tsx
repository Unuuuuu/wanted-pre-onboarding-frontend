import { Link } from "react-router-dom";
import Title from "../components/Title";

const Home = () => {
  return (
    <main className="py-8">
      <Title text="Home" />
      <ul className="flex flex-col gap-4">
        <li>
          <Link className="btn w-full" to="signup">
            회원가입하기
          </Link>
        </li>
        <li>
          <Link className="btn w-full" to="signin">
            로그인하기
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default Home;
