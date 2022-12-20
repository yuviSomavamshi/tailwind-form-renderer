import { withJsonFormsMasterListItemProps } from "@jsonforms/react";
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@mui/material";
import IconRenderer from "../util/IconRenderer";

const ListWithDetailMasterItem = ({ index, childLabel, selected, handleSelect, removeItem, path }) => {
  return (
    <ListItem button selected={selected} onClick={handleSelect(index)}>
      <ListItemAvatar>
        <Avatar aria-label="Index">{index + 1}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={childLabel} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={removeItem(path, index)} size="large">
          <IconRenderer icon="Delete" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default withJsonFormsMasterListItemProps(ListWithDetailMasterItem);
