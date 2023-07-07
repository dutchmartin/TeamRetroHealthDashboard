import { HealthCheck, HealthService } from '../../services/HealthService';
import { useEffect, useState } from 'react';
import { HealthEntryChart } from '../../charts/HealthEntryChart';
import { TeamRetroClient } from '../../services/TeamRetroClient';

export interface HealthEntry {
  title: string;
  red: number;
  yellow: number;
  green: number;
}

export const HealthOverview = () => {
  const [checks, setChecks] = useState<HealthCheck[]>();

  useEffect(() => {
    const apikey = localStorage.getItem("apiKey") ?? "";
    const healthService = new HealthService(new TeamRetroClient(apikey));
    healthService.getAllHealthChecks().then(setChecks);
  }, []);

  return (
    <div className="health-overview">
      {checks ? <HealthEntryChart healthChecks={checks} /> : <i className="fas fa-spin fa-refresh" />}
    </div>
  );
};
