import { useState } from "react";
import "./App.css";

function App() {
  let keyCounter = 0;
  let [employees, setEmployees] = useState([]);

  let getEmployees = async () => {
    let reqOptions = {
      method: "GET",
    };

    let JSONData = await fetch("/getEmployees", reqOptions);

    let JSOData = await JSONData.json();

    setEmployees(JSOData);
  };

  return (
    <div className="App">
      <button
        onClick={() => {
          getEmployees();
        }}
      >
        Get Employees
      </button>
      {employees.map((emp) => {
        keyCounter++;
        return <h1 key={keyCounter}>{emp.name}</h1>;
      })}
    </div>
  );
}

export default App;
