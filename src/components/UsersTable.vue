<template>
<div>
tableeeee
</div>
</template>

<script>
export default {
  name: "UsersTable",
  data() {
    return {
      usersList: []
    }
  },
  async created() {
    await this.getUsersList();
  },
  methods: {
    async getUsersList() {
      await fetch('https://jsonplaceholder.typicode.com/users/')
          .then(response => response.json())
          .then(data => {
            this.usersList = data;
          }).catch(err => {
            console.error(err);
          })
    }
  }
}
</script>

<style scoped>

</style>
