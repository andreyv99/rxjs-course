import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  pageTitle = 'Acme Product Management';

  ngOnInit(): void {
    of(2, 4, 6).subscribe(console.log);
    from([2, 4, 6]).subscribe(console.log);
  }
}
