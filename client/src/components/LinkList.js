import React, { Component } from "react";
import LinkListItem from "./LinkListItem";

class LinkList extends Component {
  componentDidMount() {
    this.props.subscribe();
  }

  render() {
    return (
      <div>
        {this.props.links.length > 0
          ? this.props.links.map(link => (
              <LinkListItem key={link.id} {...link} />
            ))
          : "Nothing here yet..."}
      </div>
    );
  }
}

export default LinkList;
