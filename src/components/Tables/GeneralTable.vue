<template>
    <v-card>
        <v-data-table
            :headers="[...headers,{text: 'Actions', value: 'actions'}]"
            :items="itemsList"
            :items-per-page="5"
            :single-select="true"
            :show-select="showSelect"
            v-model="selected"
            class="elevation-1"
        >
        <template #top>
        <v-toolbar flat>
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <template>
                <GenericFormModal
                    :formsInputs="addInputs"
                    :submitForm="addItem"
                    title="Add"
                >
                    <v-icon small>mdi-plus</v-icon>    
                </GenericFormModal>
            </template>
        </v-toolbar>
        </template>
            <template v-slot:item.actions="{ item }">
                <GenericFormModal
                    :formsInputs="updateFields(item)"
                    :submitForm="editItem"
                    title="Edit"
                >
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                    >
                        mdi-pencil
                    </v-icon>
                </GenericFormModal>
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>
<script>
    import GenericFormModal from '../Modals/GenericFormModal.vue';
    export default {
        props:{
            title:{
                type:String,
                required:true
            },
            headers:{
                type:Array,
                required:true
            },
            itemsList:{
                type:Array,
                required:true
            },
            showSelect:{
                type:Boolean,
                default:true
            },
         
            addInputs:{
                type:Array,
                required:true
            },
            updateFields:{
                type:Function,
                required:true
            },
        },
        data() {
            return {
                selected: []
            };
        },
        watch: {
            selected() {
                this.$emit('selected',this.selected);
            },
        },
        methods:{
            editItem(item){
                console.log(item);
            },
            deleteItem(item){
                
            },
            addItem(data){
                console.log(data);
            }
        },
        components: { GenericFormModal },
    }
</script>