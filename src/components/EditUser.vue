<template>
  <form @submit="editUser" class="add-form">

    <div class="card flex flex-wrap gap-3 p-fluid text-left">
      <div class="flex-grow-1">
        <div>
          <label for="fullname"> Full Name </label>
          <InputText v-model="form.fullName" inputId="fullname" :class="{'p-invalid': !isNameValid}" @input="checkNameValid"/>
          <div class="error-message"><span v-if="!isNameValid">{{nameErrorMessage}}</span></div>
        </div>
        <div>
          <label for="username"> Username </label>
          <InputText v-model="form.userName" inputId="username" :class="{'p-invalid': !isUserNameValid}" @input="checkUserNameValid"/>
          <div class="error-message"><span v-if="!isUserNameValid">{{userNameErrorMessage}}</span></div>
        </div>
        <div>
          <label for="email"> Email </label>
          <InputText v-model="form.email" inputId="email" :class="{'p-invalid': !isEmailValid}" @input="checkEmailValid"/>
          <div class="error-message"><span v-if="!isEmailValid">{{emailErrorMessage}}</span></div>
        </div>
        <div>
          <label for="phoneNr"> Phone Nr </label>
          <InputText v-model="form.phoneNr" class="mb-3" inputId="phoneNr"/>
        </div>
      </div>
      <div class="flex-grow-1">
        <AddressFieldGroup
            v-model:street="form.address.street"
            v-model:city="form.address.city"
            v-model:zipCode="form.address.zipCode"
            v-model:latitude="form.address.latitude"
            v-model:longitude="form.address.longitude"/>
      </div>

    </div>
    <div class="modal-actions">
      <Button label="Save" class="btn-primary" type="submit" autofocus />
    </div>
  </form>
</template>

<script>
import {UsersService} from "@/services/UsersService";
import AddressFieldGroup from './AddressFieldGroup.vue'

export default {
  name: "EditUser",
  props: {
    userData: {}
  },
  data() {
    return {
      form: {
        id: this.userData.id,
        fullName: this.userData.name,
        userName: this.userData.username,
        email: this.userData.email,
        phoneNr: this.userData.phone,
        address: {
          street: this.userData.address.street,
          city: this.userData.address.city,
          zipCode: this.userData.address.zipcode,
          latitude: this.userData.address.geo.lat,
          longitude: this.userData.address.geo.lng,
        },
      },
      isNameValid: true,
      isUserNameValid: true,
      isEmailValid: true,
      nameErrorMessage: '',
      userNameErrorMessage: '',
      emailErrorMessage: '',
    }
  },
  methods: {
    editUser(event) {
      event.preventDefault();

      this.checkNameValid();
      this.checkUserNameValid();
      this.checkEmailValid();

      // Submit the form if all fields are valid
      if (this.isNameValid && this.isUserNameValid && this.isEmailValid) {
        const sendUserData = {
          fullName: this.form.fullName,
          userName: this.form.userName,
          email: this.form.email,
          phoneNr: this.form.phoneNr,
          address: {
            street: this.form.address.street,
            city: this.form.address.city,
            zipCode: this.form.address.zipCode
          }
        }
        UsersService.editUser(this.form.id, sendUserData).then(res => {
          if (res)
            this.$emit('saveEvent', false);
        }).catch(err => {
          console.log(err)
        })
      }

    },
    checkNameValid() {
      // Validate name field
      if (this.form.fullName.trim() === '') {
        this.isNameValid = false;
        this.nameErrorMessage = 'Name is required.';
      } else {
        this.isNameValid = true;
        this.nameErrorMessage = '';
      }
    },
    checkUserNameValid() {
      // Validate name field
      if (this.form.userName.trim() === '') {
        this.isUserNameValid = false;
        this.userNameErrorMessage = 'UserName is required.';
      } else {
        this.isUserNameValid = true;
        this.userNameErrorMessage = '';
      }
    },
    checkEmailValid() {
      // Validate email field
      if (this.form.email.trim() === '') {
        this.isEmailValid = false;
        this.emailErrorMessage = 'Email is required.';
      } else if (!this.isValidEmail(this.form.email)) {
        this.isEmailValid = false;
        this.emailErrorMessage = 'Please enter a valid email address.';
      } else {
        this.isEmailValid = true;
        this.emailErrorMessage = '';
      }
    },
    isValidEmail(email) {
      // Validate email format using a regular expression
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },
  },
  components: {
    AddressFieldGroup
  }
}
</script>

<style scoped>

</style>
