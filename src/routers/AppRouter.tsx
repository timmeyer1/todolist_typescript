import React from 'react'
import { useSessionContext } from '../contexts/SessionContext'
import { RouterProvider } from 'react-router-dom'
import OnlineRouter from './OnlineRouter'
import OfflineRouter from './OfflineRouter'

const AppRouter: React.FC = () => {
    
    // récupération de l'état de la session depuis le contexte
    const { inSession, setInSession } = useSessionContext()

    return (
        <RouterProvider router={inSession ? OnlineRouter : OfflineRouter} />
  )
}

export default AppRouter