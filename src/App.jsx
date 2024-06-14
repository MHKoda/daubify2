import { Routes, Route } from 'react-router-dom';
import './App.css';
import ListeAlbums from './Composants/ListeAlbums'
import ListeArtistes from './Composants/ListeArtistes';
import Homepage from './Composants/Homepage';
import MenuGauche from './Composants/MenuGauche/MenuGauche';

function App() {
  return (
    <div className='App'>
      <MenuGauche />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/liste-artistes' element={<ListeArtistes />} />
        <Route path='/liste-albums' element={<ListeAlbums />} />
      </Routes>
    </div>
  )
}

export default App