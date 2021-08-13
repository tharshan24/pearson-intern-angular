export class Country {
  id:number;
  countryCode:string;
  countryName:string;
  continent:string;
  population:number;
  covidPositives:number;



  constructor(id: number, countryCode: string, countryName: string, continent:string,population: number, covidPositives: number) {
    this.id = id;
    this.countryCode = countryCode;
    this.countryName = countryName;
    this.population = population;
    this.covidPositives = covidPositives;
    this.continent=continent;
  }
}
