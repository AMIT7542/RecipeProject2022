import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { recipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class headerComponent implements OnInit {
  title = 'header';
  collapsed = true;
  loggedIn = false;
  private userSubscrition!: Subscription;
  constructor(
    private _dataService: DataStorageService,
    private _recipes: recipeService,
    private _authService: AuthService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.userSubscrition = this._authService.loggedIn.subscribe((data) => {
      this.loggedIn = data;
    });
  }

  storeRecipes() {
    this._dataService.storeRecipes().subscribe((data) => {});
  }
  fetchRecipe() {
    this._dataService.fetchRecipe().subscribe((data) => {
      this._recipes.setRecipes(data);
    });
  }
  logOut() {
    this._authService.clearStorage();
    this._router.navigate(['/auth']);
  }
  ngOnDestroy() {
    this.userSubscrition.unsubscribe();
  }
}
