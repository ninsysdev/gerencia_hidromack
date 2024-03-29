<template>
      <div class="container mt-3">
          <i class="bi bi-cloud-fill"></i> - ARCHIVOS GUARDADOS
          <ul class="list-group">
            <li v-for="documentg in documentosGua" :key="documentg.codigo" class="list-group-item d-flex justify-content-between align-items-center">
              <router-link style="font-size: smaller; text-decoration: none;" :to="{name:'editarpedido',params:{
                        codigo : documentg.codigo,
                        codclie : documentg.codclie,
                        nomclie : documentg.Descrip,
                        totmonto : documentg.tot_monto
                      }
                }">{{ documentg.Descrip }}<br> {{ documentg.codigo }} - {{  documentg.created_at }} - {{ documentg.tot_monto }}
              </router-link>
              <button @click="asingna(documentg.codigo,documentg.Descrip)" type="button" data-bs-toggle="modal" data-bs-target="#ModalActivos" class="btn btn-danger"><i class="bi bi-trash3-fill"></i></button>
            </li>
          </ul>
      </div>
      <!-- Modal -->
      <div class="modal fade modal-fullscreen" id="ModalActivos" tabindex="-1" aria-labelledby="ModalActivosLabel" aria-hidden="true">
          <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-body text-center">
                      <div class="text-primary">{{ nomclie }}</div>
                      <h1 style="color: orangered;"><b>¿ Realmente quieres borrar este pedido ?</b></h1>
                    </div>
                    <div class="modal-footer">
                        <button @click="borrarPedido()"  type="button" class="btn btn-danger" data-bs-dismiss="modal">BORRAR</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cancelar</button>
                    </div>
                    </div>
          </div>
        </div>
        <!--- FIN MODAL --->
  </template>
    
    <script setup>
        import { onMounted,ref,inject } from 'vue';
        import { useGlobalStore } from '../store/global'
        import PedidosGuardadosService from '../services/PedidosGuardadosService';
        import BorrarDocumentoService from '../services/BorrarDocumentoService';

        const store = useGlobalStore()
        const swal = inject('$swal')
        
        const pedidosguardos = new PedidosGuardadosService();
        const documentosGua = pedidosguardos.getPedidosGuar();

        const borrarDocumento = new BorrarDocumentoService()
        const borrarDocumentoRes = borrarDocumento.getRespuesta()
    
        const localdat = JSON.parse(localStorage.getItem('spx_localdata'));

        const codigo = ref(0);
        const nomclie =ref('');

        onMounted( async ()=>{
            await pedidosguardos.fetchPedidosGuardados(store.urlPpal,store.headRequest(),localdat.spx_use_v);
        })

        const asingna = ((vcodigo,vnombre)=>{
          codigo.value = vcodigo;
          nomclie.value = vnombre;
        })

        const borrarPedido = ( async ()=>{
          await borrarDocumento.fetchBorrarDocumento(store.urlPpal,store.headRequest(),codigo.value);
          if(borrarDocumentoRes.value.response == 'ok'){
              await pedidosguardos.fetchPedidosGuardados(store.urlPpal,store.headRequest(),localdat.spx_use_v);
              await swal({
                      icon: 'success',
                      title: 'Archivo BORRADO',
                      showConfirmButton: false,
                      timer: 1500 
                  })
              }
              else{
                  swal({
                  icon: 'error',
                  title: 'Error',
                  text: 'No se logro la conexion al servidor',
                  })
              }
            })
    </script>