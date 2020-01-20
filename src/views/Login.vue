<template>
  <v-col cols="12" lg="4" offset-lg="4" class="mt-10 mb-10">
    <material-card color="green" title="Bienvenido" text="Inicio de sesión">
      <v-card-text>
        <v-form>
          <v-text-field label="Usuario" prepend-icon="mdi-account-circle" v-model="userName" />
          <v-text-field :type="showPassword ? 'text' : 'password'" label="Contraseña" prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"
            v-model="password" />
        </v-form>
         <material-notification
            class="mb-3"
            color="red"
            :dismissible="false"
            v-model="alertError.show"
          >
            <strong>Error</strong> - {{alertError.mensaje}}
          </material-notification>
      </v-card-text>
      <v-card-actions>
      <v-spacer></v-spacer>
        <v-btn color="green" @click="handleSubmit">Login</v-btn>
      </v-card-actions>
    </material-card>
  </v-col>
  <!-- <v-card width="400" class="mx-auto mt-5">
    <v-card-title class="pb-0">
      <h1>Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field label="Username" prepend-icon="mdi-account-circle" v-model="userName" />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          v-model="password"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success">Register</v-btn>
      <v-btn color="info" @click="handleSubmit">Login</v-btn>
    </v-card-actions>
  </v-card> -->
</template>

<script>
  export default {
    data() {
      return {
        showPassword: false,
        userName: "",
        password: "",
        alertError: {
          mensaje: "",
          show : false,
        },
      }
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault()
        if (this.password.length > 0) {
          this.$http.post('/login/', {
              username: this.userName,
              password: this.password
            })
            .then(response => {
              if(response.status == 404){
                this.error.mensaje = response
                this.error.show = true
              }else{
                console.log(response.data.user)
                this.alertError.show = false
                let is_fefom = response.data.user.tipo_usuario
                localStorage.setItem('user', JSON.stringify(response.data.user))
                localStorage.setItem('jwt', response.data.token)

                if (localStorage.getItem('jwt') != null) {
                  this.$emit('loggedIn')
                  if (this.$route.params.nextUrl != null) {
                    this.$router.push(this.$route.params.nextUrl)
                  } else {
                    // if (is_fefom == 1) {
                    //   this.$router.push('admin')
                    // } else {
                      this.$router.push('dashboard')
                    // }
                  }
                }
              }
            })
            .catch((error)=>{
              this.alertError.mensaje = error.response.data
              this.alertError.show = true
            });
        }
      }
    }
  }

</script>
