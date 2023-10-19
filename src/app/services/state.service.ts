import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  
  darkMode = new BehaviorSubject<boolean>(localStorage.getItem('darkMode') === 'true'? true : false);
  darkMode$ = this.darkMode.asObservable();

  toggleTheme(setLightMode?: boolean) {

    let localSetting: string | null = localStorage.getItem('darkMode');

    if (localSetting != 'true' && localSetting != 'false') {
      localStorage.setItem('darkMode', 'true');
      this.darkMode.next(true);
    }

    if (localSetting === 'true' && setLightMode) {
      localStorage.setItem('darkMode', 'false');
      this.darkMode.next(false);
    } else if (!localSetting || localSetting === 'false') {
      localStorage.setItem('darkMode', 'true');
      this.darkMode.next(true);
    }

    document.body.classList.toggle('dark-theme');
    
  }

}