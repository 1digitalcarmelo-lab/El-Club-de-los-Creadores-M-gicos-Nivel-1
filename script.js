/* ============================================================
   EL CLUB DE LOS CREADORES MÁGICOS — script.js
   ============================================================

   GUÍA DE PERSONALIZACIÓN:
   ─────────────────────────────────────────────────────────────
   MISIONES Y XP:     objeto CONFIG.misiones (~línea 25)
   MEZCLADOR IDEAS:   arrays COSAS_A / COSAS_B (~línea 60)
   LOGROS:            array CONFIG.logros (~línea 100)
   INSIGNIAS:         array CONFIG.insignias (~línea 130)
   NIVELES:           array CONFIG.niveles (~línea 150)
   MENSAJES FINALES:  objeto MENSAJES (~línea 170)
   ─────────────────────────────────────────────────────────────
*/

"use strict";

/* ==================== CONFIGURACIÓN EDITABLE ==================== */
const CONFIG = {

  // MISIONES — Modifica recompensas de XP, estrellas y medallas de cada misión
  misiones: {
    1: { xpMax: 100, estrellasMax: 3, medalla: '🎨', insignia: '🎨', nombreInsignia: 'Artista Imaginativo' },
    2: { xpMax: 150, estrellasMax: 4, medalla: '📖', insignia: '📖', nombreInsignia: 'Narrador de Historias' },
    3: { xpMax: 200, estrellasMax: 5, medalla: '🔬', insignia: '🔬', nombreInsignia: 'Científico Creativo' },
    'desafio': { xpMax: 500, estrellasMax: 0, medalla: '⚡', insignia: '🏆', nombreInsignia: 'Gran Creador Mágico' },
  },

  // NIVELES DE PROGRESO — Modifica los nombres y porcentajes de los niveles
  // El sistema los muestra en la barra de progreso global
  niveles: [
    { min: 0,   max: 24,  nombre: '🌱 Aprendiz Creador',    nivel: 1 },
    { min: 25,  max: 49,  nombre: '⭐ Creador Brillante',    nivel: 2 },
    { min: 50,  max: 74,  nombre: '🌟 Maestro Imaginativo',  nivel: 3 },
    { min: 75,  max: 99,  nombre: '🔮 Gran Creador',         nivel: 4 },
    { min: 100, max: 100, nombre: '👑 Leyenda Mágica',       nivel: 5 },
  ],

  // CERTIFICADO — Título que se otorga según el XP final
  titulosCertificado: [
    { xpMin: 0,    titulo: 'Creador en Ciernes' },
    { xpMin: 250,  titulo: 'Creador Talentoso' },
    { xpMin: 450,  titulo: 'Gran Creador Mágico' },
    { xpMin: 900,  titulo: '✨ Leyenda del Club Mágico ✨' },
  ],

  // LOGROS — Array de logros automáticos. Cada uno tiene:
  // id, icono, nombre, descripcion, xpBonus, condicion (string que se evalúa internamente)
  logros: [
    { id: 'primer_color',   icono: '🎨', nombre: '¡Primer Color!',        desc: 'Elegiste tu color creativo',         xp: 10 },
    { id: 'tesoro_guardado',icono: '💎', nombre: '¡Tesoro Guardado!',      desc: 'Describiste tu tesoro más preciado', xp: 15 },
    { id: 'tarjeta_volteada',icono:'🃏', nombre: '¡Carta Revelada!',        desc: 'Descubriste tu superpoder secreto',  xp: 20 },
    { id: 'mision1_ok',     icono: '🎉', nombre: '¡Misión 1 Completada!',  desc: 'Superaste El Arte de Imaginar',      xp: 50 },
    { id: 'personaje_elegido',icono:'🎭',nombre: '¡Tenés Personaje!',      desc: 'Elegiste el héroe de tu historia',   xp: 15 },
    { id: 'quiz_ok',        icono: '🧠', nombre: '¡Cerebro Creativo!',     desc: 'Respondiste correctamente el quiz',  xp: 25 },
    { id: 'historia_ok',    icono: '📚', nombre: '¡Escritor Mágico!',      desc: 'Escribiste tu primera historia',     xp: 30 },
    { id: 'mision2_ok',     icono: '🎊', nombre: '¡Misión 2 Completada!',  desc: 'Superaste El Mundo de las Historias',xp: 75 },
    { id: 'mezcla_ok',      icono: '⚗️', nombre: '¡Alquimista de Ideas!',  desc: 'Mezclaste dos ideas mágicas',        xp: 20 },
    { id: 'invento_ok',     icono: '💡', nombre: '¡Inventor del Año!',     desc: 'Registraste tu invento',             xp: 25 },
    { id: 'formula_ok',     icono: '🧪', nombre: '¡Fórmula Activada!',     desc: 'Activaste tu fórmula secreta',       xp: 30 },
    { id: 'mision3_ok',     icono: '🚀', nombre: '¡Misión 3 Completada!',  desc: 'Superaste El Laboratorio Creativo',  xp: 100 },
    { id: 'desafio_ok',     icono: '🏆', nombre: '¡Gran Creador Mágico!',  desc: 'Completaste el Desafío Especial',    xp: 200 },
  ],
};

// MEZCLADOR DE IDEAS — Modifica estas listas para cambiar las combinaciones
const COSAS_A = ['🎸 Guitarra','🐠 Pez dorado','🌵 Cactus','☁️ Nube','🎩 Sombrero mágico','🔭 Telescopio','🍕 Pizza','🦋 Mariposa','🎪 Circo','🌊 Ola'];
const COSAS_B = ['🦕 Dinosaurio','🚀 Cohete','🧲 Imán','💤 Sueños','⏰ Reloj loco','🌈 Arcoíris','🤖 Robot','🌺 Flor gigante','🎲 Dado','🔮 Bola mágica'];
const RESULTADOS_MEZCLA = [
  '¡Un instrumento que toca solo cuando viaja en el tiempo!',
  '¡Una criatura que vuela y deja música a su paso!',
  '¡Una planta que cambia de color según la música que escucha!',
  '¡Una nube que cuando truena, suena como una guitarra!',
  '¡Una máquina que convierte los sueños en melodías!',
  '¡Un invento que combina magia y ciencia de formas inesperadas!',
  '¡Una criatura fantástica con poderes únicos en el universo!',
  '¡Un objeto mágico que nadie más en el mundo posee!',
];

/* ==================== ESTADO DE LA APLICACIÓN ==================== */
// Este objeto guarda todo el progreso del jugador en memoria
let estado = {
  nombre: '',
  xp: 0,
  estrellas: 0,
  medallas: 0,
  misionesCompletadas: [],   // ['mision1', 'mision2', 'mision3', 'desafio']
  logrosDesbloqueados: [],   // IDs de los logros ya ganados
  insigniasGanadas: [],      // Objetos { insignia, nombre }
  progreso: 0,               // 0 a 100
  // Datos de actividades
  colorElegido: null,
  personajeElegido: null,
  proyectoNombre: '',
  // Progreso interno de cada misión
  mision1Paso: 0,  // 0=inicio, 1=color OK, 2=tesoro OK, 3=tarjeta OK
  mision2Paso: 0,
  mision3Paso: 0,
};

/* ==================== INICIALIZACIÓN ==================== */
document.addEventListener('DOMContentLoaded', () => {
  generarParticulasEntrada();
  // Intentamos recuperar el nombre del localStorage si hubiera una sesión previa
  const nombreGuardado = localStorage.getItem('clubcreadores_nombre');
  if (nombreGuardado) {
    document.getElementById('nombre-nino').value = nombreGuardado;
  }
});

/* ==================== SISTEMA DE PANTALLAS ==================== */
/**
 * irAPantalla(id) — Cambia la pantalla visible
 * @param {string} id — El id de la sección a mostrar
 */
function irAPantalla(id) {
  // Ocultar todas las pantallas
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });

  // Mostrar la pantalla target con animación
  const pantalla = document.getElementById(id);
  if (pantalla) {
    pantalla.style.display = 'block';
    // Forzar reflow para que la animación se dispare
    void pantalla.offsetWidth;
    pantalla.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Acciones específicas al llegar a ciertas pantallas
  if (id === 'pantalla-recompensas') actualizarPantallaRecompensas();
  if (id === 'pantalla-certificado') generarCertificado();
  if (id === 'pantalla-mapa') actualizarMapa();
}

/* ==================== PANTALLA ENTRADA ==================== */
function iniciarClub() {
  const input = document.getElementById('nombre-nino');
  const nombre = input.value.trim();

  if (!nombre) {
    // Animar el campo si está vacío
    input.style.borderColor = 'var(--error)';
    input.focus();
    setTimeout(() => { input.style.borderColor = ''; }, 2000);
    mostrarToast('👋', '¡Escribí tu nombre primero, Creador!');
    return;
  }

  // Guardar nombre en estado y localStorage
  estado.nombre = nombre;
  localStorage.setItem('clubcreadores_nombre', nombre);

  // Animar la puerta (apertura)
  const puerta = document.querySelector('.puerta-magica .puerta-marco');
  puerta.parentElement.classList.add('puerta-abierta');

  // Efecto de lluvia de partículas
  explotarParticulasEntrada();

  // Transición después de la animación
  setTimeout(() => {
    document.getElementById('saludo-texto').textContent = `¡Bienvenido/a al Club, ${nombre}! 🎉`;
    document.getElementById('nombre-recompensas').textContent =
      `¡Mirá todo lo que lograste, ${nombre}!`;
    irAPantalla('pantalla-bienvenida');
    actualizarPanelXP();
  }, 900);
}

/* ==================== PARTÍCULAS DECORATIVAS ==================== */
function generarParticulasEntrada() {
  const container = document.getElementById('particulas-entrada');
  const simbolos = ['✨', '⭐', '🌟', '💫', '🔮', '✦', '❋', '✧'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      font-size: ${0.7 + Math.random() * 0.8}rem;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${0.1 + Math.random() * 0.25};
      animation: flotarParticula ${4 + Math.random() * 6}s ease-in-out infinite;
      animation-delay: ${-Math.random() * 6}s;
      pointer-events: none;
    `;
    p.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    container.appendChild(p);
  }

  // Inyectar la keyframe animation si no existe
  if (!document.getElementById('kf-flotar')) {
    const style = document.createElement('style');
    style.id = 'kf-flotar';
    style.textContent = `
      @keyframes flotarParticula {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-18px) rotate(10deg); }
        66% { transform: translateY(10px) rotate(-8deg); }
      }
    `;
    document.head.appendChild(style);
  }
}

function explotarParticulasEntrada() {
  const container = document.getElementById('particulas-entrada');
  const simbolos = ['✨', '⭐', '🎉', '💫', '🌟', '🎊'];
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    const angulo = Math.random() * 360;
    const distancia = 80 + Math.random() * 200;
    const dx = Math.cos(angulo * Math.PI / 180) * distancia;
    const dy = Math.sin(angulo * Math.PI / 180) * distancia;
    p.style.cssText = `
      position: fixed;
      font-size: ${0.8 + Math.random() * 1}rem;
      left: 50%; top: 45%;
      transform: translate(-50%, -50%);
      animation: explotar 1s ease-out forwards;
      --dx: ${dx}px; --dy: ${dy}px;
      pointer-events: none;
      z-index: 999;
    `;
    p.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }

  if (!document.getElementById('kf-explotar')) {
    const style = document.createElement('style');
    style.id = 'kf-explotar';
    style.textContent = `
      @keyframes explotar {
        0%   { opacity: 1; transform: translate(-50%, -50%) translate(0, 0) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) scale(0.5); }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ==================== PANEL DE XP GLOBAL ==================== */
function actualizarPanelXP() {
  // Actualiza los contadores en la pantalla de bienvenida
  animarContador('xp-estrellas', estado.estrellas);
  animarContador('xp-medallas', estado.medallas);
  animarContador('xp-puntos', estado.xp);
}

function animarContador(id, valorFinal) {
  const el = document.getElementById(id);
  if (!el) return;
  const valorInicial = parseInt(el.textContent) || 0;
  const duracion = 600;
  const inicio = performance.now();

  function tick(ahora) {
    const progreso = Math.min((ahora - inicio) / duracion, 1);
    const ease = 1 - Math.pow(1 - progreso, 3);
    el.textContent = Math.round(valorInicial + (valorFinal - valorInicial) * ease);
    if (progreso < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ==================== MAPA DE MISIONES ==================== */
function actualizarMapa() {
  const totalXPPosible = 950; // Suma aproximada de todo el XP disponible
  const porcentaje = Math.min(100, Math.round((estado.xp / totalXPPosible) * 100));
  estado.progreso = porcentaje;

  // Actualizar barra de progreso
  document.getElementById('barra-progreso').style.width = porcentaje + '%';
  document.getElementById('progreso-porcentaje').textContent = porcentaje + '%';

  // Nivel actual
  const nivel = CONFIG.niveles.find(n => porcentaje >= n.min && porcentaje <= n.max);
  if (nivel) document.getElementById('nivel-actual').textContent = nivel.nombre;

  // Estado visual de misiones
  actualizarEstadoMision(1);
  actualizarEstadoMision(2);
  actualizarEstadoMision(3);
  actualizarEstadoMision('desafio');

  // Desbloquear misiones según progreso
  if (estado.misionesCompletadas.includes('mision1')) desbloquearMision(2);
  if (estado.misionesCompletadas.includes('mision2')) desbloquearMision(3);
  if (estado.misionesCompletadas.includes('mision1') &&
      estado.misionesCompletadas.includes('mision2') &&
      estado.misionesCompletadas.includes('mision3')) {
    desbloquearMision('desafio');
  }

  // Actualizar insignias en el mapa
  actualizarInsigniasEnMapa();
}

function actualizarEstadoMision(numero) {
  const card = document.getElementById(`card-mision${numero}`);
  const estado_el = document.getElementById(`estado-mision${numero}`);
  if (!card || !estado_el) return;

  const clave = numero === 'desafio' ? 'desafio' : `mision${numero}`;
  if (estado.misionesCompletadas.includes(clave)) {
    card.classList.remove('bloqueada');
    card.classList.add('completada');
    estado_el.textContent = '✅ Completada';
    estado_el.style.background = 'rgba(0,230,118,0.15)';
    estado_el.style.color = 'var(--success)';
    estado_el.style.borderColor = 'rgba(0,230,118,0.3)';
  }
}

function desbloquearMision(numero) {
  const card = document.getElementById(`card-mision${numero}`);
  const btn = card?.querySelector('.btn-mision');
  if (!card || !btn) return;

  // Solo desbloquear si no está ya completada
  if (estado.misionesCompletadas.includes(`mision${numero}`) ||
      (numero === 'desafio' && estado.misionesCompletadas.includes('desafio'))) return;

  card.classList.remove('bloqueada');
  btn.disabled = false;

  const estadoEl = document.getElementById(`estado-mision${numero}`);
  if (estadoEl) {
    estadoEl.textContent = '🔓 Disponible';
    estadoEl.style.background = 'rgba(0,212,168,0.15)';
    estadoEl.style.color = 'var(--aurora-teal)';
    estadoEl.style.borderColor = 'rgba(0,212,168,0.3)';
  }

  if (numero === 'desafio') {
    btn.onclick = () => irAPantalla('pantalla-desafio');
    btn.textContent = '⚡ ¡Aceptar el Desafío!';
  } else {
    btn.onclick = () => irAPantalla(`pantalla-mision${numero}`);
    btn.textContent = '¡Comenzar!';
  }
}

function intentarMisionBloqueada(numero) {
  const mensajes = {
    2: '¡Primero tenés que completar la Misión 1 — El Arte de Imaginar! 🎨',
    3: '¡Todavía no! Terminá la Misión 2 — El Mundo de las Historias 📖',
    'desafio': '¡El Desafío Especial se desbloquea al completar las 3 Misiones! 💪',
  };
  document.getElementById('texto-bloqueo').textContent = mensajes[numero] || 'Completá las misiones anteriores primero.';
  document.getElementById('overlay-bloqueo').classList.remove('oculto');
}

function cerrarOverlayBloqueo() {
  document.getElementById('overlay-bloqueo').classList.add('oculto');
}

function actualizarInsigniasEnMapa() {
  const slots = document.querySelectorAll('#insignias-grid .insignia-slot');
  const insignias = ['mision1', 'mision2', 'mision3', 'desafio'];
  const emojis = { mision1: '🎨', mision2: '📖', mision3: '🔬', desafio: '🏆' };

  insignias.forEach((clave, i) => {
    if (slots[i] && estado.misionesCompletadas.includes(clave)) {
      slots[i].textContent = emojis[clave];
      slots[i].classList.remove('vacia');
      slots[i].classList.add('ganada');
    }
  });
}

/* ==================== MISIÓN 1 — EL ARTE DE IMAGINAR ==================== */
function elegirColor(color, mensaje) {
  if (estado.mision1Paso >= 1) return; // Ya completó esta actividad

  estado.colorElegido = color;
  estado.mision1Paso = 1;

  // Marcar opción seleccionada
  document.querySelectorAll('.opcion-item').forEach(el => el.classList.remove('seleccionada'));
  event.target.classList.add('seleccionada');

  // Mostrar resultado
  const resultado = document.getElementById('resultado-color');
  document.getElementById('texto-color').textContent = mensaje;
  resultado.classList.remove('oculto');
  resultado.classList.add('visible');

  // Dar XP y desbloquear siguiente actividad
  sumarXP(20);
  desbloquearLogro('primer_color');

  setTimeout(() => {
    const act2 = document.getElementById('act-1-2');
    act2.classList.remove('bloqueada-act');
    act2.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1200);
}

function completarTesoro() {
  const texto = document.getElementById('tesoro-texto').value.trim();
  if (!texto) {
    mostrarToast('💎', '¡Escribí tu tesoro primero!');
    return;
  }
  if (estado.mision1Paso >= 2) return;

  estado.mision1Paso = 2;
  document.getElementById('resultado-tesoro').classList.remove('oculto');
  sumarXP(30);
  desbloquearLogro('tesoro_guardado');

  setTimeout(() => {
    const act3 = document.getElementById('act-1-3');
    act3.classList.remove('bloqueada-act');
    act3.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1200);
}

function revelarTarjeta() {
  const tarjeta = document.getElementById('tarjeta-poder');
  if (tarjeta.classList.contains('revelada')) return;

  tarjeta.classList.add('revelada');
  estado.mision1Paso = 3;

  setTimeout(() => {
    document.getElementById('resultado-tarjeta').classList.remove('oculto');
    sumarXP(50);
    desbloquearLogro('tarjeta_volteada');
  }, 800);
}

function completarMision1() {
  if (estado.misionesCompletadas.includes('mision1')) return;
  estado.misionesCompletadas.push('mision1');

  sumarXP(0); // El XP ya se fue sumando por actividad
  estado.estrellas += CONFIG.misiones[1].estrellasMax;
  estado.medallas += 1;
  estado.insigniasGanadas.push({ insignia: CONFIG.misiones[1].insignia, nombre: CONFIG.misiones[1].nombreInsignia });

  desbloquearLogro('mision1_ok');
  mostrarModalLogro('🎨', '¡Misión 1 Completada!', '¡El Arte de Imaginar desbloqueado! +3 ⭐ +1 🏅');
  actualizarPanelXP();

  setTimeout(() => irAPantalla('pantalla-mapa'), 2500);
}

/* ==================== MISIÓN 2 — EL MUNDO DE LAS HISTORIAS ==================== */
function elegirPersonaje(nombre) {
  if (estado.mision2Paso >= 1) return;

  estado.personajeElegido = nombre;
  estado.mision2Paso = 1;

  // Actualizar referencia en el cuento
  document.getElementById('personaje-en-cuento').textContent = nombre;

  // Marcar selección
  document.querySelectorAll('.personaje-btn').forEach(el => el.classList.remove('seleccionado'));
  if (event.target.closest('.personaje-btn')) {
    event.target.closest('.personaje-btn').classList.add('seleccionado');
  }

  document.getElementById('texto-personaje').textContent =
    `¡Excelente elección! ${nombre} va a ser el héroe de tu historia mágica.`;
  document.getElementById('resultado-personaje').classList.remove('oculto');

  sumarXP(30);
  desbloquearLogro('personaje_elegido');

  setTimeout(() => {
    const act2 = document.getElementById('act-2-2');
    act2.classList.remove('bloqueada-act');
    act2.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1200);
}

let quizRespondido = false;

function responderQuiz(btn, esCorrecta) {
  if (quizRespondido) return;
  quizRespondido = true;

  // Deshabilitar todos los botones del quiz
  document.querySelectorAll('.quiz-opcion').forEach(b => b.disabled = true);

  if (esCorrecta) {
    btn.classList.add('correcta');
    document.getElementById('quiz-emoji').textContent = '🎉';
    document.getElementById('quiz-feedback').textContent =
      '¡CORRECTO! Un personaje que supera un desafío es el corazón de toda gran historia.';
    document.getElementById('quiz-xp').textContent = '+40 XP';
    sumarXP(40);
  } else {
    btn.classList.add('incorrecta');
    // Mostrar la correcta
    document.querySelectorAll('.quiz-opcion').forEach(b => {
      if (b.onclick.toString().includes('true')) b.classList.add('correcta');
    });
    document.getElementById('quiz-emoji').textContent = '💡';
    document.getElementById('quiz-feedback').textContent =
      '¡Casi! La respuesta es que el personaje que supera un desafío es lo más importante. ¡Igual aprendiste algo nuevo!';
    document.getElementById('quiz-xp').textContent = '+20 XP (¡seguí intentando!)';
    sumarXP(20);
  }

  desbloquearLogro('quiz_ok');
  document.getElementById('resultado-quiz').classList.remove('oculto');
  estado.mision2Paso = 2;

  setTimeout(() => {
    const act3 = document.getElementById('act-2-3');
    act3.classList.remove('bloqueada-act');
    act3.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1500);
}

function completarHistoria() {
  const texto = document.getElementById('historia-texto').value.trim();
  if (!texto) {
    mostrarToast('📚', '¡Escribí el final de tu historia!');
    return;
  }
  if (estado.mision2Paso >= 3) return;

  estado.mision2Paso = 3;
  document.getElementById('resultado-historia').classList.remove('oculto');
  sumarXP(80);
  desbloquearLogro('historia_ok');
}

function completarMision2() {
  if (estado.misionesCompletadas.includes('mision2')) return;
  estado.misionesCompletadas.push('mision2');

  estado.estrellas += CONFIG.misiones[2].estrellasMax;
  estado.medallas += 1;
  estado.insigniasGanadas.push({ insignia: CONFIG.misiones[2].insignia, nombre: CONFIG.misiones[2].nombreInsignia });

  desbloquearLogro('mision2_ok');
  mostrarModalLogro('📖', '¡Misión 2 Completada!', '¡El Mundo de las Historias conquistado! +4 ⭐ +1 🏅');
  actualizarPanelXP();

  setTimeout(() => irAPantalla('pantalla-mapa'), 2500);
}

/* ==================== MISIÓN 3 — EL LABORATORIO CREATIVO ==================== */
let mezclasHechas = 0;

function mezclarIdeas() {
  const a = COSAS_A[Math.floor(Math.random() * COSAS_A.length)];
  const b = COSAS_B[Math.floor(Math.random() * COSAS_B.length)];
  const resultado = RESULTADOS_MEZCLA[Math.floor(Math.random() * RESULTADOS_MEZCLA.length)];

  document.getElementById('mezcla-a').textContent = a;
  document.getElementById('mezcla-b').textContent = b;
  document.getElementById('mezcla-resultado').textContent = '💥 ' + resultado;

  mezclasHechas++;

  if (mezclasHechas >= 2 && estado.mision3Paso < 1) {
    estado.mision3Paso = 1;
    document.getElementById('resultado-mezcla').classList.remove('oculto');
    document.getElementById('texto-mezcla').textContent =
      `¡Mezclaste ${a} + ${b} y creaste: ${resultado}`;
    sumarXP(50);
    desbloquearLogro('mezcla_ok');

    setTimeout(() => {
      const act2 = document.getElementById('act-3-2');
      act2.classList.remove('bloqueada-act');
      act2.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1200);
  } else if (mezclasHechas < 2) {
    mostrarToast('🔀', `¡Buena mezcla! Mezcla una vez más para continuar.`);
  }
}

function completarInvento() {
  const texto = document.getElementById('invento-texto').value.trim();
  if (!texto) {
    mostrarToast('💡', '¡Describí tu invento primero!');
    return;
  }
  if (estado.mision3Paso >= 2) return;

  estado.mision3Paso = 2;
  document.getElementById('texto-invento').textContent =
    `"${texto}" — ¡Qué invento más increíble! El mundo va a ser mejor gracias a tu creatividad.`;
  document.getElementById('resultado-invento').classList.remove('oculto');
  sumarXP(60);
  desbloquearLogro('invento_ok');

  setTimeout(() => {
    const act3 = document.getElementById('act-3-3');
    act3.classList.remove('bloqueada-act');
    act3.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1200);
}

function activarFormula() {
  if (estado.mision3Paso >= 3) return;
  estado.mision3Paso = 3;

  document.getElementById('resultado-formula').classList.remove('oculto');
  sumarXP(90);
  desbloquearLogro('formula_ok');

  // Pequeña explosión de partículas
  explotarParticulasEntrada();
}

function completarMision3() {
  if (estado.misionesCompletadas.includes('mision3')) return;
  estado.misionesCompletadas.push('mision3');

  estado.estrellas += CONFIG.misiones[3].estrellasMax;
  estado.medallas += 1;
  estado.insigniasGanadas.push({ insignia: CONFIG.misiones[3].insignia, nombre: CONFIG.misiones[3].nombreInsignia });

  desbloquearLogro('mision3_ok');
  mostrarModalLogro('🔬', '¡Misión 3 Completada!', '¡El Laboratorio Creativo superado! +5 ⭐ +1 🏅');
  actualizarPanelXP();

  setTimeout(() => irAPantalla('pantalla-mapa'), 2500);
}

/* ==================== DESAFÍO ESPECIAL ==================== */
function completarDesafio() {
  const nombre = document.getElementById('proyecto-nombre').value.trim();
  const descripcion = document.getElementById('proyecto-descripcion').value.trim();

  if (!nombre || !descripcion) {
    mostrarToast('⚡', '¡Completá el nombre y la descripción de tu proyecto!');
    return;
  }
  if (estado.misionesCompletadas.includes('desafio')) return;

  estado.proyectoNombre = nombre;
  estado.misionesCompletadas.push('desafio');

  sumarXP(500);
  estado.estrellas += 10;
  estado.medallas += 1;
  estado.insigniasGanadas.push({ insignia: CONFIG.misiones['desafio'].insignia, nombre: CONFIG.misiones['desafio'].nombreInsignia });

  desbloquearLogro('desafio_ok');
  document.getElementById('resultado-desafio').classList.remove('oculto');
  explotarParticulasEntrada();
  actualizarPanelXP();
}

/* ==================== SISTEMA DE RECOMPENSAS ==================== */
function actualizarPantallaRecompensas() {
  // Animamos los números de trofeos
  animarContador('total-estrellas', estado.estrellas);
  animarContador('total-medallas', estado.medallas);
  animarContador('total-xp', estado.xp);

  // Renderizar logros
  const listaLogros = document.getElementById('logros-lista');
  listaLogros.innerHTML = '';

  if (estado.logrosDesbloqueados.length === 0) {
    listaLogros.innerHTML = '<p style="color:var(--lavanda-suave);text-align:center;">Completá misiones para desbloquear logros 🎯</p>';
  } else {
    estado.logrosDesbloqueados.forEach((id, i) => {
      const logro = CONFIG.logros.find(l => l.id === id);
      if (!logro) return;
      const el = document.createElement('div');
      el.className = 'logro-item';
      el.style.animationDelay = `${i * 0.08}s`;
      el.innerHTML = `
        <span class="logro-icono">${logro.icono}</span>
        <div>
          <div class="logro-nombre">${logro.nombre}</div>
          <div class="logro-desc">${logro.desc}</div>
        </div>
        <span class="logro-xp">+${logro.xp} XP</span>
      `;
      listaLogros.appendChild(el);
    });
  }

  // Renderizar insignias
  const insigniasDisplay = document.getElementById('insignias-display');
  insigniasDisplay.innerHTML = '';

  if (estado.insigniasGanadas.length === 0) {
    insigniasDisplay.innerHTML = '<p style="color:var(--lavanda-suave);">¡Completá misiones para ganar insignias! 🏆</p>';
  } else {
    estado.insigniasGanadas.forEach(({ insignia, nombre: nombreInsignia }) => {
      const el = document.createElement('div');
      el.className = 'insignia-grande';
      el.innerHTML = `
        <div class="insignia-circulo">${insignia}</div>
        <div class="insignia-nombre">${nombreInsignia}</div>
      `;
      insigniasDisplay.appendChild(el);
    });
  }
}

/* ==================== CERTIFICADO FINAL ==================== */
function generarCertificado() {
  // Nombre
  document.getElementById('cert-nombre').textContent =
    estado.nombre.toUpperCase() || 'GRAN CREADOR';

  // Título según XP acumulado
  let titulo = CONFIG.titulosCertificado[0].titulo;
  for (const t of CONFIG.titulosCertificado) {
    if (estado.xp >= t.xpMin) titulo = t.titulo;
  }
  document.getElementById('cert-nivel').textContent = titulo;

  // Stats
  document.getElementById('cert-estrellas').textContent = estado.estrellas;
  document.getElementById('cert-xp').textContent = estado.xp;
  document.getElementById('cert-medallas').textContent = estado.medallas;

  // Fecha actual
  const ahora = new Date();
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('cert-fecha').textContent =
    ahora.toLocaleDateString('es-AR', opciones);
}

function imprimirCertificado() {
  mostrarToast('🖨️', 'Abriendo vista de impresión...');
  setTimeout(() => window.print(), 400);
}

/* ==================== SISTEMA DE XP ==================== */
function sumarXP(cantidad) {
  estado.xp += cantidad;

  // Actualizar contadores en misiones activas
  const m1xp = document.getElementById('m1-xp');
  const m2xp = document.getElementById('m2-xp');
  const m3xp = document.getElementById('m3-xp');
  if (m1xp) m1xp.textContent = Math.min(estado.xp, CONFIG.misiones[1].xpMax);
  if (m2xp) m2xp.textContent = Math.min(estado.xp, CONFIG.misiones[2].xpMax);
  if (m3xp) m3xp.textContent = Math.min(estado.xp, CONFIG.misiones[3].xpMax);

  // Toast de XP ganado
  if (cantidad > 0) {
    mostrarToast('✨', `+${cantidad} XP ganados!`);
  }

  actualizarPanelXP();
}

/* ==================== SISTEMA DE LOGROS ==================== */
function desbloquearLogro(id) {
  if (estado.logrosDesbloqueados.includes(id)) return;

  const logro = CONFIG.logros.find(l => l.id === id);
  if (!logro) return;

  estado.logrosDesbloqueados.push(id);
  sumarXP(logro.xp);

  // Toast de logro
  mostrarToast(logro.icono, `¡Logro desbloqueado: ${logro.nombre}!`);
}

/* ==================== MODAL DE LOGRO ==================== */
function mostrarModalLogro(icono, titulo, xp) {
  document.getElementById('modal-logro-icono').textContent = icono;
  document.getElementById('modal-logro-nombre').textContent = titulo;
  document.getElementById('modal-logro-xp').textContent = xp;
  document.getElementById('modal-logro').classList.remove('oculto');
}

function cerrarModalLogro() {
  document.getElementById('modal-logro').classList.add('oculto');
}

/* ==================== SISTEMA DE TOASTS ==================== */
function mostrarToast(icono, texto, duracion = 3000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icono">${icono}</span><span class="toast-texto">${texto}</span>`;
  container.appendChild(toast);

  // Remover automáticamente
  setTimeout(() => {
    toast.classList.add('saliendo');
    toast.addEventListener('animationend', () => toast.remove());
  }, duracion);
}

/* ==================== UTILIDAD: CERRAR MODALES CON CLICK AFUERA ==================== */
document.addEventListener('click', (e) => {
  const overlay = document.getElementById('overlay-bloqueo');
  if (e.target === overlay) cerrarOverlayBloqueo();

  const modal = document.getElementById('modal-logro');
  if (e.target === modal) cerrarModalLogro();
});

/* ==================== SOPORTE PARA ENTER EN CAMPO NOMBRE ==================== */
document.addEventListener('DOMContentLoaded', () => {
  const inputNombre = document.getElementById('nombre-nino');
  if (inputNombre) {
    inputNombre.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') iniciarClub();
    });
  }
});
