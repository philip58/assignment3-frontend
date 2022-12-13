import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTaskThunk } from "../../store/thunks";
import { TaskView } from "../views";
import { useParams } from "react-router";

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  // etc... other react-router-dom v6 hooks

  return (
    <WrappedComponent
      {...props}
      params={params}
      // etc...
    />
  );
};

class TaskContainer extends Component {
  componentDidMount() {
    //this.props.match.params.id, taken out due to errors
    this.props.fetchTask(this.props.params.id);
  }

  render() {
    return <TaskView task={this.props.task} />;
  }
}
const mapState = (state) => {
  return {
    task: state.task,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchTask: (id) => dispatch(fetchTaskThunk(id)),
  };
};

export default withRouter(connect(mapState, mapDispatch)(TaskContainer));
