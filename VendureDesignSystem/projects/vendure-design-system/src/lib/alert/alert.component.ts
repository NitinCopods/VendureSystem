import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { capitalize } from '../utils/capitalize';
import { composeClasses } from '../utils/classes-util';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() title?: string = '';
  @Input() action?: string = '';
  @Input() type?: 'info' | 'success' | 'warning' | 'error' = 'info';
  @Input() className?: string = '';
  @Input() dismissible?: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>
  ) { }


  // Function to get the alert icon based on type
  getAlertIcon() {
    switch (this.type) {
      case 'info':
        return 'info';
      case 'success':
        return 'check_circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'cancel';
      default:
        return 'info';
    }
  }

  // Function to build all the classes based on prop for component
  getUtilityClasses() {
    const states = [
      capitalize(this.type)];
    const classes = composeClasses(states, "alert", this.className);
    return classes;
  }
}