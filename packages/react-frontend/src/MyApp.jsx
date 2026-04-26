// src/MyApp.jsx
import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from "react";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id, index) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          const updated = characters.filter((character) => {
            return character.id !== id;
          });
          setCharacters(updated);
        } else if (res.status === 404) {
          console.log("User not found on backend");
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateList(person) {
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }
        throw new Error("Failed to add user");
      })
      .then((json) => setCharacters([...characters, json]))
      .catch((error) => {
        console.log(error);
      });
  }

function fetchUsers() {
  const promise = fetch("http://localhost:8000/users");
  return promise;
}

useEffect(() => {
  fetchUsers()
    .then((res) => res.json())
    .then((json) => setCharacters(json["users_list"]))
    .catch((error) => {
      console.log(error);
    });
}, []);



  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}


export default MyApp;
