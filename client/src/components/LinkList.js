import React from "react";
import LinkListItem from "./LinkListItem";

const LinkList = ({ links }) => (
  <div>
    {links.length > 0
      ? links.map(link => <LinkListItem key={link.id} {...link} />)
      : "Nothing here yet..."}
  </div>
);

export default LinkList;
