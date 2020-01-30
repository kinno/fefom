<template>
  <v-card>
    <v-card-title> </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on }">
              <v-btn text color="green brighten-5" v-on="on"
                >+ Agregar Ejercicio</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="2" offset-md="5">
                      <v-text-field
                        dense
                        v-model="editedItem.ejercicio"
                        label="Ejercicio:"
                        max-length="4"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row >
                    <v-col cols="12" md="12">
                      <v-textarea
                        outlined
                        label="Leyenda:"
                        v-model="editedItem.leyenda"
                        ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="close"
                  >Cancelar</v-btn
                >
                <v-btn color="green darken-1" text @click="save">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>   
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-square-edit-outline
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete-forever
        </v-icon>
      </template>  
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Ejercicio",
        align: "left",
        value: "ejercicio"
      },
      { text: "Leyenda", value: "leyenda" },
      { text: "Acciones", value: "action", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id_ejercicio: null, 
      ejercicio: null,
      leyenda: null,
    },
    defaultItem: {
       id_ejercicio: null, 
      ejercicio: null,
      leyenda: null,
    }
  }),

  computed: {
       formTitle() {
      return this.editedIndex === -1
        ? "Nuevo ejercicio"
        : "Editar ejercicio";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.$http
        .get("/catalogos/get_ejercicios")
        .then(response => {
          response.data.rows.forEach(element => {
            this.desserts.push(element);
          });
        })
        .catch(err => {});
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      this.$http
        .post("/catalogos/registrar_ejercicio", {
          id_ejercicio:
            typeof this.editedItem.id_ejercicio === "undefined"
              ? null
              : this.editedItem.id_ejercicio,
        ejercicio: this.editedItem.ejercicio,
        leyenda: this.editedItem.leyenda,
        })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            if (this.editedIndex > -1) {
              Object.assign(this.desserts[this.editedIndex], this.editedItem);
            } else {
              this.desserts.push(this.editedItem);
            }
          } else {
            console.log("Error", response.err);
          }
        })
        .catch(error => {
          console.error(error);
        });
      this.close();
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      if (confirm(`¿Deseas eliminar el ejercicio ${item.ejercicio}?`)) {
        this.$http
          .post("/catalogos/eliminar_ejercicio", {
            id_ejercicio: this.desserts[index].id_ejercicio
          })
          .then(response => {
            console.log(response);
            if (response.status == 200) {
              this.desserts.splice(index, 1)
            } else {
              console.log("Error", response.err);
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
  }
};
</script>
