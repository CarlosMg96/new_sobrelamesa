<template>
    <v-container fluid class="login-container">
      <v-row class="fill-height" align="center" justify="center">
        <v-col cols="12" md="6">
          <div class="logo-content">
            <img src="../../assets/icono_logo.jpeg" alt="Logo" class="logo-image" />
            <h2 style="color: white;">Sobre la mesa</h2>
          </div>
        </v-col>
        <v-col cols="12 pa-8" md="6">
          <v-card class="pa-4 card-custom">
            <img src="../../assets/copa_vino.png" width="128px" alt="auto" class="user-image" />
            <div class="login-form">
              <div class="text-center mb-7">
                <h2>Inicio de Sesión</h2>
              </div>
              <form @submit.prevent="handleLogin">
                <div class="input-container">
                  <v-icon class="fa-solid fa-envelope icon"></v-icon>
                  <input
                    type="email"
                    v-model="email"
                    @input="validateEmail"
                    placeholder="Correo Electrónico"
                    class="login-input"
                    required
                  />
                </div>
                <div v-if="emailValidationMessage" class="validation-message">{{ emailValidationMessage }}</div>
                
                <div class="input-container">
                  <v-icon class="fa-solid fa-key icon"></v-icon>
                  <input
                    type="password"
                    v-model="password"
                    @input="validatePassword"
                    placeholder="Contraseña"
                    class="login-input"
                    required
                  />
                </div>
                <div v-if="passwordValidationMessage" class="validation-message">{{ passwordValidationMessage }}</div>
                
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
                <button type="submit" class="login-button" :disabled="activeBtnLogin()">Login</button>
              </form>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { Login } from '../services/auth-service';
  import router from '@/router';
  
  export default defineComponent({
    name: "UserLogin",
    setup() {
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const emailValidationMessage = ref('');
      const passwordValidationMessage = ref('');
  
      const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar email
        emailValidationMessage.value = regex.test(email.value) ? '' : 'Email no válido';
      };
  
      const validatePassword = () => {
        const regex = /^.{6,}$/;
        passwordValidationMessage.value = regex.test(password.value) ? '' : 'La contraseña debe tener al menos 6 caracteres';
      };
  
      const handleLogin = async () => {
        if (!email.value || !password.value) {
          errorMessage.value = 'Por favor, complete todos los campos.';
          return;
        }
        const credentials = {
          email: email.value,
          password: password.value,
        }
  
        try {
          const response = await Login(credentials);
          if (response.status === 200) {
            await router.push({ name: "products" }); 
          }
        } catch (error) {
          console.error(error);
        }
      };
  
    const activeBtnLogin = () => {
      return (
      !email.value || 
      !password.value || 
      !(emailValidationMessage.value == "") || 
      !(passwordValidationMessage.value == "")
    ); 
    }
  
    
  
      return {
        email,
        password,
        errorMessage,
        emailValidationMessage,
        passwordValidationMessage,
        validateEmail,
        validatePassword,
        handleLogin,
        activeBtnLogin,
      };
    },
    methods: {
      redirectToRegister() {
        this.$router.push('register');
      },
      redirectToForgotPassword() {
        this.$router.push('recovery-password');
      },
    }
  });
  </script>
  
  <style scoped>
  .login-container {
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(128,128,128,1) 50%, rgba(255,255,255,1) 100%);
    height: 100vh;
  }
  
  .logo-content {
    text-align: center;
  }
  
  .logo-image {
    max-width: 160px;
    margin-bottom: 8px;
    border-radius: 10%;
  }
  
  .card-custom {
    position: relative; 
    margin-left: 128px;
    margin-right: 128px;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.8); 
    backdrop-filter: blur(10px);
    overflow: visible; 
    z-index: 1; 
  }
  
  .user-image {
    position: absolute;
    top: -96px; 
    left: 50%;
    transform: translateX(-50%);
    z-index: 2; 
  }
  
  .login-form {
    padding: 24px;
  }
  
  .input-container {
    position: relative;
    margin-bottom: 16px;
  }
  
  .icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #3A415A;
  }
  
  .login-input {
    width: 100%;
    padding: 12px 12px 12px 40px; /* Espacio para el ícono */
    border: 1px solid #ccc;
    border-radius: 32px;
    outline: none;
    transition: border-color 0.3s;
  }
  
  .login-input:focus {
    border-color: #3A415A;
  }
  
  .login-button {
    background-color: #3A415A;
    color: #ffffff;
    border-radius: 32px;
    width: 100%;
    padding: 12px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .login-button:hover {
    background-color: #89A7B1;
  }
  
  .forgot-password,
  .sign-up {
    background: none;
    border: none;
    color: #3A415A;
    cursor: pointer;
    text-decoration: underline;
  }
  
  .error-message {
    color: red;
    text-align: center;
    margin-top: 1px;
  }
  
  .validation-message {
    color: red;
    margin-left: 16px;
    text-align: left;
    margin-top: 1px;
  }
  
  .login-button:disabled {
    background-color: #b0b0b0; 
    cursor: not-allowed; 
  }
  
  
  @media screen and (max-width: 960px) {
    .user-image {
      top: -80px;
      width: 120px;
    }
    .logo-image {
      width: 100px;
    }
    .card-custom {
      margin-left: 0px;
      margin-right: 0px;
    }
  }
  @media screen and (min-width: 961px) and (max-width: 1280px) {
    .card-custom {
      margin-left: 72px;
      margin-right: 72px;
    }
  }
  
  </style>