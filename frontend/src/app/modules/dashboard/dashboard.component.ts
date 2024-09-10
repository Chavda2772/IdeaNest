import { Component, inject, OnInit } from '@angular/core';
import { CommonFunctionsService } from '../../core/utility/common-functions.service';
import { NestOperationService } from '../../core/services/nest-operation.service';
import { NestItemComponent } from './components/nest-item/nest-item.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FooterNavigationComponent } from './components/footer-navigation/footer-navigation.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserService } from '../../core/services/user.service';
import { CollectionOperationService } from '../../core/services/collection-operation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionResponse } from '../../core/models/nestItem.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    NestItemComponent,
    NgIf,
    FooterNavigationComponent,
    NavbarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private nestOperationService: NestOperationService, private route: ActivatedRoute) {

  }

  // inject
  commonFunctions = inject(CommonFunctionsService);
  userService = inject(UserService);
  collectionOperationService = inject(CollectionOperationService);

  // Fetch user Details
  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.CollectionId = params['id'];
      this.CollectionList = await this.collectionOperationService.getCollectionAndItems(this.CollectionId);
      this.generatedData = this.CollectionList.Items[0];
    });
  }

  CollectionId: number | undefined;
  CollectionList: CollectionResponse | undefined;

  title = 'idea-nest';
  previewURL = 'https://www.google.com/';
  valUserName: string = '';
  generatedData: any = {
    success: true,
    url: 'https://www.google.com/',
    title: 'Google',
    mediaType: 'website',
    contentType: 'text/html',
    images: [
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png',
    ],
    videos: [],
    favicons: ['https://www.google.com/favicon.ico'],
    charset: 'ISO-8859-1',
  };

  async getRequest(val: string) {
    const data = await this.nestOperationService.getProducts('/', {
      name: val,
    });
  }

  async onGenerateUrl() {
    const data = await this.nestOperationService.postProducts('/generate', {
      url: this.previewURL,
    });

    this.generatedData = data;
  }


}
