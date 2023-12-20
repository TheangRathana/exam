import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Excel from './componets/Excel';
import Powerpoint from './componets/Powerpoint';
import Word from './componets/Word';
import WordMidTerm from './componets/WordMidTerm';
import PowerPointMidTerm from './componets/PowerPointMidTerm';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path='/excel' element={<Excel />}></Route> */}
        {/* <Route exact path='/powerpoint' element={<Powerpoint />}></Route> */}
        {/* <Route exact path='/' element={<PowerPointMidTerm />}></Route> */}
        <Route exact path='/' ></Route>


      </Routes>
    </Router>
  );
}

export default App;
