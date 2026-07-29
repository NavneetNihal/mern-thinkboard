import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from './pages/NoteDetailPage'


function App() {
  return (
    <div 
      className='relative min-h-screen w-full text-base-content'
      style={{ background: 'radial-gradient(125% 125% at 50% 10%, #000 60%, #00FF9D40 100%)' }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App