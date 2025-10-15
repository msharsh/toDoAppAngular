import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [FormsModule, RouterOutlet],
  styleUrl: './app.css',
})

export class App {
  
}
