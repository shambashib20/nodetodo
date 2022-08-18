import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateTodo } from "./updateTodo"; // added

function TodoCard({ data, handleEdit, handleDelete }) { // updated
    const { _id, title, description } = data;

    return (
        <li key={_id}>
            <div className="title-description">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className="button-container">
                <button className="button" name={_id} onClick={handleEdit}>    
                  edit
                </button>
                <button className="button" name={_id} onClick={handleDelete}>
                    delete
                </button>
            </div>
        </li>
    );
}

export function ShowTodoList() {
    const [todo, setTodo] = useState([]);
    const [open, setOpen] = useState(false); // added
    const [id, setId] = useState(""); // added
    const [update, setUpdate] = useState(false); // added

    useEffect(
        function () {
            axios
                .get("https://shambatodo.herokuapp.com/api/todo")
                .then((res) => {
                    console.log(res.data);
                    setTodo(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        },
        [update] // updated
    );

    function handleEdit(e) { // added
        setId(e.target.name); 
        setOpen(true);
    }

    function handleUpdate() { // added
        console.log("update:", update, !update);
        setUpdate(!update);
    }

    function handleDelete(e) { // added
        axios.delete(`https://shambatodo.herokuapp.com/api/todo/${e.target.name}`);

        setTodo((data) => {
            return data.filter((todo) => todo._id !== e.target.name);
        });
    }

    function handleClose() { // added
        setId("");
        setOpen(false);
    }

    return (
        <section className="container">
            <h1>Test</h1>
            <Link to="/create-todo" className="button-new">
                <button className="button">New</button>
            </Link>
            <section className="contents">
                <h1>TODO</h1>
                <ul className="list-container">
                    {todo.map((data) => (
                        <TodoCard
                            data={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </section>
            
            {open ? (
                <section className="update-container">
                    <div className="update-contents">
                        <p onClick={handleClose} className="close">
                            &times;
                        </p>

                        <UpdateTodo
                            _id={id}
                            handleClose={handleClose}
                            handleUpdate={handleUpdate}
                        />
                    </div>
                </section>
            ) : (
                ""
            )}
        </section>
    );
}
