import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { Recipe } from '../recipe-list/recipe.model';
import { recipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input()
  selectedRecipe!: Recipe | undefined;
  id!: number;
  constructor(
    private _shopping: ShoppingService,
    private _recipe: recipeService,
    private _routes: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._routes.params.subscribe((params) => {
      this.id = +params['id'];
      this.selectedRecipe = this._recipe.getRecipeByIndex(this.id);
    });
  }
  toShoppingList() {
    let ingredient = this.selectedRecipe?.ingredients;

    this._shopping.addIngredients(ingredient);
  }
  redirectToEditRecipe() {
    this._router.navigate(['edit'], { relativeTo: this._routes });
  }
  deleteRecipe() {
    this._recipe.deleteRecipe(this.id);
    this._router.navigate(['/recipes']);
  }
}
