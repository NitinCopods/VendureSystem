import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { composeClasses } from '../utils/classes-util';

@Component({
  selector: 'lib-input-field',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  @Input() defaultValue?: string = '';
  @Input() className?: string = '';
  @Input() value?: string = '';
  @Input() label?: string = '';
  @Input() disabled?: boolean = false;
  @Input() clear?: boolean = false;
  @Input() focused?: boolean = false;
  @Input() error?: boolean = false;
  @Input() startAdornment?: string = '';
  @Input() placeholder?: string = '';
  @Input() hint?: string = '';
  @Input() endAdornment?: string = '';

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // Force change detection after initialization
    this.cdr.detectChanges();
  }

  // Function to build all the classes based on prop for component
  getUtilityClasses() {
    const states = [
      this.disabled && 'disabled',
      this.focused && 'focused',
      this.clear && 'clearIcon',
      this.error && 'error',
      this.startAdornment && 'startAdornment',
      this.endAdornment && 'endAdornment',
      this.placeholder && 'placeholder',
      this.hint && 'hint',
    ];

    const classes = composeClasses(states, "input-field", this.className);
    return classes;
  }
}
