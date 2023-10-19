import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Country } from 'src/app/models/countries.model';
import { CountriesService } from 'src/app/services/countries.service';
import { Title } from '@angular/platform-browser';
import { BorderCountryComponent } from "../border-country/border-country.component";
import { LoadingComponent } from "../loading/loading.component";

@Component({
    selector: 'app-detail-page',
    standalone: true,
    templateUrl: './detail-page.component.html',
    styleUrls: ['./detail-page.component.css'],
    host: { 'class': 'd-flex flex-grow-1' },
    imports: [
        CommonModule,
        RouterModule,
        BorderCountryComponent,
        LoadingComponent
    ]
})
export class DetailPageComponent implements OnInit, OnDestroy {

  _title = inject(Title);
  _router = inject(Router);
  _stateService = inject(StateService);
  _activatedRoute = inject(ActivatedRoute);
  _countriesService = inject(CountriesService);

  // country
  loading: boolean | undefined;
  countryNameParam$: string = '';
  _paramSubscription: Subscription = new Subscription();
  country: Country | undefined;
  currencies: string | undefined;
  languages: string | undefined;
  tld: string | undefined;
  _countrySubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.setCountryNameParam();
  }

  setCountryNameParam(): void {
    this._paramSubscription = this._activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.countryNameParam$ = params['country'];
        this.getCountryByName();
      },
      error: (error) => console.log(error),
      complete: () => {}
    });
  }

  getCountryByName(countryName?: string): void {
    this.loading = true;
    this._countrySubscription = this._countriesService.getCountryByName(countryName || this.countryNameParam$).subscribe({
      next: (res: Country[]) => {
        this.transformData(res[0]);
        this.country = res[0];
        this._title.setTitle(`${this.country.name.common} - Details`);
      },
      error: (error) => {
        if (error.status === 404) {
          this._router.navigate(['not-found']);
        }
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  transformData(country: Country): void {
    if (country.currencies) {
      this.currencies = Object.values(Object.values(country.currencies).map(x => x.name)).join(', ');
    }
    if (country.languages) {
      this.languages = Object.values(country.languages).join(', ');
    }
    if (country.tld) {
      this.tld = Object.values(country.tld).join(', ');
    }
  }

  displayNativeName(obj: Object) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return obj[key]['official'];
      }
    }
  }
  
  ngOnDestroy(): void {
    this._paramSubscription.unsubscribe();
    this._countrySubscription.unsubscribe();
  }

}