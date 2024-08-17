import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NestOperationService } from './core/services/nest-operation.service';
import { CommonFunctionsService } from './core/utility/common-functions.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private nestOperationService: NestOperationService) {}

  // inject
  _commonFunctions = inject(CommonFunctionsService);

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
