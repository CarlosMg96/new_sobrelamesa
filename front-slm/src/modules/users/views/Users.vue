<template>
  <div class="main-content">
    <Loader v-if="isLoading" key="load" />
    <div class="content">
      <Panel header="Usuarios" class="shadow-lg">
        <div class="p-1">
          <div>
            <b-row>
              <b-col
                class="d-flex justify-content-between align-content-between mb-3"
              >
                <span class="p-input-icon-right">
                  <i class="pi pi-search custom" @click="changeSearch()" />
                  <InputText type="text" :placeholder="searchBy()" />
                </span>
                <Button
                  class="button-options"
                  label="Nuevo usuario"
                  iconPos="right"
                  icon="pi pi-user-plus"
                  @click="openSaveModal"
                />
              </b-col>
            </b-row>
          </div>
          <div>
            <DataTable
              class="custom-datatable"
              :value="users"
              selectionMode="single"
              @row-select="onUserSelect"
            >
              <Column
                :headerStyle="config"
                class="ctm-name"
                field="fullname"
                header="Nombre"
              />
              <Column :headerStyle="config" field="role" header="Rol" />
              <Column :headerStyle="config" field="email" header="Email" />
              <Column :headerStyle="config" header="Acciones"
              :bodyStyle="{ 'text-align': 'center', overflow: 'visible' }">
              <template #body="slotProps">
                <Button icon="pi pi-trash"  v-tooltip.top="'Eliminar'" class="p-button-rounded p-button-secondary" style="margin-right: .5em" />
                <Button icon="pi pi-pencil" class="p-button-rounded button-style" @click="editUser(slotProps.data)" v-tooltip.top="'Editar'" />      
            </template>
                        </Column>
            </DataTable>
            <div>
              <b-col cols="1" :style="{ marginTop: '20px' }">
                <small>Registros: </small> {{ totalRecords }}
              </b-col>
              <Paginator
                :rows="2"
                :totalRecords="totalRecords"
                :rowsPerPageOptions="[2, 3, 5, 10, 15, 20, 30, 100]"
                :currentPage="totalRecords > 0 ? pageable.page : 0"
                :first="0"
                :pageLinkSize="1"
                :style="{ marginTop: '20px' }"
                @page="getUsers($event)"
              />
            </div>
          </div>
        </div>
      </Panel>
    </div>
    <ModalUserInfo :user="selectedUser" :visible.sync="displayModal" />
    <ModalSaveUser :visible.sync="displaySaveModal" />
  </div>
</template>

<script>
import Panel from "primevue/panel";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ModalUserInfo from "@/modules/users/components/ModalUserInfo.vue";
import ModalSaveUser from "@/modules/users/components/ModalSaveUser.vue";
import Paginator from "primevue/paginator";
import { onError, onQuestion } from "@/kernel/alerts";
import Loader from "@/components/Loader.vue";
import service from "@/modules/users/services/UserService";

export default {
  name: "Events",
  components: {
    Panel,
    DataTable,
    Column,
    ModalUserInfo,
    ModalSaveUser,
    Paginator,
    Loader,
  },
  data() {
    return {
      sidebarVisible: false,
      isLoading: false,
      users: [],
      selectedUser: null,
      config: {
        background: "#333",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
      },
      displayModal: false,
      displaySaveModal: false,
      searchByName: true,
      optionSelected: null,
      pageable: {
        page: 0,
        size: 2,
      },
      totalRecords: 0,
      filters1: {
        global: { value: "" },
      },
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers(event) {
    if (event != undefined) {
      const { page, rows } = event;
      this.pageable.page = page;
      this.pageable.size = rows;
    }
    try {
      this.isLoading = true;
      const { status, data, message } = await service.get_user(this.pageable);
      console.log();
      if (status === 200 || status === 201) {
        this.totalRecords = data.data.totalElements;
        this.users = data.data.content;
        this.isLoading = false;
      } else {
        await onError("Ha ocurrido un error", message);
        this.isLoading = false;
      }
    } catch (error) {
      await onError("Ha ocurrido un error", "Vuelve a reiniciar la página, o vuelve a iniciar sesión");
      this.isLoading = false;
    }
  },

    onUserSelect(event) {
      this.displayModal = true;
      if (event.data) {
        this.selectedUser = event.data;
      }
    },
    changeSearch() {
      this.searchByName = !this.searchByName;
    },
    searchBy() {
      return this.searchByName ? "Buscar por nombre..." : "Buscar por correo..";
    },
    openSaveModal() {
      this.displaySaveModal = true;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/colors";

.user-management {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex: 1;
  padding: 2rem;
  margin-left: 0;
  transition: margin-left 0.3s;
}

.content.sidebar-open {
  margin-left: 250px; /* Ajusta este valor al ancho de tu sidebar */
}

.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  display: flex;
  flex: 2;
}

.content {
  flex: 1;
  padding: 1rem;
  transition: margin-left 0.3s;
}

.content.sidebar-open {
  margin-left: 200px;
}

.cd-user-info {
  margin-top: 86px;
}

.ctm-name {
  background-color: $primary-color;
}

.button-options {
  background: $primary-color;
  color: white;
  border: none;
  border-radius: 5px;
}

.button-options:hover {
  border-radius: 5px;
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(72, 70, 70, 0.3);
  background: $primary-color !important;
  border: none;
  cursor: pointer;
}

.custom:hover {
  cursor: pointer;
}

.button-style{
  background-color: $primary-color;
}
</style>
