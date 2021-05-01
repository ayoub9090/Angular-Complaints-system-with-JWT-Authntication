import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ComplaintService, Complaint } from './complaints.service';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  complaints: Complaint[] = [];
  complainForm: FormGroup;
  err = null;
  userRole = '';
  closeResult = '';
  defaultStatus = "pending";
  formMode: String = 'Add';
  ComplaintID = 0;
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  status: any = ['pending', 'dismissed', 'resolved'];
  statusDefault: string = 'Pending';

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public complaintService: ComplaintService,
    private modalService: NgbModal
  ) {
    this.complainForm = this.fb.group({
      complaint: [''],
      status: [''],

    })
    this.complainForm.controls['status'].setValue(this.statusDefault, { onlySelf: true });

  }

  ngOnInit() {
    this.userRole = localStorage.getItem('role');

    this.initComplaintsTable();

  }

  onSubmit() {

    if (this.formMode === 'Add') {
      this.complaintService.register(this.complainForm.value).subscribe(
        res => {
          console.log(res)
        },
        error => {
          this.err = error.error;
        },
        () => {
          this.complainForm.reset();
          this.complainForm.controls['status'].setValue(this.statusDefault, { onlySelf: true });
          this.modalService.dismissAll();
          this.rerender();
          //this.router.navigate(['signin']);
        }
      )
    } else {
      //Edit mode
      this.complaintService.update(this.complainForm.value, this.ComplaintID).subscribe(
        res => {
          console.log(res)
        },
        error => {
          this.err = error.error;
        },
        () => {
          this.complainForm.reset();
          this.complainForm.controls['status'].setValue(this.statusDefault, { onlySelf: true });
          this.modalService.dismissAll();
          this.rerender();
          //this.router.navigate(['signin']);
        })
    }
  }

  changeStatus(e) {
    this.status.setValue(e.target.value, {
      onlySelf: true
    })
  }
  initComplaintsTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };


    this.complaintService.listing().subscribe(
      res => {
        this.complaints = res;
        console.log(this.complaints)
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
        console.log(res)
      },
      error => {
        this.err = error.error;
      },
      () => { }
    )
  }

  open(complainForm) {
    this.formMode = 'Add';
    this.modalService.open(complainForm, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onEdit(complainForm, cid) {
    this.complaintService.getComplaint(cid).subscribe(
      res => {
        this.formMode = 'Edit';
        let data = res[0];
        this.ComplaintID = data.id;
        this.complainForm.controls['status'].setValue(data.status, { onlySelf: true });
        this.complainForm.controls['complaint'].setValue(data.complaint, { onlySelf: true });

        this.modalService.open(complainForm, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

      },
      error => {
        this.err = error.error;
      },
      () => {

      }
    )
  }



  ngOnDestroy(): void {
    //unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the init to rerender again with the new data
      this.initComplaintsTable();
    });
  }


}


