import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private router:Router, private http:HttpClient) { }

  fetchProjectDetails(projectId){
    const auth_token = localStorage.getItem('auth_token')
    return this.http.get(`/api/project/${projectId}/`,{headers:{Authorization:`Token ${auth_token}`}});
  }

  createNewTask(name,description,startDate,endDate,assignee,projectId){
    const auth_token = localStorage.getItem('auth_token');
    return this.http.post(`/api/project/${projectId}/task/`,{
      name:name,
      description:description,
      startDate:startDate,
      endDate:endDate,
      assignee:assignee,
      project:projectId
    },{headers:{Authorization:`Token ${auth_token}` }});
  }

  updateProject(projectData){
    const auth_token = localStorage.getItem('auth_token');
    return this.http.put(`/api/project/${projectData.id}/`,projectData,{headers:{Authorization:`Token ${auth_token}`}});
  }

}
