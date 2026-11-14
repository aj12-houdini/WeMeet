import { useState } from "react";
import { searchUsers } from "../../js/searchUsers";
import SearchResultItem from "../UserProfile/SearchResultItem";
import { API_BASE_URL } from "../../js/config";

export default function UserSearch() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function runSearch(value) {
    if (value === "") {
      setResults([]);
      return;
    }
    setLoading(true);
    const response = await searchUsers(`${API_BASE_URL}search/user/${value}`);
    setLoading(false);
    setResults(response);
  }

  function handleQueryChange(e) {
    runSearch(e.target.value);
    setQuery(e.target.value);
  }

  const noResults = query !== "" && !loading && results && results.length === 0;

  return (
    <div className="search">
      <input
        className="search__input"
        type="search"
        value={query}
        onChange={handleQueryChange}
        name="user"
        placeholder="Search by username…"
        aria-label="Search users by username"
      />
      {noResults && <p className="search__hint">No users found</p>}
      {results && (
        <div className="search__results">
          {results.map((user) => (
            <SearchResultItem
              key={user._id}
              id={user._id}
              email={user.email}
              username={user.username}
              post={user.post}
              following={user.following}
              followers={user.followers}
            />
          ))}
        </div>
      )}
    </div>
  );
}
