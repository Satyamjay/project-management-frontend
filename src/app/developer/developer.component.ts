import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { DeveloperService } from './developer.service';
import { AlertService } from 'ngx-alerts';


@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {

  loading: boolean = false;

  showUnapprovedProject: boolean = false;

  showApprovedProject: boolean = false;

  showSubmittedProject: boolean = false;

  showCards: boolean = true;


  developers: any[];
  // invitedDevelopers = [{
  //   'id': 2,
  //   'email': 'satyamjay@puibm.in'
  // },
  // {
  //   'id': 6,
  //   'email': 'jaismeneverma@puibm.in'
  // }]

  config = {
    displayKey: "email",
    search: true,
    limitTo: 3,
    searchOnKey: 'email',
  }

  addProjectForm: FormGroup;
  projectsAndTheirForm: {project: any, form: FormGroup}[];


  constructor(private modalService: NgbModal, private developerService: DeveloperService, 
              private alert: AlertService, public datepipe: DatePipe) { }  

  ngOnInit() {
    this.developers = [];
    this.projectsAndTheirForm = new Array();
    this.addProjectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      technologiesUsed: new FormControl('', [Validators.required] ),
      description: new FormControl('', [Validators.required]),
      expectedCompletion: new FormControl('', [Validators.required]),
      developers: new FormControl([]),
    });

    this.developerService.getAllDevelopers().subscribe(
      (res) => {
        console.log(res);
        this.developers = res.map(function(val) {
          return {
            id: val.id,
            email: val.user.email,      
          }
        });
      },
      (res) => {
        console.log(res);
      }
    );
      
    this.developerService.getAllProjects().subscribe(
      (res: any[])=>{
        this.loading=false;
        console.log(res);
        for(let i=0; i< res.length; i++){
          let expectedCompletion =this.datepipe.transform(new Date(res[i]["expectedCompletion"].substring(0,10)),
                                                         'y-MM-dd');
          let invitedDevelopers = this.developers.filter((element, index, array) =>{
            let devId = element.id;
            for (let invite of res[i]["invitation"]) {
              if(invite["invitationTo"] == devId)
                return true;
            }
            return false;
          });
          this.projectsAndTheirForm.push({
            project:res[i],
            form: new FormGroup({
                name: new FormControl(res[i]["name"], [Validators.required]),
                description: new FormControl(res[i]["description"],[Validators.required] ),
                technologiesUsed: new FormControl(res[i]["technologies"], [Validators.required]),
                expectedCompletion: new FormControl(expectedCompletion, [Validators.required]),
                developers: new FormControl(invitedDevelopers)
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

    

    // interval(10000).pipe(takeWhile(() => true)).subscribe(() => {console.log(this.developers)});

  }
  
  open(content) {
    this.modalService.open(content);
  }

  addProject(formData){
    if(this.addProjectForm.invalid){
      
      if(this.addProjectForm.get("name").invalid)
        this.alert.danger("Name cannot be empty!");
      else if(this.addProjectForm.get("technologiesUsed").invalid)
        this.alert.danger("Please mention the technlogies used!");
      else if(this.addProjectForm.get("description").invalid)
        this.alert.danger("Please enter the description!");
      else if(this.addProjectForm.get("expectedCompletion").invalid)
        this.alert.danger("Expected completion cannot be empty!");
      else if(this.addProjectForm.get("developers").invalid)
        this.alert.danger("Please select atleast one member!");
    }
    else{
      this.loading=true;
      this.developerService.addProject(formData).subscribe(
        (res)=>{
          this.loading=false;
          this.modalService.dismissAll();
          this.projectsAndTheirForm.push({
            project: res,
            form: new FormGroup({
              name: new FormControl(res["name"], [Validators.required]),
              description: new FormControl(res["description"],[Validators.required] ),
              technologiesUsed: new FormControl(res["technologies"], [Validators.required]),
              expectedCompletion: new FormControl(res["expectedCompletion"], [Validators.required]),
              developers: new FormControl(res["developers"], [Validators.required])
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

  deleteProject(id: number, index){
    this.loading=true;
    this.developerService.deleteProject(id).subscribe(
      (res)=>{
        this.projectsAndTheirForm.splice(index, 1); 
        this.loading=false;
      },
      (res)=>{
        this.loading=false;
        console.log(res);
      }
    )
  }

}
