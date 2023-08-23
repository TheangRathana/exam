import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Excel from './componets/Excel';
import Powerpoint from './componets/Powerpoint';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Excel />}></Route>
        <Route exact path='/excel' element={<Excel />}></Route>
        {/* <Route exact path='/powerpoint' element={<Powerpoint />}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
