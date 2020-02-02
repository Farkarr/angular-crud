import { Injectable } from '@angular/core';
import { Global } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/model.employee';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class EmployeeService{

    public url: string;

    constructor(private _http: HttpClient){
        this.url = Global.devUrl;
    }

    saveEmployee(employee: Employee): Observable<any>{
        let params = JSON.stringify(employee);
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        
        return this._http.post(this.url + "save-employee", params, {headers: headers});
    }

    getEmployees(): Observable<any>{
        return this._http.get(this.url + "employees");
    }

    updateEmployee(employee: Employee): Observable<any>{
        let params = JSON.stringify(employee);
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        
        return this._http.put(this.url + "update-employee", params, {headers: headers});
    }

    deleteEmployee(employee: Employee): Observable<any>{
        let employeeId = employee._id;
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        
        return this._http.delete(this.url + "delete-employee/" + employeeId, {headers: headers});
    }
}