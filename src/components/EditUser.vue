<template>
  <div class="card flex flex-wrap gap-3 p-fluid">
    <div>
      <div class="flex-auto">
        <label for="locale-user" class="font-bold block mb-2"> Full Name </label>
        <InputText v-model="fullName" inputId="locale-user" />
      </div>
      <div class="flex-auto">
        <label for="locale-us" class="font-bold block mb-2"> Username </label>
        <InputText v-model="userName" inputId="locale-us" locale="en-US" />
      </div>
      <div class="flex-auto">
        <label for="locale-german" class="font-bold block mb-2"> Email </label>
        <InputText v-model="email" inputId="locale-german" locale="de-DE" />
      </div>
      <div class="flex-auto">
        <label for="locale-indian" class="font-bold block mb-2"> Phone Nr </label>
        <InputText v-model="phoneNr" inputId="locale-indian" locale="en-IN" />
      </div>
    </div>
    <div>
      <div class="flex-auto">
        <label for="locale-indian" class="font-bold block mb-2"> Address </label>
        <InputText v-model="address" inputId="locale-indian" locale="en-IN" />
      </div>
      <div class="flex-auto">
        <label for="locale-indian" class="font-bold block mb-2"> City </label>
        <InputText v-model="city" inputId="locale-indian" locale="en-IN" />
      </div>
      <div class="flex-auto">
        <label for="locale-indian" class="font-bold block mb-2"> Zip Code </label>
        <InputText v-model="zipCode" inputId="locale-indian" locale="en-IN" />
      </div>
    </div>

  </div>

  <Button label="Save" class="btn-primary" @click="editUser()" autofocus />
</template>

<script>
import {UsersService} from "@/services/UsersService";

export default {
  name: "EditUser",
  props: {
    userData: {

    }
  },
  data() {
    return {
      id: this.userData.id,
      fullName: this.userData.name,
      userName: this.userData.username,
      email: this.userData.email,
      phoneNr: this.userData.phone,
      address: this.userData.address.street,
      city: this.userData.address.city,
      zipCode: this.userData.address.zipcode
    }
  },
  async created() {
    console.log(this.id)
    console.log(this.fullName)
  },
  methods: {
    editUser() {
      const sendUserData = {
        fullName: this.fullName,
        userName: this.userName,
        email: this.email,
        phoneNr: this.phoneNr,
        address: {
          street: this.address,
          city: this.city,
          zipCode: this.zipCode
        }
      }
      UsersService.editUser(this.id, sendUserData).then(res => {
        if (res)
          this.$emit('saveEvent', false);
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
