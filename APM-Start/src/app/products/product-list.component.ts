import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Text } from '@angular/compiler/src/i18n/i18n_ast';


@Component
      ({
            selector: 'pm-products',
            templateUrl: './product-list.component.html',
            styleUrls: ['./product-list.component.css']
      })
export class ProductListComponent implements OnInit {
      pageTitle: string = 'Product List';
      imageWidth: number = 45;
      imageMargin: number = 2;
      showImage: boolean = false;
      applyFilter: string = '';
      private _listFilter: string = " ";
      public get listFilter(): string {
            return this._listFilter;
      }
      public set listFilter(value: string) {
            this._listFilter = value;
            this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
      }

      filteredProducts: IProduct[];
      products: IProduct[] = [];

      clearFilter(): void {

            this.listFilter = '';

      }

      toggleImage(): void {
            this.showImage = !this.showImage;
      }


      //constructor for filter products
      constructor(private productService: ProductService) {

            // this is where filter can be set to something, nothing in it will show all
      }
      performFilter(filterBy: string): IProduct[] {
            filterBy = filterBy.toLocaleLowerCase();
            return this.products.filter((products: IProduct) =>
                  products.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);

      }
      onRatingClicked(message: string): void {
            this.pageTitle = 'Product List: ' + message;
      }
      ngOnInit(): void {
            //console.log('In OnInit')   ;

            this.productService.getProducts().subscribe({
                  next: products => {
                        this.products = products
                        this.filteredProducts = this.products;
                        this.listFilter = 'Rake';
                  },
                  error: err => this.filteredProducts = err
            });

      }
}