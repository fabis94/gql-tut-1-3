import React, { Component } from "react";
import { graphql } from "react-apollo";
import query from "../queries/currentUser";
import currentUser from "../queries/currentUser";
import { hashHistory } from "react-router";

export default WrappedComponent => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      console.log(nextProps);
      // if (!nextProps.data.loading && !nextProps.data.user) {
      //   hashHistory.push("/login");
      // }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  graphql(currentUser)(RequireAuth);
};
