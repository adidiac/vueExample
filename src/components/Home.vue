<template>
  <v-app>
    <GeneralTable 
      :objectProps="studentProps" 
      :itemsList="studentItems" 
      title="Students" 
      @selected="actionSelect"
    />
    <GeneralTable 
      :objectProps="gradesProps" 
      :itemsList="gradesItems" 
      title="Grades"
      :showSelect="false"
     v-if="show" />
  </v-app>
</template>
<script>
import GeneralTable from './Tables/GeneralTable.vue';
import { repositories } from '../Service/Provider';
export default {
    data() {
        return {
          selectedStudents: null,
          studentProps:repositories().students().getObjectProps(),
          studentItems:repositories().students().getAll(),
          gradesProps:repositories().grades().getObjectProps(),
        }
    },
    methods:{
      actionSelect(item){
        if(item.length>0)
                    this.$store.commit('setSelectedStudent',item[0]);
                else
                    this.$store.commit('setSelectedStudent', null);
      }
    },
    computed: {
        show() {
            return this.$store.state.selectedStudent && repositories().grades().getWithStudentFullNameByStudentId(this.$store.state.selectedStudent.id).length > 0;
        },
        gradesItems() {
            return this.$store.state.selectedStudent && repositories().grades().getWithStudentFullNameByStudentId(this.$store.state.selectedStudent.id);
        }
    },
    components: { GeneralTable, GeneralTable },
    created() {
        console.log('created');
    },
    updated () {
        console.log('updated');
    }
};
</script>




