import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const moduleList = [
  CommonModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatChipsModule,
  MatTabsModule,
  MatTableModule,
  MatProgressBarModule,
  MatCardModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatSnackBarModule
]

@NgModule({
  declarations: [],
  imports: moduleList,
  exports: moduleList
})

export class MaterialUIModule { }
