<template>
  <v-app>
    <GeneralTable 
      :objectProps="studentProps" 
      :itemsList="studentItems" 
      title="Students" 
      @save="updateStudents"
      @selected="actionSelect"
    />
    <GeneralTable 
      :objectProps="gradesProps" 
      :itemsList="gradesItems" 
      title="Grades"
      @save="updateGrades"
      :showSelect="false"
      v-if="show" />
  </v-app>
</template>
<script>
import { computed} from '@vue/composition-api';
import {useGetters,useActions} from 'vuex-composition-helpers';
import GeneralTable from './Tables/GeneralTable.vue';
import { provider } from '../Service/Provider';

export default {
  components: { GeneralTable },
  setup() {
    const {selectedStudent} = useGetters({
      selectedStudent: 'selectedStudent'
    });
    const {setSelectedStudent} = useActions({setSelectedStudent:'setSelectedStudent'});

    const studentProps = provider.students.getObjectProps();
    const studentItems = provider.students.getAll();
    const gradesProps = provider.grades.getObjectProps();


    const actionSelect = (item) => {
      if (item.length > 0) {
        setSelectedStudent(item[0]);
      } else {
        setSelectedStudent(null);
      }
    };

    const updateStudents = (newList) => {
      provider.students.update(newList);
    };

    const updateGrades = (newList) => {
      provider.grades.update(newList);
    };

    const show = computed(() => {
      selectedStudent.value&&console.log(provider.grades.getWithStudentFullNameByStudentId(selectedStudent.value.id));
      return (
        selectedStudent.value &&
        provider.grades.getWithStudentFullNameByStudentId(selectedStudent.value.id).length > 0
      );
    });

    const gradesItems = computed(() => {
      console.log(selectedStudent.value);
      selectedStudent.value&&console.log(provider.grades.getWithStudentFullNameByStudentId(selectedStudent.value.id));
      return (
        selectedStudent.value &&
        provider.grades.getWithStudentFullNameByStudentId(selectedStudent.value.id)
      );
    });



    return {
      selectedStudent,
      studentProps,
      studentItems,
      gradesProps,
      actionSelect,
      updateStudents,
      updateGrades,
      show,
      gradesItems,
    };
  },
};
</script>

<!-- <script>
import GeneralTable from './Tables/GeneralTable.vue';
import { provider } from '../Service/Provider';
export default {
    data() {
        return {
          selectedStudents: null,
          studentProps:provider.students.getObjectProps(),
          studentItems:provider.students.getAll(),
          gradesProps:provider.grades.getObjectProps(),
        }
    },
    methods:{
      actionSelect(item){
        if(item.length>0)
                    this.$store.commit('setSelectedStudent',item[0]);
                else
                    this.$store.commit('setSelectedStudent', null);
      },
      updateStudents(newList){
        provider.students.update(newList);
      },
      updateGrades(newList){
        provider.grades.update(newList);
      }
    },
    computed: {
        show() {
            return this.$store.state.selectedStudent && provider.grades.getWithStudentFullNameByStudentId(this.$store.state.selectedStudent.id).length > 0;
        },
        gradesItems() {
            return this.$store.state.selectedStudent && provider.grades.getWithStudentFullNameByStudentId(this.$store.state.selectedStudent.id);
        }
    },
    components: { GeneralTable, GeneralTable },
};
</script>



 -->
