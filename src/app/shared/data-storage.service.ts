import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recipe } from '../recipes/recipe-list/recipe.model';
import { recipeService } from '../recipes/recipe.service';
const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private _http: HttpClient, private _recipe: recipeService) {}

  storeRecipes(): Observable<any> {
    const recipes = this._recipe.getListOfRecipe();
    return this._http.put(`${baseUrl}/recipes.json`, recipes);
  }
  fetchRecipe(): Observable<any> {
    return this._http.get<Recipe[]>(`${baseUrl}/recipes.json`).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      })
    );
  }
}
