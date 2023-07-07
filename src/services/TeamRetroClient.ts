import { createMapper } from "@jeroenhuinink/tsmapper";

export class TeamRetroClient {
    private apiKey: string;
    public constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    public async getHealthChecks(limit: number): Promise<HealthChecksDto> {
        const url = `https://api.teamretro.com/v1/health-checks?limit=${limit}&include=ratings`;
        const options = {
            method: 'GET',
            headers: {Accept: 'application/json', 'X-API-KEY': this.apiKey}
        };

        try {
            const response = await fetch(url, options);
            return (await response.json());
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

const teamMapper = createMapper('teamMapper')
    .field('id', { type: 'string' })
    .field('name', { type: 'string' })

const healthModelMapper = createMapper('healthMapper')
    .field('id', { type: 'string' })
    .field('name', { type: 'string' })

const participantMapper = createMapper('participantMapper')
    .field('id', {type: 'string'})

const ratingMapper = createMapper('ratingMapper')
    .field('participant', {key: 'participant', mapper: participantMapper})
    .field('rating', {type: "number"})

const dimensionsMapper = createMapper('dimensions')
    .field('id', {type: 'string'})
    .field('name', {type: 'string'})
    .field('description',{type: 'string'})
    .field('ratings', {key:'ratings', default: [], itemType: {mapper: ratingMapper}})

const HealthCheckMapper = createMapper('HealthCheckMapper')
    .field('id', { type: 'string' })
    .field('title', { type: 'string' })
    .field('date', { type: 'string' })
    .field('team', { key: 'team', mapper: teamMapper })
    .field('healthModel', { key: 'healthModel', mapper: healthModelMapper })
    .field('dimensions', {key: 'dimensions', default: [], itemType: { mapper: dimensionsMapper}})
    .field('status', { type: 'string' })
    .field('created', { type: 'string' })

const healthCheckResponseMapper = createMapper('healthCheckResponseMapper')
    .field('success', { type: 'boolean' })
    .field('data', { key: 'data', default: [], itemType: {mapper: HealthCheckMapper}})
    .field('total', { type: 'number' })
    .field('offset', { type: 'number' })
    .field('count', { type: 'number' });

type HealthChecksDto = ReturnType<typeof healthCheckResponseMapper.map>