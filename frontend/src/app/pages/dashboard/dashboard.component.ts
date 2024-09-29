import { Component, inject, OnInit } from '@angular/core';
import { CommonFunctionsService } from '../../core/utility/common-functions.service';
import { NestOperationService } from '../../core/services/nest-operation.service';
import { NestItemComponent } from './nest-item/nest-item.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FooterNavigationComponent } from '../../core/components/footer-navigation/footer-navigation.component';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { UserService } from '../../core/services/user.service';
import { CollectionOperationService } from '../../core/services/collection-operation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionResponse } from '../../core/models/nestItem.model';
import { NestFolderComponent } from "./nest-folder/nest-folder.component";
import { MatDialog } from '@angular/material/dialog';
import { AddSelectionWindowComponent } from './add-selection-window/add-selection-window.component';
import { NgxMasonryModule, NgxMasonryOptions } from 'ngx-masonry';
import { animate, style } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    NestItemComponent,
    NgIf,
    FooterNavigationComponent,
    NavbarComponent,
    NestFolderComponent,
    NgxMasonryModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private activeRoute: ActivatedRoute, private dialogRef: MatDialog) { }

  // inject
  commonFunctions = inject(CommonFunctionsService);
  userService = inject(UserService);
  collectionOperationService = inject(CollectionOperationService);
  nestOperationService = inject(NestOperationService);
  router = inject(Router);

  // Variables
  CollectionId: number | undefined;
  CollectionName: string = "";
  CollectionDetail: CollectionResponse | undefined;
  masonryOptions: NgxMasonryOptions = {
    gutter: 20,
    percentPosition: true,
    horizontalOrder: true,
    resize: true,
    animations: {
      show: [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 })),
      ],
    }
  };

  // Fetch user Details
  ngOnInit(): void {
    this.activeRoute.params.subscribe(async params => {
      this.CollectionId = params['id'];
      // If user is not authorized then logout
      try {
        await this.refreshCollectionAndItems();
      } catch (error: any) {
        if (error?.status == 401) {
          this.commonFunctions.showSnackBar('Session Expired.')
          this.userService.Logout()
        }
      }
    });
  }

  // Fetch details
  async refreshCollectionAndItems() {
    let collectionDetails = await this.collectionOperationService.getCollectionAndItems(this.CollectionId);
    this.CollectionDetail = collectionDetails;
    this.CollectionName = collectionDetails.CollectionName ?? "Home";
  }

  // Events
  onFooterAddClick() {
    this.dialogRef.open(AddSelectionWindowComponent, {
      width: '390px',
      data: {
        CollectionId: 0,
        CollectionName: '',
        CollectionParentId: this.CollectionId
      },
    }).afterClosed().subscribe(async () => {
      await this.refreshCollectionAndItems();
    });
  }

  onIconClick() {
    let path = 'add' + (this.CollectionId ? `/${this.CollectionId}` : '');
    this.router.navigate([path]);
  }

  async onDeleteItem() {
    await this.refreshCollectionAndItems();
  }
}
