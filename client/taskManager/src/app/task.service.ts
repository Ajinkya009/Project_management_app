import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  users:[];
  constructor(private router:Router, private http:HttpClient) { }

  fetchTaskDetails(projectId,taskId){
    const auth_token = localStorage.getItem('auth_token');
    return this.http.get(`/api/project/${projectId}/task/${taskId}/`,{headers:{Authorization:`Token ${auth_token}`}});
  }

  updateTask(taskData){
    const auth_token = localStorage.getItem('auth_token');
    return this.http.put(`/api/project/${taskData.project}/task/${taskData.id}/`,taskData,{headers:{Authorization:`Token ${auth_token}`}});
  }

  deleteTask(projectId,taskId){
    const auth_token = localStorage.getItem('auth_token');
    return this.http.delete(`/api/project/${projectId}/task/${taskId}/`,{headers:{Authorization:`Token ${auth_token}`}});
  }

  setUsers(users){
    this.users = users;
  }

  getUsers(){
    return this.users;
  }

}
