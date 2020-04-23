import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService,private router:Router,private dialog: MatDialog) { }
  projects: any = [];
  displayedColumns: string[] = ['position', 'name', 'start date', 'end date'];
  ngOnInit(): void {
    
    this.dashboardService.fetchAllProjects().subscribe((data)=>{
        this.projects = data;
    });
    
  }

  createNewProject(){
    this.dialog.open(ProjectDialogComponent);
  }

  openProject(id){
    this.router.navigate([`project/${id}`]);
  }

}
