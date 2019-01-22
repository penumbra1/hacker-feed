import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { POST_MUTATION } from "../graphql";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { AuthContext } from "../auth";

class CreateLink extends Component {
  static contextType = AuthContext;

  state = { description: "", url: "" };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { description, url } = this.state;
    const { username } = this.context;

    if (!username) {
      // not using Redirect here
      // as it won't leave a /create entry to go back to after logging in
      this.props.navigate("/login");
      return null;
    }

    return (
      <Mutation
        mutation={POST_MUTATION}
        onCompleted={() => this.props.navigate("/")}
        refetchQueries={["getFeed"]}
      >
        {postMutation => (
          <Form
            title="Got something to share?"
            onSubmit={e => {
              e.preventDefault();
              postMutation({ variables: { description, url } });
            }}
          >
            <Input
              labelText="URL"
              id="url"
              type="url"
              value={url}
              required
              onChange={this.handleChange}
            />
            <Input
              labelText="Description"
              id="description"
              type="text"
              value={description}
              required
              onChange={this.handleChange}
            />
            <Button>Submit</Button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateLink;
