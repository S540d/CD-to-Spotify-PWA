import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ImportMode } from './pages/ImportMode';
import { PlayMode } from './pages/PlayMode';
import { ManageMode } from './pages/ManageMode';
import { OfflineIndicator } from './components/layout/OfflineIndicator';
import { PlayerProvider } from './contexts/PlayerContext';
import { MiniPlayer } from './components/player/MiniPlayer';

function App() {
  return (
    <PlayerProvider>
      <Router>
        <OfflineIndicator />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/import" element={<ImportMode />} />
          <Route path="/play" element={<PlayMode />} />
          <Route path="/manage" element={<ManageMode />} />
        </Routes>
        <MiniPlayer />
      </Router>
    </PlayerProvider>
  );
}

export default App;

