import './App.css';
import { HealthOverview } from './components/health/HealthOverview';
import { HealthWeekView } from './components/health/HealthWeekView';

function App() {
  return (
    <div className="App">
      <HealthWeekView />
      <HealthOverview />
    </div>
  );
}

export default App;
