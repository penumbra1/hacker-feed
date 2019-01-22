import React, { Component } from "react";
import { createPortal } from "react-dom";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import Feed from "./Feed";
import LinkListItem from "./LinkListItem";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { FEED_SEARCH_QUERY } from "../graphql";
import LinkList from "./LinkList";

const searchButtonStyles =
  "button code f6 truncate link dim pointer bg-transparent ba b--light-purple light-purple br1 ph3 pv2 mv2 db w-100 mw4-5";

const SearchButton = ({ onClick, text, className = "" }) =>
  createPortal(
    <button
      className={`${searchButtonStyles} ${className}`}
      aria-label="Edit search"
      onClick={onClick}
    >
      {text}
    </button>,
    document.querySelector("#searchButtonPortal")
  );

class Search extends Component {
  state = {
    links: [],
    searchTerm: "",
    showResults: false
  };

  toggleSearchResults = e => {
    e.preventDefault();
    this.setState(({ showResults }) => ({ showResults: !showResults }));
  };

  showSearchInput = () => {
    this.setState({ showResults: false });
  };

  updateSearchTerm = e => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { filter, searchTerm, showResults, links } = this.state;
    if (showResults) {
      return (
        <>
          <SearchButton text={searchTerm} onClick={this.toggleSearchResults} />
          <Feed query={FEED_SEARCH_QUERY} variables={{ filter: searchTerm }} />
        </>
      );
    }
    return (
      <Form onSubmit={this.toggleSearchResults}>
        <Input
          labelText="URL or keyword"
          id="searchTerm"
          type="text"
          required
          minLength={3}
          value={searchTerm}
          onChange={this.updateSearchTerm}
        />
        <Button aria-label="Search" type="submit">
          Search
        </Button>
      </Form>
    );
  }
}

export default withApollo(Search);
