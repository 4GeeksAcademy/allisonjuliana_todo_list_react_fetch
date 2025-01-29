import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [all, setAll] = useState([]);

  async function deleteUser() {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    };
    const response = await fetch('https://playground.4geeks.com/todo/users/milton_diaz', requestOptions);
    return response;
  }

  async function postUser() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    };
    const response = await fetch('https://playground.4geeks.com/todo/users/milton_diaz', requestOptions);
    return response;
  }

  async function deleteTasks() {
    await deleteUser();
    await postUser();
    getTask();
  }

  function addTask() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "label": inputValue,
        "is_done": false
      })
    };
    fetch('https://playground.4geeks.com/todo/todos/milton_diaz', requestOptions)
      .then(response => response.json())
      .then((data) => setAll((prevAll) => [...prevAll, data]));
  }

  function cutTask(idAsk) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    };
    fetch(`https://playground.4geeks.com/todo/todos/${idAsk}`, requestOptions)
      .then(() => getTask());
  }

  function getTask() {
    fetch('https://playground.4geeks.com/todo/users/milton_diaz')
      .then((response) => response.json())
      .then((data) => setAll(data.todos));
  }

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="container">
      <div className="titulo">
        <p>todos</p>
      </div>
      <div className="list">
        <div className="header">
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
                setInputValue("");
              }
            }}
            placeholder="What needs to be done?"
          />
        </div>
        {all.map((item, index) => (
          <div className="items" key={index}>
            {item.label}
            <button className="boton" onClick={() => cutTask(item.id)}>
              <AiOutlineClose />
            </button>
          </div>
        ))}
        <div className="footer">
          <div>{all.length} items left</div>
          <div>
            <button className="deleteAll" onClick={deleteTasks}>
              Eliminar Tareas
            </button>
          </div>
        </div>
      </div>
      <div className="hoja2"></div>
      <div className="hoja3"></div>
    </div>
  );
};
export default App;