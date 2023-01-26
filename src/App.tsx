import { Route, Routes } from 'react-router-dom';
import './App.css';
import Average from './pages/Average';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className='App'>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/average" element={<Average />} />
    </Routes>
    </div>
  );
}

export default App;
