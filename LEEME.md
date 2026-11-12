# FRED · edición móvil 02 con voz personalizada local

Código completo en `index.html`: HTML, CSS, JavaScript y código de los workers incluidos. Los demás archivos habilitan la instalación y la caché PWA. No hay compilación, claves incorporadas ni backend propio.

## Empezar en dos minutos

1. Descomprime este ZIP.
2. Para usar cámara, micrófono e instalación, publica TODOS los archivos de la carpeta en HTTPS. No subas el ZIP sin descomprimir.
3. Abre la dirección publicada en Chrome Android o Safari iPhone. Pulsa «Vamos a resolver».
4. Ajustes → Activar voz de FRED: descarga el motor Pocket TTS y procesa la grabación incluida. Después pulsa Probar voz clonada. No necesita cuenta ni API. Puedes escribir inmediatamente. El botón ◉ activa el micrófono y solicita permiso.
5. Para conversación abierta: Ajustes → Descargar y activar cerebro local. Usa Wi-Fi y mantén la app abierta. Si WebGPU o la memoria no bastan, FRED informa del fallo y conserva los comandos básicos.
6. Android: menú ⋮ → Instalar aplicación / Añadir a pantalla de inicio. iPhone: Compartir → Añadir a pantalla de inicio.

### GitHub Pages gratis

Necesitas una cuenta de GitHub PARA PUBLICAR, pero quien use FRED no necesita cuenta, contraseña ni claves.

- Crea un repositorio público llamado `fred`.
- Add file → Upload files: sube index.html, sw.js, manifest.webmanifest, ambos iconos y la carpeta voice completa a la raíz. La carpeta voice contiene tu referencia de voz: solo publícala si tienes permiso para hacerla pública.
- Settings → Pages → Deploy from a branch → main → /(root) → Save.
- Cuando termine la publicación, abre la dirección HTTPS que GitHub muestra.
- Código e instrucciones: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

Abrir index.html como archivo local permite revisar la interfaz y parte de los comandos. NO es una instalación PWA completa y no garantiza micrófono, cámara, módulos externos ni persistencia. Para desarrollo en un ordenador puede servirse con `python3 -m http.server 8000` y abrir localhost; la IP HTTP de ese ordenador desde el teléfono no equivale a localhost seguro.

## Comandos para probar

- «Hola»
- «Me llamo Iván»
- «Me gusta la economía»
- «Recuerda que debo estudiar econometría»
- «Mis notas»
- «¿Cómo está el clima?» (Santo Domingo)
- «Convierte 100 dólares a pesos» (cantidad sin separador de miles; admite decimales)
- «Temporizador de 5 minutos» / «Cancela el temporizador»
- «Abre YouTube», «Abre WhatsApp», «Abre Maps», «Abre Gmail», «Abre TradingView»
- «Enséñame una foto de Santo Domingo»
- «Usa la cámara» → encuadrar → Capturar y analizar

Los comandos son una gramática acotada. El modo básico NO es un modelo de inteligencia artificial. Las peticiones generales pasan al modelo solo cuando se ha activado correctamente.

## Qué está incluido y qué depende del dispositivo

| Función | Implementación y límite |
|---|---|
| Interfaz neuronal | Canvas, 64 nodos, DPR máximo 2, animación por requestAnimationFrame; no se garantizan 60 FPS en todos los teléfonos. Respeta movimiento reducido. |
| Conversación inteligente | WebLLM/Qwen 0.5B local opcional, en un Web Worker. Descarga grande, WebGPU y RAM suficientes. Modelo pequeño: calidad limitada y posibles errores. No probado aquí en hardware Android/iPhone. |
| Endpoint público | Adaptador OpenAI compatible con CORS, sin autenticación, configurable. No hay ningún proveedor gratuito sin claves verificado preconfigurado. Requiere consentimiento para enviar historial y memoria. |
| Pollinations | NO integrado como supuesto proveedor sin claves. La documentación actual exige autenticación para generar texto e imágenes. No se usan endpoints antiguos ni claves ajenas. |
| Voz nativa alternativa | SpeechSynthesis con voces instaladas; prioriza Pelayo y nombres masculinos conocidos, pitch 0.86, rate 0.97. Selección manual disponible. La API no expone género: se usa una heurística, no una garantía. Calidad y permisos de reproducción dependen del sistema. |
| Voz personalizada | Pocket TTS en español, ONNX Runtime Web 1.20.0 en CPU/WASM. Usa la grabación autorizada incluida, sin enviar texto ni voz a un servidor de inferencia. Modelos descargados de Hugging Face; requiere HTTPS para los workers. Genera frases nuevas; la similitud y velocidad dependen del modelo y teléfono. |
| Escucha | SpeechRecognition/webkitSpeechRecognition cuando existe. Reinicio controlado, tolerancia a errores y pausa al ocultar la app. Puede utilizar servidores del navegador y necesitar Internet. No equivale a procesamiento 100% offline. |
| Interrupción | Tocar la pantalla cancela la síntesis. Interrumpir hablando es experimental y opcional con auriculares. Por defecto se alternan escucha y habla para evitar realimentación. No hay cancelación de eco dúplex garantizada. |
| Vida propia | Comentarios tras cuatro minutos, desactivados inicialmente; activables en Ajustes. Solo con app visible, sin peticiones o cámara activas. No es un servicio de segundo plano. |
| Memoria | Nombre, gustos, notas explícitas, últimos 20 mensajes, ajustes y temporizador en localStorage. Exportación JSON y borrado. Se pierde si borras datos del navegador; no sincroniza dispositivos y no está cifrada. |
| Imágenes | Fotos reales de Wikimedia Commons, con enlace de fuente/licencia; NO imágenes generadas. Generación por IA no disponible bajo las condiciones pedidas. |
| Visión | Cámara frontal/trasera, captura sin sonido añadido, vista previa explícita. Captioning local opcional con Transformers.js y vit-gpt2; descarga grande, descripción en inglés, puede fallar o equivocarse. No se inventa una descripción si falla. No identifica personas. |
| Ondas de voz | Animación activada por estado y eventos boundary cuando están disponibles. No es un analizador de volumen de SpeechSynthesis, que no expone su audio PCM. |
| Apps | Enlaces HTTPS a cinco servicios permitidos. El usuario toca para abrirlos; el sistema decide navegador o app. No envía WhatsApp ni correo ni controla otras apps. |
| Clima | Open-Meteo sin clave; coordenadas fijas de Santo Domingo, sin solicitar ubicación personal. |
| Dólares a DOP | ExchangeRate-API de acceso abierto, referencia diaria, caché de 24 horas, fecha y atribución. No es una cotización bancaria. |
| Temporizadores | Fecha objetivo persistente y comprobación al volver a primer plano. No despierta el teléfono, no agenda alarmas del sistema ni garantiza avisos con app cerrada. |
| PWA/offline | Service worker guarda la interfaz y los iconos. No precachea modelos, proveedores, historial ni fotos. Los motores pueden gestionar su propia caché; no se garantiza funcionamiento totalmente offline. |

## Privacidad y control

La cámara solo se activa por una petición o un botón. La foto se mantiene en memoria, se procesa localmente y se descarta del visor al cerrarlo. La descarga del modelo contacta con CDN/Hugging Face, pero no envía la foto. El reconocimiento de voz es un servicio del navegador y puede enviar audio a su proveedor. Las búsquedas de fotos envían el tema a Wikimedia. Clima y cambio consultan los proveedores indicados. El servidor opcional recibe historial y memoria solo si activas su casilla.

Los textos del usuario y del modelo se insertan con textContent. Las etiquetas `[CMD: abrir youtube]` y equivalentes solo proponen enlaces de una lista permitida; no ejecutan JavaScript, URLs arbitrarias o acciones sensibles. No hay eval ni comandos del sistema.

## Archivos

- index.html: aplicación completa, estilos y workers.
- manifest.webmanifest: metadatos de instalación.
- sw.js: caché del shell con rutas relativas (compatible con subcarpetas de GitHub Pages).
- icon-192.png e icon-512.png: iconos locales.
- LEEME.md: esta guía.

## Validación realizada

Sintaxis de JavaScript comprobada con Node. En Chrome de prueba: carga de interfaz, guardar una nota, recuperarla tras recargar, temporizador de dos segundos con aviso y enlace de YouTube. Inspección visual del Canvas. No se han certificado micrófono, voces, cámara, descarga/inferencia del modelo de chat y visión, 60 FPS ni instalación en un Android/iPhone físico. Las funciones externas pueden fallar por CORS, red, cuotas o cambios del proveedor; la app muestra errores y conserva las funciones locales.

## Referencias técnicas

- Pollinations (autenticación actual): https://gen.pollinations.ai/docs
- WebLLM: https://llm.mlc.ai/docs/deploy/webllm.html
- Transformers.js: https://huggingface.co/docs/transformers.js/api/pipelines
- Web Speech: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
- Open-Meteo: https://open-meteo.com/en/docs
- ExchangeRate-API abierto: https://www.exchangerate-api.com/docs/free

Esta entrega es una base funcional con límites explícitos. La combinación de inteligencia remota ilimitada sin claves, generación gratuita garantizada, escucha permanente en segundo plano y control nativo completo en ambos sistemas no puede prometerse como una PWA.

## Voz personalizada: cambios en edición 02

- Motor local Pocket TTS español, sin claves ni cuotas de generación.
- La referencia es tu archivo heygen-speech (1).wav, conservado como voice/reference.wav.
- No se usa HeyGen para la síntesis. La clonación en HeyGen no estaba disponible en el plan gratuito.
- Cada sesión requiere activar el motor; los pesos públicos se cachean cuando el navegador permite Cache Storage.
- La representación de la voz se guarda en localStorage en este origen.
- La voz nativa no se sustituye silenciosamente por la clonada ni al revés; el motor se elige en Ajustes.
- Interrumpir tocando cancela reproducción y pide al worker detener la generación.
- La descarga inicial puede superar 200 MB contando el runtime y el codificador. Usa Wi-Fi y deja la página visible.
- La primera respuesta puede tardar: el modelo corre en la CPU del móvil. No se garantiza conversación en tiempo real ni compatibilidad con todos los iPhone/Android.
- El modelo de chat y el de voz son independientes. Activar la voz no activa el cerebro de conversación.
- Créditos y licencias en voice/NOTICE.md.

Prueba de esta edición: motor cargado en Chrome, referencia personalizada codificada y WAV de 6,24 segundos generado para la frase de prueba. Archivo FRED_prueba.wav incluido. Esto no certifica identidad acústica exacta ni rendimiento en un teléfono físico.
