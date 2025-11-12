export class FactionStat {
  public gold: number;
  public resource: number;
  public population: number;
  public conscript: number;
  public order: number;
  public satisfaction: number;
  public influence: number;

  constructor(
    gold?: number,
    resource?: number,
    population?: number,
    conscript?: number,
    order?: number,
    satisfaction?: number,
    influence?: number,
  ) {
    this.gold = gold ?? 1000;
    this.resource = resource ?? 500;
    this.population = population ?? 1000;
    this.conscript = conscript ?? 500;
    this.order = order ?? 80;
    this.satisfaction = satisfaction ?? 80;
    this.influence = influence ?? 50;
  }
}
