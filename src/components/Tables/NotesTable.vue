<template>
    <v-data-table
      :headers="headers"
      :items="grades"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </template>
<script>
import {repositories} from '../../Service/Provider.js'
export default {
  data () {
    return {
      headers:[
        {
          text:'Student',
          align:'start',
          sortable:false,
          value:'student'
        },
        {
          text:'Subject',
          value:'subject'
        },
        {
          text:'Grade',
          value:'grade'
        },
        {
          text:'Date',
          value:'date'
        }
      ],
      grades:repositories().grades().getWithStudentFullName()
    }
  },
}
</script>