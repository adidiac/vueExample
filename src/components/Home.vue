<template>
  <div>
    <h1>Students</h1>
    <StudentTabel ></StudentTabel>
    <h1>Notes</h1>
    <NotesTable></NotesTable>
  </div>
</template>
<script>
import { ref} from '@vue/composition-api';
import StudentTabel from './Tables/StudentTabel.vue';
import NotesTable from './Tables/NotesTable.vue';
export default {
    setup() {
        return {
            
        };
    },
    components: { StudentTabel,NotesTable }
};
</script>




