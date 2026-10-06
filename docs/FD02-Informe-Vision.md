<center>

![Logo UPT](./media/logo-upt.png)

# **UNIVERSIDAD PRIVADA DE TACNA**
## **FACULTAD DE INGENIERÍA**
### **Escuela Profesional de Ingeniería de Sistemas**

---

### **DOCUMENTO DE VISIÓN DE SOFTWARE**
**Código Documental: FD02-EPIS | Versión 1.0**

---

### **Proyecto:**
# **MONITOR DE MÉTRICAS BI:**
### **SISTEMA INTELIGENTE DE ANALÍTICA DE REPOSITORIOS GITHUB, GESTIÓN DE EQUIPOS Y TOMA DE DECISIONES EMPRESARIALES**

**Curso:** Inteligencia de Negocios (SI-885) — Semestre 2026-II  
**Docente:** Mag. Patrick José Cuadros Quiroga  
**Grupo de Desarrollo:** Grupo N° 4  

**Integrantes:**
- **Colque Quispe, Rodrigo Sídney** (Código: 2023077078)
- **Ramos Atahuachi, Fabricio Farid Edmilson** (Código: 2023076798)
- **Choqueña Choque, Mauricio Adrian** (Código: 2023076799)

**Tacna – Perú**  
**2026**

</center>

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# CONTROL DE VERSIONES

### Tabla 1
*Historial de Revisiones y Control de Versiones del Documento FD02*

| Versión | Hecha por | Revisada por | Aprobada por | Fecha | Motivo |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **0.1** | R. Colque / F. Ramos | Mag. P. Cuadros | Comité EPIS | 12/09/2026 | Definición conceptual inicial de la visión, necesidades de usuarios y alcance del producto. |
| **1.0** | R. Colque / F. Ramos | Mag. P. Cuadros | Escuela EPIS | 06/10/2026 | Versión formal consolidada según estándares RUP, ISO/IEC 25010 e IEEE Std 830. |

*Nota.* Control de cambios formalizado conforme al formato institucional de la Escuela Profesional de Ingeniería de Sistemas (EPIS UPT).

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# ÍNDICE GENERAL

- [1. Introducción](#1-introducción)
  - [1.1. Propósito](#11-propósito)
  - [1.2. Alcance](#12-alcance)
  - [1.3. Definiciones, Siglas y Abreviaturas](#13-definiciones-siglas-y-abreviaturas)
  - [1.4. Referencias](#14-referencias)
  - [1.5. Visión General](#15-visión-general)
- [2. Posicionamiento](#2-posicionamiento)
  - [2.1. Oportunidad de negocio](#21-oportunidad-de-negocio)
  - [2.2. Definición del problema](#22-definición-del-problema)
- [3. Descripción de los Interesados y Usuarios](#3-descripción-de-los-interesados-y-usuarios)
  - [3.1. Resumen de los interesados](#31-resumen-de-los-interesados)
  - [3.2. Resumen de los usuarios](#32-resumen-de-los-usuarios)
  - [3.3. Entorno de usuario](#33-entorno-de-usuario)
  - [3.4. Perfiles de los interesados](#34-perfiles-de-los-interesados)
  - [3.5. Perfiles de los usuarios](#35-perfiles-de-los-usuarios)
  - [3.6. Necesidades de los interesados y usuarios](#36-necesidades-de-los-interesados-y-usuarios)
- [4. Vista General del Producto](#4-vista-general-del-producto)
  - [4.1. Perspectiva del producto](#41-perspectiva-del-producto)
  - [4.2. Resumen de capacidades](#42-resumen-de-capacidades)
  - [4.3. Suposiciones y dependencias](#43-suposiciones-y-dependencias)
  - [4.4. Costos y precios](#44-costos-y-precios)
  - [4.5. Licenciamiento e instalación](#45-licenciamiento-e-instalación)
- [5. Características del Producto](#5-características-del-producto)
- [6. Restricciones](#6-restricciones)
- [7. Rangos de Calidad](#7-rangos-de-calidad)
- [8. Precedencia y Prioridad](#8-precedencia-y-prioridad)
- [9. Otros Requerimientos del Producto](#9-otros-requerimientos-del-producto)
  - [b) Estándares Legales](#b-estándares-legales)
  - [c) Estándares de Comunicación](#c-estándares-de-comunicación)
  - [d) Estándares de Cumplimiento de la Plataforma](#d-estándares-de-cumplimiento-de-la-plataforma)
  - [e) Estándares de Calidad y Seguridad](#e-estándares-de-calidad-y-seguridad)
- [CONCLUSIONES](#conclusiones)
- [RECOMENDACIONES](#recomendaciones)
- [BIBLIOGRAFÍA](#bibliografía)
- [WEBGRAFÍA](#webgrafía)

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 1. Introducción

## 1.1. Propósito
El propósito del presente **Documento de Visión** es recopilar, analizar y definir las necesidades estratégicas de alto nivel y las características esenciales del sistema **Monitor de Métricas BI**. Se enfoca en las capacidades clave que demandan los interesados (docentes, líderes de proyectos y desarrolladores), estableciendo una visión unificada de lo que el sistema resolverá y el valor transformador que aportará en los entornos de ingeniería de software de la EPIS UPT y empresas colaboradoras.

## 1.2. Alcance
Este documento aplica a la plataforma web analítica **Monitor de Métricas BI** (DevMetrics BI Solutions), que abarca:
- La conexión federada vía **GitHub OAuth 2.0** y sincronización de perfiles en **Google Cloud Firestore**.
- La ingesta automatizada de métricas de proyectos alojados en GitHub (commits aproximados, estrellas, bifurcaciones, incidencias abiertas, colaboradores e hitos).
- El cálculo algorítmico y señalización visual de **sobrecarga laboral en desarrolladores** ($\ge 3$ incidencias abiertas).
- El monitoreo dinámico del progreso porcentual de hitos (*milestones*) con alertas proactivas de vencimiento.
- La visualización interactiva de tableros directivos de **Microsoft Power BI**, respaldada por un mecanismo de **Fallback Seguro y Tolerante a Fallos** que garantiza acceso continuo ante directivas restrictivas de tenant educativo (`@virtual.upt.pe`).

## 1.3. Definiciones, Siglas y Abreviaturas
- **BI (Business Intelligence):** Inteligencia de Negocios; disciplina orientada a convertir datos brutos en conocimiento accionable para la toma de decisiones.
- **SPA (Single Page Application):** Aplicación web de una sola página que carga dinámicamente el contenido sin recargar la página completa.
- **OAuth 2.0 (Open Authorization 2.0):** Protocolo estándar abierto que permite autorización segura delegada en aplicaciones web sin compartir contraseñas.
- **REST (Representational State Transfer):** Estilo de arquitectura de software para sistemas de hipermedia distribuidos como la World Wide Web.
- **KPI (Key Performance Indicator):** Indicador clave de rendimiento utilizado para medir el éxito y avance de un proyecto.
- **Milestone:** Hito temporal en GitHub utilizado para agrupar incidencias y solicitudes de extracción con una fecha límite de entrega de sprint.
- **Tenant:** Entorno dedicado de una organización dentro de los servicios en la nube de Microsoft 365 / Power BI.
- **Fallback Seguro:** Mecanismo de degradación elegante que conmuta a una alternativa segura ante la denegación de un recurso incrustado.
- **Burnout:** Síndrome de agotamiento físico y mental crónico producido por sobrecarga de trabajo no balanceada.

## 1.4. Referencias
- Bass, L., Clements, P., & Kazman, R. (2021). *Software architecture in practice* (4th ed.). Addison-Wesley Professional.
- IEEE Std 830-1998: *IEEE Recommended Practice for Software Requirements Specifications*.
- ISO/IEC 25010:2011: *Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE)*.
- EPIS UPT. (2026). *Guía metodológica para la formulación de proyectos de desarrollo de software*. Universidad Privada de Tacna.
- Documento FD01-EPIS: *Informe de Factibilidad de Software - Monitor de Métricas BI* (2026).
- Documento FD03-EPIS: *Documento de Especificación de Requerimientos de Software - Monitor de Métricas BI* (2026).

## 1.5. Visión General
El documento está organizado en secciones que describen el posicionamiento estratégico del producto, el perfil de sus usuarios e interesados, el catálogo formal de capacidades y características, las restricciones arquitectónicas y los rangos de calidad exigidos, concluyendo con los estándares aplicados y la bibliografía técnica.

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 2. Posicionamiento

## 2.1. Oportunidad de negocio
En la industria tecnológica contemporánea y en las facultades de ingeniería de software, GitHub es la plataforma hegemónica de desarrollo colaborativo. A pesar de su robustez para el control de versiones, la plataforma no provee tableros ejecutivos consolidados en una vista única para directores ni herramientas predictivas que protejan la salud de los desarrolladores frente al agotamiento por saturación de asignaciones.

La oportunidad de negocio de **DevMetrics Analytics S.A.C.** radica en posicionar **Monitor de Métricas BI** como una solución SaaS ágil y de cero fricción, que centraliza los KPIs de desarrollo, balancea inteligentemente la carga de trabajo y democratiza el acceso a informes directivos de Power BI en un entorno web reactivo de carga ultrarrápida ($< 1.5$ s).

## 2.2. Definición del problema

### Tabla 2
*Declaración Formal del Problema de Negocio*

| Enunciado | Detalle |
| :--- | :--- |
| **El problema de...** | La supervisión manual, fragmentada e ineficiente de repositorios en GitHub, la falta de detección temprana de sobrecarga de trabajo en los desarrolladores y los bloqueos de seguridad institucionales al visualizar tableros analíticos de Microsoft Power BI. |
| **Afecta a...** | Docentes universitarios, evaluadores académicos, líderes técnicos (Project Managers, Scrum Masters), especialistas en Business Intelligence y desarrolladores de software. |
| **El impacto de lo cual es...** | Demoras de 48 a 72 horas para consolidar informes de sprint, errores humanos en la transcripción de métricas a hojas de cálculo, retrasos silenciosos e integraciones defectuosas por sobrecarga laboral de programadores clave, y frustración por tableros ejecutivos bloqueados por directivas de tenant universitario (`@virtual.upt.pe`). |
| **Una solución exitosa sería...** | Una plataforma web Single Page Application (SPA) que se autentique mediante GitHub OAuth en un clic, extraiga y unifique automáticamente métricas de repositorios en tiempo real ($< 1.5$ s), alerte visualmente la sobrecarga laboral ($\ge 3$ incidencias abiertas), supervise el avance porcentual de hitos cronológicos y provea un mecanismo de Fallback Seguro para renderizar o acceder a tableros de Power BI sin impedimentos de seguridad. |

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 3. Descripción de los Interesados y Usuarios

## 3.1. Resumen de los interesados

### Tabla 3
*Resumen de Interesados del Sistema*

| Nombre del Interesado | Representación | Papel / Responsabilidad en el Proyecto |
| :--- | :--- | :--- |
| **Mag. Patrick Cuadros Quiroga** | Docente de Inteligencia de Negocios (SI-885) | Validador principal del proyecto, evaluador académico de entregables y patrocinador institucional en la EPIS UPT. |
| **Escuela Profesional de Ingeniería de Sistemas (EPIS UPT)** | Autoridad Académica Universitaria | Entidad rectora que establece las normativas, rúbricas de evaluación y lineamientos metodológicos de graduación. |
| **DevMetrics Analytics S.A.C.** | Empresa Consultora / Grupo de Desarrollo | Entidad creadora y operadora de la solución de software, responsable del soporte, evolución y arquitectura del producto. |
| **Líderes Técnicos y Scrum Masters de Software** | Industria y Talleres Estudiantiles | Interesados operativos que buscan mejorar la visibilidad del sprint y asegurar entregas a tiempo sin desgastar al equipo. |

## 3.2. Resumen de los usuarios

### Tabla 4
*Resumen de Usuarios Finales*

| Tipo de Usuario | Descripción | Nivel Técnico | Grado de Adopción |
| :--- | :--- | :---: | :---: |
| **Líder Técnico / PM** | Administra el equipo, distribuye tareas y evalúa el ritmo de desarrollo. | Avanzado | Diario / Constante |
| **Desarrollador** | Escribe código, resuelve incidencias y consulta su avance individual. | Medio - Avanzado | Diario |
| **Docente Evaluador** | Revisa el desempeño de múltiples grupos académicos simultáneos. | Avanzado | Semanal |
| **Analista BI** | Construye modelos DAX y gestiona reportes en Power BI Service. | Avanzado | Semanal / Por hito |
| **Directivo / Stakeholder** | Consulta métricas de alto nivel para decisiones de financiamiento y continuidad. | Básico - Medio | Mensual |

## 3.3. Entorno de usuario
Los usuarios accederán a **Monitor de Métricas BI** a través de navegadores web modernos (Chrome, Firefox, Edge, Safari) desde computadoras de escritorio, laptops y pantallas ejecutivas. El entorno requiere acceso a Internet con ancho de banda $\ge 10$ Mbps para consultas de API en tiempo real. La interfaz debe adaptarse fluidamente a pantallas Full HD (1920x1080), laptops (1366x768) y monitores de alta densidad de píxeles sin pérdida de legibilidad ni deformación de componentes interactivos.

## 3.4. Perfiles de los interesados

### Tabla 5
*Perfiles Detallados de los Interesados*

| Perfil | Objetivo Estratégico | Criterio de Éxito Principal |
| :--- | :--- | :--- |
| **Docente del Curso** | Evaluar de forma rápida, objetiva y continua el trabajo de todos los grupos de la asignatura SI-885. | Reducción del tiempo de calificación semanal y eliminación de quejas por inequidad en el reparto de tareas. |
| **Comité Técnico EPIS** | Validar que el proyecto cumpla con los estándares IEEE 830, ISO 25010 y RUP exigidos en el plan de estudios. | Documentación técnica rigurosa (FD01 a FD06) y código fuente funcional desplegado en producción. |

## 3.5. Perfiles de los Usuarios

### Tabla 6
*Perfiles Detallados de los Usuarios*

| Perfil | Tareas Principales | Motivaciones | Puntos de Dolor Actuales |
| :--- | :--- | :--- | :--- |
| **PU-01: Líder Técnico** | Rebalancear tareas, supervisar hitos y reportar estado a gerencia. | Mantener al equipo productivo y entregar sprints en la fecha pactada. | Incertidumbre sobre quién tiene demasiadas tareas; copiar datos a mano a Excel. |
| **PU-02: Desarrollador** | Revisar issues asignadas y verificar porcentaje de contribuciones. | Evitar saturación laboral y demostrar su trabajo de forma transparente. | Acumular 3 o más tareas críticas sin que nadie se dé cuenta del riesgo de colapso. |
| **PU-03: Docente Evaluador** | Revisar los repositorios de los estudiantes en sesiones de laboratorio. | Calificar con base en hechos verificables de GitHub y tableros BI. | Perder tiempo abriendo pestaña por pestaña y sufrir bloqueos de iframes en Power BI. |

## 3.6. Necesidades de los interesados y usuarios

### Tabla 7
*Matriz de Necesidades y Soluciones Propuestas*

| Necesidad Detectada | Prioridad | Solución Implementada en Monitor de Métricas BI |
| :--- | :---: | :--- |
| Extracción instantánea de métricas de proyectos en GitHub sin demoras de transcripción. | **Alta** | Consumo directo y concurrente de la GitHub REST API v3 con renderizado de tarjetas KPI en $< 1.5$ segundos. |
| Identificación visual de integrantes del equipo sobrecargados de trabajo para reasignar tareas. | **Alta** | Algoritmo de detección de sobrecarga que cruza colaboradores con incidencias abiertas y coloca insignia roja si tareas $\ge 3$. |
| Seguimiento cronológico de hitos para prever entregas tardías. | **Alta** | Cálculo dinámico de porcentaje de avance y bandera de alerta roja si la fecha de vencimiento (`due_on`) es menor a la fecha actual. |
| Acceso confiable a paneles de Power BI a pesar de bloqueos de tenant universitario `@virtual.upt.pe`. | **Alta** | Mecanismo de Fallback Seguro que detecta políticas restrictivas y provee botón de enlace institucional directo en nueva pestaña. |
| Autenticación rápida sin necesidad de gestionar otra cuenta y contraseña. | **Media** | Login federado seguro con GitHub OAuth 2.0 y Firebase Auth en un clic con persistencia en Google Cloud Firestore. |

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 4. Vista General del Producto

## 4.1. Perspectiva del producto
**Monitor de Métricas BI** es un producto web autosuficiente que actúa como un puente analítico inteligente entre la plataforma de desarrollo colaborativo **GitHub**, la infraestructura en la nube serverless de **Google Cloud Firebase** y la plataforma de visualización directiva **Microsoft Power BI Service**. No reemplaza a GitHub para editar código ni a Power BI para crear informes complejos; se sitúa como la **torre de control ejecutiva** que unifica ambos mundos en una interfaz reactiva, moderna y accesible.

## 4.2. Resumen de capacidades

### Tabla 8
*Resumen de Capacidades del Sistema*

| Capacidad del Sistema | Beneficio para el Cliente / Usuario |
| :--- | :--- |
| **Autenticación Federada OAuth 2.0** | Acceso en 1 clic; cuota de GitHub API ampliada de 60 a 5,000 peticiones/hora sin exponer contraseñas. |
| **Selector Inteligente "Mis Repos"** | Lista y carga al instante cualquiera de los repositorios pertenecientes al usuario conectado. |
| **Tarjetas KPI en Tiempo Real** | Commits estimados, estrellas, bifurcaciones e incidencias abiertas consolidadas en una pantalla. |
| **Balanceo y Alerta de Sobrecarga** | Señalización visual proactiva con ícono de advertencia para colaboradores con 3 o más tareas abiertas. |
| **Panel de Hitos y Alerta de Atraso** | Barra de porcentaje de avance y rótulo de alerta destacando hitos vencidos no cerrados. |
| **Contenedor y Fallback Power BI** | Embebido limpio de reportes con fallback tolerante a fallos para cuentas del tenant `@virtual.upt.pe`. |
| **Auditoría No Destructiva en Nube** | Registro automático de accesos en Firestore (`/users`) preservando la trazabilidad de uso. |

## 4.3. Suposiciones y dependencias
- **Conectividad a Internet:** El funcionamiento de la aplicación depende de la disponibilidad de la conexión a Internet y la operatividad de los servidores de GitHub API, Google Firebase y Power BI.
- **Cuentas de GitHub Válidas:** Los usuarios deben poseer cuentas activas de GitHub para autenticarse e inspeccionar repositorios privados.
- **Navegadores Modernos:** Se asume el uso de navegadores con soporte completo de ES6+, Web Crypto API y Fetch API.

## 4.4. Costos y precios
- **Modelo de Licenciamiento Académico:** Acceso 100% gratuito para docentes, estudiantes e investigadores de la Universidad Privada de Tacna.
- **Modelo Comercial SaaS (DevMetrics BI Solutions):** Suscripción mensual de **S/ 600.00** para empresas de desarrollo y factorías de software interesadas en monitoreo continuo multi-repositorio, con soporte técnico y personalización de métricas.

## 4.5. Licenciamiento e instalación
- **Despliegue Web:** No requiere instalación física en el equipo cliente. Se accede a través de la URL de producción en Firebase Hosting mediante navegador web.
- **Licencia:** Distribuido bajo la **Licencia de Código Abierto MIT**, garantizando transparencia, auditabilidad y derecho a personalización institucional.

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 5. Características del Producto

### Tabla 9
*Catálogo Formal de Características del Producto (FEAT-01 a FEAT-10)*

| Código | Característica | Descripción Funcional de Alto Nivel |
| :---: | :--- | :--- |
| **FEAT-01** | **Autenticación Federada GitHub OAuth** | Mecanismo de inicio de sesión mediante ventana emergente (*popup*) con GitHub, resguardando el token de acceso en memoria volátil de sesión (`sessionStorage`). |
| **FEAT-02** | **Sincronización y Auditoría en Firestore** | Persistencia no destructiva del perfil de usuario (`uid`, nombre, correo, foto y fecha de conexión) en la colección `/users` de Google Cloud Firestore con `{ merge: true }`. |
| **FEAT-03** | **Explorador Rápido "Mis Repos"** | Desplegable que obtiene los primeros 100 repositorios del usuario ordenados por última actualización para carga en un clic. |
| **FEAT-04** | **Extracción Concurrente de Indicadores** | Consumo asíncrono en paralelo de endpoints de GitHub API v3, recuperando commits aproximados, estrellas, forks e incidencias abiertas. |
| **FEAT-05** | **Sanitización Universal de URLs** | Expresión regular que depura URLs completas, protocolos y terminaciones `.git`, abstrayendo limpiamente el formato `propietario/repositorio`. |
| **FEAT-06** | **Detección Algorítmica de Sobrecarga** | Mapeo cruzado de incidencias abiertas contra colaboradores; si las tareas asignadas son $\ge 3$, se añade distintivo rojo con alerta de sobrecarga. |
| **FEAT-07** | **Supervisión Cronológica de Hitos** | Cálculo automático del porcentaje de avance de cada hito y despliegue visual de barras de progreso según tareas completadas. |
| **FEAT-08** | **Alerta Temprana de Hitos Vencidos** | Comparación de fecha límite (`due_on`) contra reloj del sistema; activación de bandera roja en hitos abiertos cuya fecha límite expiró. |
| **FEAT-09** | **Incrustación Higienizada de Power BI** | Renderizado en contenedor `<iframe>` con inyección de parámetros para ocultar paneles superfluos (`filterPaneEnabled=false&navContentPaneEnabled=false`). |
| **FEAT-10** | **Fallback Seguro Tolerante a Fallos** | Panel de contingencia institucional que se activa ante bloqueos de políticas de tenant universitario (`@virtual.upt.pe`), proveyendo acceso directo en nueva pestaña. |

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 6. Restricciones

1. **Restricción de Sólo Lectura en GitHub:** El sistema opera estrictamente bajo el principio de menor privilegio sobre los repositorios analizados. No ejecuta escrituras, eliminación de código, mezclas de ramas ni cierre de incidencias en GitHub.
2. **Restricción de Tokens en Almacenamiento Volátil:** El token de GitHub nunca debe residir en `localStorage` ni ser expuesto en repositorios públicos. Se destruye inmediatamente al cerrar la pestaña o desconectarse.
3. **Restricciones de Cuota de GitHub REST API:** Las cuentas autenticadas están sujetas al límite de 5,000 peticiones por hora establecido por GitHub. Ante error HTTP 403, el sistema debe informar el tiempo restante de reinicio de cuota.
4. **Restricciones de Directivas de Tenant de Microsoft:** Los reportes de Power BI generados en cuentas de Microsoft 365 con restricciones de iframe no pueden forzar la ruptura de encabezados `X-Frame-Options` o políticas CORS; deben canalizarse por el Fallback Seguro.
5. **Cumplimiento Normativo:** El sistema se sujeta a la Ley N° 29733 de Protección de Datos Personales del Perú y al uso de librerías bajo licencias MIT/Apache 2.0.

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 7. Rangos de Calidad

Los atributos de calidad se formulan bajo el estándar internacional **ISO/IEC 25010:2011**:

- **Rendimiento y Eficiencia Temporal:** El tiempo de carga y presentación de las métricas de un repositorio debe ser menor a **1.5 segundos** bajo condiciones estándar de red ($\ge 10$ Mbps).
- **Consumo de Memoria:** El consumo de memoria del cliente en el navegador debe mantenerse por debajo de **150 MB** con hasta 50 colaboradores cargados.
- **Usabilidad y Accesibilidad:** Navegación fluida e intuitiva con contrastes acordes a la norma **WCAG 2.1 AA**, operable por un usuario nuevo en menos de **30 segundos** sin requerir inducción formal.
- **Fiabilidad y Disponibilidad:** Disponibilidad operativa garantizada del **99.9%** mediante Firebase Hosting y degradación elegante ante caídas de APIs externas.
- **Mantenibilidad y Modularidad:** Código estructurado en componentes puros en React 19 y TypeScript con alta cohesión y bajo acoplamiento.
- **Portabilidad:** Compatibilidad garantizada en los navegadores Google Chrome 115+, Mozilla Firefox 115+, Microsoft Edge 115+ y Apple Safari 17+.

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 8. Precedencia y Prioridad

La priorización de características se clasifica mediante la técnica **MoSCoW**:

- **Must Have (Obligatorio - Prioridad Crítica):**
  - FEAT-01: Autenticación Federada GitHub OAuth 2.0.
  - FEAT-04: Extracción de métricas generales (commits, stars, forks, issues).
  - FEAT-05: Sanitización de URLs de repositorios.
  - FEAT-06: Detección y alerta visual de sobrecarga laboral ($\ge 3$ tareas).
  - FEAT-07: Supervisión de porcentaje de avance en hitos.
  - FEAT-08: Alerta de hitos vencidos.
  - FEAT-10: Fallback Seguro de Power BI para tenant institucional.
- **Should Have (Deseable - Alta Prioridad):**
  - FEAT-02: Persistencia y auditoría de perfiles en Cloud Firestore.
  - FEAT-03: Selector desplegable "Mis Repos".
  - FEAT-09: Embebido limpio de Power BI con parámetros de URL.
- **Could Have (Opcional - Mediana Prioridad):**
  - Exportación de métricas a formato PDF / Excel.
  - Conmutador de modo oscuro / claro dinámico.
- **Won't Have (Pospuesto para siguientes fases):**
  - Envío de notificaciones automáticas por WhatsApp o correo ante hitos vencidos.
  - Edición y cierre directo de incidencias desde la aplicación web.

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 9. Otros Requerimientos del Producto

### b) Estándares Legales
- Cumplimiento integral con la **Ley N° 29733** (Ley de Protección de Datos Personales del Perú) y su reglamento (D.S. 003-2013-JUS).
- Respeto a los Términos de Servicio de la API de GitHub y directivas de uso aceptable de Microsoft 365.
- Licenciamiento de dependencias de software bajo licencias de código abierto compatibles (MIT, BSD, Apache 2.0).

### c) Estándares de Comunicación
- Comunicaciones cliente-servidor cifradas estrictamente mediante **HTTPS con protocolo TLS 1.3**.
- Formato de intercambio de datos estandarizado en **JSON (JavaScript Object Notation)** con codificación UTF-8.
- Cumplimiento del estándar **REST (HTTP Verbs: GET, POST)** para peticiones hacia la GitHub API.

### d) Estándares de Cumplimiento de la Plataforma
- Arquitectura construida sobre **Node.js LTS (v20+)**, empaquetada con **Vite 6** y ejecutada en **React 19**.
- Tipado estático riguroso mediante **TypeScript 5+**, previniendo excepciones en tiempo de ejecución.
- Cumplimiento de las especificaciones de **Firebase SDK v12 Modular Web**.

### e) Estándares de Calidad y Seguridad
- Protección contra Cross-Site Scripting (XSS) mediante escape automático de entradas en React DOM.
- Políticas de seguridad de contenido (**Content Security Policy - CSP**) y control de orígenes cruzados (**CORS**).
- No persistencia de secretos corporativos en repositorios de código público (uso de variables de entorno `.env`).

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# CONCLUSIONES

1. **Visión Alineada al Valor del Negocio:** El sistema **Monitor de Métricas BI** responde a una necesidad crítica y desatendida en los entornos de desarrollo de la EPIS UPT y la industria de software: la falta de una torre de control analítica en tiempo real que prevenga la sobrecarga laboral y unifique métricas de GitHub con la inteligencia de negocios de Power BI.
2. **Solución Tecnológica de Alto Impacto:** La combinación de React 19, Vite, Firebase y GitHub API ofrece una experiencia de usuario instantánea ($< 1.5$ s), segura y resiliente, reduciendo los tiempos de auditoría en un 99.9% frente al esquema tradicional de hojas de cálculo.
3. **Resiliencia Demostrada con Fallback Seguro:** El diseño del conmutador de contingencia institucional supera definitivamente los problemas de incrustación de iframes causados por el tenant `@virtual.upt.pe`, garantizando disponibilidad ininterrumpida de reportes para docentes y directivos.
4. **Cumplimiento de Estándares Internacionales:** La visión formalizada se estructura bajo estándares reconocidos (IEEE 830, ISO 25010, RUP, MoSCoW), garantizando una transición impecable hacia la arquitectura (FD04) y la implementación del software.

---

# RECOMENDACIONES

1. **Extensión hacia Webhooks de GitHub:** Se recomienda integrar receptores de eventos en Firebase Functions para que cualquier commit o cambio en incidencias actualice el tablero en tiempo real sin requerir sondeos de API.
2. **Capacitación y Despliegue en Laboratorios:** Coordinar con los docentes de la EPIS UPT la adopción de la herramienta en los cursos de desarrollo y gestión de proyectos, recopilando retroalimentación de los estudiantes para futuros sprints.
3. **Exploración de la API GraphQL de GitHub:** Evaluar la implementación de consultas compuestas con GraphQL v4 para compactar en una sola solicitud los colaboradores, issues y estadísticas de commits.

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# BIBLIOGRAFÍA

- Bass, L., Clements, P., & Kazman, R. (2021). *Software architecture in practice* (4th ed.). Addison-Wesley Professional.
- Cockburn, A. (2001). *Writing effective use cases*. Addison-Wesley Professional.
- Escuela Profesional de Ingeniería de Sistemas [EPIS UPT]. (2026). *Guía metodológica para la formulación de proyectos y especificación de requerimientos de software (Documentos FD01 a FD06)*. Universidad Privada de Tacna.
- Ferrari, A., & Russo, M. (2020). *The definitive guide to DAX: Business intelligence with Microsoft Power BI, SQL Server Analysis Services, and Excel* (2nd ed.). Microsoft Press.
- IEEE. (1998). *IEEE Recommended Practice for Software Requirements Specifications* (IEEE Std 830-1998). Institute of Electrical and Electronics Engineers.
- ISO/IEC. (2011). *Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models* (ISO/IEC 25010:2011). International Organization for Standardization.
- ISO/IEC/IEEE. (2018). *Systems and software engineering — Life cycle processes — Requirements engineering* (ISO/IEC/IEEE 29148:2018). International Organization for Standardization.
- Pressman, R. S., & Maxim, B. R. (2020). *Software engineering: A practitioner's approach* (9th ed.). McGraw-Hill Education.
- Sommerville, I. (2016). *Software engineering* (10th ed.). Pearson Education.

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# WEBGRAFÍA

- GitHub Inc. (2024). *GitHub REST API documentation: Repositories, issues, and milestones*. GitHub Docs. https://docs.github.com/en/rest
- Google Cloud. (2024). *Cloud Firestore documentation: Data model, security rules, and real-time listeners*. Google Cloud Documentation. https://firebase.google.com/docs/firestore
- Meta Open Source. (2024). *React 19 documentation: Actions, Server Components, and concurrency hooks*. React. https://react.dev
- Microsoft Corporation. (2024). *Power BI embedded analytics documentation: Embedding reports, secure authentication, and tenant administration*. Microsoft Learn. https://learn.microsoft.com/en-us/power-bi/developer/embedded/
- Vite Team. (2024). *Vite: Next Generation Frontend Tooling*. https://vitejs.dev/
