import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './services/app.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [MatCardModule],
  providers: [TodoService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'client';

  service = inject(TodoService);

  ngOnInit() {
    this.service.getTodos().subscribe((res) => {
      console.log('res', res);
    });
  }
}
