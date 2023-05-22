<template>
  <div>
    <div class="flex justify-content-between align-items-center">
      <label for="address"> Address </label>
      <div class="flex align-items-center">
        <Checkbox v-model="useGoogleLocations" inputId="useGoogleLocations" name="useGoogleLocations"
                  value="useGoogleLocations" :binary="true"/>
        <label for="useGoogleLocations" class="ml-2"> Use Google Locations </label>
      </div>
    </div>
    <InputText :value="street"
               @input="$emit('update:street', $event.target.value)"
               class="mb-3" inputId="address"/>
  </div>
  <div>
    <label for="city"> City </label>
    <InputText :value="city"
               @input="$emit('update:city', $event.target.value)"
               class="mb-3" inputId="city"/>
  </div>
  <div>
    <label for="zipCode"> Zip Code </label>
    <InputText :value="zipCode"
               @input="$emit('update:zipCode', $event.target.value)"
               class="mb-3" inputId="zipCode"/>
  </div>
  <div v-if="useGoogleLocations" class="flex flex-wrap gap-3">
    <div class="flex-grow-1" style="width: 100px">
      <label for="latitude"> Latitude </label>
      <InputText :value="latitude"
                 @input="$emit('update:latitude', $event.target.value)"
                 class="mb-3" inputId="latitude"/>
    </div>
    <div class="flex-grow-1" style="width: 100px">
      <label for="longitude"> Longitude </label>
      <InputText :value="longitude"
                 @input="$emit('update:longitude', $event.target.value)"
                 class="mb-3" inputId="longitude"/>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDsA7zq7o7wJLYTqmiOxec8vYnrc1oC7IM&libraries=places';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  },
  name: "AddressFieldGroup",
  props: {
    street: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    zipCode: {
      type: String,
      default: ''
    },
    latitude: {
      type: String,
      default: ''
    },
    longitude: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      useGoogleLocations: !!(this.latitude && this.longitude)
    }
  }
}
</script>

<style scoped>

</style>
