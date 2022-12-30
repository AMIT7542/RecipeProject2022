import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredient!: ingredient[];
  private subscription!: Subscription;
  constructor(private _shopping: ShoppingService) {}

  ngOnInit(): void {
    this.getIngredients();
  }
  getIngredients() {
    this.subscription = this._shopping.addIngredient.subscribe(
      (ingredient: ingredient[]) => {
        this.ingredient = ingredient;
      }
    );
    this.ingredient = this._shopping.getIngredients();
  }
  updateItem(index: number) {
    this._shopping.editIngredient.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
