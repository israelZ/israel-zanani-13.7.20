import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  getFundUser(user){
    
  return this.http.post("/api/fund_user",user)
  }

  getTask(){
    
  return this.http.get('/api/all_task')
  }

  addTask(newTask){
    return this.http.post('/api/add_new_task',newTask)
  }

  editTask(upTask){
    return this.http.post('/api/update_task',upTask)
  }

  remTask(idTask){
    return this.http.delete(`/api/delet_task?id_task=${idTask}`)
  }

  logout(){
    return this.http.get('/api/isLogout')
  }

  addUser(user){
    return this.http.post('/api/add_user',user)
  }

}


