import './App.css';
import Home from './pages/Home'
import Help from './pages/Help'
import Volunteer from './pages/Volunteer'
import About from './pages/About'
import Contact from './pages/Contact'
import Notfound from './pages/Notfound'
import Navbar from './components/Navbar';

import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/help' element={<Help/>} />
        <Route path='/volunteer' element={<Volunteer/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        

        <Route path='*' element={<Notfound/>}/>
      </Routes>
    </div>
  );
}

export default App;
