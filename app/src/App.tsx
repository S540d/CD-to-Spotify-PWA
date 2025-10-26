import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ImportMode } from './pages/ImportMode';
import { PlayMode } from './pages/PlayMode';
import { ManageMode } from './pages/ManageMode';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/import" element={<ImportMode />} />
        <Route path="/play" element={<PlayMode />} />
        <Route path="/manage" element={<ManageMode />} />
      </Routes>
    </Router>
  );
}

export default App;

