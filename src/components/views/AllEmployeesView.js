import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllEmployeesView = (props) => {
  if (!props.allEmployees.length) {
    return (
      <div>
        <p>There are no employees.</p>
        <Link to={"/"}> Home Page </Link>
      </div>
    );
  }

  return (

    <div>
        <Link to={'/'}> 
        <button> Home Page </button>
        </Link>
        <div>
      {props.allEmployees.map((employee) => {
        let name = employee.firstname + " " + employee.lastname;
        return (
          <div key={employee.id}>
            <Link to={`/employee/${employee.id}`}>
              <h1>{name}</h1>
            </Link>

            <p>{employee.department}</p>
          </div>
        );
      })}
      </div>
    </div>
  );
};

AllEmployeesView.propTypes = {
  allEmployees: PropTypes.array.isRequired,
};

export default AllEmployeesView;
