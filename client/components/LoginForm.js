import React, { Component } from "react";
import AuthForm from "./AuthForm";
import mutation from "../mutations/logIn";
import { graphql } from "react-apollo";
import query from "../queries/currentUser";
import { hashHistory } from "react-router";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  componentWillMount(nextProps) {
    if (!this.props.data.user && nextProps && nextProps.data.user) {
      hashHistory.push("/dashboard");
    }
  }

  onSubmit({ email, password }) {
    this.setState({ errors: [] });

    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }]
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(e => e.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(LoginForm));
