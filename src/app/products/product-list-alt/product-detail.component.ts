import { Component, OnChanges } from '@angular/core';
import { combineLatest, EMPTY } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnChanges {
  pageTitle = 'Product Detail';
  errorMessage = '';
  product$ = this.productService.selectedProduct$.pipe(
    tap((a) => console.log(a)),

    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  productSuppliers$ = this.productService.selectedProductSuppliers$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  pageTitle$ = this.product$.pipe(
    map((p: Product) => (p ? `product Detail for: ${p.productName}` : null))
  );

  vm$ = combineLatest([
    this.product$,
    this.productSuppliers$,
    this.pageTitle$,
  ]).pipe(
    filter(([product]) => Boolean(product)),
    map(([product, productSuppliers, pageTitle]) => ({
      product,
      productSuppliers,
      pageTitle,
    }))
  );

  constructor(private productService: ProductService) {}

  ngOnChanges() {
    console.log(345);
  }
}
