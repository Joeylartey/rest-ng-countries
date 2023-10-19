import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    NavBarComponent
  ]
})
export class AppComponent implements OnInit {

  _stateService = inject(StateService);
  darkMode: boolean = localStorage.getItem('darkMode') === 'true'? true : false;
  
  ngOnInit(): void {
    if (this.darkMode) {
      this._stateService.toggleTheme();
    }
  }
  
}