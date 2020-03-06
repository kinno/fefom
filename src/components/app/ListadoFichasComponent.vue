<template>
  <v-container fluid class="pa-0">
    
    <v-col cols="12" class="pa-0">
      <v-data-table
        :headers="headers"
        :items="asignaciones"
        class="elevation-1 pl-0 tablaTechos"
        locale="es-MX"
        :search="search"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="text-center">{{ item.id_ficha_tecnica }}</td>
            <td class="text-center">
              {{item.ayuntamiento}}
            </td>
            <td class="text-center">
             {{item.nombre_proyecto}}
            </td>
            <td class="text-right">
             {{ item.monto | currency}}
            </td>
            <td class="text-center">
              {{item.procedencia}}
            </td>
            <td class="text-center">
              {{item.fecha_asignacion}}
            </td>
            <td class="text-center">
              <v-row  no-gutters>
                <v-col cols="12">
                  <v-btn class="btnK pa-0" x-small height="30px" @click="revisarFicha(item.id_ficha_tecnica)">
                    <v-icon color="green darken-2"
                      >mdi-file-export</v-icon
                    >
                  </v-btn>
                </v-col>
              </v-row>
            </td>
          </tr>
        </template>
        <template v-slot:no-data>No hay asignaciones registradas</template>
      </v-data-table>
    </v-col>
  </v-container>
</template>
<script>
import { EventBus } from "../../utils/event-bus";
import moment from "moment";
export default {
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.buscarAsignaciones()
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
      headers: [
          {
            text: 'Folio',
            align: 'center',
            sortable: false,
            value: 'id_ficha_tecnica',
          },
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
            // console.log(response.data[0]);
            response.data.forEach(element => {
                this.asignaciones.push({
                id_ficha_tecnica: element.id_ficha_tecnica,
                ayuntamiento: element.ayuntamiento,
                nombre_proyecto: element.nombre_proyecto,
                monto: element.monto_con_iva,
                procedencia: element.nombre,
                fecha_asignacion:  moment(
                                    element.fecha_asignacion
                                    ).format("LL")
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