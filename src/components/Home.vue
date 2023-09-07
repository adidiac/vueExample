<template>
  <v-app>
    <GeneralTable 
    :headers="studentHeaders" 
    :itemsList="studentItems" 
    title="Students" 
    :selectAction="actionSelect"
    :addInputs="addInputsStudent"
    :updateFields="updateInputsStudent"
    />
    <GeneralTable 
    :headers="gradesHeaders" 
    :itemsList="gradesItems" 
    title="Grades"
    :showSelect="false" 
    :addInputs="addInputsGrade"
    :updateFields="updateInputsGrade"
     v-if="show" />
  </v-app>
</template>
<script>
import GeneralTable from './Tables/GeneralTable.vue';
import { repositories } from '../Service/Provider';
export default {
    data: function (){
        return {
          selectedStudents: null,
          studentHeaders:repositories().students().getHeaders(),
          studentItems:repositories().students().getAll(),
          gradesHeaders:repositories().grades().getHeaders(),
          addInputsStudent:repositories().students().getInputsFields(),
          updateInputsStudent:repositories().students().getUpdateFieldsWihtValues,
          addInputsGrade:repositories().grades().getInputsFields(),
          updateInputsGrade:repositories().grades().getUpdateFieldsWihtValues,
          //question? if computed determines a reload and it's called again than also data is called again?
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
            return this.$store.state.selectedStudent&&repositories().grades().getWithStudentFullNameByStudentId(this.$store.state.selectedStudent.id).length>0;
        },
        gradesItems() {
            return this.$store.state.selectedStudent&&repositories().grades().getWithStudentFullNameByStudentId(this.$store.state.selectedStudent.id);
        }
    },
    components: { GeneralTable, GeneralTable },
};
</script>




