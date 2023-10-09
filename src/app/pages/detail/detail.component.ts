import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { ApiService } from 'src/app/services/api.service';
import { Country, Currency, Language } from 'src/app/types/api';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  country$: Observable<Country>;
  borderCountries$: Observable<Country[]>;
  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.country$ = this.api.getCountryByName(params.country).pipe(
        tap(
          (res) => console.log(res)
        ),
        mergeMap((res) => {
          if (res.borders) {
            this.borderCountries$ = this.api.getCountriesByCodes(res.borders);
          }
          return of(res);
        })
      );
    });
  }
  
  displayNativeName(obj: Object) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return obj[key]['official'];
      }
    }
  }

  displayCurrencies(currencies: Currency[]) {
    const currenciesArray = [];
    for (const key in currencies) {
      if (currencies.hasOwnProperty(key)) {
        currenciesArray.push(currencies[key]['name']);
      }
    }
    return currenciesArray.join(', ');
  }

  displayLanguages(languages: Language[]) {
    const languagesArray = [];
    for (const key in languages) {
      if (languages.hasOwnProperty(key)) {
        languagesArray.push(languages[key]);
      }
    }
    return languagesArray.join(', ');
  }

}




// import { Component, OnInit } from '@angular/core';
// import { ApiService } from 'src/app/services/api.service';
// import { Observable, forkJoin, of } from 'rxjs';
// import { Country, Currency, Language } from 'src/app/types/api';
// import { ActivatedRoute } from '@angular/router';
// import { tap, mergeMap } from 'rxjs/operators';

// @Component({
//   selector: 'app-detail',
//   templateUrl: './detail.component.html',
//   styleUrls: ['./detail.component.scss'],
// })
// export class DetailComponent implements OnInit {
//   country$: Observable<Country>;
//   borderCountries$: Observable<Country[]>;

//   constructor(private api: ApiService, private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     this.route.params.subscribe((params) => {
//       this.country$ = this.api.getCountryByName(params.country).pipe(
//         tap((res) => console.log(res)),
//         mergeMap((res) => {
//           this.borderCountries$ = this.api.getCountriesByCodes(res.borders);

//           return of(res);
//         })
//       );
//     });
//   }

//   displayCurrencies(currencies: Currency[]) {
//     return currencies.map((currency) => currency.name).join(', ');
//   }

//   displayLanguages(languages: Language[]) {
//     return languages.map((language) => language.name).join(', ');
//   }
// }
