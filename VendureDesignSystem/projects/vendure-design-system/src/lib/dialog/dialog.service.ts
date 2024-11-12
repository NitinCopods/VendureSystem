import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from './dialog.component';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    constructor(private dialog: MatDialog) { }

    openDialog(data: DialogData<unknown>): Observable<boolean> {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: data
        });
        return dialogRef.afterClosed();
    }

}
