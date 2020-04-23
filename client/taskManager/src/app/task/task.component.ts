import { Component, OnInit } from '@angular/core';
import { taskDetails } from '../interfaces/taskDetails';
import { TaskService } from '../task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {
  taskData: taskDetails = {
    name: "",
    assignee: "",
    startDate: "",
    endDate: "",
    description: "",
    id: 0,
    status: false,
    project: 1
  };
  users:[];
  constructor(private taskService: TaskService,
    private router:Router,
    private toastr:ToastrService,
    private route:ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    let projectId = this.route.snapshot.params['projectId'];
    let taskId = this.route.snapshot.params['taskId'];
    this.users = this.taskService.getUsers();
    this.taskService.fetchTaskDetails(projectId,taskId).subscribe((data:taskDetails)=>{
      this.taskData = data;
    },(err:HttpErrorResponse)=>{
      this.toastr.error('Error!', err.error.detail);
      this.router.navigate(['dashboard']);
    });
  }

  updateTask(){
    
    this.taskService.updateTask(this.taskData).subscribe((data)=>{
      this.toastr.success('Success!', 'Updated task successfully!');
    },(err:HttpErrorResponse)=>{
      this.toastr.error('Error!', err.error.detail);
      
    });
  }

  back(){
    this.location.back();
  }

  deleteTask(){
    this.taskService.deleteTask(this.taskData.project,this.taskData.id).subscribe((data)=>{
      this.location.back();
      this.toastr.success('Success!', 'Deleted task successfully!');
    },(err:HttpErrorResponse)=>{
      this.toastr.error('Error!', err.error.detail);
      
    });
  }  

}
