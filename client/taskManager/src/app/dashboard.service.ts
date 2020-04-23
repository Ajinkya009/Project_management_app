import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) {}

  fetchAllProjects(){
    const auth_token = localStorage.getItem('auth_token');
    return this.http.get('/api/project/',{headers:{Authorization:`Token ${auth_token}` }});
  }

  createNewProject(name,description,startDate,endDate){
    const auth_token = localStorage.getItem('auth_token');
    return this.http.post('/api/project/',{
      name:name,
      description:description,
      startDate:startDate,
      endDate:endDate
    },{headers:{Authorization:`Token ${auth_token}` }});
  }

}
