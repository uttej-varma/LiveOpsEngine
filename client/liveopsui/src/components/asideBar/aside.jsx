import "./aside.css"
import { useNavigate } from "react-router-dom"
const Asidebar=()=>{
    const navigate=useNavigate();
    const createHandler=()=>{
            navigate("/create")
    }
    return(
        <>
        <div className="asideContainer">
            <button onClick={createHandler}>Create</button>
        </div>
        </>
    )
}
export default Asidebar;