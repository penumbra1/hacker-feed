import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
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

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const { description, url } = this.state;

    return (
      <Form header={<h1 className="f4 mv3">Got something to share?</h1>}>
        <Input
          labelText="URL"
          id="url"
          type="url"
          value={url}
          onChange={this.handleChange}
          placeholder="Your link"
        />
        <Input
          labelText="Description"
          id="description"
          type="text"
          value={description}
          onChange={this.handleChange}
          placeholder="A gist of what it's about"
        />
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          onCompleted={() => this.props.history.push("/")}
        >
          {postMutation => <Button onClick={postMutation}>Submit</Button>}
        </Mutation>
      </Form>
    );
  }
}

export default CreateLink;
