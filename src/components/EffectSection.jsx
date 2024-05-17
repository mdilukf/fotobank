import { useEffect, useState, useCallback } from "react"
import Button from "./button/Buttom"
import Modal from "./Modal/Modal"
import useInput from "../hooks/useInput"

export default function EffectSection(){
    const input = useInput()
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

    const fetchUsers = useCallback(async () => {
        setLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const users = await response.json()
        setUsers(users)
        setLoading(false)
    }, [])

  
    useEffect(() =>{
        fetchUsers()
    }, [fetchUsers])

    return(
        <section>
            <h3>Вход</h3>

            <Button onClick ={()=> setModal(true)}>Открыть информацию</Button>
            <Modal open={modal}>
                <h3>Hello from modal</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Alias tempore veniam odio, animi rerum minima? Illum facilis voluptatum eius delectus unde suscipit, 
                    amet autem fugit, quod quibusdam vitae, iusto quisquam.
                </p>
                <Button onClick={()=>setModal(false)}>Close modal</Button>
            </Modal>

            {loading && <p>Loading ....</p>}

            {!loading && (
                <>
                    <input type="text" className="control" {...input}/>
                    <ul>
                    {users.filter(user => user.name.toLowerCase().includes(input.value.toLowerCase())).map(user => <li key={user.id}>{user.name}</li>)}
                    </ul>
                </>
            )}
        </section>
    )
} 