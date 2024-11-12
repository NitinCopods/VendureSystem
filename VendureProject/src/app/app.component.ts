import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VendureDesignSystemComponent, ButtonComponent, ThemeService, InputFieldComponent, AlertComponent, DialogComponent, DialogService } from 'vendure-design-system';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VendureDesignSystemComponent, ButtonComponent, InputFieldComponent, AlertComponent, DialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  title = 'VendureProject';
  isDarkTheme = signal(false);
  // readonly dialog = inject(MatDialog);

  // openDialog(): void {
  //   this.dialog.open(DialogComponent, {
  //     width: '250px',
  //   });
  // }

  constructor(private themeService: ThemeService, private dialogService: DialogService) {

    const darkTheme = {
      primary: 'red',
    };

    const lightTheme = {
      primary: 'black',
    };
    this.themeService.setTheme(this.isDarkTheme() ? darkTheme : lightTheme);
  }

  // Function to toggle theme
  toggleTheme() {
    this.isDarkTheme.update(isDark => !isDark);

    const darkTheme = {
      primary: 'red',
    };

    const lightTheme = {
      primary: 'beige',
    };

    this.themeService.setTheme(this.isDarkTheme() ? darkTheme : lightTheme);
  }

  openDialog(): void {
    this.dialogService.openDialog({
      title: 'Confirm Action',
      message: 'Are you sure you want to proceed?',
      confirmText: 'Yes, proceed',
      cancelText: 'No, go back'
    }).subscribe(result => {
      if (result) {
        console.log('User confirmed the action');
        // Handle confirmation
      } else {
        console.log('User cancelled the action');
        // Handle cancellation
      }
    });
  }
}
