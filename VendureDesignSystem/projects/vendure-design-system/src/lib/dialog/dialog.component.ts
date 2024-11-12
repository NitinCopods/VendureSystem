import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, ComponentRef, Inject, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';

export interface DialogData<T> {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  component?: Type<T | unknown>;
}

@Component({
  selector: 'lib-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true })
  dynamicComponentContainer!: ViewContainerRef;

  componentRef!: ComponentRef<unknown>;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData<unknown>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    if (this.data?.component) {
      this.dynamicComponentContainer.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);
      this.componentRef = this.dynamicComponentContainer.createComponent(componentFactory);
    }
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
