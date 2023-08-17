import { NgModule } from '@angular/core';
import { NgxMitiComponent } from './ngx-miti.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgxMitiComponent],
  imports: [OverlayModule, FormsModule, CommonModule],
  exports: [NgxMitiComponent, OverlayModule, FormsModule, CommonModule],
})
export class NgxMitiModule {}
