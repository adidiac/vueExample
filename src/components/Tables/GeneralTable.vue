<template>
    <v-card>
        <v-data-table
            :headers="[...objectProps.map(e=>{return {'text':e.text,'value':e.value}}),
            {text: 'Actions', value: 'actions'}]"
            :items="itemsList"
            :items-per-page="5"
            :single-select="true"
            :show-select="showSelect"
            v-model="selected"
            class="elevation-1"
        >
        <template v-slot:top>
        <v-toolbar
            flat
        >
        <v-toolbar-title>{{ title}}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-col>
                    <v-row v-for="prop in objectProps" :key="prop.value">
                        <v-text-field 
                        v-model="editedItem[prop.value]" 
                        :label="prop.text"
                        :type="prop.type"
                        v-if="prop.type!='select'"
                        ></v-text-field>
                        <v-select
                        v-model="editedItem[prop.value]"
                        :items="prop.options"
                        :label="prop.text"
                        v-if="prop.type=='select'"
                        ></v-select>
                  </v-row>
                </v-col>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
        </v-data-table>
    </v-card>
</template>
<script>
import { ref, computed, watch,nextTick } from '@vue/composition-api';
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    objectProps: {
      type: Array,
      required: true,
    },
    itemsList: {
      type: Array,
      required: true,
    },
    showSelect: {
      type: Boolean,
      default: true,
    },
  },
  setup(props,{emit}) {
    const selected = ref([]);
    const dialog = ref(false);
    const dialogDelete = ref(false);
    const editedIndex = ref(-1);
    const defaultItem = computed(() => {
      return props.objectProps.reduce((acc, prop) => {
        acc[prop.value] = '';
        return acc;
      }, {});
    });
    const editedItem = ref({ ...defaultItem.value });

    const formTitle = computed(() => {
      return editedIndex.value === -1 ? 'New Item' : 'Edit Item';
    });

    const close = () => {
      dialog.value = false;
      nextTick(() => {
        editedItem.value = { ...defaultItem.value };
        editedIndex.value = -1;
      })

    };

    const closeDelete = () => {
      dialogDelete.value = false;
      nextTick(() => {
        editedItem.value = { ...defaultItem.value };
        editedIndex.value = -1;
      })
    };

    const editItem = (item) => {
      editedIndex.value = props.itemsList.indexOf(item);
      editedItem.value = { ...item };
      dialog.value = true;
    };

    const deleteItem = (item) => {
      editedIndex.value = props.itemsList.indexOf(item);
      editedItem.value = { ...item };
      dialogDelete.value = true;
    };

    const deleteItemConfirm = () => {
      props.itemsList.splice(editedIndex.value, 1);
      emit('save', props.itemsList);
      closeDelete();
    };

    const save = () => {
      if (editedIndex.value > -1) {
        Object.assign(props.itemsList[editedIndex.value], editedItem.value);
      } else {
        props.itemsList.push({ ...editedItem.value });
      }
      emit('save', props.itemsList);
      close();
    };

    watch(selected, () => {
      emit('selected', selected.value);
    });

    watch(dialog, (val) => {
        val || close();
    });

    watch(dialogDelete, (val) => {
        val || closeDelete();
    });


    return {
      selected,
      dialog,
      dialogDelete,
      editedIndex,
      editedItem,
      defaultItem,
      formTitle,
      close,
      closeDelete,
      editItem,
      deleteItem,
      deleteItemConfirm,
      save,
    };
  },
};
</script>

<!---<script>
    export default {
        props:{
            title:{
                type:String,
                required:true
            },
            objectProps:{
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
        },
        data() {
            return {
                selected: [],
                dialog: false,
                dialogDelete: false,
                editedIndex: -1,
                editedItem: this.objectProps.reduce((acc,prop)=>{
                    acc[prop.value]='';
                    return acc;
                },{}),
                defaultItem: this.objectProps.reduce((acc,prop)=>{
                    acc[prop.value]='';
                    return acc;
                },{}),
            };
        },
        computed: {
        formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },
        watch: {
            selected() {
                this.$emit('selected',this.selected);
            },
            dialog (val) {
            val || this.close()
            },
            dialogDelete (val) {
                val || this.closeDelete()
            },
        },
        methods:{
            editItem (item) {
                this.editedIndex = this.itemsList.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                this.editedIndex = this.itemsList.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm () {
                this.itemsList.splice(this.editedIndex, 1)
                this.$emit('save',this.itemsList);
                this.closeDelete()
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
            },

            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
            },

            save () {
                if (this.editedIndex > -1) {
                Object.assign(this.itemsList[this.editedIndex], this.editedItem)
                } else {
                this.itemsList.push(this.editedItem)
                }
                this.$emit('save',this.itemsList);
                this.close()
            },
        }
    }
</script> -->