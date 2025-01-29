import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [all, setAll] = useState([]);

  function deleteUser(){
    const requestOptions = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify()
    };
    fetch('https://playground.4geeks.com/todo/users/milton_diaz', requestOptions)
    .then((data) => data)
  };
  function postUser(){
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify()
    };
    fetch('https://playground.4geeks.com/todo/users/milton_diaz', requestOptions)
    .then((data) => data)
  };
  function addTask(){
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          "label": inputValue,
          "is_done": false
        })
      };
      fetch('https://playground.4geeks.com/todo/todos/milton_diaz', requestOptions)
      .then(response => response.json())
      .then((data) => setAll([...all,data]))
    };
    function cutTask(idAsk){
      const requestOptions = {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify()
        };
        fetch("https://playground.4geeks.com/todo/todos/"+idAsk, requestOptions)
      .then((data) => data)
    };
    function getTask(){                      
      fetch('https://playground.4geeks.com/todo/users/milton_diaz')
      .then((response) => response.json())
      .then((data) => setAll(data.todos))
    };
    useEffect(()=>{
      getTask();
    },[]);
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
              if(e.key === "Enter"){                
                addTask();
                {all.map((item, index) => <p key={index}>{item.label}</p>)}
                setInputValue("");
              }
            }}
            placeholder="What needs to be done?">
          </input>
        </div>        
        {all.map((item, index) => (
            <div className="items" key={index}>{item.label}
              <button  className="boton"
                onClick={() => {
                  cutTask(item.id);
                  window.location.reload();
                }}><AiOutlineClose />
              </button>
            </div>
          ))
        }        
        <div className="footer">
          <div>
            {all.length} items left
          </div>
          <div>
            <button className="deleteAll"
              onClick={() => {
                deleteUser();
                setTimeout(() => {
                  postUser();
                }, 100);
                setTimeout(() => {
                  window.location.reload();
                }, 200);
              }}>Eliminar Tareas
            </button>
          </div>
        </div>

      </div>
      <div className="hoja2"></div>
      <div className="hoja3"></div>
    </div>
  );
}; 
export default Home;