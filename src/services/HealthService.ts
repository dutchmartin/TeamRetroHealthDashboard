import { TeamRetroClient } from "./TeamRetroClient";

export interface HealthCheckFile {
  id: string;
  name: string;
  date: string;
}

export interface HealthCheck {
  date: string;
  dimensions: string[];
  entries: Entry[];
  healthPercentage: number;
  scoreCounts: Record<NonNullable<Score>, number>;
}

export type Score = null | 0 | 1 | 8;

export interface Entry {
  id: string,
  dimension: string,
  red: number,
  orange: number,
  green: number
}

export interface DimensionValue {
  score: Score;
  comments: string;
}

export class HealthService {
  private teamRetroClient: TeamRetroClient;

  public constructor(teamRetroClient: TeamRetroClient){
    this.teamRetroClient = teamRetroClient;
  }

  public async getLatestHealthCheck(): Promise<HealthCheck> {
    return (await this.getAllHealthChecks())[0];
  }

  public async getAllHealthChecks(): Promise<HealthCheck[]> {
    let response = await this.teamRetroClient.getHealthChecks(20);

    return response.data.reverse()
    .map(check => {
      let scoreCounts = {
        0: 0, // red
        1: 0, // orange
        8: 0, // green
      }
        check.dimensions.map(dimension => {
        const scores = dimension.ratings.flatMap(rating  => rating.rating)
        scoreCounts[0] += scores.filter(s => s === -1).length;
        scoreCounts[1] += scores.filter(s => s === 0).length;
        scoreCounts[8] += scores.filter(s => s === 1).length;
        return {
          name: dimension.description,
          score: scores.reduce((sum, current) => sum + current, 0) / scores.length
        }
      })
      const total = scoreCounts[0] + scoreCounts[1] + scoreCounts[8];
      const red = scoreCounts[0]/total*150;
      const orange = scoreCounts[1]/total*100;
      const entries = check.dimensions.map( d => { return { 
        id: d.id,
        dimension: (d.name),
        red: (d.ratings.filter(r => r.rating === 8).length),
        green: (d.ratings.filter(r => r.rating === 1).length),
        orange: (d.ratings.filter(r => r.rating === 0).length)
      } as Entry});
      return {
        date: check.date,
        dimensions: check.dimensions.map((d: { name: string; }) => d.name),
        entries,
        healthPercentage: Math.ceil(Math.max(0, 100 - (red + orange))),
        scoreCounts,
      }
    })
  }
}