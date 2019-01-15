import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { navigate } from "@reach/router";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";

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

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { description, url } = this.state;

    return (
      <Form title="Got something to share?">
        <Input
          labelText="URL"
          id="url"
          type="url"
          value={url}
          onChange={this.handleChange}
        />
        <Input
          labelText="Description"
          id="description"
          type="text"
          value={description}
          onChange={this.handleChange}
        />
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          onCompleted={() => navigate("/")}
        >
          {postMutation => <Button onClick={postMutation}>Submit</Button>}
        </Mutation>
      </Form>
    );
  }
}

export default CreateLink;
