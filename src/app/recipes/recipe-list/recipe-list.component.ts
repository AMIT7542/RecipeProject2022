import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { recipeService } from '../recipe.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: Recipe[];
  subscription!: Subscription;

  constructor(
    private _recipe: recipeService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this._recipe.recipeChanged.subscribe(
      (recipe: Recipe[]) => {
        this.recipes = recipe;
      }
    );
    this.recipes = this._recipe.getListOfRecipe();
  }
  redirectToNewRecipe() {
    this._router.navigate(['new'], { relativeTo: this._routes });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
