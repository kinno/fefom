<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title>Catálogos del sistema</v-toolbar-title>
          </v-toolbar>
          <v-container grid-list-xl>
              <v-row>
                  <v-col md="2">
                      <v-card class="ml-0" tile color="red">
                        <v-list dense>
                        <v-list-item-group color="green">
                            <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" v-model="item.active">
                            <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.text"></v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                        </v-list>
                    </v-card>
                  </v-col>
                  <v-col md="10">
                    <router-view></router-view>
                  </v-col>
              </v-row>
          </v-container>
          
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  export default {
    components: {

    },
    data() {
      return {
        item: 1,
        items: [{
            text: 'Usuarios',
            icon: 'mdi-clock',
            to: '/catalogos/usuarios',
            active: false
          },
          
        ],
      }
    }
  }

</script>
