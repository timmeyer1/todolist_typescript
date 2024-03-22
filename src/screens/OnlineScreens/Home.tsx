import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store';
import { selectNoteData } from '../../redux/note/noteSelector';
import { fetchNotes } from '../../redux/note/noteSlice';
import PageLoader from '../../components/Loader/PageLoader';
import { BsTrash } from 'react-icons/bs';
import { deleteNote } from '../../services/noteService';
import { useAuthContext } from '../../contexts/AuthContext';
import EmptyNote from '../../components/Divers/EmptyNote';

const Home: React.FC = () => {
    // 1. on récupère le hook useDispatch pour executer le fetchNotes
    const dispatch: AppDispatch = useDispatch();
    // on récupère userId depuis le contexte d'authentification
    const { userId } = useAuthContext();
    const id = parseInt(userId) ?? 0;

    // 2. useEffect
    useEffect(() => {
        dispatch(fetchNotes(userId));
    }, [dispatch]);

    // 3. on récupère les notes
    const { loading, notes } = useSelector(selectNoteData);

    // 4. on fait le truc pour supprimer
    const handleDelete = async (id: number) => {
        if (await deleteNote(id)) {
            dispatch(fetchNotes())
        }
    }

    return (
        loading ? <PageLoader /> :
        notes.length === 0 ? <EmptyNote /> :
            <div className="flex flex-col items-center justify-start bg-brown_dark pt-5">
                <h1 className="text-white font-bold text-3xl py-3">Toutes les notes :</h1>
                <div className="flex flex-wrap justify-center md:justify-start">
                    {notes && notes.map((note: any) => (
                        <div className="w-[250px] p-3 relative" key={note.id}>
                            <div className="bg-yellow p-3 rounded-lg flex flex-col h-full">
                                <h2 className="text-brown font-bold text-xl">{note.title}</h2>
                                <p className="text-brown_dark flex-grow">{note.description}</p>
                                <div className="flex justify-between items-center mt-3">
                                    <p className="text-brown_dark text-sm ">
                                        {new Date(note.createdAt).toLocaleDateString()}
                                    </p>
                                    <BsTrash onClick={() => handleDelete(note.id)} className="text-red_dark h-5 w-5 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    )
}

export default Home