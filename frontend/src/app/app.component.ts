import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NestOperationService } from './services/nest-operation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private nestOperationService: NestOperationService) {}

  title = 'idea-nest';
  valUserName: string = '';
  resValue: string = '';

  async getRequest(val: string) {
    const data = await this.nestOperationService.getProducts('/', {
      name: val,
    });

    this.resValue = JSON.stringify(data);
  }

  async PostDetails(val: string) {    
    const data = await this.nestOperationService.postProducts('/', {
      name: val,
    });

    this.resValue = JSON.stringify(data);
  }
}
