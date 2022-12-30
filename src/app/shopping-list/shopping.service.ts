import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  editIngredient = new Subject();
  addIngredient = new Subject<ingredient[]>();
  private ingredient: ingredient[] = [
    new ingredient('Sandwitch', '100'),
    new ingredient('Biryani', '150'),
  ];
  constructor() {}

  getIngredients() {
    return this.ingredient;
  }
  getIngredient(index: any) {
    return this.ingredient[index];
  }
  addIngredients(ingredient: any) {
    this.ingredient.push(...ingredient);
    this.addIngredient.next(this.ingredient.slice());
  }
  updateIngredients(index: any, ingredient: any) {
    this.ingredient[index] = ingredient;
    this.addIngredient.next(this.ingredient.slice());
  }
  deleteIngredient(index: any) {
    this.ingredient.splice(index, 1);
    this.addIngredient.next(this.ingredient.slice());
  }
}
