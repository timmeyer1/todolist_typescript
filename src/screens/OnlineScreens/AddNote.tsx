import React, { FormEvent, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import CustomInput from '../../components/Input/CustomInput'
import CustomArea from '../../components/Input/CustomArea'
import ButtonLoader from '../../components/Loader/ButtonLoader'
import SubmitButton from '../../components/Button/SubmitButton'
import axios from 'axios'
import { API_URL } from '../../constants/ApiConstant'

const AddNote: React.FC = () => {

    // 2. on déclare nos states
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // 1. on récupère l'id de l'utilisateur
    const { userId } = useAuthContext()

    // 3. On récupère le hook de navigation
    const navigate = useNavigate();

    // 4. méthode pour ajouter une note
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        // 5. On crée notre objet note avec ses valeurs
        const newNote = {
            title: title,
            description: description,
            createdAt: new Date(),
            user: `/api/users/${userId}`
        }

        // 6. On définit les paramètres des headers
        const headers = {
            'Content-Type': 'application/ld+json',
        }

        try {
            setIsLoading(true);
            await axios.post(`${API_URL}/notes`, newNote, { headers })
                .then((response) => {
                    if (response.status === 201) {
                        setIsLoading(false);
                        navigate('/');
                    }
                })
                .catch((error) => {
                    console.log(`Erreur lors de l'ajout de la note : ${error}`);
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(`Erreur lors de l'ajout de la note : ${error}`);
            setIsLoading(false);
        }
    }

    return (
        <div className='flex flex-col items-center justify-start pt-5 min-w-64'>
            <h1 className="text-white font-bold text-3xl py-3">Ajouter une note</h1>
            <form onSubmit={handleSubmit}>
                {/* input title */}
                <CustomInput state={title} label='Titre de la note' callable={(e) => setTitle(e.target.value)} type="text" />
                {/* input description */}
                <CustomArea state={description} label='Description de la note' callable={(newValue: string) => setDescription(newValue)} />

                <div className="flex flex-col items-center">
                    {isLoading ? <ButtonLoader /> : <SubmitButton label={"Ajouter la note"} />}
                </div>
            </form>
        </div>
    )
}

export default AddNote