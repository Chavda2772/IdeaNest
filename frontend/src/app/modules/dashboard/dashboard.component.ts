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
import { ActivatedRoute } from '@angular/router';
import { CollectionResponse } from '../../core/models/nestItem.model';
import { NestFolderComponent } from "./nest-folder/nest-folder.component";
import { MatDialog } from '@angular/material/dialog';
import { AddSelectionWindowComponent } from './add-selection-window/add-selection-window.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    NestItemComponent,
    NgIf,
    FooterNavigationComponent,
    NavbarComponent,
    NestFolderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private route: ActivatedRoute, private dialogRef: MatDialog) { }

  // inject
  commonFunctions = inject(CommonFunctionsService);
  userService = inject(UserService);
  collectionOperationService = inject(CollectionOperationService);
  nestOperationService = inject(NestOperationService);

  // Variables
  CollectionId: number | undefined;
  CollectionList: CollectionResponse | undefined;

  // Fetch user Details
  ngOnInit(): void {
    this.route.params.subscribe(async params => {
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
    this.CollectionList = await this.collectionOperationService.getCollectionAndItems(this.CollectionId);
  }


  // Events
  onFooterAddClick() {
    this.dialogRef.open(AddSelectionWindowComponent, {
      width: '500px',
      data: {
        CollectionId: 0,
        CollectionName: '',
        CollectionParentId: this.CollectionId
      },
    }).afterClosed().subscribe(() => {
      // TODO: Refresh on adding item or Collection
    });
  }
}
