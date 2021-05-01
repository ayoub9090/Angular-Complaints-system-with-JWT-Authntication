import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

export class Complaint {
  complaint: String;
  status: String
}

@Injectable({
  providedIn: 'root'
})

export class ComplaintService {

  constructor(private http: HttpClient) { }

  register(complaint: Complaint): Observable<any> {
    return this.http.post(environment.API_ENDPOINT + 'api/complaint/register', complaint);
  }

  listing(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + 'api/complaint/listing');
  }

  getComplaint(cid): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + 'api/complaint/getComplaint/' + cid);
  }

  update(complaint: Complaint, cid): Observable<any> {
    return this.http.post(environment.API_ENDPOINT + 'api/complaint/update/' + cid, complaint);
  }

}
