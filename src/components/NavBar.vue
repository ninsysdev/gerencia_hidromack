<template>
<!-- top navigation bar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebar"
        aria-controls="offcanvasExample"
      >
        <span class="navbar-toggler-icon" data-bs-target="#sidebar"></span>
      </button>
      <router-link :to="{ name : 'home' }"
        class="navbar-brand me-auto ms-3"
        ><img src="../assets/img/ninsis_ft3.png" alt="..." style="width: 60%;"></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#topNavBar"
        aria-controls="topNavBar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="topNavBar">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle ms-2"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-fill"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Mi Cuenta</a></li>
              <li><a class="dropdown-item" href="#">Configuraciones</a></li>
              <li>
                <a class="dropdown-item" @click="logOut" href="#">Cerrar Sesion</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- top navigation bar -->
  <!-- offcanvas -->
  <div
    class="offcanvas offcanvas-start sidebar-nav bg-dark"
    tabindex="-1"
    id="sidebar"
  >
    <div class="offcanvas-body p-0">
      <nav class="navbar-dark">
        <ul class="navbar-nav">
          <li style="text-align: center;">
            <router-link :to="{ name : 'home' }" style="text-decoration: none;">
            <div class="small text-uppercase px-3 mt-3" style="color: whitesmoke;">
              SUPER HIDROMACK <br>
              PANEL DE CONTROL
            </div>
          </router-link>
          </li>
          <li class="my-2"><hr class="dropdown-divider bg-light" /></li>
          <li>
            <a
              class="nav-link px-3 sidebar-link"
              data-bs-toggle="collapse"
              href="#layouts"
            >
              <span class="me-2"><i class="bi bi-layout-split"></i></span>
              <span>Archivos</span>
              <span class="ms-auto">
                <span class="right-icon">
                  <i class="bi bi-chevron-down"></i>
                </span>
              </span>
            </a>
            <div class="collapse" id="layouts">
              <ul class="navbar-nav ps-3">
                <li>
                  <router-link :to="{ name : 'ofertas' }" class="nav-link px-3">
                    <span class="me-2"><i class="bi bi-bag-fill"></i></span>
                    <span>Ofertas</span>
                  </router-link >
                </li>
                <li>
                  <router-link :to="{ name : 'catalogo' }" class="nav-link px-3">
                    <span class="me-2"><i class="bi bi-tags-fill"></i></span>
                    <span>Catalogo</span>
                  </router-link >
                </li>
                <li>
                  <!-- router-link :to="{ name : 'editdata' }" class="nav-link px-3">
                    <span class="me-2"><i class="bi bi-calendar-check"></i></span>
                    <span>Editar Datos</span>
                  </router-link -->
                  <a href="#" class="nav-link px-3">
                    <span class="me-2"><i class="bi bi-image"></i></span>
                    <span>Imagenes</span>
                  </a>
                </li>
                <li>
                  <a href="#" class="nav-link px-3">
                    <span class="me-2"><i class="bi bi-people-fill"></i></span>
                    <span>Vendedores</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="my-2"><hr class="dropdown-divider bg-light" /></li>
          <li>
            <div class="text-muted small fw-bold text-uppercase px-3 mb-3">
              ESTADISTICAS
            </div>
          </li>
          <li>
            <router-link :to="{ name : 'ventasmes' }" class="nav-link px-3">
              <span class="me-2"><i class="bi bi-graph-up"></i></span>
              <span>Ventas</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name : 'inventario' }" class="nav-link px-3">
              <span class="me-2"><i class="bi bi-table"></i></span>
              <span>Inventario</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name : 'comprasmes' }" class="nav-link px-3">
              <span class="me-2"><i class="bi bi-bag-check-fill"></i></span>
              <span>Compras</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name : 'porcobrar' }" class="nav-link px-3">
              <span class="me-2"><i class="bi bi-cash-coin"></i></span>
              <span>Por Cobrar</span>
            </router-link>
          </li>
          <li>
            <a href="#" class="nav-link px-3">
              <span class="me-2"><i class="bi bi-wallet-fill"></i></span>
              <span>Por Pagar</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-link px-3">
              <span class="me-2"><i class="bi bi-bank2"></i></span>
              <span>Bancos</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <!-- offcanvas -->
</template>

<script setup>
  const logOut = ( async ()=>{
      localStorage.removeItem('spx_localdata')
      localStorage.removeItem('spx_factorbcv')
      localStorage.removeItem('spx_fechareplica')
      localStorage.removeItem('spx_mydata')
      localStorage.removeItem('spx_clientlist')
      localStorage.removeItem('spx_priceslist')
      localStorage.removeItem('spx_lastdoc')
      localStorage.removeItem('spx_comentario')
      localStorage.removeItem('spx_summarycxc')

      location.reload()
    })
</script>
