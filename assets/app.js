import { $, renderApp, toast } from './ui.js';
import { loadLocal, state, login, logout, watchAuth } from './store.js';

loadLocal();
const authScreen = $('#authScreen');
const mainApp = $('#mainApp');
function showApp(){authScreen.classList.add('hidden'); mainApp.classList.remove('hidden'); renderApp();}
function showAuth(){mainApp.classList.add('hidden'); authScreen.classList.remove('hidden');}

watchAuth(user=>{ if(user){state.user=user; showApp();} });
$('#loginForm').onsubmit = async e => { e.preventDefault(); const email=$('#email').value, pass=$('#password').value; $('#authMessage').textContent='Entrando...'; try{await login(email,pass,false); toast('Login realizado');}catch(err){$('#authMessage').textContent='Erro no login: '+err.message;} };
$('#createAccountBtn').onclick = async () => { const email=$('#email').value, pass=$('#password').value; if(!email||!pass) return $('#authMessage').textContent='Digite e-mail e senha para criar.'; try{await login(email,pass,true); toast('Conta criada');}catch(err){$('#authMessage').textContent='Erro ao criar: '+err.message;} };
$('#demoBtn').onclick = () => { state.user={email:'demo@th.local'}; showApp(); toast('Modo demonstração aberto'); };
$('#logoutBtn').onclick = async () => { try{await logout()}catch{} state.user=null; showAuth(); };
$('#openMenu').onclick=()=>$('#sidebar').classList.add('open');
$('#closeMenu').onclick=()=>$('#sidebar').classList.remove('open');
$('#themeBtn').onclick=()=>{document.body.classList.toggle('light'); localStorage.setItem('th_theme',document.body.classList.contains('light')?'light':'dark')};
if(localStorage.getItem('th_theme')==='light') document.body.classList.add('light');
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
