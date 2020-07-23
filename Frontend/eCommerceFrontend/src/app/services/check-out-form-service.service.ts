import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { endWith, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class CheckOutFormServiceService {

  private countriesUrl = "http://localhost:8080/api/countries";
  private statesUrl = "http://localhost:8080/api/states";

  constructor(private httpClient : HttpClient) { }


  getCountries () : Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(countryCode : string) : Observable<State[]>{
     const searchStateUrl = this.statesUrl+"/search/findByCountryCode?code="+countryCode;
     return this.httpClient.get<GetResponseStates>(searchStateUrl).pipe(
       map(response => response._embedded.states)
     );
  }



  getCreditCardMonths(startMonth : number) : Observable<String[]>{
    let MonthMapping = new Map();
  
    MonthMapping.set(1, "January");
    MonthMapping.set(2, "Febuary");
    MonthMapping.set(3, "March");
    MonthMapping.set(4, "April");
    MonthMapping.set(5, "May");  
    MonthMapping.set(6, "June");
    MonthMapping.set(7, "July");
    MonthMapping.set(8, "August");
    MonthMapping.set(9, "September");
    MonthMapping.set(10, "October");
    MonthMapping.set(11, "November");
    MonthMapping.set(12, "December");
    

    let data : String[] = [];
    for(let theMonth = startMonth ; theMonth <= 12 ; theMonth++){
      data.push(MonthMapping.get(theMonth));
    }
    return of(data);
  }

  getCreditCardYears() : Observable<number[]>{
    let data : number[]= [];
    const startYear : number = new Date().getFullYear();
    const endYear : number = startYear + 10 ;
    for(let theYear = startYear ; theYear <= endYear ; theYear++){
      data.push(theYear)
    }
    return of(data);
  }

  
}

interface GetResponseCountries{
  _embedded :{
    countries : Country[];
  }
}

interface GetResponseStates{
  _embedded :{
    states : State[];
  }
}
