export class Developer {
    emailId: string;
    firstName: string;
    lastName: string;
    semester: number;

    constructor(developerResponse: any){
        this.emailId = developerResponse["user"]["email"];
        this.firstName = developerResponse["user"]["firstName"];
        this.lastName = developerResponse["user"]["lastName"];
        this.semester = developerResponse["semester"];
    }
}