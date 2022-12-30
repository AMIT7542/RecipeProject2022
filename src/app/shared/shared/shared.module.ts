import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDropdownDirective } from '../app-dropdown.directive';
import { LoaderComponent } from '../loader/loader.component';

@NgModule({
  declarations: [AppDropdownDirective, LoaderComponent],
  imports: [CommonModule],
  exports: [CommonModule, AppDropdownDirective, LoaderComponent],
})
export class SharedModule {}
