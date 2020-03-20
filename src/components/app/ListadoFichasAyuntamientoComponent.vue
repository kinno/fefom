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
            <td class="text-center" style="width:1%;">{{ item.version }}</td>
            <td class="text-center">
             {{item.nombre_proyecto}}
            </td>
            <td class="text-right">
             {{ item.monto | currency}}
            </td>
            <td class="text-center">
              {{item.fecha_ficha}}
            </td>
           
            <td class="text-center">
              <v-row no-gutters>
                <v-col cols="2" class="mt-2">
                  <v-icon :color="item.color" size="large">{{item.icono}}</v-icon>
                </v-col>
                <v-col cols="10" class="font-weight-black">
                  {{item.estatus_texto}}
                </v-col>
              </v-row>
            </td>
             <td class="text-center">
              {{item.fecha_envio}}
            </td>
            <td class="text-center">
              <div  v-if="item.fecha_limite_ayuntamiento !== null">
                <v-icon small center :color="item.semaforo">mdi-circle-slice-8</v-icon>
                <br><span style="font-size: 10px !important; ">{{item.fecha_limite_ayuntamiento}}</span>
                <br><span style="font-size: 10px !important;" class="font-weight-black">
                {{item.dias_restantes}} días restantes</span>
              </div>
            </td>
            <td class="text-center">
              <v-row  no-gutters>
                <v-col cols="12">
                  <v-tooltip bottom v-if="item.estatus == 1 || item.estatus == 5">
                    <template v-slot:activator="{ on }">
                      <v-btn
                      v-if="botonVisible"
                      color="green"
                      class="white--text"
                      v-on="on"
                      x-small
                     @click="revisarFicha(item.id_ficha_tecnica)"
                    >
                      <v-icon small center dark>mdi-file-document-edit-outline</v-icon>
                    </v-btn>
                    </template>
                    <span>Editar ficha técnica</span>
                  </v-tooltip>
                  <v-tooltip bottom v-if="item.estatus == 5">
                    <template v-slot:activator="{ on }">
                      <v-btn
                      v-if="botonVisible"
                      color="green"
                      class="white--text"
                      x-small
                      v-on="on"
                     @click="imprimirObservaciones(item.id_ficha_tecnica)"
                    >
                      <v-icon small center dark>mdi-printer-settings</v-icon>
                    </v-btn>
                    </template>
                    <span>Imprimir observaciones</span>
                  </v-tooltip>
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
import { calculaFecha } from "../../utils/calculaFecha";
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
          { text: 'Version', value: 'version', sortable: false,align: 'center',},
          { text: 'Proyecto', value: 'nombre_proyecto', sortable: false,align: 'center',},
          { text: 'Monto', value: 'monto', sortable: false,align: 'right',},
          { text: 'Fecha creacion', value: 'fecha_creacion', sortable: false, align: 'center',},
          { text: 'Estatus', value: 'fecha_envio', sortable: false, align: 'center',},
          { text: 'Fecha envío', value: 'fecha_envio', sortable: false, align: 'center',},
          { text: 'Fecha Límite', value: '', sortable: false, align: 'center',},
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
        .post("/ficha_tecnica/buscar_fichas_tecnicas", {
          id_ayuntamiento: this.user.id_municipio
        })
        .then(response => {
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
            // console.log(response.data[0]);
            response.data.forEach(element => {
              var estat = ""
              var iconoEstatus = ""
              var color = ""
              var diasRestantes = 0
              var semaforo = ""
              // console.log(element.estatus)
              switch (element.estatus) {
                case 1:
                  estat = "Edición / Presentación"
                  iconoEstatus = "mdi-file-document-edit"
                  break;
                case 2:
                  estat = "En Revisión"
                   iconoEstatus = "mdi-timeline-clock"
                  break;
                case 3:
                  estat = "En Revisión"
                   iconoEstatus = "mdi-timeline-clock"
                  break;
                case 4:
                  estat = "En Revisión"
                   iconoEstatus = "mdi-timeline-clock"
                  break;
                case 5:
                  estat = "Regresada con Observaciones"
                   iconoEstatus = "mdi-comment-alert"
                   color = "#EF9A9A"
                   diasRestantes = calculaFecha(element.fecha_limite_ayuntamiento)
                   
                   if(diasRestantes > 3){
                    semaforo = "green lighten-1"
                   }else if(diasRestantes>0 && diasRestantes<3){
                     semaforo =" yellow lighteen-1"
                   }else{
                     semaforo = "red lighten-1"
                   }
                  break;
              
                default:
                  break;
              }
                this.asignaciones.push({
                id_ficha_tecnica: element.id_ficha_tecnica,
                version: element.version,
                fecha_ficha: moment(
                                    element.fecha_ficha
                                    ).format("LL"),
                nombre_proyecto: element.nombre_proyecto,
                monto: element.monto_con_iva,
                procedencia: element.nombre,
                fecha_envio:  moment(
                                    element.fecha_envio
                                    ).format("LL"),
                fecha_limite_ayuntamiento: (element.fecha_limite_ayuntamiento!==null) ? moment(
                                    element.fecha_limite_ayuntamiento
                                    ).format("LL") : null,
                dias_restantes: (element.fecha_limite_ayuntamiento !== null) ? calculaFecha(element.fecha_limite_ayuntamiento) : null,
                semaforo: semaforo,
                estatus: element.estatus,
                estatus_texto: estat,
                icono: iconoEstatus,
                color: color
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
    calcularSemaforo(){

    },
    revisarFicha(id_ficha_tecnica) {
     this.$router.push({name: "Registro-Ficha", params: {id_ficha_tecnica: id_ficha_tecnica}})
    },
    imprimirObservaciones(id_ficha_tecnica){
      EventBus.$emit("abreLoading");
      this.$http
        .get("/ficha_tecnica/imprimir_observaciones_ficha", {responseType: 'arraybuffer',params:{
          id_ficha_tecnica: id_ficha_tecnica,
        }})
        .then(response => {
          // console.log(response);
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
             
           var blob = new Blob([response.data], {type: 'application/pdf'});

            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.target = "_blank"
            // link.download = "filename.pdf";
            link.click();
          } else {
            this.$fire({
              type: "error",
              title: "Error",
              text: response.err,
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#d33"
            });
          }
        })
        .catch(error => {
           EventBus.$emit("cierraLoading");
          this.$fire({
            type: "error",
            title: "Error",
            text: error,
            confirmButtonText: "Cerrar",
            confirmButtonColor: "#d33"
          });
        });
    }
  },
  beforeDestroy() {
    EventBus.$off("buscarFicha");
  }
};
</script>