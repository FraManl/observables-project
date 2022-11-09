import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// either set injectable like so, or add into providers in app.module
// this is a shortcut
@Injectable({ providedIn: 'root' })
export class UserService {
  // this new event emitter will emit a boolean
  // remember : this is the old approach
  activatedEmitter = new EventEmitter<boolean>();

  // new approach uses Subject
  // but remember, we only use subjects when communicating through components, cross components, using a service ! if we need to use @Input / @Output, better to use EventEmitter again like angular offers natively
  activatedSubject = new Subject<boolean>();
}
