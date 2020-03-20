<template>
  <v-container fluid fill-height class="pa-0">
    <v-col cols="12" class="pa-0">
      <v-data-table
        :headers="headers"
        :items="asignaciones"
        class="elevation-1 pl-0 tablaTechos"
        locale="es-MX"
        :search="search"
        style="line-height:1.2em"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="text-center">{{ item.id_ficha_tecnica }}</td>
            <td class="text-center">{{ item.version }}</td>
            <td class="text-center">
              {{item.ayuntamiento}}
            </td>
            <td class="text-center">
             {{item.nombre_proyecto}}
            </td>
            <td class="text-right">
             {{ item.monto | currency}}
            </td>
            <td class="text-center font-weight-black">
              {{item.procedencia}}
            </td>
            <td class="text-center">
              {{item.fecha_asignacion}}
            </td>
            <td class="text-center">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                      v-if="item.observacion !== null"
                      color="green"
                      class="white--text"
                      x-small
                      v-on="on"
                     @click="observacion = item.observacion,dialogObservacionAnalista = true"
                    >
                      <v-icon small center dark>mdi-comment-alert-outline</v-icon>
                    </v-btn>
                    </template>
                    <span>Ver comentarios/observaciones</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                      v-if="botonVisible"
                      color="green"
                      class="white--text"
                      x-small
                      v-on="on"
                     @click="revisarFicha(item.id_ficha_tecnica)"
                    >
                      <v-icon small center dark>mdi-file-document-edit-outline</v-icon>
                    </v-btn>
                    </template>
                    <span>Revisar ficha técnica</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </td>
          </tr>
        </template>
        <template v-slot:no-data>No hay asignaciones registradas</template>
      </v-data-table>
    </v-col>
    <v-dialog v-model="dialogObservacionAnalista" min-width="500px" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Comentario/Observación para el Analista:
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <!-- <v-textarea
                outlined
                label="Observación"
                v-model="descripcionObservacionAnalista"
              ></v-textarea> -->
              <p style="white-space: pre-line !important;">{{(this.observacion)}}</p>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="
              (dialogObservacionAnalista = false)
            "
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { EventBus } from "../../utils/event-bus";
import moment from "moment";
export default {
  beforeMount(){
    
    
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.buscarAsignaciones();   
    EventBus.$on("actualizaPropAnexoDos", id_anexo_dos => {
    });
    
  },
  data() {
    return {
      user: null,
      tab: null,
      update: 0,
      botonVisible: true,
      search: null,
      dialogObservacionAnalista: false,
      observacion: null,
      headers: [
          {
            text: 'Folio',
            align: 'center',
            sortable: false,
            value: 'id_ficha_tecnica',
          },
          { text: 'Version', value: 'version', sortable: false,align: 'center',},
          { text: 'Ayuntamiento', value: 'ayuntamiento', sortable: false,align: 'center',},
          { text: 'Proyecto', value: 'nombre_proyecto', sortable: false,align: 'center',},
          { text: 'Monto', value: 'monto', sortable: false,align: 'right',},
          { text: 'Procedencia', value: 'procedencia', sortable: false,align: 'center',},
          { text: 'Fecha asignación', value: 'fecha_asignacion', sortable: false, align: 'center',},
          { text: 'Acciones', value: 'action', sortable: false,align: 'center',},
        ],
        asignaciones:[],
    };
  },
  computed: {

  },
  watch: {
  },
  methods: {
      buscarAsignaciones() {
      EventBus.$emit("abreLoading");
      this.$http
        .post("/ficha_tecnica/buscar_asignaciones", {
          id_usuario: this.user.id_usuario
        })
        .then(response => {
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
            console.log(response.data[0]);
            response.data.forEach(element => {
                this.asignaciones.push({
                id_ficha_tecnica: element.id_ficha_tecnica,
                version: element.version,
                ayuntamiento: element.ayuntamiento,
                nombre_proyecto: element.nombre_proyecto,
                monto: element.monto_con_iva,
                procedencia: element.nombre,
                tipo_usuario: element.tipo_usuario,
                fecha_asignacion:  moment(
                                    element.fecha_asignacion
                                    ).format("LL"),
                observacion: element.observacion
                })
            });
          } else {
               EventBus.$emit("cierraLoading");
            console.log("Error", response.err);
          }
        })
        .catch(error => {
             EventBus.$emit("cierraLoading");
          console.error(error);
        });
    },
    revisarFicha(id_ficha_tecnica) {
     this.$router.push({name: "Revision-Ficha", params: {id_ficha_tecnica: id_ficha_tecnica}})
    },
  },
  beforeDestroy() {
    EventBus.$off("buscarFicha");
  }
};
</script>