import { useState } from "react";
import { search } from "../../js/utils";
import SearchedUser from "../UserProfile/searched_user";

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [query, changeQuery] = useState("");
  const [userData, changeData] = useState([]);

  async function searchUsers(value) {
    if (value === "") {
      changeData([]);
      return;
    }
    setLoading(true);
    const response = await search(`http://localhost:8000/search/user/${value}`);
    setLoading(false);
    changeData(response);
  }

  function changeHandler(e) {
    searchUsers(e.target.value);
    changeQuery(e.target.value);
  }

  const noResults = query !== "" && !loading && userData && userData.length === 0;

  return (
    <div className="search">
      <input
        className="search__input"
        type="search"
        value={query}
        onChange={changeHandler}
        name="user"
        placeholder="Search by username…"
        aria-label="Search users by username"
      />
      {noResults && <p className="search__hint">No users found</p>}
      {userData && (
        <div className="search__results">
          {userData.map((data) => (
            <SearchedUser
              key={data._id}
              id={data._id}
              email={data.email}
              username={data.username}
              post={data.post}
              following={data.following}
              followers={data.followers}
            />
          ))}
        </div>
      )}
    </div>
  );
}
