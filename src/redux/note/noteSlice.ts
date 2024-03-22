import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../constants/ApiConstant";
import { RootState } from "../store";

// 2. On définit la structure de l'objet Note
interface Note {
    title: string;
    description: string;
    user: string;
    createdAt: Date;
}

// 5. On définit la structure de hydra:member
interface HydraResponse<T> { // le <T> représente une promesse: c'est quelque chose qu'il n'a pas tout de suite mais qu'il va récupérer plus tard
    'hydra:member': T[];
}

// 3. On définit la structure de l'objet NoteState
interface NoteState {
    notes: Note [];
    loading: boolean;
}

// 4. On initialise nos states
const initialState: NoteState = {
    notes: [],
    loading: false,
}

// 1. On fait notre slice
const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        setNotes: (state, action: PayloadAction<HydraResponse<Note>>) => {
            state.notes = action.payload['hydra:member'];
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})

export const {setNotes, setLoading} = noteSlice.actions;

// 8. On ajoute les actions asynchrones dans le fetchNotes
export const fetchNotes = (id:string): ThunkAction<void, RootState, unknown, NoteAction> => async dispatch => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get<HydraResponse<Note>>(`${API_URL}/notes?page=1&user.id=${id}`);
        dispatch(setNotes(response.data));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(`Erreur lors de la récupération des notes: ${error as AxiosError}`);
        dispatch(setLoading(false));
    }
}

export default noteSlice.reducer

// 9. Types personnalisés
interface SetNotesAction {
    type: typeof setNotes.type;
    payload: HydraResponse<Note>;
}

interface setLoadingAction {
    type: typeof setLoading.type;
    payload: boolean;
}

type NoteAction = SetNotesAction | setLoadingAction