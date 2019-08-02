import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-handler',
  templateUrl: './handler.component.html',
  styleUrls: ['./handler.component.scss']
})

export class HandlerComponent implements OnInit {

   // For Loading Screen
   loading: boolean = false;

   // For Delete PopOver
   public popoverTitle: string = 'Are You Sure?';
   public popoverMessage: string = 'Are you sure you want to delete this?';
   public cancelClicked: boolean = false;
 
   addHandlerForm: FormGroup;
   handlersAndTheirForm: {handler: any, form: FormGroup}[];
 
   constructor(private adminService: AdminService, private modalService: NgbModal, private alert: AlertService) {
     this.handlersAndTheirForm = new Array();
     this.addHandlerForm = new FormGroup({
       firstName: new FormControl('', [Validators.required]),
       lastName: new FormControl('', ),
       email: new FormControl('', [Validators.email]),
       employeeId: new FormControl('', [Validators.required]),
       password: new FormControl('', [Validators.required])
     });
   }
 
   ngOnInit() {
     this.loading=true;
     this.adminService.getAllHandlers().subscribe(
       (res: any[])=>{
         this.loading=false;
         for(let i=0; i< res.length; i++){
           this.handlersAndTheirForm.push({
             handler:res[i],
             form: new FormGroup({
                 firstName: new FormControl(res[i]["user"]["firstName"], [Validators.required]),
                 lastName: new FormControl(res[i]["user"]["lastName"], ),
                 email: new FormControl(res[i]["user"]["email"], [Validators.email]),
                 employeeId: new FormControl(res[i]["employeeId"]),
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
 
   updateHandler(formData, id: number){
     this.loading=true;
     this.adminService.updateHandler(formData, id).subscribe(
       (res)=>{
         this.loading=false;       
       },
       (res)=>{
         this.loading=false; 
         console.log(res);
       }
     )
   }
 
   deleteHandler(id: number, index){
     this.loading=true;
     this.adminService.deleteHandler(id).subscribe(
       (res)=>{
         this.handlersAndTheirForm.splice(index, 1); 
         this.loading=false;
       },
       (res)=>{
         this.loading=false;
         this.alert.danger("Unexpected Error Happenened");
       }
     )
   }
 
   addHandler(formData){
     if(this.addHandlerForm.invalid){
       if(this.addHandlerForm.get("email").invalid)
         this.alert.danger("Invalid Email");
       else
         this.alert.danger("Only 'Last Name' is optional");
     }
     else{
       this.loading=true;
       this.adminService.addHandler(formData).subscribe(
         (res)=>{
           this.loading=false;
           this.modalService.dismissAll();
           this.handlersAndTheirForm.push({
             handler: res,
             form: new FormGroup({
               firstName: new FormControl(res["user"]["firstName"], [Validators.required]),
                   lastName: new FormControl(res["user"]["lastName"], ),
                   email: new FormControl(res["user"]["email"], [Validators.email]),
                   employeeId: new FormControl(res["employeeId"])
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
