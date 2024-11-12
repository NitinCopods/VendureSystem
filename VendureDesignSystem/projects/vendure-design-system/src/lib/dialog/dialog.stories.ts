import { Meta, moduleMetadata, StoryFn, StoryObj } from "@storybook/angular";
import { DialogComponent, DialogData } from "./dialog.component";
import { ButtonComponent } from "../button/button.component";
import { DialogService } from "./dialog.service";
import { action } from '@storybook/addon-actions';
import { Component, Input, Type } from "@angular/core";
import { InputFieldComponent } from "../input-field/input-field.component";


// Create a host component with proper input typing
@Component({
    selector: 'app-dialog-host',
    template: `
      <div style="padding: 20px;">
        <lib-button label="Open Dialog" (click)="openDialog()"></lib-button>
      </div>
    `
})

class DialogHostComponent {
    @Input() title: string = '';
    @Input() message: string = '';
    @Input() confirmText?: string;
    @Input() cancelText?: string;

    constructor(private dialogService: DialogService) { }

    openDialog() {
        const config = {
            title: this.title,
            message: this.message,
            confirmText: this.confirmText,
            cancelText: this.cancelText,
            component: InputFieldComponent,
        }
        this.dialogService.openDialog(config).subscribe(result => {
            action('Dialog Result')(result);
        });
    }
}


const meta: Meta<DialogHostComponent> = {
    title: "Components/Dialog",
    component: DialogHostComponent,
    decorators: [
        moduleMetadata({
            imports: [
                DialogComponent,
                ButtonComponent,
                InputFieldComponent
            ],
        })
    ],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
              A customizable Material Design dialog component that can be used for confirmations,
              alerts, and custom content. The dialog supports custom titles, messages, and button text.
            `
            }
        }
    },

    argTypes: {
        title: {
            control: 'text',
            description: 'The title of the dialog',
            defaultValue: 'Confirm Action'
        },
        message: {
            control: 'text',
            description: 'The main message of the dialog',
            defaultValue: 'Are you sure you want to proceed?'
        },
        confirmText: {
            control: 'text',
            description: 'Text for the confirm button',
            defaultValue: 'Confirm'
        },

    }
};

export default meta;
type Story = StoryObj<DialogData<unknown>>;

export const Basic: Story = {
    args: {
        title: 'Confirm Dialog',
        message: 'Are you sure you want to proceed?',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
    },
};