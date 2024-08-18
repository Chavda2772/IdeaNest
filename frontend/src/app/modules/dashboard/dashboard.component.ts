import { Component, inject } from '@angular/core';
import { CommonFunctionsService } from '../../core/utility/common-functions.service';
import { NestOperationService } from '../../core/services/nest-operation.service';
import { NestItemComponent } from './components/nest-item/nest-item.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NestItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
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
