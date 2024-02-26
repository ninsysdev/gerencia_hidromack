<template>
  <main class="mt-5 pt-3">
    <div class="container singin">
            <div class="text-center">
              <i class="bi bi-file-earmark-bar-graph-fill" style="font-size: 4rem; color: cornflowerblue"></i>
            </div>
            <form class="user" @submit.prevent="authUser"> 
              <div class="form-floating mb-3">
                  <input v-model="usuario" type="text" class="form-control" id="floatingInput" placeholder="USUARIO SAINT" maxlength="10" required>
                  <label for="floatingInput">Usuario</label>
              </div>
              <div class="form-floating mb-3">
                  <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password" required>
                  <label for="floatingPassword">Password</label>
              </div>   
              <div class="form-floating d-grid gap-2">
                  <button type="submit" class="btn btn-primary btn-user btn-block">INGRESAR</button>
              </div>
              <hr>
            </form>
            <div class="text-center">
              <i class="small" href="#">ninsistemas@hotmail.com</i>
            </div>
    </div>
   </main>
</template>    

<script setup>
    import { useRouter } from 'vue-router'
    import { useGlobalStore } from '../store/global'
    import { ref,inject } from 'vue';     
    import LoginService from '../services/LoginService'

    const swal = inject('$swal')

    const router = useRouter()
    const store = useGlobalStore()
    const datalogin = new LoginService()
    const responselogin = datalogin.getRespuesta()
    
    const usuario = ref('')
    const password = ref('')
        
    const authUser = async () => {
        await datalogin.fetchUserLogin(store.urlPpal,usuario.value,password.value)
        if(responselogin.value.response == 'ok'){
            let spx_localdata = {
                spx_tok_p : responselogin.value.token,
                spx_nam_p : responselogin.value.usuario,
                spx_use_p : responselogin.value.nombre,
                spx_use_v : responselogin.value.codvend,
            }  
            let spx_fechareplica = '2000-01-01 00:00:00';
            localStorage.setItem('spx_localdata',JSON.stringify(spx_localdata)) 
            localStorage.setItem('spx_fechareplica',JSON.stringify(spx_fechareplica))
            await router.push('/home')
        }
        else{
          swal("Problema de Usuario o Password");
        }
    } 
</script>

<style scoped>
    .singin{
      align-items: center;
      margin-top: 80px;
    }
</style>