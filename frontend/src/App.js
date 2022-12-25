import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import './assets/scss/global.scss'
import { AppHeader } from './cmps/AppHeader'
import { BeatPatternApp } from './views/BeatPatternApp'

function App() {
  return (
    <Router >
      <div className="App">
        <AppHeader/>
        <main className='app-main container'>
            <Route path='/' component={BeatPatternApp} />
        </main>
      </div>
    </Router>
  )
}

export default App
