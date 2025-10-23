import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatSignPipe } from './pipes/stat-sign.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [],
  imports: [CommonModule, StatSignPipe, CapitalizePipe],
  exports: [CommonModule, StatSignPipe, CapitalizePipe],
})
export class SharedModule {}
