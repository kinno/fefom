<template>
  <v-app>
    <!-- <core-app-bar />

    <core-drawer v-if="drawer"/> -->

    <core-view class="fill-height"/>

    <!-- <core-footer /> -->
    <v-dialog v-model="dialogLoading" persistent width="300">
      <v-card color="green">
        <v-card-text>
          Cargando, por favor espere...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { EventBus } from "./utils/event-bus";
export default {
  components: {
    // CoreDrawer: () => import('@/components/core/Drawer'),
    // CoreFooter: () => import('@/components/core/Footer'),
    // CoreAppBar: () => import('@/components/core/AppBar'),
    CoreView: () => import("@/components/core/View")
  },
  mounted(){
    EventBus.$on("abreLoading", () => {
      this.dialogLoading = true;
    });
    EventBus.$on("cierraLoading", () => {
      this.dialogLoading = false;
    });
  },
  data() {
    return {
      dialogLoading: false
    };
  },
  beforeDestroy() {
    EventBus.$off("abreLoading");
    EventBus.$off("cierraLoading");
    
  }
};
</script>
