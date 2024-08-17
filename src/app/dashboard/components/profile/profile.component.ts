import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../interfaces/profile';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  data: Profile;
  files: File[] = [];
  imgSource: any;

  isHideConfirm: boolean = true;

  formProfile = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^01[0125][0-9]{8}$'),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private profileService: ProfileService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.profileService.getCurrentUser().subscribe({
      next: (res) => {
        this.data = res;
        this.formProfile.patchValue(res);
        this.createFileFromImagePath(
          'https://upskilling-egypt.com:3006/' + res.imagePath
        ).then((file) => {
          if (file) {
            this.files.push(file);
          }
        });
      },
      error: () => {},
    });
  }

  onSubmit() {
    if (this.formProfile.valid) {
      const formData = new FormData();
      Object.keys(this.formProfile.controls).forEach((key) => {
        formData.append(key, this.formProfile.get(key)!.value);
      });
      if (this.imgSource) {
        formData.append('profileImage', this.imgSource);
      }
      this.profileService.updateCurrentUser(formData).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error');
        },
        complete: () => {
          this.toastr.success('Profile updated successfully', 'Success');
          this.getProfile();
        },
      });
    }
  }

  // Photo
  onSelect(event: any) {
    console.log(event);
    this.files = [];
    this.files.push(...event.addedFiles);
    this.imgSource = this.files[0];
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.files = [];
    this.imgSource = null;
  }

  // to preview img in view/edit mode
  async createFileFromImagePath(imagePath: string): Promise<File | null> {
    this.files = [];
    const response = await fetch(imagePath);
    const blob = await response.blob();
    const filename = imagePath.split('/').pop() || 'existing-image.jpg';
    return new File([blob], filename, { type: blob.type });
  }
}
