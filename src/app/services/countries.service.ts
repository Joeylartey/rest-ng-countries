import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../models/countries.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private countries: Observable<Country[]>
  _http = inject(HttpClient);
  api = 'https://restcountries.com/v3.1';
  // responseFilters: string = 'name,population,region,subregion,capital,tld,currencies,languages,borders,flags';

  getAllCountries(): Observable<Country[]> {
    this.countries = this._http.get<Country[]>(`${this.api}/all`);
    return this.countries;
  }

  searchByName(name: string): Observable<Country[]> {
    return this.countries.pipe( 
      map((countries: Country[]) => countries.filter(country => country.name.common.toLowerCase().includes(name.trim().toLowerCase())))
      );
  }

  // getCountryByName(countryName: string): Observable<Country[]> {
  //   return this._http.get<Country[]>(`${this.api}/name/${countryName}?fullText=true`);
  // }

  getCountryByName(name: string): Observable<Country[]|undefined> {
    return this.countries.pipe( 
    map((countries: Country[]) => countries.filter(country => country.name.common.toLowerCase().includes(name.trim().toLowerCase())))
    );
  }

  // getCountryByCode(countryCode: string): Observable<Country[]> {
  //   return this._http.get<Country[]>(`${this.api}/alpha/${countryCode}`);
  // }

  
  getCountryByCode(code: string): Observable<Country[]|undefined> {
    return this.countries.pipe(
      map((countries: Country[]) => {
          const country = countries.filter(country => country.cca3 === code);
          return country;
      })
  );
  }

  // https://restcountries.com/v3.1/region/{region}
  // getByRegion(region: string): Observable<Country[]> {
  //   return this._http.get<Country[]>(`${this.api}/region/${region}`);
  // }

  getByRegion(region: string): Observable<Country[]> {
    return this.countries.pipe( // this.countries since getbyregion is only used on the homepage which already initializes the getcountries request
        map((countries: Country[]) => countries.filter(country => country.region.toLowerCase() === region.toLowerCase()))
      );
}

}
