import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterNavigationComponent } from "../../core/components/footer-navigation/footer-navigation.component";
import { NavbarComponent } from "../../core/components/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { ItemOperationService } from '../../core/services/item-operation.service';
import { CommonFunctionsService } from '../../core/utility/common-functions.service';

@Component({
  selector: 'app-add-update',
  standalone: true,
  imports: [FooterNavigationComponent, NavbarComponent, FormsModule],
  templateUrl: './add-update.component.html'
})
export class AddUpdateComponent implements OnInit {
  // Inject classes
  itemOperationService = inject(ItemOperationService);
  commonFunctionsService = inject(CommonFunctionsService);

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(async params => {
      this.ParentCollectionId = params['id'];
    });
  }

  // Variables
  ItemId: number | undefined;
  Title: string | undefined;
  Description: string | undefined;
  Url: string | undefined;
  ParentCollectionId: number | null = null;

  async onFormSubmit() {
    // Validating Data
    // PENDING 

    // Adding Item
    let res = await this.itemOperationService.addNestItem({
      Title: this.Title,
      Description: this.Description,
      Url: this.Url,
      ParentCollectionId: this.ParentCollectionId
    });

    if (res.msg)
      this.commonFunctionsService.showSnackBar(res.msg)
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ItemId = params['id'];
    });

    // Fetching details from shared
    this.route.queryParams.subscribe(params => {
      this.Title = params['title'];
      this.Url = params['text'];
      this.Description = params['url'];
    });
  }

}
