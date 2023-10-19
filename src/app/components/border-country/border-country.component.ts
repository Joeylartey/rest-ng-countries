import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { CountriesService } from 'src/app/services/countries.service';
import { RouterModule } from '@angular/router';
import { Country } from 'src/app/models/countries.model';

@Component({
  selector: 'app-border-country',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './border-country.component.html',
  styleUrls: ['./border-country.component.css']
})
export class BorderCountryComponent implements OnInit, OnDestroy {

  @Input() countryCode: string = '';
  @Output() countryName: EventEmitter<string> = new EventEmitter<string>();

  _stateService = inject(StateService);
  _countriesService = inject(CountriesService);
  _countrySubscription: Subscription = new Subscription();
  country: Country | undefined;
  
  ngOnInit(): void {
    this.getCountryByCode();
  }

  emitCountryName() {
    this.countryName.emit(this.country?.name.common);
  }

  getCountryByCode() {
    this._countrySubscription = this._countriesService.getCountryByCode(this.countryCode).subscribe({
      next: (res: Country[]) => {
        this.country = res[0];
      },
      error: (error) => console.log(error),
      complete: () => { }
    });
  }

  ngOnDestroy(): void {
    this._countrySubscription.unsubscribe();
  }

}