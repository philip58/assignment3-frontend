import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTaskThunk } from "../../store/thunks";
import { TaskView } from "../views";

class TaskContainer extends Component {
  componentDidMount() {
    //this.props.match.params.id, taken out due to errors
    this.props.fetchTask(this.props.id);
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

export default connect(mapState, mapDispatch)(TaskContainer);
