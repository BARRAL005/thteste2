import { auth, db, fb } from './firebase.js';
const LS_KEY = 'th_empreendimentos_state_v2';
export const state = {
  user: null,
  online: false,
  route: 'dashboard',
  clients: [],
  loans: [],
  payments: [],
  expenses: [],
  cards: [],
  audit: []
};
const sample = {
  clients:[{id:'c1',name:'João Silva',cpf:'000.000.000-00',phone:'18999999999',address:'Presidente Prudente',status:'ativo',risk:'baixo',notes:'Cliente demonstração'}, {id:'c2',name:'Maria Souza',cpf:'111.111.111-11',phone:'18988888888',address:'Regente Feijó',status:'inadimplente',risk:'alto',notes:'Atraso recorrente'}],
  loans:[{id:'l1',clientId:'c1',amount:3000,rate:15,interestType:'mensal',installments:3,due:'2026-06-20',lateFee:5,dailyLate:1,guarantee:'Celular',monthlyInterestPaid:450,status:'ativo',createdAt:Date.now()}, {id:'l2',clientId:'c2',amount:1200,rate:20,interestType:'mensal',installments:2,due:'2026-06-03',lateFee:8,dailyLate:1.5,guarantee:'Documento',monthlyInterestPaid:0,status:'atrasado',createdAt:Date.now()}],
  payments:[{id:'p1',clientId:'c1',loanId:'l1',amount:450,type:'juros mensal',date:'2026-06-08'}],
  expenses:[{id:'e1',description:'Internet escritório',amount:120,type:'empresarial',date:'2026-06-05'}],
  cards:[{id:'card1',bank:'Nubank',limit:5000,closing:10,due:18,used:1260,status:'aberto'}], audit:[]
};
export function loadLocal(){const saved=localStorage.getItem(LS_KEY); if(saved){Object.assign(state, JSON.parse(saved));} else {Object.assign(state, sample); saveLocal();}}
export function saveLocal(){localStorage.setItem(LS_KEY, JSON.stringify({clients:state.clients,loans:state.loans,payments:state.payments,expenses:state.expenses,cards:state.cards,audit:state.audit}));}
export function uid(prefix='id'){return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}
export function log(action, detail){state.audit.unshift({id:uid('a'),action,detail,date:new Date().toLocaleString('pt-BR'),user:state.user?.email||'demo'}); saveLocal();}
export function calcLoan(loan){const totalInterest=(Number(loan.amount)||0)*(Number(loan.rate)||0)/100; const total=(Number(loan.amount)||0)+totalInterest; return {interest:totalInterest,total,parcel: total/(Number(loan.installments)||1),profitExpected:totalInterest,monthlyInterest:(Number(loan.amount)||0)*(Number(loan.rate)||0)/100};}
export function metrics(){const totalLoaned=state.loans.reduce((s,l)=>s+Number(l.amount||0),0); const expected=state.loans.reduce((s,l)=>s+calcLoan(l).total,0); const received=state.payments.reduce((s,p)=>s+Number(p.amount||0),0); const expenses=state.expenses.reduce((s,e)=>s+Number(e.amount||0),0); const interestMonth=state.payments.filter(p=>String(p.type).includes('juros')).reduce((s,p)=>s+Number(p.amount||0),0); const def=state.loans.filter(l=>l.status==='atrasado').length; return {balance:received-expenses,totalLoaned,expected,received,profitMonth:interestMonth-expenses,profitAccumulated:received-totalLoaned,activeClients:state.clients.filter(c=>c.status!=='inativo').length,defaulters:def,roi: totalLoaned? (interestMonth/totalLoaned*100):0,expenses};}
export function clientName(id){return state.clients.find(c=>c.id===id)?.name || 'Cliente removido'}
export function addItem(type, item){state[type].unshift({id:uid(type[0]),...item}); log(`Novo registro em ${type}`, item.name||item.description||item.bank||item.amount); saveLocal();}
export function removeItem(type,id){state[type]=state[type].filter(x=>x.id!==id); log(`Registro removido em ${type}`, id); saveLocal();}
export async function login(email,password,create=false){if(create) return fb.createUserWithEmailAndPassword(auth,email,password); return fb.signInWithEmailAndPassword(auth,email,password)}
export async function logout(){return fb.signOut(auth)}
export function watchAuth(cb){return fb.onAuthStateChanged(auth, user=>{state.user=user; state.online=!!user; cb(user);});}
export async function syncToCloud(){ if(!state.user) return; const ref=fb.doc(db,'users',state.user.uid,'private','state'); await fb.setDoc(ref,{clients:state.clients,loans:state.loans,payments:state.payments,expenses:state.expenses,cards:state.cards,audit:state.audit,updatedAt:fb.serverTimestamp()},{merge:true}); }
