<template>
        <div class="card">
        <div class="card-header">
            SUPER HIDROMACK - PEDIDO : {{ props.codigo }}
        </div>
        <div class="card-body">
            <h3>{{ props.codclie }} - {{ props.nomclie }}</h3>
        </div> 
    </div>
    <hr> 
        <div class="container mt-2">
                <div class="row g-2 mt-1">
                    <table class="table table-light table-sm">
                        <tbody>
                            <tr>
                                <td>Descripcion</td>
                                <td> Total </td>
                            </tr>
                            <tr v-for="item in documentoData" :key="item.id" class="table-secondary">
                                <td v-if="item.codclie == codclie"><small>{{ item.codprod }} - {{ item.descrip }}<br>
                                Cant: {{ item.cantidad }} - Precio: {{ item.precio  }}</small></td>
                                <td style="text-align: right;" v-if="item.codclie == codclie"><small>{{ $filters.currency(item.cantidad*item.precio)  }}</small></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><b>TOTAL</b></td>
                                <td class="text-right"><small><b>{{ $filters.currency(totalmonto)  }}</b></small></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div  class="d-grid gap-2 mb-2">
                    <router-link :to="{ name : 'pedidosenviados' }" class="btn btn-secondary" type="button" id="regresar"> <i class="bi bi-arrow-return-left"></i> REGRESAR</router-link>
                </div>
        </div>
    </template>
    
    <script setup>
        import { onMounted,defineProps,ref } from 'vue';
        import consultardocumentoService from '../services/ConsultarDocumentoService'
        import { useGlobalStore } from '../store/global';
    
        const consultarDocumento = new consultardocumentoService()
        const documentoData = consultarDocumento.getDocumento()
    
        const store = useGlobalStore()
    
        const props = defineProps({
            codigo : Number,
            codclie : String,
            nomclie : String,
            totalmonto : Number
        })
    
        onMounted( async ()=>{   
            await consultarDocumento.fetchConsultarDocumento(store.urlPpal,store.headRequest(),props.codigo)
        })
    </script>