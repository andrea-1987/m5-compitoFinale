import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { MyNav } from './components/navbar/MyNav'
import { MyFooter } from './components/footer/MyFooter'
import Welcome from './components/Welcome'
import { Container } from 'react-bootstrap'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorPage } from './Pages/ErrorPage'
import { DetailPage } from './Pages/DetailPage'
import { HomePage } from './Pages/HomePage'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <BrowserRouter>
      <MyNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Container>
        <Welcome />
        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
          <Route path="/details/:asin" element={<DetailPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Container>
      <MyFooter />
    </BrowserRouter>
  )
}

export default App
