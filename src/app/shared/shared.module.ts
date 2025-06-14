import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatSignPipe } from './pipes/stat-sign.pipe';

@NgModule({
  declarations: [],
  imports: [CommonModule, StatSignPipe],
  exports: [CommonModule, StatSignPipe],
})
export class SharedModule {}
