<template>
  <div>
    <core-app-bar />
    <div v-if="loginView == false">
      <core-drawer />
      <v-content class="grey lighten-3" style="height:100%">
        <div id="core-view">
          <v-fade-transition mode="out-in">
            <router-view />
          </v-fade-transition>
        </div>
      </v-content>
      <!-- <core-footer></core-footer> -->
    </div>
    <div v-else>
      <v-content class="grey lighten-3">
        <div id="core-view">
          <v-fade-transition mode="out-in">
            <router-view />
          </v-fade-transition>
        </div>
      </v-content>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../../utils/event-bus";
export default {
  created() {
    localStorage.getItem("jwt") == null
      ? (this.loginView = true)
      : (this.loginView = false);
  },
  name: "CoreView",
  components: {
    CoreDrawer: () => import("@/components/core/Drawer"),
    // CoreFooter: () => import('@/components/core/Footer'),
    CoreAppBar: () => import("@/components/core/AppBar")
  },
  metaInfo() {
    return {};
  },
  data() {
    return {
      loginView: true,
      dialogLoading: true,
    };
  },
  watch: {
    $route(to, from) {
      if (localStorage.getItem("jwt") !== null) {
        if (to.path == "/" || to.path == ""){
          this.loginView = true;
        } 
        else{
          this.loginView = false;
        } 
      } else {
        this.loginView = true;
      }
    }
  },
};
</script>
