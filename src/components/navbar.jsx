import {Link} from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import {signOut} from "firebase/auth"
import { useNavigate } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth"


export const Navbar=()=>{

    const navigate=useNavigate();
    const [userInfo]=useAuthState(auth);

    //Function to sign0out if already logged in
    const signUserOut=async()=>{
        await signOut(auth).then(()=>{
            navigate("/login")
        });  
    }
    return(
        <header>
        <nav className="navbar">
        <div className="title">Admin Panel</div>
        <div className="nav-links">
        {userInfo && <Link to="/">Home</Link>}
        {!userInfo ? <Link to="/login">Login</Link> : (
        <>
        <Link to="/createpost">Add Content</Link>
        <button className="signout-button " onClick={signUserOut}>Sign Out</button>
        </>
        )}
        
        </div>
        </nav>
        </header>
    )
}