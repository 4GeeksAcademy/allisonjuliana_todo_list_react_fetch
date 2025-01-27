import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Home = () => {
  const [inputValue, setInputValue] = useState("")
  const [all, setAll] = useState([]);
  const [idDelete, setIdDelete] = useState([]);

  useEffect(()=>{
    if(idDelete > 0 ){
    function cutTask(){
        const requestOptions = {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify()
        };
        fetch("https://playground.4geeks.com/todo/todos/"+idDelete, requestOptions)
        .then((data) => data)
      };
      cutTask();
      }else{}
  },[idDelete]);

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
                  .then((data) => data)
                };
                addTask();

                setAll(all.concat([inputValue]));
                setInputValue("");
              }
            }}
            placeholder="What needs to be done?">
          </input>
        </div>
        {all.map((item, index) => (
            <div className="items">{item}
              <button key={index} className="boton"
                onClick={() => {

                  setAll(all.filter((t, currentIndex) => index != currentIndex));

                  function getTask(){                      
                    fetch('https://playground.4geeks.com/todo/users/milton_diaz')
                    .then((response) => response.json())
                    .then((data) => setIdDelete(data.todos[index].id))
                  };
                  getTask();

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

                setTimeout(() => {
                  function postUser(){
                    const requestOptions = {
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify()
                    };
                    fetch('https://playground.4geeks.com/todo/users/milton_diaz', requestOptions)
                    .then((data) => data)
                  };
                  postUser();
                }, 1000);

                function deleteUser(){
                  const requestOptions = {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify()
                  };
                  fetch('https://playground.4geeks.com/todo/users/milton_diaz', requestOptions)
                  .then((data) => data)
                };
                deleteUser();

                setAll([]);
                

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