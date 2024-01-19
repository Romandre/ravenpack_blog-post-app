import { useCallback, useContext } from "react";
import { DataContext } from "../DataProvider";
import { Link } from "react-router-dom";

import "../assets/css/Header.css";

function Header() {
  const { posts, selectUser } = useContext(DataContext);
  const users = [...new Set(posts.map((post) => post.userId))];

  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      selectUser(event.target.value);
    },
    [selectUser]
  );

  if (!posts) {
    return null;
  }

  return (
    <div className="header">
      <div className="header-wrapper">
        <Link to={"/"} className="logo">
          <span>RK Blogi</span> {/*Logo placeholder*/}
        </Link>
        <div className="user-select">
          <span>Filter blogs by user id</span>
          <select name="users" onChange={handleSelect}>
            <option value="">All users</option>
            {users &&
              users.map((user) => (
                <option value={user} key={user}>
                  User {user}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Header;
