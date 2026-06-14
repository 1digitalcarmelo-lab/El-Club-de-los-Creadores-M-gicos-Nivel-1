/* ============================================================
   EL CLUB DE LOS CREADORES MÁGICOS — script.js v2
   ============================================================

   GUÍA DE PERSONALIZACIÓN:
   ─────────────────────────────────────────────────────────────
   MISIONES Y XP:     objeto CONFIG.misiones (~línea 25)
   MEZCLADOR IDEAS:   arrays COSAS_A / COSAS_B (~línea 60)
   PODERES RULETA:    array PODERES_CREATIVOS (~línea 80)
   MISIONES RASPADITA:array MISIONES_SECRETAS (~línea 95)
   LOGROS:            array CONFIG.logros (~línea 110)
   NIVELES:           array CONFIG.niveles (~línea 145)
   ─────────────────────────────────────────────────────────────
*/

"use strict";

/* ==================== CONFIGURACIÓN EDITABLE ==================== */
const CONFIG = {
  misiones: {
    1: { xpMax: 100, estrellasMax: 3, medalla: '🎨', insignia: '🎨', nombreInsignia: 'Artista Imaginativo' },
    2: { xpMax: 150, estrellasMax: 4, medalla: '📖', insignia: '📖', nombreInsignia: 'Narrador de Historias' },
    3: { xpMax: 200, estrellasMax: 5, medalla: '🔬', insignia: '🔬', nombreInsignia: 'Científico Creativo' },
    desafio: { xpMax: 500, estrellasMax: 0, medalla: '⚡', insignia: '🏆', nombreInsignia: 'Gran Creador Mágico' },
  },

  niveles: [
    { min: 0,   max: 24,  nombre: '🌱 Aprendiz Creador' },
    { min: 25,  max: 49,  nombre: '⭐ Creador Brillante' },
    { min: 50,  max: 74,  nombre: '🌟 Maestro Imaginativo' },
    { min: 75,  max: 99,  nombre: '🔮 Gran Creador' },
    { min: 100, max: 100, nombre: '👑 Leyenda Mágica' },
  ],

  titulosCertificado: [
    { xpMin: 0,    titulo: 'Creador en Ciernes' },
    { xpMin: 250,  titulo: 'Creador Talentoso' },
    { xpMin: 450,  titulo: 'Gran Creador Mágico' },
    { xpMin: 900,  titulo: '✨ Leyenda del Club Mágico ✨' },
  ],

  logros: [
    { id: 'primer_color',     icono: '🎨', nombre: '¡Primer Color!',         desc: 'Elegiste tu color creativo',          xp: 10 },
    { id: 'tesoro_m1',        icono: '💎', nombre: '¡Tesoro Guardado!',       desc: 'Guardaste tu tesoro de Misión 1',     xp: 15 },
    { id: 'tarjeta_volteada', icono: '🃏', nombre: '¡Carta Revelada!',        desc: 'Descubriste tu superpoder',           xp: 20 },
    { id: 'mision1_ok',       icono: '🎉', nombre: '¡Misión 1 Completada!',   desc: 'Superaste El Arte de Imaginar',       xp: 50 },
    { id: 'personaje_elegido',icono: '🎭', nombre: '¡Tenés Personaje!',       desc: 'Elegiste el héroe de tu historia',    xp: 15 },
    { id: 'quiz_ok',          icono: '🧠', nombre: '¡Cerebro Creativo!',      desc: 'Respondiste el quiz',                 xp: 25 },
    { id: 'historia_ok',      icono: '📚', nombre: '¡Escritor Mágico!',       desc: 'Escribiste tu primera historia',      xp: 30 },
    { id: 'mision2_ok',       icono: '🎊', nombre: '¡Misión 2 Completada!',   desc: 'Superaste El Mundo de las Historias', xp: 75 },
    { id: 'mezcla_ok',        icono: '⚗️',  nombre: '¡Alquimista de Ideas!',   desc: 'Mezclaste dos ideas mágicas',         xp: 20 },
    { id: 'basquet_ok',        icono: '🏀', nombre: '¡Idea Encestada!',         desc: '¡Encestaste tu idea en el portal!',   xp: 20 },
    { id: 'ruleta_ok',        icono: '🎡', nombre: '¡Poder Descubierto!',     desc: 'Usaste la Ruleta de Poderes',         xp: 20 },
    { id: 'foto_ok',          icono: '📸', nombre: '¡Foto Mágica!',           desc: 'Activaste el poder de tu foto',       xp: 25 },
    { id: 'raspadita_ok',     icono: '🎴', nombre: '¡Misión Secreta!',        desc: 'Raspaste y descubriste la sorpresa',  xp: 20 },
    { id: 'mision3_ok',       icono: '🚀', nombre: '¡Misión 3 Completada!',   desc: 'Superaste El Laboratorio Creativo',   xp: 100 },
    { id: 'desafio_ok',       icono: '🏆', nombre: '¡Gran Creador Mágico!',   desc: 'Completaste el Desafío Especial',     xp: 200 },
  ],
};

/* MEZCLADOR — cambiá estas listas para variar las combinaciones */
const COSAS_A = ['🎸 Guitarra','🐠 Pez dorado','🌵 Cactus','☁️ Nube','🎩 Sombrero','🔭 Telescopio','🍕 Pizza','🦋 Mariposa','🎪 Circo','🌊 Ola','🏈 Pelota','🎹 Piano'];
const COSAS_B = ['🦕 Dinosaurio','🚀 Cohete','🧲 Imán','💤 Sueños','⏰ Reloj loco','🌈 Arcoíris','🤖 Robot','🌺 Flor gigante','🎲 Dado','🔮 Bola mágica','🐲 Dragón','🏔️ Montaña'];
const RESULTADOS_MEZCLA = [
  '¡Un instrumento que toca solo mientras viaja en el tiempo!',
  '¡Una criatura que vuela y deja música a su paso!',
  '¡Una planta que cambia de color según la música que escucha!',
  '¡Una máquina que convierte los sueños en melodías!',
  '¡Un invento que combina magia y ciencia de formas inesperadas!',
  '¡Una criatura fantástica con poderes únicos en el universo!',
  '¡Un objeto mágico que nadie más en el mundo posee!',
  '¡Un aparato que lee la mente de los animales!',
  '¡Una nave espacial que funciona con imaginación pura!',
  '¡Un telescopio que muestra el futuro!',
];

/* PODERES CREATIVOS — cambiá esta lista para la ruleta */
const PODERES_CREATIVOS = [
  { icono: '🔭', nombre: 'La Visión del Futuro',       desc: '¡Podés imaginar cosas que todavía no existen y hacerlas realidad!' },
  { icono: '📸', nombre: 'El Ojo Fotográfico',         desc: '¡Tu mente guarda imágenes increíbles de todo lo que ves y las convierte en arte!' },
  { icono: '💥', nombre: 'La Imaginación Explosiva',   desc: '¡Tus ideas son tan grandes que explotan en mil colores y formas!' },
  { icono: '🎙️', nombre: 'La Voz Inventora',           desc: '¡Todo lo que decís en voz alta se convierte en una creación única!' },
  { icono: '🌍', nombre: 'El Creador de Mundos',       desc: '¡Podés inventar planetas, criaturas y civilizaciones enteras con tu mente!' },
  { icono: '🎨', nombre: 'La Maga de los Colores',     desc: '¡Ves colores que los demás no pueden ver y los usás para crear maravillas!' },
  { icono: '🗝️', nombre: 'El Guardián de las Ideas',   desc: '¡Guardás las mejores ideas del mundo y sabés exactamente cuándo usarlas!' },
];

/* MISIONES SECRETAS — para la raspadita */
const MISIONES_SECRETAS = [
  '🏠 Crear un invento usando 3 objetos de tu casa',
  '☁️ Dibujar una criatura que viva en una nube',
  '🎵 Inventar una canción de 4 líneas para el Club Mágico',
  '🏅 Diseñar una medalla para tu superpoder',
  '🌍 Inventar un país mágico y ponerle nombre',
  '📖 Escribir el título de tu propio libro de aventuras',
  '🤖 Diseñar un robot que resuelva un problema del mundo',
];

/* ==================== ESTADO DE LA APLICACIÓN ==================== */
// Toda la lógica del juego vive en este objeto.
// Se persiste en localStorage con la clave 'clubcreadores_estado'
let estado = {
  nombre: '',
  xp: 0,
  estrellas: 0,
  medallas: 0,
  misionesCompletadas: [],
  logrosDesbloqueados: [],
  insigniasGanadas: [],
  // Progreso por misión (cuántas estrellas tiene cada una)
  m1Estrellas: 0,
  m2Estrellas: 0,
  m3Estrellas: 0,
  m1Xp: 0,
  m2Xp: 0,
  m3Xp: 0,
  // Actividades específicas ya completadas (para evitar doble conteo)
  actCompletadas: [],
  // Datos guardados
  colorElegido: null,
  personajeElegido: null,
  tesoro: '',
  historia: '',
  tesoroLab: '',
  poderRuleta: null,
};

const LS_KEY = 'clubcreadores_estado_v2';

/* ==================== INIT ==================== */
document.addEventListener('DOMContentLoaded', () => {
  cargarEstado();
  generarParticulasEntrada();

  // Recuperar nombre guardado para el campo de entrada
  const nombreGuardado = estado.nombre || localStorage.getItem('clubcreadores_nombre');
  if (nombreGuardado) {
    const inp = document.getElementById('nombre-nino');
    if (inp) inp.value = nombreGuardado;
  }

  // Enter en el campo de nombre
  const inputNombre = document.getElementById('nombre-nino');
  if (inputNombre) inputNombre.addEventListener('keydown', e => { if (e.key === 'Enter') iniciarClub(); });

  // Click fuera de modales para cerrarlos
  document.addEventListener('click', e => {
    if (e.target === document.getElementById('overlay-bloqueo')) cerrarOverlayBloqueo();
    if (e.target === document.getElementById('modal-logro')) cerrarModalLogro();
  });
});

/* ==================== PERSISTENCIA ==================== */
function guardarEstado() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(estado)); } catch(e) {}
}

function cargarEstado() {
  try {
    const guardado = localStorage.getItem(LS_KEY);
    if (guardado) {
      const parsed = JSON.parse(guardado);
      // Merge para no perder nuevas propiedades si el usuario tenía un estado viejo
      estado = Object.assign(estado, parsed);
    }
  } catch(e) {}
}

/* ==================== SISTEMA DE PANTALLAS ==================== */
function irAPantalla(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });

  const pantalla = document.getElementById(id);
  if (!pantalla) return;

  // Determinar tipo de display según la pantalla
  const flexPantallas = ['pantalla-padres','pantalla-entrada','pantalla-bienvenida'];
  pantalla.style.display = flexPantallas.includes(id) ? 'flex' : 'block';
  void pantalla.offsetWidth; // reflow para animación
  pantalla.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Hooks por pantalla
  if (id === 'pantalla-mapa')        { sincronizarUIDesdeEstado(); actualizarMapa(); }
  if (id === 'pantalla-bienvenida')  sincronizarUIDesdeEstado();
  if (id === 'pantalla-mision3')     { sincronizarDisplayM3(); inicializarRaspadita(); setTimeout(inicializarBasquet, 100); }
  if (id === 'pantalla-mision1')     sincronizarDisplayM1();
  if (id === 'pantalla-mision2')     sincronizarDisplayM2();
  if (id === 'pantalla-recompensas') actualizarPantallaRecompensas();
  if (id === 'pantalla-certificado') generarCertificado();
}

/* Restaurar estado visual de actividades ya completadas */
function sincronizarUIDesdeEstado() {
  actualizarPanelXP();
}

function sincronizarDisplayM1() {
  actualizarContadorM1();
  // Restaurar actividades desbloqueadas
  if (estado.actCompletadas.includes('color')) {
    mostrarResultado('resultado-color');
    document.querySelectorAll('#opciones-color .opcion-item').forEach(b => b.disabled = true);
  }
  if (estado.actCompletadas.includes('tesoro_m1')) {
    document.getElementById('act-1-2').classList.remove('bloqueada-act');
    mostrarResultado('resultado-tesoro');
  }
  if (estado.actCompletadas.includes('tarjeta_m1')) {
    document.getElementById('act-1-2').classList.remove('bloqueada-act');
    document.getElementById('act-1-3').classList.remove('bloqueada-act');
    document.getElementById('tarjeta-poder').classList.add('revelada');
    mostrarResultado('resultado-tarjeta');
  }
  if (estado.actCompletadas.includes('color') && estado.actCompletadas.includes('tesoro_m1')) {
    document.getElementById('act-1-3').classList.remove('bloqueada-act');
  }
}

function sincronizarDisplayM2() {
  actualizarContadorM2();
  if (estado.actCompletadas.includes('personaje')) {
    mostrarResultado('resultado-personaje');
    document.getElementById('texto-personaje').textContent =
      `¡Excelente elección! ${estado.personajeElegido} va a ser el héroe de tu historia.`;
    if (estado.personajeElegido) {
      document.getElementById('personaje-en-cuento').textContent = estado.personajeElegido;
    }
  }
  if (estado.actCompletadas.includes('quiz')) {
    document.getElementById('act-2-2').classList.remove('bloqueada-act');
    mostrarResultado('resultado-quiz');
    document.querySelectorAll('.quiz-opcion').forEach(b => b.disabled = true);
  }
  if (estado.actCompletadas.includes('historia')) {
    document.getElementById('act-2-2').classList.remove('bloqueada-act');
    document.getElementById('act-2-3').classList.remove('bloqueada-act');
    mostrarResultado('resultado-historia');
  }
}

function sincronizarDisplayM3() {
  actualizarContadorM3();
  // Restaurar actividades M3
  const actsM3 = ['mezcla','basquet','ruleta','foto','raspadita'];
  let ultimaDesbloqueada = 0;
  actsM3.forEach((act, i) => {
    if (estado.actCompletadas.includes(act)) {
      ultimaDesbloqueada = i + 1;
    }
  });
  // Desbloquear las que correspondan
  for (let i = 1; i <= ultimaDesbloqueada + 1 && i <= 5; i++) {
    const card = document.getElementById(`act-3-${i}`);
    if (card) card.classList.remove('bloqueada-act');
  }
  if (estado.actCompletadas.includes('mezcla'))     mostrarResultado('resultado-mezcla');
  if (estado.actCompletadas.includes('basquet'))     mostrarResultado('resultado-basquet');
  if (estado.actCompletadas.includes('ruleta'))     mostrarResultado('resultado-ruleta');
  if (estado.actCompletadas.includes('foto'))       mostrarResultado('resultado-foto');
  if (estado.actCompletadas.includes('raspadita'))  mostrarResultado('resultado-raspadita');
}

/* ==================== PANTALLA ENTRADA ==================== */
function iniciarClub() {
  const input = document.getElementById('nombre-nino');
  const nombre = input.value.trim();

  if (!nombre) {
    input.style.borderColor = 'var(--error)';
    input.focus();
    setTimeout(() => { input.style.borderColor = ''; }, 2000);
    mostrarToast('👋', '¡Escribí tu nombre primero, Creador!');
    return;
  }

  estado.nombre = nombre;
  localStorage.setItem('clubcreadores_nombre', nombre);
  guardarEstado();

  // Animar la puerta
  const marco = document.querySelector('.puerta-magica .puerta-marco');
  if (marco) marco.parentElement.classList.add('puerta-abierta');
  explotarParticulasEntrada();

  setTimeout(() => {
    const saludoEl = document.getElementById('saludo-texto');
    if (saludoEl) saludoEl.textContent = `¡Bienvenido/a al Club, ${nombre}! 🎉`;
    const nombreRec = document.getElementById('nombre-recompensas');
    if (nombreRec) nombreRec.textContent = `¡Mirá todo lo que lograste, ${nombre}!`;
    actualizarPanelXP();
    irAPantalla('pantalla-bienvenida');
  }, 900);
}

/* ==================== MAPA ==================== */
function actualizarMapa() {
  const totalXPPosible = 1050;
  const porcentaje = Math.min(100, Math.round((estado.xp / totalXPPosible) * 100));

  const barraEl = document.getElementById('barra-progreso');
  const pctEl   = document.getElementById('progreso-porcentaje');
  const nivelEl = document.getElementById('nivel-actual');
  if (barraEl) barraEl.style.width = porcentaje + '%';
  if (pctEl)   pctEl.textContent = porcentaje + '%';
  if (nivelEl) {
    const nivel = CONFIG.niveles.find(n => porcentaje >= n.min && porcentaje <= n.max);
    if (nivel) nivelEl.textContent = nivel.nombre;
  }

  // Sincronizar estado visual de cada tarjeta
  ['mision1','mision2','mision3','desafio'].forEach(clave => {
    const num = clave === 'desafio' ? 'desafio' : clave.replace('mision','');
    marcarCardSegunEstado(num);
  });

  // Desbloquear según dependencias
  if (estado.misionesCompletadas.includes('mision1'))                                          desbloquearCardMision(2);
  if (estado.misionesCompletadas.includes('mision2'))                                          desbloquearCardMision(3);
  if (estado.misionesCompletadas.includes('mision1') &&
      estado.misionesCompletadas.includes('mision2') &&
      estado.misionesCompletadas.includes('mision3'))                                          desbloquearCardDesafio();

  actualizarInsigniasEnMapa();
}

function marcarCardSegunEstado(num) {
  const clave     = num === 'desafio' ? 'desafio' : `mision${num}`;
  const card      = document.getElementById(`card-mision${num}`);
  const estadoEl  = document.getElementById(`estado-mision${num}`);
  if (!card || !estadoEl) return;

  if (estado.misionesCompletadas.includes(clave)) {
    card.classList.remove('bloqueada');
    card.classList.add('completada');
    estadoEl.textContent = '✅ Completada';
    estadoEl.style.cssText = 'background:rgba(0,230,118,.15);color:var(--success);border-color:rgba(0,230,118,.3)';
  }
}

function desbloquearCardMision(num) {
  if (estado.misionesCompletadas.includes(`mision${num}`)) return; // ya completada, no tocar
  const card = document.getElementById(`card-mision${num}`);
  const btn  = document.getElementById(`btn-mision${num}`);
  if (!card || !btn) return;
  card.classList.remove('bloqueada');
  btn.disabled = false;
  btn.textContent = '¡Comenzar!';
  btn.onclick = () => irAPantalla(`pantalla-mision${num}`);
  const estadoEl = document.getElementById(`estado-mision${num}`);
  if (estadoEl) {
    estadoEl.textContent = '🔓 Disponible';
    estadoEl.style.cssText = 'background:rgba(0,212,168,.15);color:var(--aurora-teal);border-color:rgba(0,212,168,.3)';
  }
}

function desbloquearCardDesafio() {
  if (estado.misionesCompletadas.includes('desafio')) return;
  const card = document.getElementById('card-desafio');
  const btn  = document.getElementById('btn-desafio');
  if (!card || !btn) return;
  card.classList.remove('bloqueada');
  btn.disabled = false;
  btn.textContent = '⚡ ¡Entrar al Desafío Final!';
  btn.onclick = () => irAPantalla('pantalla-desafio');
  const estadoEl = document.getElementById('estado-desafio');
  if (estadoEl) {
    estadoEl.textContent = '🔓 ¡Disponible!';
    estadoEl.style.cssText = 'background:rgba(245,200,66,.15);color:var(--magic-gold);border-color:rgba(245,200,66,.3)';
  }
  mostrarToast('⚡', '¡El Desafío Final está desbloqueado!');
}

function intentarMisionBloqueada(num) {
  const mensajes = {
    2: '¡Primero tenés que completar la Misión 1 — El Arte de Imaginar! 🎨',
    3: '¡Todavía no! Terminá la Misión 2 — El Mundo de las Historias 📖',
    desafio: '¡El Desafío se desbloquea al completar las 3 Misiones! 💪',
  };
  document.getElementById('texto-bloqueo').textContent = mensajes[num] || 'Completá las misiones anteriores primero.';
  document.getElementById('overlay-bloqueo').classList.remove('oculto');
}

function cerrarOverlayBloqueo() {
  document.getElementById('overlay-bloqueo').classList.add('oculto');
}

function actualizarInsigniasEnMapa() {
  const slots  = document.querySelectorAll('#insignias-grid .insignia-slot');
  const claves = ['mision1','mision2','mision3','desafio'];
  const emojis = { mision1:'🎨', mision2:'📖', mision3:'🔬', desafio:'🏆' };
  claves.forEach((clave, i) => {
    if (!slots[i]) return;
    if (estado.misionesCompletadas.includes(clave)) {
      slots[i].textContent = emojis[clave];
      slots[i].classList.remove('vacia');
      slots[i].classList.add('ganada');
    }
  });
}

/* ==================== XP / ESTRELLAS ==================== */
function sumarXPGlobal(cantidad) {
  estado.xp += cantidad;
  guardarEstado();
  actualizarPanelXP();
  if (cantidad > 0) mostrarToast('✨', `+${cantidad} XP`);
}

function actualizarPanelXP() {
  animarContador('xp-estrellas', estado.estrellas);
  animarContador('xp-medallas', estado.medallas);
  animarContador('xp-puntos', estado.xp);
}

function animarContador(id, valorFinal) {
  const el = document.getElementById(id);
  if (!el) return;
  const desde = parseInt(el.textContent) || 0;
  const dur   = 600;
  const t0    = performance.now();
  function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    el.textContent = Math.round(desde + (valorFinal - desde) * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ==================== LOGROS ==================== */
function desbloquearLogro(id) {
  if (estado.logrosDesbloqueados.includes(id)) return;
  const logro = CONFIG.logros.find(l => l.id === id);
  if (!logro) return;
  estado.logrosDesbloqueados.push(id);
  sumarXPGlobal(logro.xp);
  mostrarToast(logro.icono, `Logro: ${logro.nombre}`);
  guardarEstado();
}

/* ==================== HELPERS DE ACTIVIDADES ==================== */
/* Retorna true si la actividad ya fue completada (evita doble conteo) */
function yaCompleto(actId) { return estado.actCompletadas.includes(actId); }

/* Marca una actividad como completada */
function marcarActividadCompleta(actId) {
  if (!yaCompleto(actId)) estado.actCompletadas.push(actId);
  guardarEstado();
}

function mostrarResultado(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('oculto');
}

function desbloquearSiguienteActividad(idCard) {
  const card = document.getElementById(idCard);
  if (card) {
    card.classList.remove('bloqueada-act');
    setTimeout(() => card.scrollIntoView({ behavior:'smooth', block:'center' }), 300);
  }
}

/* ==================== MISIÓN 1 ==================== */
function actualizarContadorM1() {
  const starEl = document.getElementById('m1-estrellas-display');
  const xpEl   = document.getElementById('m1-xp-display');
  if (starEl) starEl.textContent = estado.m1Estrellas;
  if (xpEl)   xpEl.textContent   = estado.m1Xp;
}

function agregarEstrellaMision1(xp) {
  if (estado.m1Estrellas < CONFIG.misiones[1].estrellasMax) {
    estado.m1Estrellas++;
    estado.estrellas++;
  }
  estado.m1Xp = Math.min(estado.m1Xp + xp, CONFIG.misiones[1].xpMax);
  sumarXPGlobal(xp);
  actualizarContadorM1();
  guardarEstado();
}

function elegirColor(color, mensaje) {
  if (yaCompleto('color')) return;
  marcarActividadCompleta('color');
  estado.colorElegido = color;
  document.querySelectorAll('#opciones-color .opcion-item').forEach(b => { b.classList.remove('seleccionada'); b.disabled = true; });
  event.target.classList.add('seleccionada');
  document.getElementById('texto-color').textContent = mensaje;
  mostrarResultado('resultado-color');
  agregarEstrellaMision1(20);
  desbloquearLogro('primer_color');
  desbloquearSiguienteActividad('act-1-2');
}

function completarTesoro() {
  const texto = document.getElementById('tesoro-texto').value.trim();
  if (!texto) { mostrarToast('💎','¡Escribí tu tesoro primero!'); return; }
  if (yaCompleto('tesoro_m1')) return;
  marcarActividadCompleta('tesoro_m1');
  estado.tesoro = texto;
  mostrarResultado('resultado-tesoro');
  agregarEstrellaMision1(30);
  desbloquearLogro('tesoro_m1');
  desbloquearSiguienteActividad('act-1-3');
}

function revelarTarjeta() {
  const tarjeta = document.getElementById('tarjeta-poder');
  if (!tarjeta || tarjeta.classList.contains('revelada')) return;
  tarjeta.classList.add('revelada');
  if (yaCompleto('tarjeta_m1')) return;
  marcarActividadCompleta('tarjeta_m1');
  setTimeout(() => {
    mostrarResultado('resultado-tarjeta');
    agregarEstrellaMision1(50);
    desbloquearLogro('tarjeta_volteada');
  }, 750);
}

function completarMision1() {
  if (estado.misionesCompletadas.includes('mision1')) { irAPantalla('pantalla-mapa'); return; }
  estado.misionesCompletadas.push('mision1');
  estado.medallas++;
  estado.insigniasGanadas.push({ insignia: CONFIG.misiones[1].insignia, nombre: CONFIG.misiones[1].nombreInsignia });
  desbloquearLogro('mision1_ok');
  guardarEstado();
  mostrarModalLogro('🎨','¡Misión 1 Completada!','¡El Arte de Imaginar conquistado! +1 🏅');
  actualizarPanelXP();
  setTimeout(() => irAPantalla('pantalla-mapa'), 2600);
}

/* ==================== MISIÓN 2 ==================== */
function actualizarContadorM2() {
  const starEl = document.getElementById('m2-estrellas-display');
  const xpEl   = document.getElementById('m2-xp-display');
  if (starEl) starEl.textContent = estado.m2Estrellas;
  if (xpEl)   xpEl.textContent   = estado.m2Xp;
}

function agregarEstrellaMision2(xp, count) {
  const añadir = count || 1;
  if (estado.m2Estrellas + añadir <= CONFIG.misiones[2].estrellasMax) {
    estado.m2Estrellas += añadir;
    estado.estrellas += añadir;
  }
  estado.m2Xp = Math.min(estado.m2Xp + xp, CONFIG.misiones[2].xpMax);
  sumarXPGlobal(xp);
  actualizarContadorM2();
  guardarEstado();
}

let quizRespondido = false;

function elegirPersonaje(nombre) {
  if (yaCompleto('personaje')) return;
  marcarActividadCompleta('personaje');
  estado.personajeElegido = nombre;
  document.getElementById('personaje-en-cuento').textContent = nombre;
  document.querySelectorAll('.personaje-btn').forEach(b => b.classList.remove('seleccionado'));
  if (event.target.closest('.personaje-btn')) event.target.closest('.personaje-btn').classList.add('seleccionado');
  document.getElementById('texto-personaje').textContent = `¡Excelente elección! ${nombre} va a ser el héroe de tu historia mágica.`;
  mostrarResultado('resultado-personaje');
  agregarEstrellaMision2(30);
  desbloquearLogro('personaje_elegido');
  desbloquearSiguienteActividad('act-2-2');
}

function responderQuiz(btn, esCorrecta) {
  if (quizRespondido || yaCompleto('quiz')) return;
  quizRespondido = true;
  marcarActividadCompleta('quiz');
  document.querySelectorAll('.quiz-opcion').forEach(b => b.disabled = true);
  if (esCorrecta) {
    btn.classList.add('correcta');
    document.getElementById('quiz-emoji').textContent = '🎉';
    document.getElementById('quiz-feedback').textContent = '¡CORRECTO! Un personaje que supera un desafío es el corazón de toda gran historia.';
    agregarEstrellaMision2(40);
  } else {
    btn.classList.add('incorrecta');
    document.querySelectorAll('.quiz-opcion').forEach(b => { if (b.onclick && b.onclick.toString().includes('true')) b.classList.add('correcta'); });
    document.getElementById('quiz-emoji').textContent = '💡';
    document.getElementById('quiz-feedback').textContent = '¡Casi! Lo importante es el personaje que supera un desafío. ¡Aprendiste algo nuevo!';
    document.getElementById('quiz-xp').textContent = '+1 ⭐  +20 XP';
    agregarEstrellaMision2(20);
  }
  desbloquearLogro('quiz_ok');
  mostrarResultado('resultado-quiz');
  desbloquearSiguienteActividad('act-2-3');
}

function completarHistoria() {
  const texto = document.getElementById('historia-texto').value.trim();
  if (!texto) { mostrarToast('📚','¡Escribí el final de tu historia!'); return; }
  if (yaCompleto('historia')) return;
  marcarActividadCompleta('historia');
  estado.historia = texto;
  mostrarResultado('resultado-historia');
  agregarEstrellaMision2(80, 2); // 2 estrellas en la última actividad
  desbloquearLogro('historia_ok');
}

function completarMision2() {
  if (estado.misionesCompletadas.includes('mision2')) { irAPantalla('pantalla-mapa'); return; }
  estado.misionesCompletadas.push('mision2');
  estado.medallas++;
  estado.insigniasGanadas.push({ insignia: CONFIG.misiones[2].insignia, nombre: CONFIG.misiones[2].nombreInsignia });
  desbloquearLogro('mision2_ok');
  guardarEstado();
  mostrarModalLogro('📖','¡Misión 2 Completada!','¡El Mundo de las Historias conquistado! +1 🏅');
  actualizarPanelXP();
  setTimeout(() => irAPantalla('pantalla-mapa'), 2600);
}

/* ==================== MISIÓN 3 (5 actividades, 5 estrellas) ==================== */
function actualizarContadorM3() {
  const starEl = document.getElementById('m3-estrellas-display');
  const xpEl   = document.getElementById('m3-xp-display');
  if (starEl) starEl.textContent = estado.m3Estrellas;
  if (xpEl)   xpEl.textContent   = estado.m3Xp;
  // Actualizar estrellas visuales
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`m3-e${i}`);
    if (el) {
      if (i <= estado.m3Estrellas) {
        el.textContent = '⭐';
        el.classList.add('activa');
      } else {
        el.textContent = '☆';
        el.classList.remove('activa');
      }
    }
  }
}

function agregarEstrellaMision3(xp) {
  if (estado.m3Estrellas < CONFIG.misiones[3].estrellasMax) {
    estado.m3Estrellas++;
    estado.estrellas++;
  }
  estado.m3Xp = Math.min(estado.m3Xp + xp, CONFIG.misiones[3].xpMax);
  sumarXPGlobal(xp);
  actualizarContadorM3();
  guardarEstado();
  // Verificar si se completó la misión automáticamente
  if (estado.m3Estrellas >= 5 && !estado.actCompletadas.includes('m3_auto_completada')) {
    marcarActividadCompleta('m3_auto_completada');
    // Si ya hay resultado de raspadita mostrado, activar el botón de completar
    const resRaspadita = document.getElementById('resultado-raspadita');
    if (resRaspadita && !resRaspadita.classList.contains('oculto')) { /* el botón ya está visible */ }
  }
}

/* ─── Act 3.1: Mezclador ─── */
let mezclasHechas = 0;

function mezclarIdeas() {
  const aEl      = document.getElementById('mezcla-a');
  const bEl      = document.getElementById('mezcla-b');
  const resEl    = document.getElementById('mezcla-resultado');
  const btnEl    = document.getElementById('btn-mezclar');

  const a = COSAS_A[Math.floor(Math.random() * COSAS_A.length)];
  const b = COSAS_B[Math.floor(Math.random() * COSAS_B.length)];
  const r = RESULTADOS_MEZCLA[Math.floor(Math.random() * RESULTADOS_MEZCLA.length)];

  // Animación de cambio
  [aEl, bEl, resEl].forEach(el => { if (el) { el.style.opacity='0'; el.style.transform='scale(0.85)'; } });
  setTimeout(() => {
    if (aEl) { aEl.textContent = a; aEl.style.opacity='1'; aEl.style.transition='all 0.3s'; aEl.style.transform='scale(1)'; }
    if (bEl) { bEl.textContent = b; bEl.style.opacity='1'; bEl.style.transition='all 0.3s'; bEl.style.transform='scale(1)'; }
    if (resEl) { resEl.textContent = '💥 ' + r; resEl.style.opacity='1'; resEl.style.transition='all 0.3s'; resEl.style.transform='scale(1)'; }
  }, 200);

  mezclasHechas++;

  // Solo suma estrella la primera vez (o segunda mezcla para hacerlo un poco más interactivo)
  if (mezclasHechas >= 2 && !yaCompleto('mezcla')) {
    marcarActividadCompleta('mezcla');
    document.getElementById('texto-mezcla').textContent = `¡Combinaste ${a} + ${b} y nació algo INCREÍBLE: ${r}`;
    mostrarResultado('resultado-mezcla');
    agregarEstrellaMision3(40);
    desbloquearLogro('mezcla_ok');
    if (btnEl) { btnEl.textContent = '🔀 Seguir mezclando (solo por diversión)'; }
    desbloquearSiguienteActividad('act-3-2');
  } else if (mezclasHechas === 1) {
    mostrarToast('🔀','¡Buena mezcla! Mezclá una vez más para continuar.');
  }
}

/* ─── Act 3.2: Encestá la Idea Mágica (básquet) ─── */
// ── Variables del juego ──
let bq = {           // estado del minijuego
  iniciado: false,
  dragging: false,
  ball: { x:160, y:200, r:18, vx:0, vy:0 },
  aro:  { x:160, y:60,  w:60, h:10, innerW:46 },
  anim: null,
  enVuelo: false,
  encestado: false,
  intentos: 0,
  dragStart: { x:0, y:0 },
  dragCurr:  { x:0, y:0 },
};

const IDEAS_MAGICAS = [
  '💡 Una idea que cambia el mundo',
  '🌈 Un sueño colorido',
  '🚀 Un proyecto galáctico',
  '🎨 Una obra de arte única',
  '🌟 Una historia mágica',
  '🔮 Un poder secreto',
  '⚡ Una chispa creativa',
];

function inicializarBasquet() {
  const canvas = document.getElementById('basquet-canvas');
  if (!canvas) return;
  // Si ya encestó, solo redibujar estado final
  if (bq.encestado) return;
  // Reset iniciado al entrar a la pantalla (permite reiniciar si sale y vuelve)
  if (bq.iniciado) return;
  bq.iniciado = true;

  // Escalar canvas para pantallas pequeñas
  const W = canvas.width  = 320;
  const H = canvas.height = 260;
  const ctx = canvas.getContext('2d');

  // Reiniciar pelota
  bq.ball = { x: W/2, y: H - 45, r: 18, vx: 0, vy: 0 };
  bq.aro  = { x: W/2, y: 62, w: 64, h: 8, innerW: 48 };

  const ideaActual = IDEAS_MAGICAS[Math.floor(Math.random() * IDEAS_MAGICAS.length)];

  function dibujar() {
    ctx.clearRect(0, 0, W, H);

    // Fondo degradado
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#0d0125');
    bgGrad.addColorStop(1, '#1a0533');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Estrellas de fondo
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    [[20,30],[60,80],[280,40],[300,120],[40,180],[200,20],[150,200]].forEach(([sx,sy]) => {
      ctx.beginPath(); ctx.arc(sx, sy, 1.2, 0, Math.PI*2); ctx.fill();
    });

    // Portal / aro
    // Tablero
    ctx.fillStyle = 'rgba(155,89,245,0.25)';
    ctx.strokeStyle = 'rgba(155,89,245,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(bq.aro.x - 50, bq.aro.y - 38, 100, 36, 4)
                  : ctx.rect(bq.aro.x - 50, bq.aro.y - 38, 100, 36);
    ctx.fill(); ctx.stroke();

    // Texto "PORTAL MÁGICO" dentro del tablero
    ctx.fillStyle = 'rgba(245,200,66,0.8)';
    ctx.font = 'bold 9px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ PORTAL MÁGICO', bq.aro.x, bq.aro.y - 18);

    // Soporte del aro
    ctx.strokeStyle = '#f5c842';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bq.aro.x, bq.aro.y - 2);
    ctx.lineTo(bq.aro.x, bq.aro.y + 30);
    ctx.stroke();

    // Aro externo (arco izquierdo)
    ctx.strokeStyle = '#f5c842';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#f5c842';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(bq.aro.x - bq.aro.innerW/2, bq.aro.y + 10, 5, 0, Math.PI*2);
    ctx.stroke();
    // Aro externo (arco derecho)
    ctx.beginPath();
    ctx.arc(bq.aro.x + bq.aro.innerW/2, bq.aro.y + 10, 5, 0, Math.PI*2);
    ctx.stroke();
    // Línea del aro
    ctx.beginPath();
    ctx.moveTo(bq.aro.x - bq.aro.w/2, bq.aro.y + 10);
    ctx.lineTo(bq.aro.x + bq.aro.w/2, bq.aro.y + 10);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Red del aro
    ctx.strokeStyle = 'rgba(245,200,66,0.4)';
    ctx.lineWidth = 1.5;
    for (let ri = 0; ri < 5; ri++) {
      const rx = bq.aro.x - bq.aro.innerW/2 + (ri/(4)) * bq.aro.innerW;
      ctx.beginPath();
      ctx.moveTo(rx, bq.aro.y + 10);
      ctx.lineTo(rx + (ri - 2) * 2, bq.aro.y + 34);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(bq.aro.x - bq.aro.innerW/2, bq.aro.y + 22);
    ctx.lineTo(bq.aro.x + bq.aro.innerW/2, bq.aro.y + 22);
    ctx.stroke();

    // Línea de tiro
    ctx.strokeStyle = 'rgba(196,168,255,0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(0, H - 26);
    ctx.lineTo(W, H - 26);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(196,168,255,0.4)';
    ctx.font = '9px Nunito, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('LÍNEA DE TIRO', 6, H - 14);

    // Flecha de dirección mientras arrastra
    if (bq.dragging) {
      const dx = bq.dragCurr.x - bq.dragStart.x;
      const dy = bq.dragCurr.y - bq.dragStart.y;
      const len = Math.sqrt(dx*dx + dy*dy);
      if (len > 8) {
        const nx = -dx/len, ny = -dy/len;
        ctx.strokeStyle = 'rgba(0,212,168,0.7)';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([5,3]);
        ctx.beginPath();
        ctx.moveTo(bq.ball.x, bq.ball.y);
        ctx.lineTo(bq.ball.x + nx * Math.min(len, 80), bq.ball.y + ny * Math.min(len, 80));
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(0,212,168,0.7)';
        const ax = bq.ball.x + nx * Math.min(len, 80);
        const ay = bq.ball.y + ny * Math.min(len, 80);
        const angle = Math.atan2(-dy, -dx);
        ctx.save();
        ctx.translate(ax, ay);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0,0); ctx.lineTo(-10,-5); ctx.lineTo(-10,5); ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    // Pelota mágica
    const ballGrad = ctx.createRadialGradient(bq.ball.x - 5, bq.ball.y - 5, 2, bq.ball.x, bq.ball.y, bq.ball.r);
    ballGrad.addColorStop(0, '#c4a8ff');
    ballGrad.addColorStop(0.4, '#9b59f5');
    ballGrad.addColorStop(1, '#4a1a8a');
    ctx.shadowColor = '#9b59f5';
    ctx.shadowBlur = 16;
    ctx.fillStyle = ballGrad;
    ctx.beginPath();
    ctx.arc(bq.ball.x, bq.ball.y, bq.ball.r, 0, Math.PI*2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Brillo en la pelota
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.beginPath();
    ctx.ellipse(bq.ball.x - 5, bq.ball.y - 6, 6, 4, -0.5, 0, Math.PI*2);
    ctx.fill();

    // Símbolo ✨ en la pelota
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨', bq.ball.x, bq.ball.y + 4);

    // Texto de la idea
    ctx.fillStyle = 'rgba(196,168,255,0.7)';
    ctx.font = 'italic 10px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(ideaActual, W/2, H - 6);

    // Contador de intentos
    if (bq.intentos > 0 && !bq.encestado) {
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px Nunito, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`Intentos: ${bq.intentos}`, W - 8, H - 6);
    }
  }

  function fisica() {
    if (!bq.enVuelo) return;

    bq.ball.x += bq.ball.vx;
    bq.ball.y += bq.ball.vy;
    bq.ball.vy += 0.38; // gravedad
    bq.ball.vx *= 0.995; // fricción aire

    // Rebote en paredes
    if (bq.ball.x - bq.ball.r < 0)  { bq.ball.x = bq.ball.r; bq.ball.vx *= -0.6; }
    if (bq.ball.x + bq.ball.r > W)  { bq.ball.x = W - bq.ball.r; bq.ball.vx *= -0.6; }

    // Detección de encestar
    const aroX1 = bq.aro.x - bq.aro.innerW/2;
    const aroX2 = bq.aro.x + bq.aro.innerW/2;
    const aroY  = bq.aro.y + 10;
    const entraX = bq.ball.x > aroX1 + bq.ball.r*0.5 && bq.ball.x < aroX2 - bq.ball.r*0.5;
    const pasaY  = bq.ball.y > aroY && bq.ball.y < aroY + 30;
    const bajando = bq.ball.vy > 0;

    if (entraX && pasaY && bajando && !bq.encestado) {
      bq.encestado = true;
      bq.enVuelo   = false;
      cancelAnimationFrame(bq.anim);
      // Mostrar mensaje de éxito en el canvas
      showBasquetMsg('¡ENCESTASTE! 🎯✨', true);
      return;
    }

    // Pelota fuera por abajo
    if (bq.ball.y > H + 30) {
      bq.enVuelo = false;
      cancelAnimationFrame(bq.anim);
      resetBall();
      showBasquetMsg('¡Casi! Probá otra vez 💪', false);
      return;
    }

    dibujar();
    bq.anim = requestAnimationFrame(fisica);
  }

  function showBasquetMsg(msg, esExito) {
    const msgEl = document.getElementById('basquet-mensaje');
    if (msgEl) {
      msgEl.textContent = msg;
      msgEl.className   = 'basquet-mensaje ' + (esExito ? 'exito' : 'fallo');
      msgEl.style.display = 'block';
      setTimeout(() => {
        msgEl.style.display = 'none';
        if (esExito) {
          onBasquetExito();
        } else {
          resetBall();
          dibujar();
        }
      }, esExito ? 1800 : 1200);
    }
  }

  function resetBall() {
    bq.ball = { x: W/2 + (Math.random()-0.5)*30, y: H - 45, r: 18, vx: 0, vy: 0 };
  }

  function onBasquetExito() {
    dibujar();
    if (!yaCompleto('basquet')) {
      marcarActividadCompleta('basquet');
      mostrarResultado('resultado-basquet');
      agregarEstrellaMision3(40);
      desbloquearLogro('basquet_ok');
      desbloquearSiguienteActividad('act-3-3');
    }
  }

  // Funciones de posición relativa al canvas
  function getPos(e, rect) {
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY,
    };
  }
  function getTouchPos(e, rect) {
    const touch = e.touches[0];
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    return {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top)  * scaleY,
    };
  }
  function cercaDePelota(px, py) {
    const dx = px - bq.ball.x, dy = py - bq.ball.y;
    return Math.sqrt(dx*dx + dy*dy) < bq.ball.r + 14;
  }
  function lanzar() {
    if (bq.encestado || bq.enVuelo) return;
    const dx = bq.dragCurr.x - bq.dragStart.x;
    const dy = bq.dragCurr.y - bq.dragStart.y;
    const fuerza = 0.22;
    bq.ball.vx = -dx * fuerza;
    bq.ball.vy = -dy * fuerza;
    bq.enVuelo  = true;
    bq.dragging = false;
    bq.intentos++;
    const instrEl = document.getElementById('basquet-instruccion');
    if (instrEl) instrEl.style.display = 'none';
    bq.anim = requestAnimationFrame(fisica);
  }

  // Mouse events
  canvas.addEventListener('mousedown', e => {
    if (bq.encestado || bq.enVuelo) return;
    const rect = canvas.getBoundingClientRect();
    const pos  = getPos(e, rect);
    if (cercaDePelota(pos.x, pos.y)) {
      bq.dragging  = true;
      bq.dragStart = { x: pos.x, y: pos.y };
      bq.dragCurr  = { x: pos.x, y: pos.y };
    }
  });
  canvas.addEventListener('mousemove', e => {
    if (!bq.dragging) return;
    const rect = canvas.getBoundingClientRect();
    bq.dragCurr = getPos(e, rect);
    dibujar();
  });
  canvas.addEventListener('mouseup', e => {
    if (bq.dragging) lanzar();
  });
  canvas.addEventListener('mouseleave', e => {
    if (bq.dragging) { bq.dragging = false; dibujar(); }
  });

  // Touch events
  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if (bq.encestado || bq.enVuelo) return;
    const rect = canvas.getBoundingClientRect();
    const pos  = getTouchPos(e, rect);
    if (cercaDePelota(pos.x, pos.y)) {
      bq.dragging  = true;
      bq.dragStart = { x: pos.x, y: pos.y };
      bq.dragCurr  = { x: pos.x, y: pos.y };
    }
  }, { passive: false });
  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    if (!bq.dragging) return;
    const rect = canvas.getBoundingClientRect();
    bq.dragCurr = getTouchPos(e, rect);
    dibujar();
  }, { passive: false });
  canvas.addEventListener('touchend', e => {
    e.preventDefault();
    if (bq.dragging) lanzar();
  }, { passive: false });

  dibujar();
}

/* ─── Act 3.3: Ruleta de Poderes ─── */
let ruletaGirando = false;

function girarRuleta() {
  if (ruletaGirando) return;
  ruletaGirando = true;

  const iconoEl = document.getElementById('ruleta-icono');
  const textoEl = document.getElementById('ruleta-texto');
  const btnEl   = document.getElementById('btn-ruleta');

  if (btnEl) btnEl.disabled = true;
  if (iconoEl) iconoEl.classList.add('girando');
  if (textoEl) { textoEl.textContent = 'Girando...'; textoEl.className = 'ruleta-texto'; }

  // Ciclar visualmente por los poderes
  let ciclos = 0;
  const totalCiclos = 18 + Math.floor(Math.random() * 10);
  const elegido = PODERES_CREATIVOS[Math.floor(Math.random() * PODERES_CREATIVOS.length)];

  const intervalo = setInterval(() => {
    const actual = PODERES_CREATIVOS[ciclos % PODERES_CREATIVOS.length];
    if (iconoEl) iconoEl.textContent = actual.icono;
    if (textoEl) textoEl.textContent = actual.nombre;
    ciclos++;

    if (ciclos >= totalCiclos) {
      clearInterval(intervalo);
      // Mostrar el poder elegido
      if (iconoEl) { iconoEl.textContent = elegido.icono; iconoEl.classList.remove('girando'); }
      if (textoEl) { textoEl.textContent = `${elegido.icono} ${elegido.nombre}`; textoEl.classList.add('revelado'); }

      ruletaGirando = false;
      estado.poderRuleta = elegido.nombre;

      if (!yaCompleto('ruleta')) {
        marcarActividadCompleta('ruleta');
        document.getElementById('texto-ruleta').textContent =
          `¡Tu poder es "${elegido.nombre}"! — ${elegido.desc}`;
        mostrarResultado('resultado-ruleta');
        agregarEstrellaMision3(40);
        desbloquearLogro('ruleta_ok');
        desbloquearSiguienteActividad('act-3-4');
      } else {
        mostrarToast(elegido.icono, `Poder: ${elegido.nombre}`);
      }
      if (btnEl) { btnEl.disabled = false; btnEl.textContent = '🎡 Girar de nuevo (solo por diversión)'; }
    }
  }, 120);
}

/* ─── Act 3.4: Foto Mágica ─── */
function cargarFoto(input) {
  const file = input.files[0];
  if (!file || !file.type.startsWith('image/')) {
    mostrarToast('📸','Elegí un archivo de imagen');
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.getElementById('foto-preview');
    if (img) {
      img.src = e.target.result;
      document.getElementById('foto-upload-area').classList.add('oculto');
      document.getElementById('foto-preview-area').classList.remove('oculto');
    }
  };
  reader.readAsDataURL(file);
}

function elegirPoderFoto(nombrePoder, claseMarco) {
  if (yaCompleto('foto')) return;

  const marco = document.getElementById('foto-marco');
  const titulo = document.getElementById('foto-titulo-magico');

  // Quitar clases de marcos anteriores
  if (marco) {
    marco.className = 'foto-marco ' + claseMarco;
    if (titulo) titulo.textContent = nombrePoder;
  }

  // Marcar botón activo
  document.querySelectorAll('.poder-btn').forEach(b => b.classList.remove('activo'));
  if (event.target) event.target.classList.add('activo');

  marcarActividadCompleta('foto');
  document.getElementById('texto-foto').textContent =
    `¡Tu foto tiene el ${nombrePoder}! Ahora es una foto mágica del Club de los Creadores.`;
  mostrarResultado('resultado-foto');
  agregarEstrellaMision3(45);
  desbloquearLogro('foto_ok');
  desbloquearSiguienteActividad('act-3-5');
  inicializarRaspadita(); // asegurarse que el canvas esté listo
}

/* ─── Act 3.5: Raspadita Secreta ─── */
let raspaditaInicializada = false;
let raspaditaRevelada     = false;
let misionSecreda         = '';

function inicializarRaspadita() {
  const canvas = document.getElementById('raspadita-canvas');
  const textoOculto = document.getElementById('raspadita-texto-oculto');
  if (!canvas || !textoOculto) return;

  // Elegir misión secreta aleatoria
  misionSecreda = MISIONES_SECRETAS[Math.floor(Math.random() * MISIONES_SECRETAS.length)];
  textoOculto.textContent = misionSecreda;

  const ctx = canvas.getContext('2d');
  const W   = canvas.width;
  const H   = canvas.height;

  // Fondo de la raspadita (capa gris que se "raspa")
  ctx.clearRect(0, 0, W, H);
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#4a1a8a');
  grad.addColorStop(1, '#7b2fcf');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Texto sobre la capa
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.font = 'bold 18px Nunito, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✨ RASPÁ AQUÍ ✨', W/2, H/2 - 8);
  ctx.font = '13px Nunito, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillText('Deslizá para revelar', W/2, H/2 + 16);

  if (raspaditaInicializada) return;
  raspaditaInicializada = true;

  let pintando = false;
  let pixelsRaspados = 0;
  const totalPixels = W * H;

  function raspar(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Verificar progreso aproximado cada 10 eventos
    if (++pixelsRaspados % 10 === 0) {
      const data = ctx.getImageData(0, 0, W, H).data;
      let transparentes = 0;
      for (let i = 3; i < data.length; i += 4) if (data[i] < 128) transparentes++;
      if (transparentes / (totalPixels) > 0.45 && !raspaditaRevelada) {
        raspaditaRevelada = true;
        ctx.clearRect(0, 0, W, H); // limpiar todo
        completarRaspadita();
      }
    }
  }

  // Mouse
  canvas.addEventListener('mousedown', e => { pintando = true; });
  canvas.addEventListener('mouseup',   () => { pintando = false; });
  canvas.addEventListener('mouseleave',() => { pintando = false; });
  canvas.addEventListener('mousemove', e => {
    if (!pintando) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    raspar((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
  });

  // Touch
  canvas.addEventListener('touchstart', e => { pintando = true; e.preventDefault(); }, { passive: false });
  canvas.addEventListener('touchend',   () => { pintando = false; });
  canvas.addEventListener('touchmove',  e => {
    if (!pintando) return;
    e.preventDefault();
    const rect  = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    raspar((touch.clientX - rect.left) * scaleX, (touch.clientY - rect.top) * scaleY);
  }, { passive: false });
}

function completarRaspadita() {
  // Ocultar hint
  const hint = document.getElementById('raspadita-hint');
  if (hint) hint.style.display = 'none';

  if (yaCompleto('raspadita')) return;
  marcarActividadCompleta('raspadita');

  document.getElementById('texto-raspadita').textContent =
    `¡Tu misión secreta es: "${misionSecreda}"! ¡Intentá hacerla en casa o en el colegio!`;
  mostrarResultado('resultado-raspadita');
  agregarEstrellaMision3(40);
  desbloquearLogro('raspadita_ok');
  explotarParticulasEntrada();
}

function completarMision3() {
  if (estado.misionesCompletadas.includes('mision3')) { irAPantalla('pantalla-mapa'); return; }
  estado.misionesCompletadas.push('mision3');
  estado.medallas++;
  estado.insigniasGanadas.push({ insignia: CONFIG.misiones[3].insignia, nombre: CONFIG.misiones[3].nombreInsignia });
  desbloquearLogro('mision3_ok');
  guardarEstado();
  mostrarModalLogro('🔬','¡Misión 3 Completada!','¡El Laboratorio Creativo conquistado! +1 🏅');
  actualizarPanelXP();
  // Verificar si las 3 misiones están completas y desbloquear desafío
  setTimeout(() => {
    irAPantalla('pantalla-mapa');
    // El mapa llama a actualizarMapa() que llama a desbloquearCardDesafio() si corresponde
  }, 2600);
}

/* ==================== DESAFÍO ESPECIAL ==================== */
function completarDesafio() {
  const nombre = document.getElementById('proyecto-nombre').value.trim();
  const desc   = document.getElementById('proyecto-descripcion').value.trim();
  if (!nombre || !desc) { mostrarToast('⚡','¡Completá el nombre y la descripción!'); return; }
  if (estado.misionesCompletadas.includes('desafio')) return;

  estado.misionesCompletadas.push('desafio');
  estado.medallas++;
  estado.estrellas += 10;
  estado.insigniasGanadas.push({ insignia: CONFIG.misiones.desafio.insignia, nombre: CONFIG.misiones.desafio.nombreInsignia });
  sumarXPGlobal(500);
  desbloquearLogro('desafio_ok');
  guardarEstado();
  mostrarResultado('resultado-desafio');
  explotarParticulasEntrada();
  actualizarPanelXP();
}

/* ==================== RECOMPENSAS ==================== */
function actualizarPantallaRecompensas() {
  const nombreEl = document.getElementById('nombre-recompensas');
  if (nombreEl) nombreEl.textContent = `¡Mirá todo lo que lograste, ${estado.nombre || 'Creador'}!`;

  animarContador('total-estrellas', estado.estrellas);
  animarContador('total-medallas', estado.medallas);
  animarContador('total-xp', estado.xp);

  // Logros
  const lista = document.getElementById('logros-lista');
  if (lista) {
    lista.innerHTML = '';
    if (estado.logrosDesbloqueados.length === 0) {
      lista.innerHTML = '<p style="color:var(--lavanda-suave);text-align:center;">Completá misiones para desbloquear logros 🎯</p>';
    } else {
      estado.logrosDesbloqueados.forEach((id, i) => {
        const logro = CONFIG.logros.find(l => l.id === id);
        if (!logro) return;
        const el = document.createElement('div');
        el.className = 'logro-item';
        el.style.animationDelay = `${i * 0.07}s`;
        el.innerHTML = `<span class="logro-icono">${logro.icono}</span><div><div class="logro-nombre">${logro.nombre}</div><div class="logro-desc">${logro.desc}</div></div><span class="logro-xp">+${logro.xp} XP</span>`;
        lista.appendChild(el);
      });
    }
  }

  // Insignias
  const display = document.getElementById('insignias-display');
  if (display) {
    display.innerHTML = '';
    if (estado.insigniasGanadas.length === 0) {
      display.innerHTML = '<p style="color:var(--lavanda-suave);">¡Completá misiones para ganar insignias! 🏆</p>';
    } else {
      estado.insigniasGanadas.forEach(({ insignia, nombre: nombreI }) => {
        const el = document.createElement('div');
        el.className = 'insignia-grande';
        el.innerHTML = `<div class="insignia-circulo">${insignia}</div><div class="insignia-nombre">${nombreI}</div>`;
        display.appendChild(el);
      });
    }
  }
}

/* ==================== CERTIFICADO ==================== */
function generarCertificado() {
  document.getElementById('cert-nombre').textContent = (estado.nombre || 'Gran Creador').toUpperCase();
  let titulo = CONFIG.titulosCertificado[0].titulo;
  CONFIG.titulosCertificado.forEach(t => { if (estado.xp >= t.xpMin) titulo = t.titulo; });
  document.getElementById('cert-nivel').textContent = titulo;
  document.getElementById('cert-estrellas').textContent = estado.estrellas;
  document.getElementById('cert-xp').textContent = estado.xp;
  document.getElementById('cert-medallas').textContent = estado.medallas;
  const ahora = new Date();
  document.getElementById('cert-fecha').textContent = ahora.toLocaleDateString('es-AR', { year:'numeric', month:'long', day:'numeric' });
}

function imprimirCertificado() {
  mostrarToast('🖨️', 'Abriendo vista de impresión...');
  setTimeout(() => window.print(), 400);
}

/* ==================== MODAL Y TOASTS ==================== */
function mostrarModalLogro(icono, titulo, xp) {
  document.getElementById('modal-logro-icono').textContent  = icono;
  document.getElementById('modal-logro-nombre').textContent = titulo;
  document.getElementById('modal-logro-xp').textContent     = xp;
  document.getElementById('modal-logro').classList.remove('oculto');
}

function cerrarModalLogro() {
  document.getElementById('modal-logro').classList.add('oculto');
}

function mostrarToast(icono, texto, dur = 3200) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icono">${icono}</span><span class="toast-texto">${texto}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('saliendo');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, dur);
}

/* ==================== PARTÍCULAS ==================== */
function generarParticulasEntrada() {
  const container = document.getElementById('particulas-entrada');
  if (!container) return;
  const simbolos = ['✨','⭐','🌟','💫','🔮','✦','❋','✧'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.style.cssText = `position:absolute;font-size:${0.7+Math.random()*.8}rem;left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:${0.1+Math.random()*.25};animation:flotarParticula ${4+Math.random()*6}s ease-in-out infinite;animation-delay:${-Math.random()*6}s;pointer-events:none;`;
    p.textContent = simbolos[Math.floor(Math.random()*simbolos.length)];
    container.appendChild(p);
  }
  if (!document.getElementById('kf-flotar')) {
    const s = document.createElement('style');
    s.id = 'kf-flotar';
    s.textContent = `@keyframes flotarParticula{0%,100%{transform:translateY(0)rotate(0deg)}33%{transform:translateY(-18px)rotate(10deg)}66%{transform:translateY(10px)rotate(-8deg)}}`;
    document.head.appendChild(s);
  }
}

function explotarParticulasEntrada() {
  const simbolos = ['✨','⭐','🎉','💫','🌟','🎊','🏆','🎆'];
  for (let i = 0; i < 28; i++) {
    const ang  = Math.random()*360;
    const dist = 80 + Math.random()*200;
    const dx   = Math.cos(ang*Math.PI/180)*dist;
    const dy   = Math.sin(ang*Math.PI/180)*dist;
    const p    = document.createElement('div');
    p.style.cssText = `position:fixed;font-size:${0.8+Math.random()*1}rem;left:50%;top:45%;transform:translate(-50%,-50%);animation:explotar 1.1s ease-out forwards;--dx:${dx}px;--dy:${dy}px;pointer-events:none;z-index:9999;animation-delay:${Math.random()*0.2}s;`;
    p.textContent = simbolos[Math.floor(Math.random()*simbolos.length)];
    document.body.appendChild(p);
    setTimeout(()=>p.remove(), 1500);
  }
  if (!document.getElementById('kf-explotar')) {
    const s = document.createElement('style');
    s.id = 'kf-explotar';
    s.textContent = `@keyframes explotar{0%{opacity:1;transform:translate(-50%,-50%)translate(0,0)scale(1)}100%{opacity:0;transform:translate(-50%,-50%)translate(var(--dx),var(--dy))scale(0.4)}}`;
    document.head.appendChild(s);
  }
}
