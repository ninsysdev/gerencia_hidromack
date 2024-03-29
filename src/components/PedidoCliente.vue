<template>
    <div class="row mb-3">
        <div class="col-6">
            <input class="form-control" type="text" placeholder="Buscar Por Descripcion" v-model="filtro">
        </div>
        <div class="col-6" style="text-align: right;">
            <button class="btn btn-primary" @click="buscarDato"><i class="bi bi-search"></i></button>
        </div>
    </div>
    <table id="tabla1" class="table table-sm">
        <tbody>
            <tr v-for="cliente in datosFiltrados" :key="cliente.codclie">
                <td>
                    <div class="text-primary">{{ cliente.codclie }} - {{ cliente.descrip }}</div>
                    <small>{{ cliente.direc1 }}<br>
                        {{ cliente.direc2 }} <br>
                        Telf: {{ cliente.Refere }}
                    </small>
                    <div v-if="cliente.escxc > 0">
                        <table class="table table-sm">
                            <tr v-for="documento in cliente.porcobrar" :key="documento.numerod">
                            <td>
                                <small>
                                <i v-if="documento.TipoCxc == '10'">Fac: </i> <i v-else>ND: </i>
                                {{ documento.NumeroD }} - {{ documento.Dias }} dias
                                </small>
                            </td>
                            <td style="text-align: right;">
                                <div v-if="documento.TipoCxc == '10'">
                                <small> {{ documento.saldo }} $</small>
                                </div>
                            </td>
                            </tr>
                            <tr v-if="cliente.escxc > 1">
                            <td> <small><b>Total</b></small></td>
                            <td style="text-align: right;"><small><b>{{ cliente.totalcxc }} $</b></small></td>
                            </tr>
                        </table>
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button @click="nuevoPedido(cliente.codclie)" type="button" class="btn btn-success">
                        Nuevo Pedido
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useGlobalStore } from '../store/global'
    import ClientesService from '../services/ClientesService';
    import GuardarDocumentoService from '../services/GuardarDocumentoService';

    const route = useRouter() 
    const store = useGlobalStore()
    const servClientes = new ClientesService();
    const misclientes = servClientes.getClientes();

    const GuardarDocumento = new GuardarDocumentoService();
    //const respuestaGuardar = GuardarDocumento.getRespuesta();

    const datosFiltrados = ref([]);
    const filtro = ref('');
    
    const localdat = JSON.parse(localStorage.getItem('spx_localdata'));

    onMounted(async () => {
        await servClientes.fetchClientes(store.urlPpal, store.headRequest())
    })

    const buscarDato = () => {
        if (filtro.value == '') {
            datosFiltrados.value = misclientes.value
        }
        else {
            datosFiltrados.value = misclientes.value.filter(item => item.descrip.toLowerCase().includes(filtro.value.toLowerCase()))
        }
    }

    const nuevoPedido = ( async (codclie)=>{
        let documento = [{
                codvend : localdat.spx_use_v,
                codclie : codclie,
                codprod : '0',
                cantidad : 0,
                precio : 0,
                comentario : '',
                conexion : '',
                deposito : store.deposito
            }];
        await GuardarDocumento.fetchGuardarDocumento(store.urlPpal, store.headRequest(),documento);
        route.push({ name : 'pedidosguardados' });
    });
</script>