import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth.service';
import { User } from '@app/data-model';
import { UserService } from '../user.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  editing = false;
  user: User;

  task: AngularFireUploadTask;

  path: string;
  meta: object;
  uploadType: boolean;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.getUser();
    this.setUploadData();
  }
  getUser() {
    return this.auth.user$.subscribe(user => (this.user = user));
  }
  setUploadData() {
    return this.auth.user$.subscribe(user => {
      // wrap this in a if statement
      // to avoid error msg on logout
      if (user) {
        this.path = `users/${user.uid}/gallery`;
        this.meta = { uploader: user.uid, website: 'https://foli.sk' };
        // true means Collection upload
        // false means document field upload
        this.uploadType = true;
      }
    });
  }

  uploadPhotoURL(event): void {
    const file = event.target.files[0];
    const path = `users/${this.user.uid}/photos/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('only images allowed');
    } else {
      this.task = this.storage.upload(path, file);

      // add this ref
      const ref = this.storage.ref(path);

      // and change the observable here
      ref.getDownloadURL().subscribe(url => {
        this.userService.updateProfileData(this.user.displayName, url);
      });
    }
  }
}
