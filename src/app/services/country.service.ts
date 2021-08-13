import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Country} from "../models/country";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  //base url of the backend
  baseUrl="http://localhost:8080/rest/v2/";

  constructor(private http: HttpClient) { }

  // initial page
  getAllCountries(): Observable<any> {
    return this.http.get<any>(this.baseUrl+"countries");
  }

  // to get a singnle country
  getCountry(id:number): Observable<Country> {
    return this.http.get<Country>(this.baseUrl+"country/"+id);
  }

  // delete country by id
  deleteCountry(id:number): Observable<Country> {
    return this.http.delete<Country>(this.baseUrl+"country/"+id);
  }

  saveCountry(country:Country): Observable<Country> {
    //defining josn format
    const httpOptions = { headers: new HttpHeaders(({'Content-Type': 'application/json'}))};
    return this.http.post<Country>(this.baseUrl+"country/",country,httpOptions);
  }

  //searching countries with name or code
  getCountriesByName(country:string): Observable<Country[]> {
    return this.http.get<Country[]>(this.baseUrl+"countries/search"+country);
  }

}
