import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Excel from './componets/Excel';
import Powerpoint from './componets/Powerpoint';
import Word from './componets/Word';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path='/excel' element={<Excel />}></Route> */}
        {/* <Route exact path='/powerpoint' element={<Powerpoint />}></Route> */}
        <Route exact path='/' element={<Word />}></Route>

      </Routes>
    </Router>
  );
}

export default App;
