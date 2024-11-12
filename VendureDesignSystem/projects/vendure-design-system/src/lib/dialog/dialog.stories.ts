import { Meta, moduleMetadata, StoryFn } from "@storybook/angular";
import { DialogComponent } from "./dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ButtonComponent } from "../button/button.component";
import { DialogService } from "./dialog.service";
import { action } from '@storybook/addon-actions';
import { Component, Input } from "@angular/core";

interface DialogConfig {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
}

// Create a host component with proper input typing
@Component({
    selector: 'app-dialog-host',
    template: `
      <div style="padding: 20px;">
        <lib-button  (click)="openDialog()">
          Open Dialog
        </lib-button>
      </div>
    `
})

class DialogHostComponent {
    @Input() config!: DialogConfig;

    constructor(private dialogService: DialogService) { }

    openDialog() {
        this.dialogService.openDialog(this.config).subscribe(result => {
            action('Dialog Result')(result);
        });
    }
}


export default {
    title: "Components/Dialog",
    component: DialogHostComponent,
    decorators: [
        moduleMetadata({
            imports: [
                MatDialogModule,
                ButtonComponent
            ],
            providers: [DialogService],
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
        cancelText: {
            control: 'text',
            description: 'Text for the cancel button',
            defaultValue: 'Cancel'
        }
    }
} as Meta;

// const DialogDemoComponent = {
//     template: `
//       <button mat-raised-button color="primary" (click)="openDialog()">
//         Open Dialog
//       </button>
//     `,
//     props: {
//         dialogService: undefined,
//         dialogConfig: undefined,
//         onResult: undefined
//     }
// };

// const Template: StoryFn = (args) => ({
//     ...DialogDemoComponent,
//     props: {
//         dialogService: {
//             openDialog: (config: any) => {
//                 action('Dialog Opened')(config);
//                 return {
//                     afterClosed: () => ({
//                         subscribe: (fn: (result: boolean) => void) => {
//                             action('Dialog Closed')(true);
//                             fn(true);
//                         }
//                     })
//                 };
//             }
//         },
//         dialogConfig: args,
//         openDialog: function () {
//             this['dialogService'].openDialog(this['dialogConfig'])
//         }
//     }
// });


const Template = (args: DialogConfig) => ({
    props: {
        config: args
    }
});

export const Basic: StoryFn<DialogConfig> = Template.bind({});
Basic.args = {
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
    confirmText: 'Confirm',
    cancelText: 'Cancel'
};