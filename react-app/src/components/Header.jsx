import './Header.css'
import {Link, useNavigate} from 'react-router-dom';

function Header(props){
    const navigate = useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }

    return (
        <div>
            <div className ="header">
                <Link to="/">Home</Link>
                <input className = "search" type ="text" 
                    value = {props && props.search}
                    onChange={(e)=> props.handlesearch && props.handlesearch(e.target.value)
                } />
                <button className ="search-btn" onClick={()=>props.handleClick && props.handleClick()}> SEARCH</button>

                {!localStorage.getItem('token')?
                <Link to="/login">LOGIN</Link>:
                <button onClick={handleLogout}>LOGOUT</button>}
                
            
            </div>
        </div>
    )
}
export default Header;