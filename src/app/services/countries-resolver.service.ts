import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Country } from "../models/countries.model";
import { CountriesService } from "./countries.service";

@Injectable({providedIn: 'root'})
export class CountriesResolverService implements Resolve<Country[]> {
  constructor(private countriesService: CountriesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.countriesService.getAllCountries();
  }
}