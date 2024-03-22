import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_IMAGE } from '../../constants/ApiConstant'
import LinkButton from '../Button/LinkButton'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { useAuthContext } from '../../contexts/AuthContext'

const Navbar: React.FC = () => {

    // on récupère la méthode signOut depuis le contexte
    const {signOut} = useAuthContext();
    // on récup_re le hook de navigation pour rediriger
    const navigate = useNavigate();

    // méthode pour déco
    const handleLogout = () => {
        signOut();
        navigate('/');
    }

    return (
        <nav className="bg-brown">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-3-reverse">
                    <img src={`${API_IMAGE}/logo.png`} alt="Logo Todolist" className="h-8" />
                    <span className="text-2xl font-semibold whitespace-nowrap text-white">Todolist</span>
                </Link>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <LinkButton to="/" label="Accueil" />
                    <LinkButton to="/add-note" label="Ajouter une note" />
                    <RiLogoutCircleLine className='h-8 w-8 text-yellow hover:text-yellow_hover cursor-pointer' onClick={()=> handleLogout()}/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar