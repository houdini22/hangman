import * as React from 'react'
import { Routes, HashRouter as Router, Route } from 'react-router-dom'
import { BlankPageLayout } from './layouts'

import { IndexView } from './routes/Index'
import { IndexView as HangmanView } from './routes/Hangman'
import { IndexContainer as HangmanGameView } from './routes/HangmanGame'
import { IndexContainer as RegisterContainer } from './routes/Register'

const App = () => (
    <Router>
        <Routes>
            <Route
                path="/"
                element={
                    <BlankPageLayout>
                        <IndexView />
                    </BlankPageLayout>
                }
            />
            <Route
                path="/hangman"
                element={
                    <BlankPageLayout>
                        <HangmanView />
                    </BlankPageLayout>
                }
            />
            <Route
                path="/hangman-game"
                element={
                    <BlankPageLayout>
                        <HangmanGameView />
                    </BlankPageLayout>
                }
            />
            <Route
                path="/register"
                element={
                    <BlankPageLayout>
                        <RegisterContainer />
                    </BlankPageLayout>
                }
            />
        </Routes>
    </Router>
)

export { App }
export default App
