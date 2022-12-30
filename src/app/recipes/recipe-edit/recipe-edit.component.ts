import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  recipeFormError,
  recipeFormMesseges,
  allowChartersOnly,
  allowNumbersOnly,
} from '../../helper/validation';
import { recipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  editMode: boolean = false;
  id!: number;
  recipeForm!: FormGroup;
  recipe: any;
  disableForm: boolean = false;
  showButton = false;
  formErrors = recipeFormError;
  validationMessges = recipeFormMesseges;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _recipe: recipeService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      this.recipeForm.valueChanges.subscribe((data) => {
        this.validateAllFormFields(this.recipeForm);
      });
    });
  }
  initForm() {
    this.recipeForm = this._fb.group({
      name: ['', [Validators.required, Validators.pattern(allowChartersOnly)]],
      imagePath: ['', Validators.required],
      description: [''],
      ingredients: this._fb.array([]),
    });
    if (this.editMode) {
      this.recipe = this._recipe.getRecipeByIndex(this.id);
      this.showButton = true;
      if (this.recipe.ingredients) {
        this.recipe.ingredients.forEach(
          (element: { name: any; amount: any }) => {
            this.IngredientAsArray.push(
              this._fb.group({
                name: [
                  element.name,
                  [Validators.required, Validators.pattern(allowChartersOnly)],
                ],
                amount: [
                  element.amount,
                  [Validators.required, Validators.pattern(allowNumbersOnly)],
                ],
              })
            );
          }
        );
      }
      let obj = {
        name: this.recipe.name,
        imagePath: this.recipe.imagePath,
        description: this.recipe.description,
      };
      this.recipeForm.patchValue(obj);
      this.recipeForm.disable();
      this.disableForm = true;
    }
  }

  get IngredientAsArray(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  addIngredinets() {
    this.IngredientAsArray.push(this.ingredientControls());
  }
  deleteIngredient(index: number) {
    this.IngredientAsArray.removeAt(index);
  }
  ingredientControls() {
    return this._fb.group({
      name: ['', [Validators.required, Validators.pattern(allowChartersOnly)]],
      amount: ['', [Validators.required, Validators.pattern(allowNumbersOnly)]],
    });
  }
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      if (this.editMode) {
        this._recipe.updateRecipe(this.id, this.recipeForm.value);
      } else {
        this._recipe.addRecipe(this.recipeForm.value);
      }
    } else {
      this.recipeForm.markAllAsTouched();
      this.checkFormValidity();
    }
    this.navigate();
  }
  navigate() {
    this.recipeForm.reset();
    this._router.navigate(['../'], { relativeTo: this._route });
  }
  enableReceipeForm() {
    this.recipeForm.enable();
    this.showButton = !this.showButton;
  }

  checkFormValidity() {
    this.validateAllFormFields(this.recipeForm);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key: string) => {
      const abstractControl = formGroup.get(key);
      if (abstractControl instanceof FormGroup) {
        this.validateAllFormFields(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (
          abstractControl &&
          !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)
        ) {
          const messages = this.validationMessges[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }
}
