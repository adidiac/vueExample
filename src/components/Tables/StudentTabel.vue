<template>
  
    <v-data-table
      :headers="headers"
      :items="students"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </template>
<script>
import {repositories} from '../../Service/Provider.js'
export default {
  data () {
    return {
      headers: [
        {
          text: 'First Name',
          align: 'start',
          sortable: false,
          value: 'firstName',
        },
        { text: 'Last Name', value: 'lastName' },
        {text:'Date of Birth',value:'dateOfBirth'},
        {text:'Class',value:'class'}
      ],
      students:repositories().students().getAll() 
    }
  },
}
</script>