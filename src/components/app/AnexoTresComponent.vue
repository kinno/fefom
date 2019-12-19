<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>Descripción de la problemática</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="column">
                <v-textarea
                  label="Descripción:"
                  auto-grow
                  outlined
                  rows="5"
                  row-height="15"
                  maxlength="280"
                  counter="280"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="column">
                <v-file-input
                  dense
                  outlined
                  v-model="imagenNueva"
                  accept="image/*"
                  label="Cargar imagen"
                  prepend-icon="mdi-camera"
                  @change="cargaImagen"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="3"
                class="column"
                v-for="(imagen, index) in imagenes"
                :key="index"
              >
                <v-card class="mx-auto">
                  <v-img
                    class="white--text align-end"
                    :src="`./uploads/imgfichas/${imagen.url}`"
                    aspect-ratio="1"
                    contain
                  >
                  </v-img>
                  <v-card-text class="text--primary">
                    <v-textarea
                      label="Descripción:"
                      auto-grow
                      outlined
                      rows="1"
                      row-height="15"
                      v-model="imagen.descripcion"
                      maxlength="280"
                      counter="280"
                    ></v-textarea>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red"
                      text
                      @click="eliminaImagen(imagen, index)"
                    >
                      Eliminar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="column">
                <v-textarea
                  label="Análisis de la oferta:"
                  auto-grow
                  outlined
                  rows="5"
                  row-height="15"
                  maxlength="280"
                  counter="280"
                ></v-textarea>
              </v-col>
              <v-col cols="6" class="column">
                <v-textarea
                  label="Análisis de la demanda:"
                  auto-grow
                  outlined
                  rows="5"
                  row-height="15"
                  maxlength="280"
                  counter="280"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" offset-md="3" class="column">
        <v-row>
          <v-col cols="12">
            <v-card outlined>
              <v-toolbar dense flat color="grey lighten-2">
                <v-toolbar-title>
                  Variables relevantes
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="12" md="6" class="column">
                    <div class="my-2">
                      <v-btn
                        text
                        color="green brighten-5"
                        @click="agregarComponente"
                        >+ Agregar concepto</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-data-table
                      :headers="headers"
                      :items="desserts"
                      hide-default-footer
                      class="tablaAlternativas"
                    >
                      <template v-slot:item.concepto="props">
                        <v-edit-dialog
                          :return-value.sync="props.item.concepto"
                          @save="save"
                          save-text="Aceptar"
                          @cancel="cancel"
                          cancel-text="Cancelar"
                          @open="open"
                          @close="close"
                          large
                          persistent
                        >
                          {{ props.item.concepto }}
                          <template v-slot:input>
                            <v-text-field
                              label="Concepto"
                              placeholder="Concepto"
                              v-model="props.item.concepto"
                            ></v-text-field>
                          </template>
                        </v-edit-dialog>
                      </template>
                      <template v-slot:item.situacionActual="props">
                        <v-edit-dialog
                          :return-value.sync="props.item.situacionActual"
                          @save="save"
                          save-text="Aceptar"
                          @cancel="cancel"
                          cancel-text="Cancelar"
                          @open="open"
                          @close="close"
                          large
                          persistent
                        >
                          {{ props.item.situacionActual }}
                          <template v-slot:input>
                            <v-textarea
                              label="Descripción"
                              v-model="props.item.situacionActual"
                              auto-grow
                              outlined
                              rows="3"
                              row-height="15"
                              maxlength="280"
                              counter="280"
                              class="mt-5"
                            ></v-textarea>
                          </template>
                        </v-edit-dialog>
                      </template>
                      <template v-slot:item.accion="{ item }">
                        <v-icon @click="deleteItem(item)" color="red darken-1">
                          mdi-delete-forever
                        </v-icon>
                      </template>
                    </v-data-table>
                    <v-snackbar
                      v-model="snack"
                      :timeout="3000"
                      :color="snackColor"
                    >
                      {{ snackText }}
                      <v-btn text @click="snack = false">Close</v-btn>
                    </v-snackbar>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { EventBus } from "../../utils/event-bus";

export default {
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    // this.initialize();
  },
  data: () => ({
    user: null,
    imagenes: [
      // {
      //   url: "file-1574973193343.jpg",
      //   descripcion: `Nunc sed turpis. Curabitur blandit mollis lacus. Nunc nec neque. Etiam vitae tortor. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.`
      // }
    ],
    imagenNueva: null,
    descripcionNueva: "",
    snack: false,
    snackColor: "",
    snackText: "",
    max280chars: v => v.length <= 280 || "Input too long!",
    pagination: {},
    headers: [
      {
        text: "Concepto",
        align: "center",
        sortable: false,
        value: "concepto",
        width: "50%"
      },
      {
        text: "Situación Actual",
        align: "center",
        sortable: false,
        value: "situacionActual",
        width: "45%"
      },
      {
        text: "",
        align: "center",
        sortable: false,
        value: "accion",
        width: "5%"
      },
      
    ],
    desserts: []
  }),
  watch: {},
  methods: {
    initialize() {},
    onSelect() {},
    async cargaImagen() {
      if (this.imagenNueva !== null) {
        const formData = new FormData();
        formData.append("file", this.imagenNueva);
        formData.append("id_municipio", this.user.id_municipio);
        try {
          await this.$http
            .post("/ficha_tecnica/upload", formData)
            .then(async resp => {
              if (resp.status == 200) {
                console.log(resp);
                this.imagenes.push({
                  url: resp.data,
                  descripcion: this.descripcionNueva
                });
                this.imagenNueva = null;
                this.descripcionNueva = "";
              } else {
                this.message = "Ocurrió un error al cargar los productos";
              }
            });
        } catch (err) {
          console.log(err);
        }
      }
    },
    eliminaImagen(imagen, index) {
      this.$http
        .post("/ficha_tecnica/delete", {
          imagen: imagen.url
        })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            this.imagenes.splice(index, 1);
          } else {
            console.log("Error", response.err);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
    agregarComponente() {
      this.desserts.push({
        concepto: "Nuevo",
        situacionActual: "Nuevo",
      });
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      this.desserts.splice(index, 1);
    },
    emiteEvento(tipo) {
      EventBus.$emit(tipo, {});
    }
  }
};
</script>
<style></style>
