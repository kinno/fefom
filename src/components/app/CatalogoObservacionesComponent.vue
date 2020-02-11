<template>
  <v-card>
    <v-card-title> </v-card-title>
    <v-data-table :headers="headers" :items="desserts">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on }">
              <v-btn text color="green brighten-5" v-on="on"
                >+ Agregar Observación</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-textarea
                        outlined
                        label="Texto de la observación:"
                        v-model="editedItem.texto_observacion"
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
        <v-btn class="btnK pa-0" x-small height="30px" @click="editItem(item)">
          <v-icon color="green darken-2">mdi-square-edit-outline</v-icon>
        </v-btn>
        <v-btn
          class="btnK pa-0"
          x-small
          height="30px"
          @click="deleteItem(item)"
        >
          <v-icon color="red darken-2">mdi-delete-forever</v-icon>
        </v-btn>
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
      { text: "Observación", value: "texto_observacion", width: "90%" },
      { text: "Acciones", value: "action", sortable: false, width: "10%" }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id_observacion: null,
      texto_observacion: null
    },
    defaultItem: {
      id_observacion: null,
      texto_observacion: null
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nuevo observación"
        : "Editar observacion";
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
        .get("/catalogos/get_catalogo_observaciones")
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
        .post("/catalogos/registrar_observacion", {
          id_observacion:
            typeof this.editedItem.id_observacion === "undefined"
              ? null
              : this.editedItem.id_observacion,
          texto_observacion: this.editedItem.texto_observacion
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
      if (confirm(`¿Deseas eliminar la observacion?`)) {
        this.$http
          .post("/catalogos/eliminar_observacion", {
            id_observacion: this.desserts[index].id_observacion
          })
          .then(response => {
            console.log(response);
            if (response.status == 200) {
              this.desserts.splice(index, 1);
            } else {
              console.log("Error", response.err);
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }
};
</script>
