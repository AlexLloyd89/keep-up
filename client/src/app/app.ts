import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './services/app.service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [TodoService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'client';

  service = inject(TodoService);
  authSvc = inject(AuthService);

  ngOnInit() {
    this.service.getTodos().subscribe((res) => {
      console.log('res', res);
    });
  }
}
