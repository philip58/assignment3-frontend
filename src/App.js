import "./App.css";
import {  Routes , Route } from "react-router-dom";
import {
  HomePageContainer,
  EmployeeContainer,
  TaskContainer,
  AllEmployeesContainer,
  AllTasksContainer,
  NewTaskContainer,
  EditTaskContainer
} from './components/containers';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePageContainer></HomePageContainer>} exact> 
        </Route>
        <Route path="/employees" element={<AllEmployeesContainer></AllEmployeesContainer>} exact> 
        </Route>
        <Route path="/employee/:id" element={<EmployeeContainer></EmployeeContainer>} exact> 
        </Route>
        <Route path="/tasks" element={<AllTasksContainer></AllTasksContainer>} exact> 
        </Route>
        <Route path="/newtask" element={<NewTaskContainer></NewTaskContainer>} exact> 
        </Route>
        <Route path="/task/:id" element={<TaskContainer></TaskContainer>} exact> 
        </Route>
        <Route path="/edittask/:id" element={<EditTaskContainer></EditTaskContainer>} exact> 
        </Route>

      </Routes>        
    </div>
  );
}

export default App;