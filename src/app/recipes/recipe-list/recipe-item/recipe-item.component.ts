import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { recipeService } from '../../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: any;
  @Input()
  index!: number;
  constructor(
    private _recipe: recipeService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  onSelected() {
    // this._router.navigate([this.index], { relativeTo: this._routes });
    this._router.navigate([this.index], { relativeTo: this._routes });
  }
}
