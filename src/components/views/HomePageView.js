import { Link } from "react-router-dom";

const HomePageView = () => {
  return (
    <div>
      <h6>Assignment 3</h6>
      <Link to={"/employees"}> All Employees </Link>
      <Link to={"/tasks"}> All Task </Link>
    </div>
  );
};

export default HomePageView;
