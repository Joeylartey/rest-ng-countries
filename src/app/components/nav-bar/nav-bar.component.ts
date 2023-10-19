import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  
  _stateService = inject(StateService);
  darkMode$ = this._stateService.darkMode$;
  
  toggleTheme() {
    this._stateService.toggleTheme(true);
  }

}