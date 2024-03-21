import React, { SyntheticEvent, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../../components/Input/CustomInput';
import SubmitButton from '../../components/Button/SubmitButton';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import axios from 'axios';
import { API_ROOT } from '../../constants/ApiConstant';

const Register: React.FC = () => {

  // 1. On déclare nos states:
  const [name, setName] = useState<string>(''); // <- le useState attend une string enft
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 2. on récupère la méthode signIn du contexte d'authentification
  const { signIn } = useAuthContext();
  // 3. On récupère le hook de navigation
  const navigate = useNavigate();


  // 6. On détail la fonction du handleSubmit
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    axios.post(`${API_ROOT}/register`, {
      name,
      email,
      password
    }).then((response) => {
      if (response.data.email) {
        const user = {
          userId: response.data.id,
          name: response.data.name,
          email: response.data.email
        };

        try {
          signIn(user);
          setIsLoading(false);
          navigate('/');
        } catch (error) {
          setIsLoading(false);
          console.log(`Erreur lors de la session : ${error}`)
        }
      }
    }).catch((error) =>{
      console.log(`Erreur lors de l'inscription : ${error}`)
      setIsLoading(false);
    })
  }


  return (
    <div className="flex flex-1 flex-col h-screen justify-start items-center bg-brown_dark">
      <h1 className="text-white font-bold text-4xl pb-5">Enregistrez-vous</h1>
      <form onSubmit={handleSubmit} className="w-[80%] md:w-[50%] lg:w-[40%]">
        {/* 4. On peut maintenant appeler CustomInput plusieurs fois */}
        <CustomInput state={name} label="Mon nom" callable={(e) => setName(e.target.value)} type="text" />
        <CustomInput state={email} label="Mon email" callable={(e) => setEmail(e.target.value)} type="email" />
        <CustomInput state={password} label="Mon mot de passe" callable={(e) => setPassword(e.target.value)} type="password" />
        <Link to="/" className="text-white hover:text-yellow_hover">Déjà inscrit ? Connectez-vous.</Link>
        {/* 5. maintenant le bouton */}

        <div className='flex items-center justify-center pt-5'>
          {isLoading ? <ButtonLoader /> : <SubmitButton label="S'inscrire" />}
          </div>
      </form>
    </div>
  )
}

export default Register