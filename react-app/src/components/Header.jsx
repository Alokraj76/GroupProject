import './Header.css'
import {Link, useNavigate} from 'react-router-dom';
function Header(){
    const navigate = useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }

    return (
        <div>
            <div className ="header">
                <Link to="/">Home</Link>
                <span className="em-3">lost and found ... in your city</span>

                {!localStorage.getItem('token')?
                <Link to="/login">LOGIN</Link>:
                <button onClick={handleLogout}>LOGOUT</button>}
                
            
            </div>
        </div>
    )
}
export default Header;