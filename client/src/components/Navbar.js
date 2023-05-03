import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar() {

    function toggle(){
        const toggle= document.querySelector('.toggle')
        const nav= document.querySelector('.nav-link')

        toggle.classList.toggle('active');
        nav.classList.toggle('active');
        
    }

    return (
        <>
        <nav className='nav-bar'>
            <h3 className='logo'>Safe Stray Life</h3>
            <div className='nav-link'> 
                <Link className='nav-comp' to='/'>Home</Link>
                <Link className='nav-comp' to='/help'>Help</Link>
                <Link className='nav-comp' to='/volunteer'>Volunteer</Link>
                <Link className='nav-comp' to='/about'>About</Link>
                <Link className='nav-comp' to='/contact'>Contact</Link>
            </div>
            <div className='toggle' onClick={toggle}>
                <span className='bar'></span><span className='bar'></span><span className='bar'></span>
            </div>
        </nav>
        <div className="nav-bg">
        <div className="nav-logo">
         <div>
            <h1>Safe Stray Life</h1>
            <p>" An initiative to build a community working in welfare of stray animals. "</p>
        </div>
        </div>
    </div>
    </>
    )
}