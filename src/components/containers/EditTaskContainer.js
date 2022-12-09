import { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import { fetchTaskThunk, editTaskThunk } from "../../store/thunks";

class EditTaskContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      prioritylevel: "",
      completionstatus: false,
      employeeId: null,
      redirect: false,
      redirectId: null,
    };
  }

  componentDidMount() {
    this.props.fetchTask(this.props.match.params.id);
    this.setState({
      description: this.props.task.description,
      prioritylevel: this.props.task.prioritylevel,
      completionstatus: this.props.task.completionstatus,
      employeeId: this.props.task.employeeId,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let task = {
      id: this.props.task.id,
      description: this.state.description,
      prioritylevel: this.state.prioritylevel,
      completionstatus: this.state.completionstatus,
      employeeId: this.state.employeeId,
    };
    this.props.editTask(task);
    this.setState({
      redirect: true,
      redirectId: this.props.task.id,
    });
  };
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }
  render() {
    if (this.state.redirect) {
      return <Navigate to={`/task/${this.state.redirectId}`} />;
    }
    return (
      <form
        style={{ textAlign: "center" }}
        onSubmit={(e) => this.handleSubmit(e)}
      >
        <label style={{ color: "#11153e", fontWeight: "bold" }}>
          Description:{" "}
        </label>
        <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={(e) => this.handleChange(e)}
        />
        <br />

        <label style={{ color: "#11153e", fontWeight: "bold" }}>
          Priority Level:{" "}
        </label>
        <input
          type="text"
          name="prioritylevel"
          value={this.state.prioritylevel}
          onChange={(e) => this.handleChange(e)}
        />
        <br />

        <label style={{ color: "#11153e", fontWeight: "bold" }}>
          Completion Status:{" "}
        </label>
        <input
          type="text"
          name="completionstatus"
          value={this.state.completionstatus}
          onChange={(e) => this.handleChange(e)}
        />
        <br />

        <label style={{ color: "#11153e", fontWeight: "bold" }}>
          employeeId:{" "}
        </label>
        <input
          type="text"
          name="employeeId"
          value={this.state.employeeId}
          onChange={(e) => this.handleChange(e)}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    );
  }
}
const mapState = (state) => {
  return {
    task: state.task,
  };
};

const mapDispatch = (dispatch) => {
  return {
    editTask: (task) => dispatch(editTaskThunk(task)),
    fetchTask: (id) => dispatch(fetchTaskThunk(id)),
  };
};

export default connect(mapState, mapDispatch)(EditTaskContainer);
