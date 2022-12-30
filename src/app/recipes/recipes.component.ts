import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';
import { recipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
