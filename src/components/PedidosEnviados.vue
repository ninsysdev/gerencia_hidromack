<template>
      <div class="container mt-3">
          <i class="bi bi-send-fill"></i> - PEDIDOS ENVIADOS
          <ul  class="list-group">
            <li  v-for="documento in documentosEnv" :key="documento.codigo" class="list-group-item d-flex justify-content-between align-items-center bg-light">
              <router-link style="font-size: smaller; text-decoration: none;" :to="{name:'consultardocumento',params:{
                        codigo : documento.codigo,
                        codclie : documento.codclie,
                        guardado : 0,
                        nomclie : documento.Descrip,
                        totalmonto : documento.tot_monto
                      }
                      }"> 
                    {{ documento.Descrip }}<br><i class="bi bi-flag-fill"></i> - {{ documento.codigo }} - {{  documento.created_at }}
                </router-link><span class="badge bg-primary rounded-pill">{{ $filters.currency(documento.tot_monto) }}</span> 
              </li >
            <li v-for="docurec in documentosRec" :key="docurec.codigo" class="list-group-item d-flex justify-content-between align-items-center bg-light">
              <router-link style="font-size: smaller; text-decoration: none;" :to="{name:'consultardocumento',params:{
                        codigo : docurec.codigo,
                        nomclie : docurec.Descrip,
                        codclie : docurec.codclie,
                        totalmonto : docurec.tot_monto
                      }
                      }"> 
                    {{ docurec.Descrip }}<br>{{ docurec.codigo }} - {{  docurec.created_at }}
                </router-link> <span class="badge bg-primary rounded-pill">{{ $filters.currency(docurec.tot_monto) }}</span> 
              </li >
            </ul >
      </div>
</template>
    
    <script setup>
        import { onMounted,ref } from 'vue';
        import { useGlobalStore } from '../store/global';
        import DocumentosEnviadosService from '../services/DocumentosEnviadosService';

        const store = useGlobalStore()

        const DocumentosEnviados = new DocumentosEnviadosService();
        const documentosEnv = DocumentosEnviados.getDocumentosPendientes();
        const documentosRec = DocumentosEnviados.getDocumentosEnviados();

        const localdat = JSON.parse(localStorage.getItem('spx_localdata'));
    
        onMounted( async ()=>{
            await DocumentosEnviados.fetchPedidosPendientes(store.urlPpal, store.headRequest(),localdat.spx_use_v);
            await DocumentosEnviados.fetchPedidos(store.urlPpal, store.headRequest(),localdat.spx_use_v);
        })
    </script>