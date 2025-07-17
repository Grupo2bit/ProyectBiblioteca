import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navegation } from './components/navegation/navegation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navegation ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'front';
}
