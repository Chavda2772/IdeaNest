import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterNavigationComponent } from "../../core/components/footer-navigation/footer-navigation.component";
import { NavbarComponent } from "../../core/components/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { ItemOperationService } from '../../core/services/item-operation.service';
import { CommonFunctionsService } from '../../core/utility/common-functions.service';
import { NestItemComponent } from '../dashboard/nest-item/nest-item.component';
import { Responsedata } from '../../core/models/responsedata.model';

@Component({
  selector: 'app-add-update',
  standalone: true,
  imports: [FooterNavigationComponent, NavbarComponent, FormsModule, NestItemComponent],
  templateUrl: './add-update.component.html'
})
export class AddUpdateComponent implements OnInit {
  // Inject classes
  itemOperation = inject(ItemOperationService);
  commonFunctions = inject(CommonFunctionsService);
  router = inject(Router);

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(async params => {
      this.ParentCollectionId = params['id'];
    });
  }

  // Variables
  ItemId: number = 0;
  Title: string = "";
  Description: string = "";
  Url: string = "";
  ParentCollectionId: number | null = null;
  isUpdate: boolean = false;

  // Preview variables
  urlImage = '';
  urlDescription = '';
  urlDomain = '';

  async onFormSubmit() {
    // Validating Data
    // PENDING 
    
    let resData: Responsedata;
    // Update Item
    if (this.isUpdate) {
      resData = await this.itemOperation.updateNestItem({
        Id: this.ItemId,
        Title: this.Title,
        Description: this.Description,
        Url: this.Url
      });
    }
    // Adding Item
    else {
      resData = await this.itemOperation.addNestItem({
        Title: this.Title,
        Description: this.Description,
        Url: this.Url,
        ParentCollectionId: this.ParentCollectionId
      });
    }

    if (resData.msg)
      this.commonFunctions.showSnackBar(resData.msg)

    if (resData.success) {
      let path = 'dashboard' + (this.ParentCollectionId ? `/${this.ParentCollectionId}` : '');
      this.router.navigate([path])
    }
  }

  ngOnInit(): void {
    // router data
    this.route.data.subscribe(async params => {
      this.isUpdate = params['isUpdate'] || false;

      if (this.isUpdate) {
        this.ItemId = this.ParentCollectionId ?? 0;
        this.ParentCollectionId = null;

        // Fetch details
        let resData = await this.itemOperation.getDetails(this.ItemId);
        if (resData.success) {
          this.Title = resData.result.Title;
          this.Description = resData.result.Description;
          this.Url = resData.result.Url;

          // Preivew
          this.urlDomain = resData.result.UrlDomain;
          this.urlImage = resData.result.UrlImage;
          this.urlDescription = resData.result.UrlDescription;
        }
      }
    });

    // Fetching details from shared
    this.route.queryParams.subscribe(params => {
      this.Title = params['title'];
      this.Url = params['text'];
      this.Description = params['url'];
    });
  }

}
