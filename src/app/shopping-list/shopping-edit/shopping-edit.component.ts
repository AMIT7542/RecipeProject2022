import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('ingredientForm', { static: false })
  form!: NgForm;
  subscription: Subscription = new Subscription();
  index: unknown;
  editMode: Boolean = false;
  constructor(private _shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.subscription = this._shoppingService.editIngredient.subscribe((i) => {
      this.index = i;
      this.editMode = true;
      const ingredient = this._shoppingService.getIngredient(this.index);
      this.form.setValue({
        name: ingredient.name,
        amount: ingredient.amount,
      });
    });
  }

  addItem(ingredientForm: any) {
    const obj = ingredientForm.value;
    // const item = new ingredient(obj.name, obj.amount);
    this.addItemToList(obj);
  }
  addItemToList(item: ingredient) {
    if (this.editMode) {
      this._shoppingService.updateIngredients(this.index, item);
      this.editMode = !this.editMode;
    } else {
      
      this._shoppingService.addIngredients(item);
    }
    this.onClear();
  }
  deleteIngredient() {
    this._shoppingService.deleteIngredient(this.index);
    this.onClear();
  }
  onClear() {
    this.form.reset();
    this.editMode = false;
  }
}
