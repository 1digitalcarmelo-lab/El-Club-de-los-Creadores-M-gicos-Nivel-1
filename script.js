/* ============================================================
   EL CLUB DE LOS CREADORES MÁGICOS — script.js v4
   ============================================================
   PERFILES: sistema multi-jugador con localStorage
   BÁSQUET:  5 tiros, necesita 3 encestes para ganar
   REJUGABILIDAD: resultados aleatorios en cada partida
   BRANDING: Filmarte Audiovisuales + Digital Carmelo
   ============================================================ */
"use strict";

/* ══════════════════════════════════════════════════════════════
   CONFIGURACIÓN — editá estos valores para personalizar
═══════════════════════════════════════════════════════════════*/
const CONFIG = {
  misiones: {
    1: { xpMax:100,  estrellasMax:3, insignia:'🎨', nombreInsignia:'Artista Imaginativo' },
    2: { xpMax:150,  estrellasMax:4, insignia:'📖', nombreInsignia:'Narrador de Historias' },
    3: { xpMax:200,  estrellasMax:5, insignia:'🔬', nombreInsignia:'Científico Creativo' },
    desafio:{ xpMax:500, estrellasMax:0, insignia:'🏆', nombreInsignia:'Gran Creador Mágico' },
  },
  niveles: [
    { min:0,   max:24,  nombre:'🌱 Aprendiz Creador' },
    { min:25,  max:49,  nombre:'⭐ Creador Brillante' },
    { min:50,  max:74,  nombre:'🌟 Maestro Imaginativo' },
    { min:75,  max:99,  nombre:'🔮 Gran Creador' },
    { min:100, max:100, nombre:'👑 Leyenda Mágica' },
  ],
  titulosCertificado: [
    { xpMin:0,    titulo:'Creador en Ciernes' },
    { xpMin:250,  titulo:'Creador Talentoso' },
    { xpMin:450,  titulo:'Gran Creador Mágico' },
    { xpMin:900,  titulo:'✨ Leyenda del Club Mágico ✨' },
  ],
  logros: [
    { id:'primer_color',     icono:'🎨', nombre:'¡Primer Color!',        desc:'Elegiste tu color creativo',         xp:10 },
    { id:'tesoro_m1',        icono:'💎', nombre:'¡Tesoro Guardado!',      desc:'Guardaste tu tesoro en la caja',     xp:15 },
    { id:'tarjeta_volteada', icono:'🃏', nombre:'¡Carta Revelada!',       desc:'Descubriste tu superpoder',          xp:20 },
    { id:'mision1_ok',       icono:'🎉', nombre:'¡Misión 1 Completada!',  desc:'Superaste El Arte de Imaginar',      xp:50 },
    { id:'personaje_elegido',icono:'🎭', nombre:'¡Tenés Personaje!',      desc:'Elegiste el héroe de tu historia',   xp:15 },
    { id:'quiz_ok',          icono:'🧠', nombre:'¡Cerebro Creativo!',     desc:'Respondiste el quiz',                xp:25 },
    { id:'historia_ok',      icono:'📚', nombre:'¡Escritor Mágico!',      desc:'Escribiste tu primera historia',     xp:30 },
    { id:'mision2_ok',       icono:'🎊', nombre:'¡Misión 2 Completada!',  desc:'Superaste El Mundo de las Historias',xp:75 },
    { id:'mezcla_ok',        icono:'⚗️',  nombre:'¡Alquimista de Ideas!',  desc:'Mezclaste dos ideas mágicas',        xp:20 },
    { id:'basquet_ok',       icono:'🏀', nombre:'¡Idea Encestada!',       desc:'Encestaste 3 ideas en el portal',    xp:20 },
    { id:'ruleta_ok',        icono:'🎡', nombre:'¡Poder Descubierto!',    desc:'Usaste la Ruleta de Poderes',        xp:20 },
    { id:'foto_ok',          icono:'📸', nombre:'¡Foto Mágica!',          desc:'Activaste el poder de tu foto',      xp:25 },
    { id:'raspadita_ok',     icono:'🎴', nombre:'¡Misión Secreta!',       desc:'Raspaste y descubriste la sorpresa', xp:20 },
    { id:'mision3_ok',       icono:'🚀', nombre:'¡Misión 3 Completada!',  desc:'Superaste El Laboratorio Creativo',  xp:100 },
    { id:'desafio_ok',       icono:'🏆', nombre:'¡Gran Creador Mágico!',  desc:'Completaste el Desafío Especial',    xp:200 },
  ],
};

/* ── Contenido aleatorio para rejugabilidad ── */
const COSAS_A = ['🎸 Guitarra','🐠 Pez dorado','🌵 Cactus','☁️ Nube','🎩 Sombrero','🔭 Telescopio','🍕 Pizza','🦋 Mariposa','🎪 Circo','🌊 Ola','🏈 Pelota','🎹 Piano','🌙 Luna','🦜 Loro'];
const COSAS_B = ['🦕 Dinosaurio','🚀 Cohete','🧲 Imán','💤 Sueños','⏰ Reloj loco','🌈 Arcoíris','🤖 Robot','🌺 Flor gigante','🎲 Dado','🔮 Bola mágica','🐲 Dragón','🏔️ Montaña','🎭 Máscara','⚡ Rayo'];
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
  '¡Un telescopio que muestra el futuro antes de que pase!',
  '¡Una criatura que canta en idiomas que aún no existen!',
  '¡Un invento que convierte el aburrimiento en aventuras!',
];
const PODERES_CREATIVOS = [
  { icono:'🔭', nombre:'La Visión del Futuro',     desc:'¡Podés imaginar cosas que todavía no existen y hacerlas realidad!' },
  { icono:'📸', nombre:'El Ojo Fotográfico',        desc:'¡Tu mente guarda imágenes increíbles de todo lo que ves!' },
  { icono:'💥', nombre:'La Imaginación Explosiva',  desc:'¡Tus ideas son tan grandes que explotan en mil colores!' },
  { icono:'🎙️', nombre:'La Voz Inventora',          desc:'¡Todo lo que decís en voz alta se convierte en una creación única!' },
  { icono:'🌍', nombre:'El Creador de Mundos',      desc:'¡Podés inventar planetas y civilizaciones enteras con tu mente!' },
  { icono:'🎨', nombre:'La Maga de los Colores',    desc:'¡Ves colores que los demás no pueden ver y los usás para crear maravillas!' },
  { icono:'🗝️', nombre:'El Guardián de las Ideas',  desc:'¡Guardás las mejores ideas del mundo y sabés exactamente cuándo usarlas!' },
  { icono:'⚡', nombre:'El Rayo Creativo',          desc:'¡Tus ideas llegan como rayos: rápidas, brillantes e imparables!' },
  { icono:'🌊', nombre:'La Ola de Inspiración',     desc:'¡Tu creatividad fluye como el mar: infinita y poderosa!' },
];
const MISIONES_SECRETAS = [
  '🏠 Crear un invento usando 3 objetos de tu casa',
  '☁️ Dibujar una criatura que viva en una nube',
  '🎵 Inventar una canción de 4 líneas para el Club Mágico',
  '🏅 Diseñar una medalla para tu superpoder',
  '🌍 Inventar un país mágico y ponerle nombre',
  '📖 Escribir el título de tu propio libro de aventuras',
  '🤖 Diseñar un robot que resuelva un problema del mundo',
  '🎪 Inventar un espectáculo de circo mágico',
  '🌈 Crear una criatura usando 5 colores del arcoíris',
  '🚀 Diseñar una nave espacial para explorar galaxias creativas',
];
const IDEAS_MAGICAS_BASQUET = [
  '💡 Una idea brillante','🌈 Un sueño colorido','🚀 Un proyecto galáctico',
  '🎨 Una obra de arte','🌟 Una historia mágica','🔮 Un poder secreto',
  '⚡ Una chispa creativa','🎭 Un personaje especial','🌍 Un mundo nuevo',
];

/* ══════════════════════════════════════════════════════════════
   CLAVE STORAGE
═══════════════════════════════════════════════════════════════*/
const LS_PERFILES = 'clubcreadores_perfiles_v4'; // { [nombre]: perfilObj }
const LS_ACTIVO   = 'clubcreadores_activo_v4';   // nombre del jugador activo

/* ══════════════════════════════════════════════════════════════
   ESTRUCTURA DE PERFIL Y PARTIDA
═══════════════════════════════════════════════════════════════*/
function crearPerfilNuevo(nombre) {
  return {
    nombre,
    fechaCreacion: new Date().toISOString(),
    fechaUltimaPartida: null,
    mejorXp: 0,
    totalPartidas: 0,
    historial: [],          // array de { fecha, xp, estrellas, titulo, partida }
    diplomaGuardado: null,  // objeto con datos del último diploma
    partida: crearPartidaNueva(),
  };
}

function crearPartidaNueva() {
  return {
    numero: 0,             // se asigna al crear
    xp: 0,
    estrellas: 0,
    medallas: 0,
    misionesCompletadas: [],
    logrosDesbloqueados: [],
    insigniasGanadas: [],
    actCompletadas: [],
    m1Estrellas:0, m1Xp:0,
    m2Estrellas:0, m2Xp:0,
    m3Estrellas:0, m3Xp:0,
    colorElegido: null,
    personajeElegido: null,
    poderRuleta: null,
    misionSecreta: null,
    historia: '',
    completada: false,
    fechaInicio: new Date().toISOString(),
    fechaFin: null,
  };
}

/* ══════════════════════════════════════════════════════════════
   ESTADO GLOBAL EN MEMORIA
═══════════════════════════════════════════════════════════════*/
let perfiles = {};       // todos los perfiles cargados
let jugadorActivo = '';  // nombre del jugador activo
let p = null;           // referencia al perfil activo
let e = null;           // referencia a la partida activa (shorthand)

/* ══════════════════════════════════════════════════════════════
   PERSISTENCIA
═══════════════════════════════════════════════════════════════*/
function guardar() {
  try {
    localStorage.setItem(LS_PERFILES, JSON.stringify(perfiles));
    localStorage.setItem(LS_ACTIVO, jugadorActivo);
  } catch(err) {}
}

function cargarDesdeStorage() {
  try {
    const raw = localStorage.getItem(LS_PERFILES);
    if (raw) perfiles = JSON.parse(raw);
    jugadorActivo = localStorage.getItem(LS_ACTIVO) || '';
    if (jugadorActivo && perfiles[jugadorActivo]) {
      p = perfiles[jugadorActivo];
      e = p.partida;
    }
  } catch(err) { perfiles = {}; }
}

/* ══════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════*/
document.addEventListener('DOMContentLoaded', () => {
  // Ocultar TODAS las pantallas protegidas al inicio
  // Así no es posible llegar a ellas haciendo scroll en celular
  document.querySelectorAll('.screen.jugable').forEach(s => {
    s.style.display = 'none';
    s.classList.remove('active');
  });

  cargarDesdeStorage();
  generarParticulasEntrada();

  // Enter en campos de texto
  ['nombre-nuevo'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keydown', ev => { if (ev.key === 'Enter') entrarConNombre(); });
  });

  document.addEventListener('click', ev => {
    if (ev.target.classList.contains('modal-overlay')) {
      ev.target.classList.add('oculto');
    }
  });
});

/* ══════════════════════════════════════════════════════════════
   SISTEMA DE PANTALLAS
═══════════════════════════════════════════════════════════════*/
const FLEX_SCREENS = ['pantalla-padres','pantalla-selector','pantalla-bienvenida','pantalla-menu'];

/* ─── Pantallas que requieren jugador activo ─── */
const PANTALLAS_JUGABLE = [
  'pantalla-menu','pantalla-historial','pantalla-bienvenida',
  'pantalla-mapa','pantalla-mision1','pantalla-mision2',
  'pantalla-mision3','pantalla-desafio','pantalla-recompensas',
  'pantalla-certificado'
];

/* Validación central: si no hay jugador, bloquear y redirigir */
function requirePlayer() {
  if (p && jugadorActivo) return true;
  mostrarToast('🔒','Primero escribí tu nombre o apodo mágico para abrir la puerta.');
  setTimeout(() => irAPantalla('pantalla-selector'), 600);
  return false;
}

function irAPantalla(id) {
  // Bloquear acceso a pantallas protegidas sin jugador
  if (PANTALLAS_JUGABLE.includes(id) && !requirePlayer()) return;

  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  const sc = document.getElementById(id);
  if (!sc) return;
  sc.style.display = FLEX_SCREENS.includes(id) ? 'flex' : 'block';
  void sc.offsetWidth;
  sc.classList.add('active');
  window.scrollTo({ top:0, behavior:'smooth' });

  // hooks
  if (id === 'pantalla-selector')   renderizarSelector();
  if (id === 'pantalla-menu')       renderizarMenu();
  if (id === 'pantalla-historial')  renderizarHistorial();
  if (id === 'pantalla-mapa')       { sincUI(); actualizarMapa(); }
  if (id === 'pantalla-bienvenida') sincUI();
  if (id === 'pantalla-mision1')    { sincUI(); sincM1(); }
  if (id === 'pantalla-mision2')    { sincUI(); sincM2(); }
  if (id === 'pantalla-mision3')    { sincUI(); sincM3(); setTimeout(inicializarBasquet, 80); inicializarRaspadita(); }
  if (id === 'pantalla-recompensas') renderizarRecompensas();
  if (id === 'pantalla-certificado') renderizarCertificado();
}

/* ══════════════════════════════════════════════════════════════
   PANTALLA SELECTOR
═══════════════════════════════════════════════════════════════*/
/* Alias seguro — la validación ya está en irAPantalla */
function irAPantallaSeg(id) { irAPantalla(id); }

function renderizarSelector() {
  const nombres = Object.keys(perfiles);
  const seccion = document.getElementById('jugadores-existentes');
  const lista   = document.getElementById('jugadores-lista');
  const inp     = document.getElementById('nombre-nuevo');
  if (inp) inp.value = '';

  if (nombres.length === 0) {
    seccion.classList.add('oculto');
    return;
  }
  seccion.classList.remove('oculto');
  lista.innerHTML = '';
  nombres.forEach(nombre => {
    const perf = perfiles[nombre];
    const part = perf.partida;
    const completado = perf.historial.length > 0 || part.misionesCompletadas.includes('desafio');
    const card = document.createElement('div');
    card.className = 'jugador-card';
    card.innerHTML = `
      <div class="jugador-avatar">🧙‍♂️</div>
      <div class="jugador-info">
        <div class="jugador-nombre">${nombre}</div>
        <div class="jugador-stats">⭐${part.estrellas} · ✨${part.xp} XP · ${completado ? '🏆 Completado' : '🗺️ En juego'}</div>
        <div class="jugador-fecha">${perf.fechaUltimaPartida ? 'Última vez: ' + formatFecha(perf.fechaUltimaPartida) : 'Nuevo jugador'}</div>
      </div>
      <button class="btn-jugador-entrar" onclick="cargarJugador('${nombre}')">Entrar →</button>
    `;
    lista.appendChild(card);
  });
}

function entrarConNombre() {
  const inp    = document.getElementById('nombre-nuevo');
  const nombre = inp ? inp.value.trim() : '';
  if (!nombre) {
    inp && (inp.style.borderColor = 'var(--error)');
    setTimeout(() => { if (inp) inp.style.borderColor = ''; }, 2000);
    mostrarToast('👋','¡Escribí tu nombre primero!');
    return;
  }
  cargarJugador(nombre);
}

function cargarJugador(nombre) {
  if (!perfiles[nombre]) {
    // nuevo perfil
    perfiles[nombre] = crearPerfilNuevo(nombre);
    perfiles[nombre].partida.numero = 1;
  }
  jugadorActivo     = nombre;
  p                 = perfiles[nombre];
  e                 = p.partida;
  p.fechaUltimaPartida = new Date().toISOString();
  guardar();
  irAPantalla('pantalla-menu');
}

function cambiarJugador() {
  jugadorActivo = '';
  p = null; e = null;
  localStorage.removeItem(LS_ACTIVO);
  irAPantalla('pantalla-selector');
}

/* ══════════════════════════════════════════════════════════════
   PANTALLA MENÚ
═══════════════════════════════════════════════════════════════*/
function renderizarMenu() {
  if (!p) { irAPantalla('pantalla-selector'); return; }
  const saludoEl = document.getElementById('menu-saludo');
  if (saludoEl) saludoEl.textContent = `¡Hola, ${p.nombre}! ✨`;

  document.getElementById('menu-estrellas').textContent = e.estrellas;
  document.getElementById('menu-xp').textContent        = e.xp;
  document.getElementById('menu-medallas').textContent  = e.medallas;

  const diplomaBtn  = document.getElementById('btn-ver-diploma');
  const avisoElem   = document.getElementById('menu-aviso-diploma');
  const nuevaBtn    = document.getElementById('btn-nueva-partida');
  const continuarBtn= document.getElementById('btn-continuar');

  const tieneCompleto = p.historial.length > 0 || e.misionesCompletadas.includes('desafio');

  if (diplomaBtn) {
    diplomaBtn.disabled = !tieneCompleto;
    diplomaBtn.style.opacity = tieneCompleto ? '1' : '0.5';
  }
  if (avisoElem)  avisoElem.classList.toggle('oculto', tieneCompleto);
  if (nuevaBtn)   nuevaBtn.style.display = tieneCompleto ? 'block' : 'none';
  if (continuarBtn) {
    continuarBtn.textContent = e.misionesCompletadas.length === 0 ? '🗺️ Comenzar la aventura' : '🗺️ Continuar aventura';
  }
}

function continuarAventura() {
  if (!p) return;
  const saludoEl = document.getElementById('saludo-texto');
  if (saludoEl) saludoEl.textContent = `¡Bienvenido/a al Club, ${p.nombre}! 🎉`;
  irAPantalla('pantalla-bienvenida');
}

function verDiploma() {
  if (!p) return;
  const tieneCompleto = p.historial.length > 0 || e.misionesCompletadas.includes('desafio');
  if (!tieneCompleto) { mostrarToast('📜','Completá la aventura para ver tu diploma'); return; }
  irAPantalla('pantalla-certificado');
}

function confirmarNuevaPartida() {
  const modal = document.getElementById('modal-nueva-partida');
  if (modal) modal.classList.remove('oculto');
}

function iniciarNuevaPartida() {
  cerrarModal('modal-nueva-partida');
  if (!p) return;

  // Resetear minijuegos
  bqState = crearEstadoBq();
  raspaditaInicializada = false;
  raspaditaRevelada     = false;
  misionSecreta         = '';
  quizRespondido        = false;
  mezclasHechas         = 0;
  ruletaGirando         = false;

  // Limpiar UI de actividades
  limpiarUIActividades();

  // Crear nueva partida
  const nuevaNum = (p.partida.numero || p.historial.length) + 1;
  p.partida = crearPartidaNueva();
  p.partida.numero = nuevaNum;
  e = p.partida;
  p.fechaUltimaPartida = new Date().toISOString();
  guardar();

  const saludoEl = document.getElementById('saludo-texto');
  if (saludoEl) saludoEl.textContent = `¡Nueva aventura, ${p.nombre}! 🎉`;
  mostrarToast('🔄','¡Nueva aventura comenzada! Suerte 🍀');
  irAPantalla('pantalla-bienvenida');
}

function limpiarUIActividades() {
  // Misión 1
  ['resultado-color','resultado-tesoro','resultado-tarjeta'].forEach(mostrarOculto.bind(null,true));
  document.querySelectorAll('#opciones-color .opcion-item').forEach(b => { b.disabled=false; b.classList.remove('seleccionada'); });
  ['act-1-2','act-1-3'].forEach(id => bloquearAct(id, true));
  const tarjeta = document.getElementById('tarjeta-poder');
  if (tarjeta) tarjeta.classList.remove('revelada');

  // Misión 2
  ['resultado-personaje','resultado-quiz','resultado-historia'].forEach(mostrarOculto.bind(null,true));
  document.querySelectorAll('.quiz-opcion').forEach(b => { b.disabled=false; b.classList.remove('correcta','incorrecta'); });
  document.querySelectorAll('.personaje-btn').forEach(b => b.classList.remove('seleccionado'));
  ['act-2-2','act-2-3'].forEach(id => bloquearAct(id, true));

  // Misión 3
  ['resultado-mezcla','resultado-basquet','resultado-ruleta','resultado-foto','resultado-raspadita'].forEach(mostrarOculto.bind(null,true));
  ['act-3-2','act-3-3','act-3-4','act-3-5'].forEach(id => bloquearAct(id, true));
  const fotoUp  = document.getElementById('foto-upload-area');
  const fotoPrev= document.getElementById('foto-preview-area');
  if (fotoUp)  fotoUp.classList.remove('oculto');
  if (fotoPrev) fotoPrev.classList.add('oculto');
  const reintBtn = document.getElementById('btn-reintentar-basquet');
  if (reintBtn) reintBtn.classList.add('oculto');
  const bqEnc = document.getElementById('bq-encestes');
  const bqTir = document.getElementById('bq-tiros');
  if (bqEnc) bqEnc.textContent = '0';
  if (bqTir) bqTir.textContent = '0';
  document.getElementById('btn-mezclar') && (document.getElementById('btn-mezclar').textContent = '🔀 ¡Mezclar!');
  document.getElementById('btn-ruleta')  && (document.getElementById('btn-ruleta').disabled = false);

  // Desafío
  mostrarOculto(true, 'resultado-desafio');
  const pn = document.getElementById('proyecto-nombre');
  const pd = document.getElementById('proyecto-descripcion');
  if (pn) pn.value = '';
  if (pd) pd.value = '';

  // Mapa — resetear tarjetas de misión
  ['mision1','mision2','mision3','desafio'].forEach(c => {
    const num = c === 'desafio' ? 'desafio' : c.replace('mision','');
    const card = document.getElementById(`card-mision${num}`);
    const btn  = document.getElementById(`btn-mision${num}`);
    const est  = document.getElementById(`estado-mision${num}`);
    if (!card) return;
    card.classList.remove('completada');
    if (num !== '1') card.classList.add('bloqueada');
    if (btn)  { btn.disabled = num !== '1' && num !== 1; }
    if (est) {
      if (num === '1' || num === 1) {
        est.textContent = '🔓 Disponible';
        est.style.cssText = '';
      } else {
        est.textContent = '🔒 Bloqueada';
        est.style.cssText = '';
      }
    }
  });
  const insSlots = document.querySelectorAll('#insignias-grid .insignia-slot');
  insSlots.forEach(s => { s.textContent='?'; s.classList.add('vacia'); s.classList.remove('ganada'); });
}

function mostrarOculto(ocultar, id) {
  const el = document.getElementById(id);
  if (el) { ocultar ? el.classList.add('oculto') : el.classList.remove('oculto'); }
}
function bloquearAct(id, bloquear) {
  const el = document.getElementById(id);
  if (el) { bloquear ? el.classList.add('bloqueada-act') : el.classList.remove('bloqueada-act'); }
}

/* ══════════════════════════════════════════════════════════════
   HISTORIAL
═══════════════════════════════════════════════════════════════*/
function renderizarHistorial() {
  if (!p) return;
  const lista  = document.getElementById('historial-lista');
  const panel  = document.getElementById('mejor-puntaje-panel');
  const mejorEl= document.getElementById('mejor-xp-valor');
  const subEl  = document.getElementById('historial-subtitulo');

  if (subEl) subEl.textContent = `Las aventuras de ${p.nombre}`;

  if (p.historial.length === 0) {
    lista.innerHTML = '<p class="historial-vacio">Todavía no completaste ninguna aventura. ¡Animate!</p>';
    panel && panel.classList.add('oculto');
    return;
  }

  panel && panel.classList.remove('oculto');
  if (mejorEl) mejorEl.textContent = `${p.mejorXp} XP`;

  lista.innerHTML = '';
  [...p.historial].reverse().forEach((h, i) => {
    const num = p.historial.length - i;
    const el = document.createElement('div');
    el.className = 'historial-item';
    el.innerHTML = `
      <div class="historial-num">Aventura ${num}</div>
      <div class="historial-fecha">${formatFecha(h.fecha)}</div>
      <div class="historial-stats">
        <span>⭐ ${h.estrellas}</span>
        <span>✨ ${h.xp} XP</span>
      </div>
      <div class="historial-titulo">${h.titulo}</div>
    `;
    lista.appendChild(el);
  });
}

function guardarEnHistorial() {
  if (!p || !e) return;
  let titulo = CONFIG.titulosCertificado[0].titulo;
  CONFIG.titulosCertificado.forEach(t => { if (e.xp >= t.xpMin) titulo = t.titulo; });

  const entrada = {
    fecha:    new Date().toISOString(),
    partida:  e.numero,
    xp:       e.xp,
    estrellas:e.estrellas,
    medallas: e.medallas,
    titulo,
  };
  p.historial.push(entrada);
  if (e.xp > p.mejorXp) p.mejorXp = e.xp;
  p.totalPartidas = p.historial.length;

  // Guardar diploma
  p.diplomaGuardado = {
    nombre:   p.nombre,
    xp:       e.xp,
    estrellas:e.estrellas,
    medallas: e.medallas,
    titulo,
    fecha:    entrada.fecha,
    partida:  e.numero,
  };
  e.completada = true;
  e.fechaFin   = entrada.fecha;
  guardar();
}

/* ══════════════════════════════════════════════════════════════
   BORRAR JUGADOR
═══════════════════════════════════════════════════════════════*/
function mostrarModalBorrar() {
  if (!p) return;
  const txtEl = document.getElementById('modal-borrar-texto');
  if (txtEl) txtEl.textContent = `¿Seguro que querés borrar a "${p.nombre}"? Se perderán todos sus diplomas y logros guardados en este dispositivo. Esta acción no se puede deshacer.`;
  const modal = document.getElementById('modal-borrar');
  if (modal) modal.classList.remove('oculto');
}

function confirmarBorrarJugador() {
  if (!p) return;
  const nombre = p.nombre;
  delete perfiles[nombre];
  jugadorActivo = '';
  p = null; e = null;
  guardar();
  cerrarModal('modal-borrar');
  mostrarToast('🗑️',`"${nombre}" eliminado`);
  irAPantalla('pantalla-selector');
}

/* ══════════════════════════════════════════════════════════════
   SINCRONIZACIÓN DE UI DESDE ESTADO
═══════════════════════════════════════════════════════════════*/
function sincUI() {
  if (!e) return;
  animarContador('xp-estrellas', e.estrellas);
  animarContador('xp-medallas',  e.medallas);
  animarContador('xp-puntos',    e.xp);
}

function sincM1() {
  if (!e) return;
  actualizarContM(1);
  if (e.actCompletadas.includes('color')) {
    mostrarOculto(false,'resultado-color');
    const txtColor = document.getElementById('texto-color');
    if (txtColor && e.colorElegido) txtColor.textContent = e.colorElegido;
    document.querySelectorAll('#opciones-color .opcion-item').forEach(b => b.disabled=true);
  }
  if (e.actCompletadas.includes('tesoro_m1')) {
    bloquearAct('act-1-2',false);
    mostrarOculto(false,'resultado-tesoro');
  }
  if (e.actCompletadas.includes('tarjeta_m1')) {
    bloquearAct('act-1-2',false); bloquearAct('act-1-3',false);
    const tarj = document.getElementById('tarjeta-poder');
    if (tarj) tarj.classList.add('revelada');
    // Restaurar poder aleatorio guardado
    if (e.poderTarjeta) {
      const el = document.getElementById('tarjeta-dorso-poder');
      const de = document.getElementById('tarjeta-dorso-desc');
      if (el) el.textContent = e.poderTarjeta.poder;
      if (de) de.textContent = e.poderTarjeta.desc;
    }
    mostrarOculto(false,'resultado-tarjeta');
  }
  if (e.actCompletadas.includes('color') && e.actCompletadas.includes('tesoro_m1')) {
    bloquearAct('act-1-3',false);
  }
}

function sincM2() {
  if (!e) return;
  actualizarContM(2);
  if (e.actCompletadas.includes('personaje')) {
    mostrarOculto(false,'resultado-personaje');
    const txt = document.getElementById('texto-personaje');
    if (txt && e.personajeElegido) txt.textContent = `¡Excelente elección! ${e.personajeElegido} va a ser el héroe de tu historia.`;
    const cuentoPj = document.getElementById('personaje-en-cuento');
    if (cuentoPj && e.personajeElegido) cuentoPj.textContent = e.personajeElegido;
  }
  if (e.actCompletadas.includes('quiz')) {
    bloquearAct('act-2-2',false);
    mostrarOculto(false,'resultado-quiz');
    document.querySelectorAll('.quiz-opcion').forEach(b => b.disabled=true);
  }
  if (e.actCompletadas.includes('historia')) {
    bloquearAct('act-2-2',false); bloquearAct('act-2-3',false);
    mostrarOculto(false,'resultado-historia');
  }
}

function sincM3() {
  if (!e) return;
  actualizarContM3();
  const acts3 = ['mezcla','basquet','ruleta','foto','raspadita'];
  let ultima = -1;
  acts3.forEach((a,i) => { if (e.actCompletadas.includes(a)) ultima = i; });
  for (let i=0; i<=ultima+1 && i<5; i++) bloquearAct(`act-3-${i+1}`,false);
  if (e.actCompletadas.includes('mezcla'))    { mostrarOculto(false,'resultado-mezcla'); document.getElementById('btn-mezclar') && (document.getElementById('btn-mezclar').textContent='🔀 Seguir mezclando (solo por diversión)'); }
  if (e.actCompletadas.includes('basquet'))   mostrarOculto(false,'resultado-basquet');
  if (e.actCompletadas.includes('ruleta'))    mostrarOculto(false,'resultado-ruleta');
  if (e.actCompletadas.includes('foto'))      mostrarOculto(false,'resultado-foto');
  if (e.actCompletadas.includes('raspadita')) mostrarOculto(false,'resultado-raspadita');
}

/* ══════════════════════════════════════════════════════════════
   MAPA
═══════════════════════════════════════════════════════════════*/
function actualizarMapa() {
  if (!e) return;
  const totalXP  = 1050;
  const pct      = Math.min(100, Math.round((e.xp / totalXP) * 100));
  const barraEl  = document.getElementById('barra-progreso');
  const pctEl    = document.getElementById('progreso-porcentaje');
  const nivelEl  = document.getElementById('nivel-actual');
  if (barraEl) barraEl.style.width = pct+'%';
  if (pctEl)   pctEl.textContent   = pct+'%';
  if (nivelEl) {
    const nv = CONFIG.niveles.find(n => pct >= n.min && pct <= n.max);
    if (nv) nivelEl.textContent = nv.nombre;
  }

  // Sincronizar cards
  ['mision1','mision2','mision3','desafio'].forEach(c => {
    const num  = c === 'desafio' ? 'desafio' : c.replace('mision','');
    const clave= c;
    const card = document.getElementById(`card-mision${num}`);
    const est  = document.getElementById(`estado-mision${num}`);
    if (!card) return;
    if (e.misionesCompletadas.includes(clave)) {
      card.classList.remove('bloqueada'); card.classList.add('completada');
      if (est) { est.textContent='✅ Completada'; est.style.cssText='background:rgba(0,230,118,.15);color:var(--success);border-color:rgba(0,230,118,.3)'; }
    }
  });

  // Desbloquear según dependencias
  if (e.misionesCompletadas.includes('mision1'))  desbloquearCardMision(2);
  if (e.misionesCompletadas.includes('mision2'))  desbloquearCardMision(3);
  if (e.misionesCompletadas.includes('mision1') && e.misionesCompletadas.includes('mision2') && e.misionesCompletadas.includes('mision3')) desbloquearCardDesafio();

  // Insignias
  const slots  = document.querySelectorAll('#insignias-grid .insignia-slot');
  const iclaves= ['mision1','mision2','mision3','desafio'];
  const iEmojis= {mision1:'🎨',mision2:'📖',mision3:'🔬',desafio:'🏆'};
  iclaves.forEach((c,i) => {
    if (!slots[i]) return;
    if (e.misionesCompletadas.includes(c)) {
      slots[i].textContent=iEmojis[c]; slots[i].classList.remove('vacia'); slots[i].classList.add('ganada');
    }
  });
}

function desbloquearCardMision(num) {
  if (e.misionesCompletadas.includes(`mision${num}`)) return;
  const card = document.getElementById(`card-mision${num}`);
  const btn  = document.getElementById(`btn-mision${num}`);
  const est  = document.getElementById(`estado-mision${num}`);
  if (!card || !btn) return;
  card.classList.remove('bloqueada');
  btn.disabled = false;
  btn.textContent = '¡Comenzar!';
  btn.onclick = () => irAPantalla(`pantalla-mision${num}`);
  if (est) { est.textContent='🔓 Disponible'; est.style.cssText='background:rgba(0,212,168,.15);color:var(--aurora-teal);border-color:rgba(0,212,168,.3)'; }
}

function desbloquearCardDesafio() {
  if (e.misionesCompletadas.includes('desafio')) return;
  const card = document.getElementById('card-desafio');
  const btn  = document.getElementById('btn-desafio');
  const est  = document.getElementById('estado-desafio');
  if (!card || !btn) return;
  card.classList.remove('bloqueada');
  btn.disabled = false;
  btn.textContent = '⚡ ¡Entrar al Desafío Final!';
  btn.onclick = () => irAPantalla('pantalla-desafio');
  if (est) { est.textContent='🔓 ¡Disponible!'; est.style.cssText='background:rgba(245,200,66,.15);color:var(--magic-gold);border-color:rgba(245,200,66,.3)'; }
  mostrarToast('⚡','¡El Desafío Final está desbloqueado!');
}

function intentarMisionBloqueada(num) {
  const msgs = { 2:'¡Primero completá la Misión 1 — El Arte de Imaginar! 🎨', 3:'¡Terminá la Misión 2 — El Mundo de las Historias! 📖', desafio:'¡El Desafío se desbloquea al completar las 3 Misiones! 💪' };
  const el = document.getElementById('texto-bloqueo');
  if (el) el.textContent = msgs[num] || 'Completá las misiones anteriores primero.';
  document.getElementById('overlay-bloqueo').classList.remove('oculto');
}

/* ══════════════════════════════════════════════════════════════
   XP Y ESTRELLAS
═══════════════════════════════════════════════════════════════*/
function sumarXP(cant) {
  e.xp += cant;
  guardar(); sincUI();
  if (cant > 0) mostrarToast('✨', `+${cant} XP`);
}

function actualizarContM(num) {
  const sEl = document.getElementById(`m${num}-estrellas-display`);
  const xEl = document.getElementById(`m${num}-xp-display`);
  if (sEl) sEl.textContent = e[`m${num}Estrellas`];
  if (xEl) xEl.textContent = e[`m${num}Xp`];
}

function actualizarContM3() {
  const sEl = document.getElementById('m3-estrellas-display');
  const xEl = document.getElementById('m3-xp-display');
  if (sEl) sEl.textContent = e.m3Estrellas;
  if (xEl) xEl.textContent = e.m3Xp;
  for (let i=1;i<=5;i++) {
    const star = document.getElementById(`m3-e${i}`);
    if (star) {
      star.textContent = i <= e.m3Estrellas ? '⭐' : '☆';
      i <= e.m3Estrellas ? star.classList.add('activa') : star.classList.remove('activa');
    }
  }
}

function addEstrellaM1(xp) {
  if (e.m1Estrellas < CONFIG.misiones[1].estrellasMax) { e.m1Estrellas++; e.estrellas++; }
  e.m1Xp = Math.min(e.m1Xp + xp, CONFIG.misiones[1].xpMax);
  sumarXP(xp); actualizarContM(1); guardar();
}
function addEstrellaM2(xp, count) {
  const n = count||1;
  if (e.m2Estrellas+n <= CONFIG.misiones[2].estrellasMax) { e.m2Estrellas+=n; e.estrellas+=n; }
  e.m2Xp = Math.min(e.m2Xp + xp, CONFIG.misiones[2].xpMax);
  sumarXP(xp); actualizarContM(2); guardar();
}
function addEstrellaM3(xp) {
  if (e.m3Estrellas < CONFIG.misiones[3].estrellasMax) { e.m3Estrellas++; e.estrellas++; }
  e.m3Xp = Math.min(e.m3Xp + xp, CONFIG.misiones[3].xpMax);
  sumarXP(xp); actualizarContM3(); guardar();
}

/* ══════════════════════════════════════════════════════════════
   LOGROS
═══════════════════════════════════════════════════════════════*/
function desbloquearLogro(id) {
  if (!e || e.logrosDesbloqueados.includes(id)) return;
  const logro = CONFIG.logros.find(l => l.id === id);
  if (!logro) return;
  e.logrosDesbloqueados.push(id);
  sumarXP(logro.xp);
  mostrarToast(logro.icono, `Logro: ${logro.nombre}`);
  guardar();
}

/* ══════════════════════════════════════════════════════════════
   HELPERS DE ACTIVIDADES
═══════════════════════════════════════════════════════════════*/
function yaCompleto(actId) { return e && e.actCompletadas.includes(actId); }
function marcarAct(actId) { if (!yaCompleto(actId)) e.actCompletadas.push(actId); guardar(); }
function mostrarRes(id) { const el=document.getElementById(id); if(el) el.classList.remove('oculto'); }
function desbloquearSig(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('bloqueada-act'); setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'center'}),300); }
}

/* ══════════════════════════════════════════════════════════════
   MISIÓN 1
═══════════════════════════════════════════════════════════════*/
const PODERES_TARJETA = [
  { poder:'🔮 La Visión del Futuro',     desc:'Podés imaginar cosas que todavía no existen y hacerlas realidad.' },
  { poder:'⚡ El Rayo Creativo',          desc:'Tus ideas llegan como rayos: rápidas, brillantes e imparables.' },
  { poder:'🌊 La Ola de Inspiración',     desc:'Tu creatividad fluye como el mar: infinita y poderosa.' },
  { poder:'🌙 El Sueño Despierto',        desc:'Ves mundos maravillosos incluso con los ojos abiertos.' },
  { poder:'🔥 La Llama Creadora',         desc:'Tenés una chispa interior que enciende ideas increíbles.' },
  { poder:'🌈 El Arco Mágico',            desc:'Conectás colores, ideas y emociones de formas únicas.' },
  { poder:'🌟 La Estrella Interior',      desc:'Brillás con luz propia y tu creatividad ilumina a todos.' },
];

function elegirColor(color, mensaje) {
  if (yaCompleto('color')) return;
  marcarAct('color');
  e.colorElegido = mensaje;
  document.querySelectorAll('#opciones-color .opcion-item').forEach(b => { b.classList.remove('seleccionada'); b.disabled=true; });
  event.target.classList.add('seleccionada');
  const txtEl = document.getElementById('texto-color');
  if (txtEl) txtEl.textContent = mensaje;
  mostrarRes('resultado-color');
  addEstrellaM1(20); desbloquearLogro('primer_color'); desbloquearSig('act-1-2');
}

function completarTesoro() {
  const txt = document.getElementById('tesoro-texto');
  if (!txt || !txt.value.trim()) { mostrarToast('💎','¡Escribí tu tesoro primero!'); return; }
  if (yaCompleto('tesoro_m1')) return;
  marcarAct('tesoro_m1');
  mostrarRes('resultado-tesoro');
  addEstrellaM1(30); desbloquearLogro('tesoro_m1'); desbloquearSig('act-1-3');
}

function revelarTarjeta() {
  const tarj = document.getElementById('tarjeta-poder');
  if (!tarj || tarj.classList.contains('revelada')) return;
  // Elegir poder aleatorio para esta partida
  const poder = PODERES_TARJETA[Math.floor(Math.random() * PODERES_TARJETA.length)];
  e.poderTarjeta = poder;
  const elPoder = document.getElementById('tarjeta-dorso-poder');
  const elDesc  = document.getElementById('tarjeta-dorso-desc');
  if (elPoder) elPoder.textContent = poder.poder;
  if (elDesc)  elDesc.textContent  = poder.desc;
  tarj.classList.add('revelada');
  if (yaCompleto('tarjeta_m1')) return;
  marcarAct('tarjeta_m1');
  setTimeout(() => {
    mostrarRes('resultado-tarjeta');
    addEstrellaM1(50); desbloquearLogro('tarjeta_volteada');
  }, 750);
}

function completarMision1() {
  if (e.misionesCompletadas.includes('mision1')) { irAPantalla('pantalla-mapa'); return; }
  e.misionesCompletadas.push('mision1');
  e.medallas++; e.insigniasGanadas.push({insignia:CONFIG.misiones[1].insignia, nombre:CONFIG.misiones[1].nombreInsignia});
  desbloquearLogro('mision1_ok'); guardar();
  mostrarModalLogro('🎨','¡Misión 1 Completada!','¡El Arte de Imaginar conquistado! +1 🏅');
  sincUI(); setTimeout(() => irAPantalla('pantalla-mapa'), 2600);
}

/* ══════════════════════════════════════════════════════════════
   MISIÓN 2
═══════════════════════════════════════════════════════════════*/
let quizRespondido = false;

function elegirPersonaje(nombre) {
  if (yaCompleto('personaje')) return;
  marcarAct('personaje');
  e.personajeElegido = nombre;
  const cuentoPj = document.getElementById('personaje-en-cuento');
  if (cuentoPj) cuentoPj.textContent = nombre;
  document.querySelectorAll('.personaje-btn').forEach(b => b.classList.remove('seleccionado'));
  if (event.target.closest('.personaje-btn')) event.target.closest('.personaje-btn').classList.add('seleccionado');
  const txtEl = document.getElementById('texto-personaje');
  if (txtEl) txtEl.textContent = `¡Excelente elección! ${nombre} va a ser el héroe de tu historia mágica.`;
  mostrarRes('resultado-personaje');
  addEstrellaM2(30); desbloquearLogro('personaje_elegido'); desbloquearSig('act-2-2');
}

function responderQuiz(btn, esCorrecta) {
  if (quizRespondido || yaCompleto('quiz')) return;
  quizRespondido = true;
  marcarAct('quiz');
  document.querySelectorAll('.quiz-opcion').forEach(b => b.disabled=true);
  if (esCorrecta) {
    btn.classList.add('correcta');
    document.getElementById('quiz-emoji').textContent = '🎉';
    document.getElementById('quiz-feedback').textContent = '¡CORRECTO! Un personaje que supera un desafío es el corazón de toda gran historia.';
    addEstrellaM2(40);
  } else {
    btn.classList.add('incorrecta');
    document.querySelectorAll('.quiz-opcion').forEach(b => { if (b.onclick&&b.onclick.toString().includes('true')) b.classList.add('correcta'); });
    document.getElementById('quiz-emoji').textContent = '💡';
    document.getElementById('quiz-feedback').textContent = '¡Casi! Lo más importante es el personaje que supera un desafío.';
    document.getElementById('quiz-xp').textContent = '+1 ⭐  +20 XP';
    addEstrellaM2(20);
  }
  desbloquearLogro('quiz_ok'); mostrarRes('resultado-quiz'); desbloquearSig('act-2-3');
}

function completarHistoria() {
  const txt = document.getElementById('historia-texto');
  if (!txt||!txt.value.trim()) { mostrarToast('📚','¡Escribí el final de tu historia!'); return; }
  if (yaCompleto('historia')) return;
  marcarAct('historia');
  e.historia = txt.value.trim();
  mostrarRes('resultado-historia');
  addEstrellaM2(80, 2); desbloquearLogro('historia_ok');
}

function completarMision2() {
  if (e.misionesCompletadas.includes('mision2')) { irAPantalla('pantalla-mapa'); return; }
  e.misionesCompletadas.push('mision2');
  e.medallas++; e.insigniasGanadas.push({insignia:CONFIG.misiones[2].insignia, nombre:CONFIG.misiones[2].nombreInsignia});
  desbloquearLogro('mision2_ok'); guardar();
  mostrarModalLogro('📖','¡Misión 2 Completada!','¡El Mundo de las Historias conquistado! +1 🏅');
  sincUI(); setTimeout(() => irAPantalla('pantalla-mapa'), 2600);
}

/* ══════════════════════════════════════════════════════════════
   MISIÓN 3 — Act 3.1 Mezclador
═══════════════════════════════════════════════════════════════*/
let mezclasHechas = 0;

function mezclarIdeas() {
  const aEl  = document.getElementById('mezcla-a');
  const bEl  = document.getElementById('mezcla-b');
  const rEl  = document.getElementById('mezcla-resultado');
  const btnEl= document.getElementById('btn-mezclar');
  const a = COSAS_A[Math.floor(Math.random()*COSAS_A.length)];
  const b = COSAS_B[Math.floor(Math.random()*COSAS_B.length)];
  const r = RESULTADOS_MEZCLA[Math.floor(Math.random()*RESULTADOS_MEZCLA.length)];
  [aEl,bEl,rEl].forEach(el => { if(el){el.style.opacity='0';el.style.transform='scale(0.85)';} });
  setTimeout(() => {
    if(aEl){aEl.textContent=a;aEl.style.opacity='1';aEl.style.transition='all .3s';aEl.style.transform='scale(1)';}
    if(bEl){bEl.textContent=b;bEl.style.opacity='1';bEl.style.transition='all .3s';bEl.style.transform='scale(1)';}
    if(rEl){rEl.textContent='💥 '+r;rEl.style.opacity='1';rEl.style.transition='all .3s';rEl.style.transform='scale(1)';}
  }, 200);
  mezclasHechas++;
  if (mezclasHechas >= 2 && !yaCompleto('mezcla')) {
    marcarAct('mezcla');
    const txtEl = document.getElementById('texto-mezcla');
    if (txtEl) txtEl.textContent = `¡Combinaste ${a} + ${b} y nació algo INCREÍBLE: ${r}`;
    mostrarRes('resultado-mezcla');
    addEstrellaM3(40); desbloquearLogro('mezcla_ok');
    if (btnEl) btnEl.textContent = '🔀 Seguir mezclando (solo por diversión)';
    desbloquearSig('act-3-2');
  } else if (mezclasHechas === 1) {
    mostrarToast('🔀','¡Buena mezcla! Una vez más para continuar.');
  }
}

/* ══════════════════════════════════════════════════════════════
   MISIÓN 3 — Act 3.2 BÁSQUET (5 tiros, 3 encestes para ganar)
═══════════════════════════════════════════════════════════════*/
function crearEstadoBq() {
  return {
    iniciado:   false,
    dragging:   false,
    enVuelo:    false,
    anim:       null,
    tirosTotal: 5,
    tirosUsados:0,
    encestes:   0,
    encestesNeeded: 3,
    ganado:     false,
    ball:       { x:160, y:210, r:18, vx:0, vy:0 },
    aro:        { x:160, y:62, innerW:48 },
    dragStart:  { x:0, y:0 },
    dragCurr:   { x:0, y:0 },
    ideaActual: '',
    ctx:        null,
    canvas:     null,
  };
}
let bqState = crearEstadoBq();

function actualizarMarcador() {
  const encEl = document.getElementById('bq-encestes');
  const tirEl = document.getElementById('bq-tiros');
  if (encEl) encEl.textContent = bqState.encestes;
  if (tirEl) tirEl.textContent = bqState.tirosUsados;
}

function inicializarBasquet() {
  const canvas = document.getElementById('basquet-canvas');
  if (!canvas) return;
  if (bqState.iniciado && !bqState.ganado) return; // ya iniciado y activo
  if (yaCompleto('basquet')) return; // ya completó esta actividad

  bqState = crearEstadoBq();
  bqState.canvas  = canvas;
  bqState.ctx     = canvas.getContext('2d');
  bqState.ideaActual = IDEAS_MAGICAS_BASQUET[Math.floor(Math.random()*IDEAS_MAGICAS_BASQUET.length)];
  bqState.ball.x  = canvas.width / 2;
  bqState.ball.y  = canvas.height - 45;
  bqState.iniciado = true;

  actualizarMarcador();
  dibujarBq();
  registrarEventosBq(canvas);
}

function reiniciarBasquet() {
  if (yaCompleto('basquet')) return;
  const btn = document.getElementById('btn-reintentar-basquet');
  if (btn) btn.classList.add('oculto');
  const msgEl = document.getElementById('basquet-mensaje');
  if (msgEl) { msgEl.style.display='none'; msgEl.className='basquet-mensaje'; }
  cancelAnimationFrame(bqState.anim);
  bqState.tirosUsados = 0;
  bqState.encestes    = 0;
  bqState.enVuelo     = false;
  bqState.dragging    = false;
  bqState.ideaActual  = IDEAS_MAGICAS_BASQUET[Math.floor(Math.random()*IDEAS_MAGICAS_BASQUET.length)];
  const canvas = bqState.canvas;
  if (canvas) { bqState.ball = {x:canvas.width/2, y:canvas.height-45, r:18, vx:0, vy:0}; }
  actualizarMarcador();
  dibujarBq();
}

function registrarEventosBq(canvas) {
  // Remover listeners anteriores clonando el nodo
  const newCanvas = canvas.cloneNode(true);
  canvas.parentNode.replaceChild(newCanvas, canvas);
  bqState.canvas = newCanvas;
  bqState.ctx    = newCanvas.getContext('2d');

  const W = newCanvas.width, H = newCanvas.height;
  function getPos(e,rect) { return {x:(e.clientX-rect.left)*(W/rect.width), y:(e.clientY-rect.top)*(H/rect.height)}; }
  function getTPos(e,rect) { const t=e.touches[0]; return {x:(t.clientX-rect.left)*(W/rect.width), y:(t.clientY-rect.top)*(H/rect.height)}; }
  function cercaBola(px,py) { const dx=px-bqState.ball.x,dy=py-bqState.ball.y; return Math.sqrt(dx*dx+dy*dy)<bqState.ball.r+16; }
  function lanzar() {
    if (bqState.ganado||bqState.enVuelo) return;
    const dx=bqState.dragCurr.x-bqState.dragStart.x, dy=bqState.dragCurr.y-bqState.dragStart.y;
    if (Math.abs(dx)<4&&Math.abs(dy)<4) { bqState.dragging=false; return; }
    bqState.ball.vx=-dx*0.22; bqState.ball.vy=-dy*0.22;
    bqState.enVuelo=true; bqState.dragging=false;
    bqState.tirosUsados++;
    actualizarMarcador();
    const instrEl=document.getElementById('basquet-instruccion');
    if(instrEl) instrEl.style.display='none';
    bqState.anim=requestAnimationFrame(fisicaBq);
  }

  newCanvas.addEventListener('mousedown', ev => {
    if(bqState.ganado||bqState.enVuelo) return;
    const r=newCanvas.getBoundingClientRect(), pos=getPos(ev,r);
    if(cercaBola(pos.x,pos.y)){bqState.dragging=true;bqState.dragStart={...pos};bqState.dragCurr={...pos};}
  });
  newCanvas.addEventListener('mousemove', ev => {
    if(!bqState.dragging) return;
    bqState.dragCurr=getPos(ev,newCanvas.getBoundingClientRect()); dibujarBq();
  });
  newCanvas.addEventListener('mouseup',   () => { if(bqState.dragging) lanzar(); });
  newCanvas.addEventListener('mouseleave',() => { if(bqState.dragging){bqState.dragging=false;dibujarBq();} });
  newCanvas.addEventListener('touchstart',ev=>{ ev.preventDefault(); if(bqState.ganado||bqState.enVuelo) return; const r=newCanvas.getBoundingClientRect(),pos=getTPos(ev,r); if(cercaBola(pos.x,pos.y)){bqState.dragging=true;bqState.dragStart={...pos};bqState.dragCurr={...pos};} },{passive:false});
  newCanvas.addEventListener('touchmove', ev=>{ ev.preventDefault(); if(!bqState.dragging) return; bqState.dragCurr=getTPos(ev,newCanvas.getBoundingClientRect()); dibujarBq(); },{passive:false});
  newCanvas.addEventListener('touchend',  ev=>{ ev.preventDefault(); if(bqState.dragging) lanzar(); },{passive:false});

  dibujarBq();
}

function fisicaBq() {
  const bq = bqState;
  if (!bq.enVuelo) return;
  const W=bq.canvas.width, H=bq.canvas.height;
  bq.ball.x  += bq.ball.vx;
  bq.ball.y  += bq.ball.vy;
  bq.ball.vy += 0.38;
  bq.ball.vx *= 0.995;
  if (bq.ball.x - bq.ball.r < 0)  { bq.ball.x=bq.ball.r; bq.ball.vx*=-0.6; }
  if (bq.ball.x + bq.ball.r > W)  { bq.ball.x=W-bq.ball.r; bq.ball.vx*=-0.6; }

  const aroX1=bq.aro.x-bq.aro.innerW/2, aroX2=bq.aro.x+bq.aro.innerW/2, aroY=bq.aro.y+10;
  const entraX=bq.ball.x>aroX1+bq.ball.r*0.4 && bq.ball.x<aroX2-bq.ball.r*0.4;
  const pasaY =bq.ball.y>aroY && bq.ball.y<aroY+30;

  if (entraX && pasaY && bq.ball.vy>0) {
    bq.encestes++;
    bq.enVuelo=false;
    cancelAnimationFrame(bq.anim);
    actualizarMarcador();
    if (bq.encestes >= bq.encestesNeeded) {
      bq.ganado = true;
      showBqMsg('¡Encestaste 3 ideas mágicas! 🎯✨', true);
    } else {
      const restantes = bq.tirosTotal - bq.tirosUsados;
      showBqMsg(`¡Enceste! ${bq.encestes}/${bq.encestesNeeded} ✅ — ${restantes} tiro${restantes!==1?'s':''} restante${restantes!==1?'s':''}`, false, true);
    }
    return;
  }
  if (bq.ball.y > H + 30) {
    bq.enVuelo=false;
    cancelAnimationFrame(bq.anim);
    const restantes = bq.tirosTotal - bq.tirosUsados;
    if (restantes <= 0 && bq.encestes < bq.encestesNeeded) {
      showBqMsg(`Fallaste todos los tiros. ¡Probá otra vez! 💪`, false, false, true);
    } else {
      showBqMsg(`¡Casi! ${restantes} tiro${restantes!==1?'s':''} restante${restantes!==1?'s':''} 💪`, false);
    }
    return;
  }
  dibujarBq();
  bq.anim = requestAnimationFrame(fisicaBq);
}

function showBqMsg(msg, esExito, esEnceste, esFin) {
  const msgEl = document.getElementById('basquet-mensaje');
  if (!msgEl) return;
  msgEl.textContent = msg;
  msgEl.className   = 'basquet-mensaje ' + (esExito?'exito':esEnceste?'enceste':'fallo');
  msgEl.style.display = 'block';
  const delay = esExito ? 2000 : 1400;
  setTimeout(() => {
    msgEl.style.display = 'none';
    if (esExito) {
      onBqGanado();
    } else if (esFin) {
      const btn = document.getElementById('btn-reintentar-basquet');
      if (btn) btn.classList.remove('oculto');
      dibujarBq();
    } else {
      // resetear pelota para siguiente tiro
      const canvas=bqState.canvas;
      if (canvas) bqState.ball = {x:canvas.width/2+(Math.random()-.5)*20, y:canvas.height-45, r:18, vx:0, vy:0};
      dibujarBq();
    }
  }, delay);
}

function onBqGanado() {
  dibujarBq();
  if (!yaCompleto('basquet')) {
    marcarAct('basquet');
    mostrarRes('resultado-basquet');
    addEstrellaM3(40); desbloquearLogro('basquet_ok'); desbloquearSig('act-3-3');
  }
}

function dibujarBq() {
  const bq = bqState;
  if (!bq.ctx || !bq.canvas) return;
  const ctx=bq.ctx, W=bq.canvas.width, H=bq.canvas.height;
  ctx.clearRect(0,0,W,H);

  // Fondo
  const bg=ctx.createLinearGradient(0,0,0,H);
  bg.addColorStop(0,'#0d0125'); bg.addColorStop(1,'#1a0533');
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

  // Estrellas
  ctx.fillStyle='rgba(255,255,255,.4)';
  [[20,30],[60,80],[280,40],[300,120],[40,180],[200,20],[150,200],[240,160]].forEach(([sx,sy])=>{
    ctx.beginPath(); ctx.arc(sx,sy,1.2,0,Math.PI*2); ctx.fill();
  });

  const ax=bq.aro.x, ay=bq.aro.y;
  // Tablero
  ctx.fillStyle='rgba(155,89,245,.2)'; ctx.strokeStyle='rgba(155,89,245,.5)'; ctx.lineWidth=2;
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(ax-50,ay-38,100,36,4); else ctx.rect(ax-50,ay-38,100,36);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle='rgba(245,200,66,.8)'; ctx.font='bold 9px Nunito,sans-serif'; ctx.textAlign='center';
  ctx.fillText('✨ PORTAL MÁGICO', ax, ay-18);

  // Soporte
  ctx.strokeStyle='#f5c842'; ctx.lineWidth=3;
  ctx.beginPath(); ctx.moveTo(ax,ay-2); ctx.lineTo(ax,ay+30); ctx.stroke();

  // Aro
  ctx.shadowColor='#f5c842'; ctx.shadowBlur=10;
  ctx.strokeStyle='#f5c842'; ctx.lineWidth=4;
  ctx.beginPath(); ctx.moveTo(ax-bq.aro.innerW/2,ay+10); ctx.lineTo(ax+bq.aro.innerW/2,ay+10); ctx.stroke();
  ctx.shadowBlur=0;

  // Red
  ctx.strokeStyle='rgba(245,200,66,.35)'; ctx.lineWidth=1.5;
  for (let ri=0;ri<5;ri++) {
    const rx=ax-bq.aro.innerW/2+(ri/4)*bq.aro.innerW;
    ctx.beginPath(); ctx.moveTo(rx,ay+10); ctx.lineTo(rx+(ri-2)*2,ay+34); ctx.stroke();
  }
  ctx.beginPath(); ctx.moveTo(ax-bq.aro.innerW/2,ay+22); ctx.lineTo(ax+bq.aro.innerW/2,ay+22); ctx.stroke();

  // Línea de tiro
  ctx.strokeStyle='rgba(196,168,255,.2)'; ctx.lineWidth=1; ctx.setLineDash([6,4]);
  ctx.beginPath(); ctx.moveTo(0,H-26); ctx.lineTo(W,H-26); ctx.stroke(); ctx.setLineDash([]);

  // Flecha de dirección
  if (bq.dragging) {
    const dx=bq.dragCurr.x-bq.dragStart.x, dy=bq.dragCurr.y-bq.dragStart.y, len=Math.sqrt(dx*dx+dy*dy);
    if (len>8) {
      const nx=-dx/len, ny=-dy/len, maxLen=Math.min(len,80);
      ctx.strokeStyle='rgba(0,212,168,.7)'; ctx.lineWidth=2.5; ctx.setLineDash([5,3]);
      ctx.beginPath(); ctx.moveTo(bq.ball.x,bq.ball.y); ctx.lineTo(bq.ball.x+nx*maxLen,bq.ball.y+ny*maxLen); ctx.stroke(); ctx.setLineDash([]);
      const arrowX=bq.ball.x+nx*maxLen, arrowY=bq.ball.y+ny*maxLen, ang=Math.atan2(-dy,-dx);
      ctx.fillStyle='rgba(0,212,168,.7)'; ctx.save(); ctx.translate(arrowX,arrowY); ctx.rotate(ang);
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-10,-5); ctx.lineTo(-10,5); ctx.closePath(); ctx.fill(); ctx.restore();
    }
  }

  // Pelota
  const bg2=ctx.createRadialGradient(bq.ball.x-5,bq.ball.y-5,2,bq.ball.x,bq.ball.y,bq.ball.r);
  bg2.addColorStop(0,'#c4a8ff'); bg2.addColorStop(.4,'#9b59f5'); bg2.addColorStop(1,'#4a1a8a');
  ctx.shadowColor='#9b59f5'; ctx.shadowBlur=16;
  ctx.fillStyle=bg2; ctx.beginPath(); ctx.arc(bq.ball.x,bq.ball.y,bq.ball.r,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
  ctx.fillStyle='rgba(255,255,255,.35)'; ctx.beginPath(); ctx.ellipse(bq.ball.x-5,bq.ball.y-6,6,4,-.5,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.7)'; ctx.font='11px sans-serif'; ctx.textAlign='center'; ctx.fillText('✨',bq.ball.x,bq.ball.y+4);

  // Idea actual y marcador
  ctx.fillStyle='rgba(196,168,255,.6)'; ctx.font='italic 10px Nunito,sans-serif'; ctx.textAlign='center';
  ctx.fillText(bq.ideaActual, W/2, H-6);
  ctx.fillStyle='rgba(0,212,168,.7)'; ctx.font='bold 10px Nunito,sans-serif'; ctx.textAlign='left';
  ctx.fillText(`${bq.encestes}/${bq.encestesNeeded} ✅`, 6, H-6);
  ctx.fillStyle='rgba(255,255,255,.4)'; ctx.textAlign='right';
  ctx.fillText(`${bq.tirosTotal-bq.tirosUsados} tiro${bq.tirosTotal-bq.tirosUsados!==1?'s':''}`, W-6, H-6);
}

/* ══════════════════════════════════════════════════════════════
   MISIÓN 3 — Act 3.3 Ruleta
═══════════════════════════════════════════════════════════════*/
let ruletaGirando = false;

function girarRuleta() {
  if (ruletaGirando) return;
  ruletaGirando = true;
  const iconoEl = document.getElementById('ruleta-icono');
  const textoEl = document.getElementById('ruleta-texto');
  const btnEl   = document.getElementById('btn-ruleta');
  if (btnEl) btnEl.disabled = true;
  if (iconoEl) iconoEl.classList.add('girando');
  if (textoEl) { textoEl.textContent='Girando...'; textoEl.className='ruleta-texto'; }

  let ciclos = 0;
  const totalCiclos = 18 + Math.floor(Math.random()*10);
  const elegido = PODERES_CREATIVOS[Math.floor(Math.random()*PODERES_CREATIVOS.length)];

  const iv = setInterval(() => {
    const actual = PODERES_CREATIVOS[ciclos % PODERES_CREATIVOS.length];
    if (iconoEl) iconoEl.textContent = actual.icono;
    if (textoEl) textoEl.textContent = actual.nombre;
    ciclos++;
    if (ciclos >= totalCiclos) {
      clearInterval(iv);
      if (iconoEl) { iconoEl.textContent=elegido.icono; iconoEl.classList.remove('girando'); }
      if (textoEl) { textoEl.textContent=`${elegido.icono} ${elegido.nombre}`; textoEl.classList.add('revelado'); }
      ruletaGirando = false;
      e.poderRuleta = elegido.nombre;
      if (!yaCompleto('ruleta')) {
        marcarAct('ruleta');
        const txt = document.getElementById('texto-ruleta');
        if (txt) txt.textContent = `¡Tu poder es "${elegido.nombre}"! — ${elegido.desc}`;
        mostrarRes('resultado-ruleta');
        addEstrellaM3(40); desbloquearLogro('ruleta_ok'); desbloquearSig('act-3-4');
      } else {
        mostrarToast(elegido.icono, `Poder: ${elegido.nombre}`);
      }
      if (btnEl) { btnEl.disabled=false; btnEl.textContent='🎡 Girar de nuevo (solo por diversión)'; }
    }
  }, 120);
}

/* ══════════════════════════════════════════════════════════════
   MISIÓN 3 — Act 3.4 Foto
═══════════════════════════════════════════════════════════════*/
function cargarFoto(input) {
  const file = input.files[0];
  if (!file||!file.type.startsWith('image/')) { mostrarToast('📸','Elegí un archivo de imagen'); return; }
  const reader = new FileReader();
  reader.onload = ev => {
    const img = document.getElementById('foto-preview');
    if (img) {
      img.src = ev.target.result;
      document.getElementById('foto-upload-area').classList.add('oculto');
      document.getElementById('foto-preview-area').classList.remove('oculto');
    }
  };
  reader.readAsDataURL(file);
}

function elegirPoderFoto(nombrePoder, claseMarco) {
  if (yaCompleto('foto')) return;
  const marco = document.getElementById('foto-marco');
  const titulo= document.getElementById('foto-titulo-magico');
  if (marco) { marco.className='foto-marco '+claseMarco; }
  if (titulo) titulo.textContent = nombrePoder;
  document.querySelectorAll('.poder-btn').forEach(b => b.classList.remove('activo'));
  if (event.target) event.target.classList.add('activo');
  marcarAct('foto');
  const txt = document.getElementById('texto-foto');
  if (txt) txt.textContent = `¡Tu foto tiene el ${nombrePoder}! Ahora es una foto mágica del Club de los Creadores.`;
  mostrarRes('resultado-foto');
  addEstrellaM3(45); desbloquearLogro('foto_ok'); desbloquearSig('act-3-5');
  inicializarRaspadita();
}

/* ══════════════════════════════════════════════════════════════
   MISIÓN 3 — Act 3.5 Raspadita
═══════════════════════════════════════════════════════════════*/
let raspaditaInicializada = false;
let raspaditaRevelada     = false;
let misionSecreta         = '';

function inicializarRaspadita() {
  const canvas   = document.getElementById('raspadita-canvas');
  const textoDiv = document.getElementById('raspadita-texto-oculto');
  if (!canvas || !textoDiv) return;

  // Elegir misión secreta aleatoria (diferente cada partida)
  if (!misionSecreta) misionSecreta = MISIONES_SECRETAS[Math.floor(Math.random()*MISIONES_SECRETAS.length)];
  textoDiv.textContent = misionSecreta;

  const ctx=canvas.getContext('2d'), W=canvas.width, H=canvas.height;
  ctx.clearRect(0,0,W,H);
  const grad=ctx.createLinearGradient(0,0,W,H);
  grad.addColorStop(0,'#4a1a8a'); grad.addColorStop(1,'#7b2fcf');
  ctx.fillStyle=grad; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(255,255,255,.4)'; ctx.font='bold 18px Nunito,sans-serif'; ctx.textAlign='center';
  ctx.fillText('✨ RASPÁ AQUÍ ✨',W/2,H/2-8);
  ctx.font='13px Nunito,sans-serif'; ctx.fillStyle='rgba(255,255,255,.3)';
  ctx.fillText('Deslizá para revelar',W/2,H/2+16);

  if (raspaditaInicializada) return;
  raspaditaInicializada = true;
  let pintando=false, eventos=0;
  function raspar(x,y) {
    ctx.globalCompositeOperation='destination-out';
    ctx.beginPath(); ctx.arc(x,y,22,0,Math.PI*2); ctx.fill();
    if (++eventos%10===0) {
      const d=ctx.getImageData(0,0,W,H).data;
      let tr=0; for(let i=3;i<d.length;i+=4) if(d[i]<128) tr++;
      if (tr/(W*H)>0.45 && !raspaditaRevelada) { raspaditaRevelada=true; ctx.clearRect(0,0,W,H); completarRaspadita(); }
    }
  }
  canvas.addEventListener('mousedown', ()=>{pintando=true;});
  canvas.addEventListener('mouseup',   ()=>{pintando=false;});
  canvas.addEventListener('mouseleave',()=>{pintando=false;});
  canvas.addEventListener('mousemove', ev=>{
    if(!pintando) return;
    const r=canvas.getBoundingClientRect();
    raspar((ev.clientX-r.left)*(W/r.width),(ev.clientY-r.top)*(H/r.height));
  });
  canvas.addEventListener('touchstart', ev=>{pintando=true; ev.preventDefault();},{passive:false});
  canvas.addEventListener('touchend',   ()=>{pintando=false;});
  canvas.addEventListener('touchmove',  ev=>{
    if(!pintando) return; ev.preventDefault();
    const r=canvas.getBoundingClientRect(), t=ev.touches[0];
    raspar((t.clientX-r.left)*(W/r.width),(t.clientY-r.top)*(H/r.height));
  },{passive:false});
}

function completarRaspadita() {
  const hint=document.getElementById('raspadita-hint');
  if (hint) hint.style.display='none';
  if (yaCompleto('raspadita')) return;
  marcarAct('raspadita');
  e.misionSecreta = misionSecreta;
  const txt = document.getElementById('texto-raspadita');
  if (txt) txt.textContent = `¡Tu misión secreta es: "${misionSecreta}"! ¡Intentá hacerla en casa o en el colegio!`;
  mostrarRes('resultado-raspadita');
  addEstrellaM3(40); desbloquearLogro('raspadita_ok');
  explotarParticulas();
}

function completarMision3() {
  if (e.misionesCompletadas.includes('mision3')) { irAPantalla('pantalla-mapa'); return; }
  e.misionesCompletadas.push('mision3');
  e.medallas++; e.insigniasGanadas.push({insignia:CONFIG.misiones[3].insignia, nombre:CONFIG.misiones[3].nombreInsignia});
  desbloquearLogro('mision3_ok'); guardar();
  mostrarModalLogro('🔬','¡Misión 3 Completada!','¡El Laboratorio Creativo conquistado! +1 🏅');
  sincUI(); setTimeout(() => irAPantalla('pantalla-mapa'), 2600);
}

/* ══════════════════════════════════════════════════════════════
   DESAFÍO
═══════════════════════════════════════════════════════════════*/
function completarDesafio() {
  const nom = document.getElementById('proyecto-nombre');
  const des = document.getElementById('proyecto-descripcion');
  if (!nom||!nom.value.trim()||!des||!des.value.trim()) { mostrarToast('⚡','¡Completá el nombre y la descripción!'); return; }
  if (e.misionesCompletadas.includes('desafio')) return;
  e.misionesCompletadas.push('desafio');
  e.medallas++; e.estrellas+=10;
  e.insigniasGanadas.push({insignia:CONFIG.misiones.desafio.insignia, nombre:CONFIG.misiones.desafio.nombreInsignia});
  sumarXP(500); desbloquearLogro('desafio_ok');
  guardarEnHistorial();
  guardar();
  mostrarRes('resultado-desafio');
  explotarParticulas(); sincUI();
}

/* ══════════════════════════════════════════════════════════════
   RECOMPENSAS Y CERTIFICADO
═══════════════════════════════════════════════════════════════*/
function renderizarRecompensas() {
  if (!e) return;
  const nomEl = document.getElementById('nombre-recompensas');
  if (nomEl) nomEl.textContent = `¡Mirá todo lo que lograste, ${p.nombre}!`;
  animarContador('total-estrellas', e.estrellas);
  animarContador('total-medallas',  e.medallas);
  animarContador('total-xp',        e.xp);

  const lista = document.getElementById('logros-lista');
  if (lista) {
    lista.innerHTML = '';
    if (e.logrosDesbloqueados.length === 0) {
      lista.innerHTML = '<p style="color:var(--lavanda-suave);text-align:center;">Completá misiones para desbloquear logros 🎯</p>';
    } else {
      e.logrosDesbloqueados.forEach((id,i) => {
        const logro = CONFIG.logros.find(l=>l.id===id); if(!logro) return;
        const el=document.createElement('div'); el.className='logro-item'; el.style.animationDelay=`${i*.07}s`;
        el.innerHTML=`<span class="logro-icono">${logro.icono}</span><div><div class="logro-nombre">${logro.nombre}</div><div class="logro-desc">${logro.desc}</div></div><span class="logro-xp">+${logro.xp} XP</span>`;
        lista.appendChild(el);
      });
    }
  }
  const display = document.getElementById('insignias-display');
  if (display) {
    display.innerHTML = '';
    if (e.insigniasGanadas.length === 0) {
      display.innerHTML = '<p style="color:var(--lavanda-suave);">¡Completá misiones para ganar insignias! 🏆</p>';
    } else {
      e.insigniasGanadas.forEach(({insignia, nombre:ni}) => {
        const el=document.createElement('div'); el.className='insignia-grande';
        el.innerHTML=`<div class="insignia-circulo">${insignia}</div><div class="insignia-nombre">${ni}</div>`;
        display.appendChild(el);
      });
    }
  }
}

function renderizarCertificado() {
  if (!p) return;
  // Usar datos del diploma guardado si existe, sino datos actuales
  const datos = p.diplomaGuardado || {
    nombre:   p.nombre,
    xp:       e.xp,
    estrellas:e.estrellas,
    medallas: e.medallas,
    titulo:   getTitulo(e.xp),
    fecha:    new Date().toISOString(),
    partida:  e.numero,
  };
  document.getElementById('cert-nombre').textContent   = datos.nombre.toUpperCase();
  document.getElementById('cert-nivel').textContent    = datos.titulo;
  document.getElementById('cert-estrellas').textContent= datos.estrellas;
  document.getElementById('cert-xp').textContent       = datos.xp;
  document.getElementById('cert-medallas').textContent = datos.medallas;
  document.getElementById('cert-fecha').textContent    = formatFecha(datos.fecha);
  const partNum = document.getElementById('cert-partida-num');
  if (partNum) partNum.textContent = datos.partida > 1 ? `Aventura #${datos.partida}` : '';
}

function getTitulo(xp) {
  let titulo = CONFIG.titulosCertificado[0].titulo;
  CONFIG.titulosCertificado.forEach(t => { if (xp >= t.xpMin) titulo = t.titulo; });
  return titulo;
}

function imprimirCertificado() {
  mostrarToast('🖨️','Abriendo vista de impresión...');
  setTimeout(() => window.print(), 400);
}

/* ══════════════════════════════════════════════════════════════
   MODALES Y TOASTS
═══════════════════════════════════════════════════════════════*/
function cerrarModal(id) { const el=document.getElementById(id); if(el) el.classList.add('oculto'); }

function mostrarModalLogro(icono, titulo, xp) {
  document.getElementById('modal-logro-icono').textContent  = icono;
  document.getElementById('modal-logro-nombre').textContent = titulo;
  document.getElementById('modal-logro-xp').textContent     = xp;
  document.getElementById('modal-logro').classList.remove('oculto');
}

function mostrarToast(icono, texto, dur=3200) {
  const cont = document.getElementById('toast-container');
  if (!cont) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="toast-icono">${icono}</span><span class="toast-texto">${texto}</span>`;
  cont.appendChild(el);
  setTimeout(() => {
    el.classList.add('saliendo');
    el.addEventListener('animationend', () => el.remove(), {once:true});
  }, dur);
}

/* ══════════════════════════════════════════════════════════════
   ANIMACIONES
═══════════════════════════════════════════════════════════════*/
function animarContador(id, fin) {
  const el=document.getElementById(id); if(!el) return;
  const desde=parseInt(el.textContent)||0, dur=600, t0=performance.now();
  function tick(now) {
    const p=Math.min((now-t0)/dur,1);
    el.textContent=Math.round(desde+(fin-desde)*(1-Math.pow(1-p,3)));
    if(p<1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function generarParticulasEntrada() {
  const cont=document.getElementById('particulas-entrada'); if(!cont) return;
  const syms=['✨','⭐','🌟','💫','🔮','✦','❋','✧'];
  for(let i=0;i<18;i++){
    const p=document.createElement('div');
    p.style.cssText=`position:absolute;font-size:${.7+Math.random()*.8}rem;left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:${.1+Math.random()*.25};animation:flotarP ${4+Math.random()*6}s ease-in-out infinite;animation-delay:${-Math.random()*6}s;pointer-events:none;`;
    p.textContent=syms[Math.floor(Math.random()*syms.length)];
    cont.appendChild(p);
  }
  if(!document.getElementById('kf-flotar')){
    const s=document.createElement('style');s.id='kf-flotar';
    s.textContent='@keyframes flotarP{0%,100%{transform:translateY(0)rotate(0deg)}33%{transform:translateY(-18px)rotate(10deg)}66%{transform:translateY(10px)rotate(-8deg)}}';
    document.head.appendChild(s);
  }
}

function explotarParticulas() {
  const syms=['✨','⭐','🎉','💫','🌟','🎊','🏆','🎆'];
  for(let i=0;i<28;i++){
    const ang=Math.random()*360, dist=80+Math.random()*200;
    const dx=Math.cos(ang*Math.PI/180)*dist, dy=Math.sin(ang*Math.PI/180)*dist;
    const p=document.createElement('div');
    p.style.cssText=`position:fixed;font-size:${.8+Math.random()*1}rem;left:50%;top:45%;transform:translate(-50%,-50%);animation:expl 1.1s ease-out forwards;--dx:${dx}px;--dy:${dy}px;pointer-events:none;z-index:9999;animation-delay:${Math.random()*.2}s;`;
    p.textContent=syms[Math.floor(Math.random()*syms.length)];
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),1500);
  }
  if(!document.getElementById('kf-expl')){
    const s=document.createElement('style');s.id='kf-expl';
    s.textContent='@keyframes expl{0%{opacity:1;transform:translate(-50%,-50%)translate(0,0)scale(1)}100%{opacity:0;transform:translate(-50%,-50%)translate(var(--dx),var(--dy))scale(.4)}}';
    document.head.appendChild(s);
  }
}

/* ══════════════════════════════════════════════════════════════
   UTILIDADES
═══════════════════════════════════════════════════════════════*/
function formatFecha(iso) {
  try {
    return new Date(iso).toLocaleDateString('es-AR',{year:'numeric',month:'long',day:'numeric'});
  } catch(e) { return iso; }
}
