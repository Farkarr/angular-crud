import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { Employee } from './models/model.employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EmployeeService]
})
export class AppComponent implements OnInit{

  public title: string = 'Crud';
  public alertMsg: string;
  public hideUpdateForm: boolean = true;
  public employees: Employee[];
  public model: any = {};
  public updateModel: Employee;
  public employeeIndex: number;
  public employee: Employee;

  constructor(private _EmployeeService: EmployeeService){
    this.employee = new Employee("", "", "", "");
    this.updateModel = new Employee("", "", "", "");
  }
  
  ngOnInit(){
    this.showEmployees();
  }

  addEmployee():void{
   
    this._EmployeeService.saveEmployee(this.employee).subscribe(
      response => {
        
        this.alertMsg = response.message;
        this.showEmployees();
      }
    );
  }

  showEmployees():void{
   
    this._EmployeeService.getEmployees().subscribe(response => {
      this.employees = response.employees;
    });
  }

  deleteEmployee(i:number):void{
    let deleteResp = confirm("Are you sure you want to delete it?");

    if(deleteResp) {
      
      this._EmployeeService.deleteEmployee(this.employees[i]).subscribe(
        response => {
          
          this.alertMsg = response.message;
          this.showEmployees();
        }
      );
    }
  }

  editEmployee(i: number):void{
    this.hideUpdateForm = false;
    this.updateModel._id = this.employees[i]._id;
    this.updateModel.name = this.employees[i].name;
    this.updateModel.position = this.employees[i].position;
    this.updateModel.email = this.employees[i].email;
    this.employeeIndex = i;
  }

  updateEmployee():void{
    let index = this.employeeIndex;

    for(let i = 0; i < this.employees.length; i++){
      if(index == i){
        this._EmployeeService.updateEmployee(this.updateModel).subscribe(
          response => {
            
            this.alertMsg = response.message;
            this.showEmployees();
          }
        );
        this.hideUpdateForm = true;
      }
    }
  }

  closeAlert():void{
    this.alertMsg = "";
  }

}
