import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormGroup } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {
    form: FormGroup;
    name: string;
    startDate: Date;
    endDate: Date;
    description: String;
    constructor(private dialogRef: MatDialogRef<ProjectDialogComponent>,
      private dashboardService:DashboardService,
      private router: Router) {}

    ngOnInit(): void {
    }

    save() {
      this.dashboardService.createNewProject(
        this.name,
        this.description,
        this.startDate,
        this.endDate
      ).subscribe(data=>{
        this.router.navigate([`project/${data['id']}`]);
      });
      this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }

}
