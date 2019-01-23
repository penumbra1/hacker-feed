import React, { Component } from "react";
import { createPortal } from "react-dom";
import Feed from "./Feed";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";

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
    searchTerm: "",
    showResults: false
  };

  toggleSearchResults = e => {
    e.preventDefault();
    this.setState(({ showResults }) => ({ showResults: !showResults }));
  };

  updateSearchTerm = e => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { searchTerm, showResults } = this.state;
    if (showResults) {
      return (
        <>
          <SearchButton text={searchTerm} onClick={this.toggleSearchResults} />
          <Feed variables={{ filter: searchTerm }} />
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

export default Search;
