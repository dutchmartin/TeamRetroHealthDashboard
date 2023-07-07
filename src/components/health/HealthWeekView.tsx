import { HealthCheck, HealthService } from '../../services/HealthService';
import { useEffect, useState } from 'react';
import { HealthPropertyChart } from '../../charts/HealthPropertyChart';
import { TeamRetroClient } from '../../services/TeamRetroClient';

export const HealthWeekView = () => {
  const [check, setCheck] = useState<HealthCheck>();

  useEffect(() => {
    const apikey = localStorage.getItem("apiKey") ?? "";
    const healthService = new HealthService(new TeamRetroClient(apikey));
    healthService.getLatestHealthCheck().then(setCheck);
  },[]);

  return (<div>
    <h1>Team Health last week:</h1>
    <div className="health-week-view">
        { check? (check.entries.map((e) => <HealthPropertyChart key={e.id} entry={{title: e.dimension, green: e.green, red: e.red, yellow: e.orange}} />)) :  <i className="fas fa-spin fa-refresh" />}
    </div>
    </div>
  );
};
