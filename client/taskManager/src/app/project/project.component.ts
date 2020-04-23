import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskService } from '../task.service';
import { ToastrService } from 'ngx-toastr';
import { projectDetails } from '../interfaces/projectDetails';
import {Location} from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  tasks: any = [];
  projectData : projectDetails;
  users: [];
  displayedColumns: string[] = ['position', 'name', 'start date', 'end date','assignee'];
  constructor(private projectService:ProjectService,
    private taskService: TaskService,
    private toastr: ToastrService, 
    private router:Router,
    private route:ActivatedRoute,
    private dialog: MatDialog,
    private location: Location
    ) { }

  ngOnInit(): void {
    let projectId = this.route.snapshot.params['projectId'];
    localStorage.setItem('projectId',projectId);
    this.projectService.fetchProjectDetails(projectId).subscribe((data:projectDetails)=>{
      this.projectData = data['project'];
      this.users = data['users'];
      this.taskService.setUsers(this.users);
      this.tasks = this.projectData.tasks;
    },(err:HttpErrorResponse)=>{
      this.toastr.error('Error!', err.error.detail);
      this.router.navigate(['dashboard']);
    });
  }

  createNewTask(){
    this.dialog.open(TaskDialogComponent,{data:{users:this.users}});
  }

  openTask(taskId){
    let projectId = this.projectData.id;
    this.router.navigate([`project/${projectId}/task/${taskId}`]);
  }

  updateProject(){
    this.projectService.updateProject(this.projectData).subscribe((data)=>{
      this.toastr.success('Success!', 'Updated task successfully!');
    },(err:HttpErrorResponse)=>{
      this.toastr.error('Error!', err.error.detail);
    });
  }

  back(){
    this.location.back();
  }

  

}
