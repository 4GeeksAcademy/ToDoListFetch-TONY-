import React, { useState, useEffect } from "react";


const ToDoList = () => {

    const [tarea, setTarea] = useState("")
    const [lista, setLista] = useState([]) //inicializo con array vacio para tener la lista vacia

    useEffect(() => {
        // crearUsuario()
        obtenerTareas()
    }, [])

    useEffect(() => {
        actualizarLista()
    }, [lista])

    const crearUsuario = async () => {
        const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/Anthony", {
            method: "POST",
            body: JSON.stringify([]),
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.json()
        console.log(data)
    }

    const actualizarLista = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/Anthony", {
                method: "PUT",
                body: JSON.stringify(lista),
                headers: { "Content-Type": "application/json" }
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerTareas = async () => {
        const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/Anthony")
        const data = await response.json()
        console.log(data)
        setLista(data)
    }

    function guardarTarea(e) {
        e.preventDefault() //Detener formulario
        setLista([...lista, {"label" : tarea, "done" : false}]) //Para que me tome en cuenta las tareas anteriores (Los tres puntos son para concatenar lista con tarea)
        setTarea("") //limpia el input
    }

    function eliminarTarea(id) {
        let borrarItem = []
        borrarItem = lista.filter((item, index) => {
            if (index != id) {
                return item
            }
        })
        setLista(borrarItem)
    }

    return (
        <>
            <form className="container d-flex flex-column align-items-center justify-content-start">
                <h1>To Do List</h1>
                <input
                    className="form-control form-control-lg"
                    type="text"
                    value={tarea}
                    onChange={(e) => setTarea(e.target.value)}
                    placeholder="What do you want to do today?"
                    aria-label="todo list input field" />
                <button className="btn btn-danger" onClick={guardarTarea}>Agregar tarea</button>
                {lista.map((item, id) => (
                    <div className="todo-item" key={id}>
                        <input type="checkbox" />
                        <span className="todo-text">{item.label}</span>
                        {/* De strings; pasamos a objetos, queremos acceder al label de esos objetos item.label*/}
                        <button className="btn btn-danger" onClick={() => eliminarTarea(id)}>Delete</button>
                    </div>
                ))}
            </form>
        </>

    );
};

export default ToDoList;