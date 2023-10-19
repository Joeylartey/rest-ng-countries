import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css'],
  host: { 'class': 'd-flex flex-grow-1' }
})
export class NotFoundPageComponent {

}
