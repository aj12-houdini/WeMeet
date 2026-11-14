import { formatDate } from "../../../js/formatDate";

import PostAccordion from "../../Common/PostAccordion";

export default function PostItem({ canDelete, title, description, date, id, author }) {
  const formattedDate = formatDate(new Date(date));
  return (
    <PostAccordion author={author} canDelete={canDelete} id={id} date={formattedDate} title={title} description={description} />
  );
}
