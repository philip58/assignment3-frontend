import { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import {
  fetchTaskThunk,
  editTaskThunk,
  fetchAllEmployeesThunk,
} from "../../store/thunks";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
    this.props.fetchTask(this.props.params.id);
    this.props.fetchEmployees();
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
    let thisEmployee = this.props.task.employeeId;
    let otherEmployees = this.props.allEmployees.filter(
      (emp) => emp.id !== thisEmployee
    );
    if (this.state.redirect) {
      return <Navigate to={`/task/${this.state.redirectId}`} />;
    }
    return (
      <div>
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
        <div>Assigned Employee: {thisEmployee ? thisEmployee : "staff"}</div>
        <div>
          Other Employees:{" "}
          {otherEmployees.map((employee) => (
            <div key={employee.id}>
              <Link to={`/employee/${employee.id}`}>{employee.firstname}</Link>
            </div>
          ))}
        </div>
        <div>
          <button>
            <Link to={"/"}>Home Page</Link>
          </button>
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    task: state.task,
    allEmployees: state.allEmployees,
  };
};

const mapDispatch = (dispatch) => {
  return {
    editTask: (task) => dispatch(editTaskThunk(task)),
    fetchTask: (id) => dispatch(fetchTaskThunk(id)),
    fetchEmployees: (id) => dispatch(fetchAllEmployeesThunk()),
  };
};

export default withRouter(connect(mapState, mapDispatch)(EditTaskContainer));
