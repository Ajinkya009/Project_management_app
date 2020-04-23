import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';

/*local components*/ 
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountGuard } from './account.guard';
import { AccountService } from './account.service';


import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { ProjectComponent } from './project/project.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    DashboardComponent,
    HeaderComponent,
    ProjectDialogComponent,
    ProjectComponent,
    TaskDialogComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    
    //material modules
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatGridListModule,

    //toastr modules
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

    //router modules
    RouterModule.forRoot([
    {
      path: 'login',
      component: AccountComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AccountGuard]
    },
    {
      path: 'project/:projectId/task/:taskId',
      component: TaskComponent,
      canActivate: [AccountGuard]
    },
    {
      path: 'project/:projectId',
      component: ProjectComponent,
      canActivate: [AccountGuard]
    },
    {
      path: '',
      component: AppComponent,
    }
    ])
  ],
  providers: [AccountService,AccountGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
