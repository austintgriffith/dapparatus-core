export interface EventsConfig {
  debug?: boolean;
  pollInterval?: number;
  lookBack?: number; // make sure this is bigger than the number of blocks that can pass in the pollInterval
  blocksPerRead?: number; // size of chunks to scan at a time
  filter?: any; // object containing keys to filter by and their value
  contract?: any; // contract object from contract loader
  onUpdate?: (eventData: any, allEvents: any) => void; // function to call when a new event is detected
}

export const defaultEventsConfig: EventsConfig = {
  debug: false,
  pollInterval: 1777,
};

export class Events {
  public readonly config: EventsConfig = {};
  //public readonly events: Array<{}>;
  private interval!: number;

  public constructor(_config?: EventsConfig) {
    this.config = { ...defaultEventsConfig, ..._config };
  }

  public start() {
    this.interval = setInterval(this.checkEvents, this.config.pollInterval);
    setTimeout(this.checkEvents, 1);
  }

  public stop() {
    clearInterval(this.interval);
  }

  public async checkEvents() {

  }

}
