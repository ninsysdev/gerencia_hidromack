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
    <div v-if="totalre>0" class="container mt-2">
            <!-- div style="text-align: center;"><h5>{{ cliente.codclie }} - {{ cliente.descrip }}</h5></div -->
            <div class="row g-2 mt-1">
                <table class="table table-sm">
                    <tbody>
                        <tr v-for="(item) in pedidotemp" :key="item.id">
                            <td><small>{{ item.codprod }} - {{ item.descrip }}<br>
                            Ref: {{ item.referen }}<br>    
                            Cant: {{ item.cantidad }} - Precio: {{ $filters.currency(item.precio) }}</small></td>
                            <td style="text-align: right;"><small>{{ $filters.currency(item.cantidad*item.precio)  }}</small></td>
                            <td style="text-align: right;">
                                <div class="btn-group-vertical">
                                    <!-- button @click="datoscantidad(index,item.cantidad,item.descrip,item.precio)" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalActivos"><i class="bi bi-pencil-fill"></i></button -->
                                    <button  @click="borraoitem(item.id)" type="button" class="btn btn-dark"><i class="bi bi-trash-fill"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="table-secondary">
                            <td>TOTAL</td>
                            <td style="text-align: right;"><small><b>{{ totalre }}</b></small></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <input v-model="comentario"  type="text" class="form-control mb-3" placeholder="Comentario"  maxlength="40">
            <div class="d-grid gap-2">
                <button @click="totalizarpedido()" class="btn btn-primary mb-1 btn-block"  ><i class="bi bi-send-fill"></i> ENVIAR PARA PROCESAR</button>
            </div>
    </div>
    <div v-else >
        <h5 style="text-align: center;">NO HAY PRODUCTOS PEDIDOS</h5>
    </div>
    <hr>
    <div class="row mb-3">
        <div class="col-6">
            <input class="form-control" type="text" placeholder="Buscar" v-model="filtro">
        </div>
        <div class="col-3">
            <select v-model="buscarPor" class="form-select">
                <option value="Descrip" selected>Descripcion</option>
                <option value="CodProd">Codigo</option>
                <option value="Refere">Referencia</option>
                <option value="Marca">Marca</option>
            </select>
        </div>
        <div class="col-3">
            <button class="btn btn-primary" @click="buscarDato"><i class="bi bi-search"></i></button>
        </div>
    </div>
    <!-- TABLA PRODUCTO -->
    <table id="tabla1" class="table table-sm">
                <tbody>
                    <tr v-for="producto in datosFiltrados" :key="producto.CodProd">
                        <td>
                            <div v-for="imagen in producto.img" :key="imagen.file">
                                <img style="width: 100px;" :src="'https://catalogohidromack.geincca.com/img/' + imagen.file"
                                    alt="..." />
                            </div>
                        </td>
                        <td>
                            <div class="text-primary">{{ producto.CodProd }} - {{ producto.Descrip }} <br>
                                <small>{{ producto.Descrip2 }} {{ producto.Descrip3 }} </small>
                            </div>
                            <small>
                                Ref: {{ producto.Refere }} <br>
                                Marca : {{ producto.Marca }} <br>
                                Costo: {{ producto.CostAct }} <br>
                                Precio1 : {{ producto.Precio1 }} <br>
                                Precio2 : {{ producto.Precio2 }} <br>
                                Precio: {{ producto.Precio }} <br>
                                Cantidad : {{ $filters.currency(producto.Exinten) }} {{ producto.Unidad }}
                            </small>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button 
                                    type="button" 
                                    @click="datoscantidad(producto)" 
                                    class="btn btn-warning" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#ModalPedir">
                                    PEDIR
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

    <!-- Modal  PEDIR-->
    <div class="modal fade modal-fullscreen" id="ModalPedir" tabindex="-1" aria-labelledby="ModalPedirsLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-body text-center">            
            <div class="text-primary">{{ editaitem.codprod }} - {{ editaitem.descrip }}</div>
            <select v-model="editaitem.preciopedido" class="form-select">
                <option :value="editaitem.precio">Precio : {{ editaitem.precio }}</option>
                <option :value="editaitem.precio2">Precio 2 : {{ editaitem.precio2 }}</option>
                <option :value="editaitem.precio1">Precio 1 : {{ editaitem.precio1 }}</option>
            </select>
            <div class="form-floating mt-2 mb-1">
            <input v-model="editaitem.cantidad" type="number" content="width=device-width" class="form-control" id="floatingInput" placeholder="CANTIDAD" required>
            <label for="floatingInput">Cantidad</label>
            </div>
        </div>
        <div class="modal-footer">
            <button @click="addItemPedido()"  type="button" class="btn btn-primary" data-bs-dismiss="modal">Pedir</button>
            <button  type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cerrarModal">Cancelar</button>
        </div>
        </div>
        </div>
    </div>
    <!--- FIN MODAL PEDIR --->
</template>

<script setup>
    import { onMounted,ref,defineProps,inject } from 'vue'
    import { useRouter } from 'vue-router';
    import { useGlobalStore } from '../store/global';
    import ConsultarDocumentoService from '../services/ConsultarDocumentoService';
    import ExistenciasProductosService from '../services/ExistenciasProductos';
    import EditarDocumentoService from '../services/EditarDocumentoService';
    import BorrarDocumentoService from '../services/BorrarDocumentoService';
    import CerrarDocumentoService from '../services/CerrarDocumentoService';
    
    const route = useRouter() 

    const swal = inject('$swal')
    const store = useGlobalStore()

    const documentoped = new ConsultarDocumentoService();
    const pedidotemp = documentoped.getDocumento();

    const ExistenciasProductos = new ExistenciasProductosService();
    const todosProductos = ExistenciasProductos.getExistenciasProd();

    const EditarDocumento = new EditarDocumentoService();
    //const RespuestaEditar = EditarDocumento.getRespuesta();

    const datosFiltrados = ref([]);
    const buscarPor = ref('CodProd')
    const filtro = ref('');

    const cerrardocumento = new CerrarDocumentoService()
    const documentoresp = cerrardocumento.getRespuesta()

    const borrarDocumento = new BorrarDocumentoService()
    //const borrarDocumentoRes = borrarDocumento.getRespuesta()

    const props = defineProps({
        codigo : Number,
        codclie : String,
        nomclie : String
    })

    const comentario = ref('');
    const cantire = ref(0);
    const totalre = ref(0)
    const idultimoreg = ref(0);
    const editaitem = ref({})
    //const sincroniza = ref(false)

    const localdat = JSON.parse(localStorage.getItem('spx_localdata'));

    onMounted( async ()=>{
        await ExistenciasProductos.fetchExistenciasProd(store.urlPpal, store.headRequest())
        await documentoped.fetchConsultarDocumentoGuardado(store.urlPpal,store.headRequest(),props.codigo);
        await calculatotal();
    })
  
    const datoscantidad = ((producto)=>{
        editaitem.value.codprod = producto.CodProd
        editaitem.value.cantidad = 0
        editaitem.value.descrip = producto.Descrip
        editaitem.value.precio1 = producto.Precio1
        editaitem.value.precio2 = producto.Precio2
        editaitem.value.precio = producto.Precio
        editaitem.value.preciopedido = producto.Precio
        editaitem.value.existen = producto.Exinten
    })

    const borraoitem=( async (iditem)=>{
        if(cantire.value>1){
            await borrarDocumento.fetchDeleteItemDoc(store.urlPpal,store.headRequest(),iditem);
        }
        else{
            await borrarDocumento.fetchDelItemOne(store.urlPpal,store.headRequest(),iditem);
        }
        await documentoped.fetchConsultarDocumentoGuardado(store.urlPpal,store.headRequest(),props.codigo);
        await calculatotal();
    })

    
    const calculatotal = ( async ()=>{
        totalre.value = 0
        cantire.value = 0
        pedidotemp.value.forEach((item)=>{
            idultimoreg.value = item.id;
            cantire.value++
            totalre.value += item.precio*item.cantidad
        })
    })

    const totalizarpedido = ( async ()=>{
        await updateComentario()
        await cerrardocumento.fetchCerrarDocumento(store.urlPpal,store.headRequest(),pedidotemp.value);
        if(documentoresp.value.response == 'ok'){
            await borrarPedidoGuardado();            
            await swal({
                icon: 'success',
                title: 'Pedido Enviado',
                showConfirmButton: false,
                timer: 1500 
            })
            route.push({ name : 'pedidosguardados' });
        }
        else{
            swal({
                icon: 'error',
                title: 'Error',
                text: 'No se logro la conexion al servidor',
            })
        }
    })

    const updateComentario = ( async ()=>{
        pedidotemp.value.forEach((item)=>{
            item.comentario = comentario.value
            item.codvend = localdat.spx_use_v
            item.cliente = props.nomclie
        })
    })

    const borrarPedidoGuardado = ( async ()=>{
        await borrarDocumento.fetchBorrarDocumento(store.urlPpal,store.headRequest(),props.codigo);
    })
    
    const addItemPedido = ( async ()=>{
      if(editaitem.value.cantidad<=0){
        swal("La cantidad no es valida");
      }
      else{
        if(editaitem.value.preciopedido<=0){
            swal("El precio no es valido");
        }
        else{
            if(parseInt(editaitem.value.cantidad) <= parseInt(editaitem.value.existen)){
                if(totalre.value<=0){
                    await EditarDocumento.fetchAddItemOneDoc(store.urlPpal,store.headRequest(),idultimoreg.value,editaitem.value.codprod,editaitem.value.preciopedido,editaitem.value.cantidad)
                }
                else{
                    await EditarDocumento.fetchAddItemDocumento(store.urlPpal,store.headRequest(),props.codigo,editaitem.value.codprod,editaitem.value.preciopedido,editaitem.value.cantidad)
                }
                await documentoped.fetchConsultarDocumentoGuardado(store.urlPpal,store.headRequest(),props.codigo);
                await calculatotal();
            }
            else{
                swal("La cantidad es superior a la existencia");
            }
        }
      }   
    });

    const buscarDato = () => {
        if (filtro.value == '') {
            datosFiltrados.value = todosProductos.value
        }
        else {
            if (buscarPor.value == 'Descrip') {
                datosFiltrados.value = todosProductos.value.filter(item => item.Descrip.toLowerCase().includes(filtro.value.toLowerCase()))
            }
            else if (buscarPor.value == 'CodProd') {
                datosFiltrados.value = todosProductos.value.filter(item => item.CodProd.toLowerCase().includes(filtro.value.toLowerCase()))
            }
            else if (buscarPor.value == 'Refere') {
                datosFiltrados.value = todosProductos.value.filter(item => item.Refere.toLowerCase().includes(filtro.value.toLowerCase()))
            }
            else {
                datosFiltrados.value = todosProductos.value.filter(item => item.Marca.toLowerCase().includes(filtro.value.toLowerCase()))
            }
        }
    }
</script>