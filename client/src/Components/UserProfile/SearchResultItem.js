import "../../css/UserProfile/user.css";

export default function SearchResultItem(props) {
  function handleClick() {
    window.location.href = `/dashboard/users/${props.id}`;
  }

  return (
    <button type="button" onClick={handleClick} className="searched-user">
      <span className="searched-user__avatar">
        {props.username.slice(0, 1).toUpperCase()}
      </span>
      <span className="searched-user__name">{props.username}</span>
    </button>
  );
}
