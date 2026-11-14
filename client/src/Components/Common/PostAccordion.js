import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import "bootstrap/dist/css/bootstrap.css";
import { deepPurple, indigo, teal, orange, pink, red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { postApi } from "../../js/api/PostApi";

const avatarColors = [deepPurple[500], indigo[500], teal[600], orange[700], pink[500]];

function initials(name = "") {
  return name.slice(0, 2).toUpperCase() || "?";
}

function avatarColor(name = "") {
  let sum = 0;
  for (const char of name) sum += char.charCodeAt(0);
  return avatarColors[sum % avatarColors.length];
}

export default function PostAccordion(props) {
  async function handleClick() {
    await postApi.delete(props.id);
    window.location.href = "/dashboard/profile";
  }
  return (
    <Accordion className="post-card" disableGutters>
      <AccordionSummary
        className="feed"
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`post-${props.id}-content`}
        id={`post-${props.id}-header`}
      >
        <Avatar sx={{ bgcolor: avatarColor(props.author) }}>
          {initials(props.author)}
        </Avatar>
        <div className="post-card__meta">
          <span className="post-card__title">{props.title}</span>
          <span className="post-card__byline">
            {props.author} · {props.date}
          </span>
        </div>
      </AccordionSummary>
      <AccordionDetails className="accordion-details">
        <Typography>{props.description}</Typography>
        {props.canDelete && (
          <DeleteIcon
            onClick={handleClick}
            className="delete"
            sx={{ color: red[600] }}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
}
