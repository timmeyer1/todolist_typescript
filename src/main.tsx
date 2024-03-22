import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import { AuthContextProvider } from './contexts/AuthContext.tsx'
import { SessionContextProvider } from './contexts/SessionContext.tsx'
import AppRouter from './routers/AppRouter.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthContextProvider> {/* contexte d'authentification */}
            <SessionContextProvider> {/* context de session */}
                <Provider store={store}> {/* accès au store de redux */}
                    <AppRouter /> {/* l'application */}
                </Provider>
            </SessionContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
)
