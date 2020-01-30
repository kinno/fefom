<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <material-card
          color="green"
          title="Catálogos"
          text="Administración"
          class="mt-8"
        >
        <v-container grid-list-xs>
          <v-row no-gutters>
            <v-col cols="12" md="2">
                <v-tabs
                  v-model="tab"
                  background-color="green lighten-5"
                  slider-color="green"
                  color="green"
                  active-class="tab-active"
                  vertical
                >
                  <v-tab
                    v-for="item in items"
                    :key="item.titulo"
                    @click="expand=false, currentTab = item.component"
                  >
                    {{ item.titulo }}
                  </v-tab>

                  <!-- <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <component
                          :is="currentTabComponent"
                          :key="update"
                        ></component>
                      </v-card-text>
                    </v-card>
                  </v-tab-item> -->
                </v-tabs>
            </v-col>
            <v-col cols="12" md="10">
              <v-expand-x-transition>
                <v-card  color="green lighten-4">
                  <v-card-text>
                    <component
                        :is="currentTabComponent"
                        :key="update"
                        
                      ></component>
                  </v-card-text>
                </v-card>
              </v-expand-x-transition>
            </v-col>
          </v-row>
        </v-container>
          <!-- background-color="green lighten-1" -->
          <!-- <v-tabs
            v-model="tab"
            
            color="black lighten-1"
            vertical
          >
            <v-tab
              v-for="item in items"
              :key="item.titulo"
              @click="currentTab = item.component"
            >
              {{ item.titulo }}
            </v-tab>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <component
                    :is="currentTabComponent"
                    :key="update"
                  ></component>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
          <v-card flat>
            <v-card-text>
             <component
                :is="currentTabComponent"
                :key="update"
              ></component>
            </v-card-text>
          </v-card> -->
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import UsuariosComponent from "../components/app/CatalogoUsuariosComponent";
import AyuntamientosComponent from "../components/app/CatalogoAyuntamientosComponent";
import EjerciciosComponent from "../components/app/CatalogoEjerciciosComponent";
  export default {
    components: {
      UsuariosComponent, AyuntamientosComponent, EjerciciosComponent
    },
    data() {
      return {
         tab: null,
         expand: true,
        currentTab: "usuarios-component",
         update: 0,
        items: [
        {
          titulo: "Usuarios",
          component: "usuarios-component",
        },
        {
          titulo: "Ayuntamientos",
          component: "ayuntamientos-component",
        },
        {
          titulo: "Ejercicios",
          component: "ejercicios-component",
        },
      ],
      }
    },
     computed: {
      currentTabComponent: function() {
        return this.currentTab;
      }
  },
  }

</script>
<style lang="css">
.tab-active{
  background-color: #C8E6C9;
}
</style>