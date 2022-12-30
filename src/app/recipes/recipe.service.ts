import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe-list/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class recipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipeChanged = new Subject<Recipe[]>();
  // recipes: Recipe[] = [
  //   new Recipe(
  //     'A Test Recipe',
  //     'This is simply a test',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
  //     [new ingredient('tomatoes', '20')]
  //   ),
  //   new Recipe(
  //     'birynai',
  //     'This is simply a test',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
  //     [new ingredient('chiken', '200')]
  //   ),
  // ];
  private recipes: Recipe[] = [];
  constructor() {}
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes);
  }
  getListOfRecipe() {
    return this.recipes.slice();
  }
  getRecipeByIndex(index: number) {
    return this.recipes[index];
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
