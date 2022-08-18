import { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

function TodoCard ({ data, handleDelete }) {
    const { _id, title, description } = data;
    return (
        // Description Card.
        <li key={_id}>

            <div className="title-description">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className="button-container">
                <button name={_id} className="button">
                    edit
                </button>

                <button name={_id} className="button">
                    delete
                </button>
            </div>
        </li> 

    );
}

export function ShowTodoList() {
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/todo")
            .then((res) => {
                console.log(res.data);
                setTodo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [ todo ]);

    function handleDelete(e) {
        axios.delete(`http://localhost:8000/api/todo/${e.target.name}`);

        setTodo((data) => {
            return data.filter((todo) => todo._id !== e.target.name);
        });
    }

    return (
        <section className="container">
            <Link to="/create-todo" className="button-new">
                <button type="button" className="button">New</button>
            </Link>
            <section className="contents">
                <h1>TODO</h1>
                <ul className="list-container">
                    {todo.map((data) => (
                        <TodoCard data={data} handleDelete={handleDelete} />
                    ))}
                </ul>
            </section>
        </section>
    );
}