import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';


@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss'],
  providers: [AdminService]
})

export class DeveloperComponent implements OnInit{
  // For Loading Screen
  loading: boolean = false;

  // For Delete PopOver
  public popoverTitle: string = 'Are You Sure?';
  public popoverMessage: string = 'Are you sure you want to delete this?';
  public cancelClicked: boolean = false;

  addDeveloperForm: FormGroup;
  developersAndTheirForm: {developer: any, form: FormGroup}[];

  constructor(private adminService: AdminService, private modalService: NgbModal, private alert: AlertService) {
    this.developersAndTheirForm = new Array();
    this.addDeveloperForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', ),
      email: new FormControl('', [Validators.email]),
      semester: new FormControl('', [Validators.pattern("^[12345678]$")]),
      enrollmentNo: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.loading=true;
    this.adminService.getAllDevelopers().subscribe(
      (res: any[])=>{
        this.loading=false;
        for(let i=0; i< res.length; i++){
          this.developersAndTheirForm.push({
            developer:res[i],
            form: new FormGroup({
                firstName: new FormControl(res[i]["user"]["firstName"], [Validators.required]),
                lastName: new FormControl(res[i]["user"]["lastName"], ),
                email: new FormControl(res[i]["user"]["email"], [Validators.email]),
                semester: new FormControl(res[i]["semester"]),
                enrollmentNo: new FormControl(res[i]["enrollmentNo"])
              }
            )
          });
        }
      },
      (res)=>{
        this.loading=false;
        console.log(res);
      }
    );
  }

  updateDeveloper(formData, id: number){
    this.loading=true;
    this.adminService.updateDeveloper(formData, id).subscribe(
      (res)=>{
        this.loading=false;       
      },
      (res)=>{
        this.loading=false; 
        console.log(res);
      }
    )
  }

  deleteDeveloper(id: number, index){
    this.loading=true;
    this.adminService.deleteDeveloper(id).subscribe(
      (res)=>{
        this.developersAndTheirForm.splice(index, 1); 
        this.loading=false;
      },
      (res)=>{
        this.loading=false;
        console.log(res);
      }
    )
  }

  addDeveloper(formData){
    if(this.addDeveloperForm.invalid){
      if(this.addDeveloperForm.get("semester").invalid){
        this.alert.warning("Semester cannot be greater than 8 or smaller than 1");
      }
      else if(this.addDeveloperForm.get("email").invalid)
        this.alert.danger("Invalid Email");
      else
        this.alert.danger("Only 'Last Name' is optional");
    }
    else{
      this.loading=true;
      this.adminService.addDeveloper(formData).subscribe(
        (res)=>{
          this.loading=false;
          this.modalService.dismissAll();
          this.developersAndTheirForm.push({
            developer: res,
            form: new FormGroup({
              firstName: new FormControl(res["user"]["firstName"], [Validators.required]),
                  lastName: new FormControl(res["user"]["lastName"], ),
                  email: new FormControl(res["user"]["email"], [Validators.email]),
                  semester: new FormControl(res["semester"]),
                  enrollmentNo: new FormControl(res["enrollmentNo"])
            })
          }
          );
        },
        (res)=>{
          this.loading=false;
        }
      )
    }
  }
  
  open(content) {
    this.modalService.open(content);
  }

}
