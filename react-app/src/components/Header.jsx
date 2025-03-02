import './Header.css'
import {Link, useNavigate} from 'react-router-dom';

function Header(props){
    const navigate = useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }

    return (
        <div className = 'header-container d-flex justify-content-between'>
            <div className ="header">
                <Link to="/">Home</Link>
                <input className = "search" type ="text" 
                    value = {props && props.search}
                    onChange={(e)=> props.handlesearch && props.handlesearch(e.target.value)
                } />
                <button className ="search-btn" onClick={()=>props.handleClick && props.handleClick()}> SEARCH</button>

            </div>
            <div>
            {!localStorage.getItem('token')?
                <Link to="/login">LOGIN</Link>:
                <button className='logout-btn' onClick={handleLogout}>LOGOUT</button>}
            </div>
        </div>
    )
}
export default Header;