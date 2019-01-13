import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

class CreateLink extends Component {
  state = { description: "", url: "" };

  onDescriptionChange = e => this.setState({ description: e.target.value });

  onUrlChange = e => this.setState({ url: e.target.value });

  render() {
    const { description, url } = this.state;

    return (
      <form className="pv4 ph2 mw6">
        <label htmlFor="url" className="f6 b db mb2">
          URL
        </label>
        <input
          type="text"
          id="url"
          className="input-reset ba b--black-50 pa2 mb2 db w-100"
          value={url}
          onChange={this.onUrlChange}
          placeholder="Your link"
        />
        <label htmlFor="description" className="f6 b db mb2">
          Description
        </label>
        <input
          type="text"
          id="description"
          className="input-reset ba b--black-50 pa2 mb2 db w-100"
          value={description}
          onChange={this.onDescriptionChange}
          placeholder="A gist of what it's about"
        />
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          onCompleted={() => this.props.history.push("/")}
        >
          {postMutation => (
            <button
              className="button code f6 link dim br1 ph3 pv2 mv2 dib washed-yellow bg-light-purple"
              type="button"
              onClick={postMutation}
            >
              Submit
            </button>
          )}
        </Mutation>
      </form>
    );
  }
}

export default CreateLink;
