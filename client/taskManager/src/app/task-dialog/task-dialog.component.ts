import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormGroup } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  form: FormGroup;
  name: string;
  startDate: Date;
  endDate: Date;
  description: String;
  assignee: String;
  constructor(private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService:ProjectService,
    private router: Router,
    private route:ActivatedRoute,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    
  }

  save(){
    let projectId = localStorage.getItem('projectId');
    this.projectService.createNewTask(this.name,this.description,this.startDate,this.endDate,this.assignee,projectId).subscribe((data)=>{
      const taskId = data['id'];
      this.dialogRef.close();
      this.router.navigate([`project/${projectId}/task/${taskId}`]);
    },(err:HttpErrorResponse)=>{
      this.toastr.error('Error!', err.error.detail);
    });
  }

  close(){
    this.dialogRef.close();
  }

}
