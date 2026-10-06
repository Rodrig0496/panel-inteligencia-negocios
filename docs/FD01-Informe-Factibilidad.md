<center>

![Logo UPT](./media/logo-upt.png)

# **UNIVERSIDAD PRIVADA DE TACNA**
## **FACULTAD DE INGENIERÍA**
### **Escuela Profesional de Ingeniería de Sistemas**

---

### **INFORME DE FACTIBILIDAD DE SOFTWARE**
**Código Documental: FD01-EPIS | Versión 1.0**

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
*Historial de Revisiones y Control de Versiones del Documento FD01*

| Versión | Hecha por | Revisada por | Aprobada por | Fecha | Motivo |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **0.1** | R. Colque / F. Ramos | Mag. P. Cuadros | Comité EPIS | 10/09/2026 | Formulación preliminar del estudio de prefactibilidad y estimación de costos. |
| **1.0** | R. Colque / F. Ramos | Mag. P. Cuadros | Escuela EPIS | 06/10/2026 | Versión formal aprobada con análisis financiero completo (VAN, TIR, B/C) y evaluación multidimensional. |

*Nota.* Control de cambios formalizado conforme al formato institucional de la Escuela Profesional de Ingeniería de Sistemas (EPIS UPT).

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# ÍNDICE GENERAL

- [1. Descripción del Proyecto](#1-descripción-del-proyecto)
  - [1.1. Nombre del proyecto](#11-nombre-del-proyecto)
  - [1.2. Duración del proyecto](#12-duración-del-proyecto)
  - [1.3. Descripción](#13-descripción)
  - [1.4. Objetivos](#14-objetivos)
    - [1.4.1. Objetivo General](#141-objetivo-general)
    - [1.4.2. Objetivos Específicos](#142-objetivos-específicos)
- [2. Riesgos](#2-riesgos)
- [3. Análisis de la Situación Actual](#3-análisis-de-la-situación-actual)
  - [3.1. Planteamiento del problema](#31-planteamiento-del-problema)
  - [3.2. Consideraciones de hardware y software](#32-consideraciones-de-hardware-y-software)
- [4. Estudio de Factibilidad](#4-estudio-de-factibilidad)
  - [4.1. Factibilidad Técnica](#41-factibilidad-técnica)
  - [4.2. Factibilidad Económica](#42-factibilidad-económica)
    - [4.2.1. Costos Generales](#421-costos-generales)
    - [4.2.2. Costos Operativos durante el Desarrollo](#422-costos-operativos-durante-el-desarrollo)
    - [4.2.3. Costos del Ambiente](#423-costos-del-ambiente)
    - [4.2.4. Costos de Personal](#424-costos-de-personal)
    - [4.2.5. Costos Totales del Desarrollo del Sistema](#425-costos-totales-del-desarrollo-del-sistema)
  - [4.3. Factibilidad Operativa](#43-factibilidad-operativa)
  - [4.4. Factibilidad Legal](#44-factibilidad-legal)
  - [4.5. Factibilidad Social](#45-factibilidad-social)
  - [4.6. Factibilidad Ambiental](#46-factibilidad-ambiental)
- [5. Análisis Financiero](#5-análisis-financiero)
  - [5.1. Justificación de la Inversión](#51-justificación-de-la-inversión)
    - [5.1.1. Beneficios del Proyecto (Tangibles e Intangibles)](#511-beneficios-del-proyecto)
    - [5.1.2. Criterios de Inversión (B/C, VAN, TIR)](#512-criterios-de-inversión)
- [6. Conclusiones](#6-conclusiones)

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 1. Descripción del Proyecto

## 1.1. Nombre del proyecto
**MONITOR DE MÉTRICAS BI: SISTEMA INTELIGENTE DE ANALÍTICA DE REPOSITORIOS GITHUB, GESTIÓN DE EQUIPOS Y TOMA DE DECISIONES EMPRESARIALES**  
*(Nombre comercial / Identificador de Producto: **DevMetrics BI Solutions**)*

## 1.2. Duración del proyecto
El proyecto comprende un ciclo de vida de desarrollo de **16 semanas calendario** (Semestre Académico 2026-II: Septiembre 2026 – Diciembre 2026), estructurado en 4 iteraciones ágiles tipo Sprint de 4 semanas cada una, cubriendo las etapas de levantamiento de información, diseño arquitectónico, construcción de la Single Page Application (SPA), integración de APIs y despliegue continuo en la nube.

## 1.3. Descripción
El proyecto consiste en el diseño, desarrollo e implantación de una plataforma web inteligente de Business Intelligence y observabilidad de repositorios orientada a la ingeniería de software moderna. En las empresas de base tecnológica, factorías de software y talleres académicos de la EPIS UPT, el control de versiones y el seguimiento de tareas se realiza masivamente a través de GitHub. Sin embargo, la supervisión de estos repositorios suele ser artesanal, dispersa y carente de indicadores clave unificados.

**Monitor de Métricas BI** integra en una única pantalla de alta fidelidad:
1. Ingesta concurrente y automatizada de indicadores clave (commits aproximados, estrellas, bifurcaciones e incidencias abiertas) a través de la GitHub REST API v3.
2. Balanceo algorítmico de carga de trabajo, identificando y alertando visualmente a cualquier colaborador que mantenga $\ge 3$ incidencias abiertas simultáneas (prevención proactiva del agotamiento laboral y de cuellos de botella).
3. Supervisión cronológica de hitos (*milestones*) con cálculo dinámico de porcentaje de avance y detección automática de fechas vencidas.
4. Integración y visualización de tableros directivos de **Microsoft Power BI Service**, incorporando un innovador mecanismo de **Fallback Seguro y Tolerante a Fallos** que garantiza el acceso ininterrumpido a los datos cuando intervienen directivas restrictivas de tenant educativo (`@virtual.upt.pe`).
5. Autenticación federada segura en un clic con GitHub OAuth 2.0 y persistencia no destructiva de perfiles de usuario en Google Cloud Firestore.

## 1.4. Objetivos

### 1.4.1. Objetivo General
Determinar la viabilidad técnica, económica, operativa, legal, social y ambiental para el desarrollo e implantación del sistema **Monitor de Métricas BI**, garantizando una solución de software de alta rentabilidad, bajo costo operativo y estricta conformidad con las normas institucionales y de calidad vigentes.

### 1.4.2. Objetivos Específicos
1. **Evaluar la factibilidad técnica** del ecosistema tecnológico basado en React 19, TypeScript, Vite, Google Cloud Firebase y GitHub REST API v3 frente a la infraestructura de red y equipos disponibles.
2. **Estimar los costos integrales del proyecto** y formular el flujo de caja proyectado para determinar los indicadores financieros: Relación Beneficio/Costo (B/C), Valor Actual Neto (VAN) y Tasa Interna de Retorno (TIR).
3. **Analizar la factibilidad operativa** respecto a la curva de aprendizaje de docentes, líderes técnicos y desarrolladores, asegurando adopción inmediata sin disrupción del trabajo cotidiano.
4. **Verificar el marco normativo y legal**, garantizando el cumplimiento de la Ley N° 29733 de Protección de Datos Personales del Perú y el correcto uso de licencias de software libre (MIT / Apache 2.0).
5. **Valorar el impacto social y ambiental**, promoviendo la salud ocupacional mediante la prevención del burnout en equipos de desarrollo y la reducción del consumo de papel mediante almacenamiento en la nube carbono neutral.

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 2. Riesgos

Para salvaguardar el cumplimiento de los hitos del proyecto, se elaboró una matriz de riesgos categorizada según probabilidad e impacto, estableciendo estrategias de mitigación proactivas:

### Tabla 2
*Matriz de Identificación, Evaluación y Mitigación de Riesgos*

| ID | Descripción del Riesgo | Probabilidad | Impacto | Nivel | Estrategia de Mitigación y Contingencia |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **R-01** | Agotamiento del límite de tasa de la API de GitHub (Rate Limit HTTP 403: 60 pet/h para anónimos). | Alta | Crítico | **Alto** | Exigir autenticación federada OAuth 2.0 que eleva la cuota inmediatamente a 5,000 peticiones por hora por usuario autenticado. Implementar manejo amigable de errores HTTP 403 con notificación orientativa. |
| **R-02** | Bloqueo de incrustación de tableros Power BI por directivas de tenant institucional (`@virtual.upt.pe`). | Muy Alta | Crítico | **Alto** | Arquitectura con mecanismo de **Fallback Seguro**: detección de políticas restrictivas y conmutación automática a botón de redirección directa con apertura segura en nueva pestaña (`target="_blank"`). |
| **R-03** | Latencia excesiva en la red universitaria o interrupción de conectividad con servidores externos. | Media | Medio | **Medio** | Ejecución asíncrona concurrente mediante `Promise.all` para procesar en paralelo `/repos`, `/issues`, `/contributors` y `/milestones`. Uso de loaders reactivos no bloqueantes. |
| **R-04** | Formato de búsqueda erróneo o URL maliciosa ingresada por los usuarios en la barra de consulta. | Alta | Medio | **Medio** | Implementación de sanitización estricta mediante expresiones regulares (Regex) que depuran protocolos, dominios y barras inclinadas, aislando inequívocamente la tupla `owner/repo`. |
| **R-05** | Modificación o revocación de tokens de acceso por parte del usuario o de GitHub. | Baja | Alto | **Medio** | Almacenamiento seguro estrictamente en memoria volátil de sesión (`sessionStorage`). Al detectar token inválido, forzar cierre de sesión limpio y redirección sin almacenar basura en local. |
| **R-06** | Superación de cuotas gratuitas del plan Spark de Google Cloud Firebase. | Muy Baja | Bajo | **Bajo** | Estructura de documentos ligera en Firestore (solo colección `/users`), lectura bajo demanda y consultas optimizadas que consumen menos del 1% del límite diario de la capa gratuita. |

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 3. Análisis de la Situación Actual

## 3.1. Planteamiento del problema
En la actualidad, los equipos de desarrollo de la Escuela Profesional de Ingeniería de Sistemas y de empresas colaboradoras ejecutan sus proyectos utilizando repositorios en GitHub. Sin embargo, el seguimiento del desempeño, la evaluación del avance de los sprints y la toma de decisiones directivas adolecen de graves deficiencias:

- **Proceso manual y disperso:** Los docentes evaluadores y Scrum Masters deben acceder individualmente a múltiples páginas y pestañas de GitHub, inspeccionar a mano la lista de commits, revisar manualmente cada issue y copiar los números a hojas de cálculo en Excel. Este proceso insume entre 48 y 72 horas por ciclo evaluativo y propicia errores humanos de transcripción.
- **Invisibilidad de la sobrecarga laboral:** No existe ningún mecanismo visual nativo que alerte de manera instantánea cuando un miembro del equipo se encuentra asignado a más tareas de las que su capacidad cognitiva puede soportar. Esto genera concentración silenciosa de responsabilidades en pocos integrantes, retrasos no advertidos y eventual agotamiento mental (*burnout*).
- **Descoordinación en los hitos temporales:** Los hitos (*milestones*) vencen sin alertas proactivas destacadas, generando que los desvíos cronológicos solo se descubran en la fecha final de entrega.
- **Incompatibilidad en paneles ejecutivos:** Aunque se construyan reportes de Power BI para presentar resultados a la alta dirección, las restricciones de seguridad institucional de las cuentas de Microsoft 365 impiden su incrustación mediante iframes en aplicaciones estándar, dejando a los evaluadores sin acceso inmediato a los gráficos analíticos.

## 3.2. Consideraciones de hardware y software

### Hardware Actual Disponible:
- Estaciones de trabajo y computadoras portátiles del equipo de desarrollo: Procesadores Intel Core i5 / i7 / AMD Ryzen 5, 16 GB de memoria RAM, discos de estado sólido (SSD) de 512 GB.
- Conexión a Internet de banda ancha estable (fibra óptica institucional y doméstica $\ge 50$ Mbps).
- No se requiere la adquisición de servidores físicos dedicados, racks ni equipos de refrigeración especializados.

### Software Actual Disponible:
- Sistemas Operativos: Windows 11 Pro / Linux Ubuntu 22.04 LTS.
- Navegadores Web Modernos: Google Chrome 115+, Mozilla Firefox 115+, Microsoft Edge 115+.
- Entorno de desarrollo: Visual Studio Code, Node.js v20+ LTS, npm / npx.
- Cuentas en servicios de nube: GitHub (plan estándar académico y profesional), Google Cloud Platform (Consola Firebase), Microsoft 365 Universidad Privada de Tacna.

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 4. Estudio de Factibilidad

## 4.1. Factibilidad Técnica
El estudio de viabilidad técnica evalúa los recursos tecnológicos disponibles, la madurez del stack seleccionado y la capacidad técnica del equipo de desarrollo para llevar a cabo la implantación exitosa:

1. **Stack de Desarrollo Frontend:** Se selecciona **React 19** compilado con **Vite**. React 19 proporciona una arquitectura Single Page Application (SPA) ultrarrápida, soporte de Hooks reactivos de última generación y renderizado modular por componentes. Vite ofrece tiempos de compilación menores a 300 ms mediante Hot Module Replacement (HMR).
2. **Capa Cloud y Persistencia Serverless:** Se utiliza **Google Cloud Firebase**:
   - **Firebase Authentication v12:** Manejo federado de GitHub OAuth 2.0 mediante ventana emergente (`signInWithPopup`), resolviendo la seguridad de credenciales sin requerir backend propio para el manejo de sesiones.
   - **Cloud Firestore:** Base de datos NoSQL serverless de alta disponibilidad, con replicación multirregión y reglas de seguridad granulares basadas en el `request.auth.uid`.
   - **Firebase Hosting:** Red de distribución de contenido (CDN) global con certificado SSL/TLS 1.3 automático y disponibilidad garantizada del 99.9%.
3. **Consumo de APIs Externas:**
   - **GitHub REST API v3:** Protocolo HTTP/REST maduro, exhaustivamente documentado, con respuestas en formato JSON estandarizado y soporte de cabeceras de autorización Bearer Token.
   - **Microsoft Power BI Service:** Capacidad de embebido mediante parámetros URL higienizados (`filterPaneEnabled=false&navContentPaneEnabled=false`) y contingencia a través de enlaces institucionales protegidos.
4. **Competencias Técnicas del Equipo:** Los integrantes del Grupo N° 4 dominan TypeScript, React, consumo de APIs REST asíncronas y modelado de datos NoSQL, garantizando un desarrollo fluido sin necesidad de contratar consultores externos.

**Conclusión Técnica:** El proyecto es **ALTAMENTE FACTIBLE TÉCNICAMENTE**, ya que no requiere inversiones en infraestructura física compleja y se sustenta en estándares modernos de la industria de software.

## 4.2. Factibilidad Económica
El estudio de viabilidad económica analiza los costos incurridos en el diseño, desarrollo, pruebas y puesta en producción, comparándolos con los beneficios económicos proyectados.

### 4.2.1. Costos Generales
Gastos en materiales, útiles de oficina y consumibles necesarios para la gestión administrativa del proyecto durante las 16 semanas.

### Tabla 3
*Costos Generales del Proyecto*

| Ítem | Cantidad | Costo Unitario (S/) | Costo Total (S/) |
| :--- | :---: | :---: | :---: |
| Cuadernos de notas técnicas y minutas | 2 unidades | 15.00 | 30.00 |
| Material de oficina y lapiceros técnicos | 1 paquete | 20.00 | 20.00 |
| Memorias flash USB 3.2 (respaldo físico) | 2 unidades | 35.00 | 70.00 |
| Impresiones de borradores y documentos de revisión | 200 hojas | 0.20 | 40.00 |
| **Total Costos Generales** | | | **S/ 160.00** |

### 4.2.2. Costos Operativos durante el Desarrollo
Gastos de servicios básicos e insumos asociados al funcionamiento del equipo durante las 16 semanas (4 meses).

### Tabla 4
*Costos Operativos Durante el Desarrollo*

| Servicio / Recurso | Duración | Costo Mensual Estimado (S/) | Costo Total (S/) |
| :--- | :---: | :---: | :---: |
| Conectividad a Internet de alta velocidad (Fibra) | 4 meses | 120.00 | 480.00 |
| Consumo de energía eléctrica (estaciones de trabajo) | 4 meses | 95.00 | 380.00 |
| Servicios de telefonía móvil y coordinación técnica | 4 meses | 45.00 | 180.00 |
| Mantenimiento preventivo de equipos de cómputo | Global | 150.00 | 150.00 |
| **Total Costos Operativos** | | | **S/ 1,190.00** |

### 4.2.3. Costos del Ambiente
Costos de infraestructura en la nube, servidores y licencias para el funcionamiento del sistema.

### Tabla 5
*Costos del Ambiente Tecnológico y Plataforma Cloud*

| Componente | Nivel / Plan | Costo Mensual (USD) | Costo Total 4 meses (S/) |
| :--- | :--- | :---: | :---: |
| Google Cloud Firebase (Hosting, Auth, Firestore) | Nivel Spark (Capa Gratuita Serverless) | $0.00 | S/ 0.00 |
| GitHub REST API v3 y GitHub OAuth App | Plan Developer Gratuito (5,000 req/h) | $0.00 | S/ 0.00 |
| Dominio web institucional / Firebase App Subdomain | Incluido (`.web.app` / `.firebaseapp.com` con SSL) | $0.00 | S/ 0.00 |
| Microsoft Power BI Service | Licencia Educativa Institucional UPT | $0.00 | S/ 0.00 |
| Visual Studio Code & Node.js Platform | Código abierto (Licencia MIT) | $0.00 | S/ 0.00 |
| **Total Costos de Ambiente** | | | **S/ 0.00** |

### 4.2.4. Costos de Personal
Gastos asociados a la dedicación horaria del recurso humano calificado para el diseño, programación, control de calidad y gestión del proyecto (16 semanas, 12 horas semanales por desarrollador = 192 horas por integrante; total: 384 horas-hombre).

### Tabla 6
*Costos de Personal de Desarrollo*

| Rol Asignado | Integrante | Horas Dedicadas | Tarifa por Hora (S/) | Total (S/) |
| :--- | :--- | :---: | :---: | :---: |
| Líder de Proyecto / Arquitecto Frontend & Cloud | Colque Quispe, Rodrigo Sídney | 192 hrs | 35.00 | 6,720.00 |
| Ingeniero de Software / Analista de Datos & QA | Ramos Atahuachi, Fabricio Farid | 192 hrs | 35.00 | 6,720.00 |
| **Total Costos de Personal** | | **384 hrs** | | **S/ 13,440.00** |

### 4.2.5. Costos Totales del Desarrollo del Sistema
Consolidación integral del presupuesto del proyecto:

### Tabla 7
*Resumen Consolidado del Presupuesto de Inversión*

| Categoría de Costo | Monto (S/) | Porcentaje (%) |
| :--- | :---: | :---: |
| Costos Generales | 160.00 | 1.08% |
| Costos Operativos | 1,190.00 | 8.05% |
| Costos del Ambiente Tecnológico | 0.00 | 0.00% |
| Costos de Personal Técnico | 13,440.00 | 90.87% |
| **Subtotal de Inversión** | **14,790.00** | **100.00%** |
| Reserva para Imprevistos y Contingencias (7%) | 1,035.30 | - |
| **COSTO TOTAL DEL PROYECTO (INVERSIÓN INICIAL $I_0$)** | **S/ 15,825.30** | - |

**Forma de Financiamiento:** Proyecto financiado mediante recursos propios de los integrantes del Grupo N° 4 en el marco de la incubación de iniciativas tecnológicas de la asignatura de Inteligencia de Negocios (EPIS UPT).

## 4.3. Factibilidad Operativa
La factibilidad operativa evalúa si el sistema se integrará con éxito en la rutina diaria de los usuarios y si la organización cuenta con la disposición y destreza para adoptarlo:

- **Usabilidad Intuitiva:** El inicio de sesión se realiza en un solo clic mediante la cuenta GitHub preexistente de los usuarios, eliminando la creación y memorización de nuevas contraseñas.
- **Acceso Inmediato:** El ingreso de un repositorio se realiza mediante selección rápida en "Mis Repos" o pegando la URL de GitHub. Las tarjetas de métricas, alertas de sobrecarga y barras de hitos se despliegan en menos de 1.5 segundos.
- **Capacitación Mínima:** Debido al diseño minimalista y reactivo de la interfaz, los docentes evaluadores y líderes técnicos requieren **menos de 15 minutos de inducción** para dominar por completo las funcionalidades del sistema.
- **Capacidad de Mantenimiento:** Al tratarse de una arquitectura serverless alojada en Firebase Hosting, no requiere intervención de administradores de bases de datos locales ni mantenimiento físico de servidores.

### Lista de Interesados Clave:
1. **Líderes Técnicos y Scrum Masters:** Obtienen visibilidad inmediata de la distribución de trabajo y evitan sobrecargar a sus desarrolladores.
2. **Desarrolladores de Software:** Verifican su desempeño individual y cuentan con un respaldo objetivo contra la asignación desmedida de incidencias.
3. **Docentes y Evaluadores Académicos (EPIS UPT):** Reducen drásticamente el tiempo de revisión de proyectos y disponen de datos fidedignos sin manipulaciones manuales.
4. **Directores de TI y Gerencia:** Acceden a paneles directivos en Power BI para evaluar el avance y la salud general de múltiples proyectos simultáneos.

## 4.4. Factibilidad Legal
El proyecto ha sido revisado conforme al marco legal de la República del Perú y las directivas internacionales de propiedad intelectual y privacidad digital:

- **Ley N° 29733 (Ley de Protección de Datos Personales del Perú):** El sistema cumple a cabalidad con la normativa, ya que **no recopila contraseñas**, datos bancarios ni información sensible privada. Los únicos datos de usuario tratados son los datos públicos provistos por GitHub (`name`, `email` público, `photoURL`, `uid`), los cuales se manejan con estricto resguardo y reglas de seguridad en Cloud Firestore.
- **Licenciamiento de Software de Terceros:** Todos los paquetes y librerías utilizadas (React 19, Vite, Firebase SDK, Lucide Icons, TypeScript) operan bajo la **Licencia MIT o Apache 2.0**, las cuales autorizan su uso libre, modificación e integración sin restricciones comerciales ni incompatibilidades de copyleft.
- **Términos de Servicio de las APIs:** El consumo de GitHub REST API y Microsoft Power BI se realiza en estricto apego a las directivas de uso aceptable de GitHub Inc. y Microsoft Corporation.

## 4.5. Factibilidad Social
El sistema promueve una cultura de transparencia, equidad y bienestar laboral en los equipos de ingeniería:

- **Salud Mental y Prevención del Burnout:** La alerta automática de sobrecarga laboral ($>= 3$ tareas abiertas) protege a los desarrolladores frente al agotamiento crónico provocado por cargas excesivas desapercibidas.
- **Colaboración Transparente:** Fomenta la responsabilidad compartida dentro de los equipos, visibilizando las contribuciones objetivas de cada integrante y reduciendo las disputas sobre el volumen de trabajo aportado.

## 4.6. Factibilidad Ambiental
El proyecto se alinea con los Objetivos de Desarrollo Sostenible (ODS), en particular con la producción responsable y la mitigación del cambio climático:

- **Infraestructura 100% Serverless Carbono Neutral:** Al alojarse en Google Cloud Firebase, la plataforma utiliza centros de datos certificados con huella de carbono neta cero y alta eficiencia energética (PUE < 1.1).
- **Cero Consumo de Papel:** Se elimina por completo la impresión de minutas, reportes de evaluación física y actas de seguimiento, digitalizando integralmente la auditoría analítica en paneles interactivos en tiempo real.

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 5. Análisis Financiero

## 5.1. Justificación de la Inversión
La justificación económica del proyecto se fundamenta en la cuantificación de los ahorros operativos generados al sustituir la auditoría manual de repositorios por la plataforma automatizada, complementada con los ingresos proyectados bajo el modelo de consultoría y licenciamiento SaaS de **DevMetrics Analytics S.A.C.**

### 5.1.1. Beneficios del Proyecto

#### a) Beneficios Tangibles (Cuantificables):
1. **Ahorro de Horas-Hombre en Auditoría y Consolidación:**
   - En el modelo tradicional, 8 grupos de desarrollo son evaluados semanalmente por docentes y líderes técnicos. Cada ciclo de revisión manual insume aproximadamente 4 horas por proyecto = 32 horas semanales.
   - Con **Monitor de Métricas BI**, la extracción toma menos de 1.5 segundos y la revisión analítica se reduce a 20 minutos por proyecto = 2.67 horas semanales.
   - Ahorro semanal: $32 - 2.67 = 29.33$ horas semanales.
   - Ahorro mensual: $29.33 \times 4 = 117.32$ horas-hombre/mes.
   - Valorizando la hora técnica en S/ 35.00:
     $$\text{Ahorro Mensual} = 117.32 \times \text{S/ } 35.00 = \text{S/ } 4,106.20\text{ al mes}$$
2. **Monetización SaaS y Servicios de Consultoría Externa:**
   - Prestación de servicios de analítica de repositorios a 5 factorías de software y clientes corporativos externos a una suscripción mensual de S/ 600.00:
     $$\text{Ingresos Mensuales SaaS} = 5 \times \text{S/ } 600.00 = \text{S/ } 3,000.00\text{ al mes}$$
   - **Beneficio Total Mensual Proyectado:**
     $$\text{Beneficio Mensual} = \text{S/ } 4,106.20 + \text{S/ } 3,000.00 = \text{S/ } 7,106.20\text{ al mes}$$

#### b) Beneficios Intangibles (Cualitativos):
- Elevación sustancial de la calidad del software entregado gracias al control continuo de hitos.
- Detección temprana y eliminación de cuellos de botella antes de las fechas límite de entrega.
- Fortalecimiento del prestigio institucional de la EPIS UPT al utilizar herramientas analíticas de nivel corporativo.
- Satisfacción y reducción del estrés laboral en desarrolladores y estudiantes.

### 5.1.2. Criterios de Inversión

Para evaluar la rentabilidad del proyecto se modela un horizonte de evaluación de **12 meses operativos**, con un **Costo de Oportunidad de Capital (COK)** anual del **14.0%** (tasa de corte representativa para proyectos de tecnología y software en el Perú).

- **Inversión Inicial ($I_0$):** S/ 15,825.30
- **Costos Operativos de Mantenimiento Mensual (a partir del mes 1):** S/ 450.00/mes (mantenimiento correctivo, soporte y hosting avanzado).
- **Flujo Neto de Beneficio Mensual ($F_t$):**
  $$F_t = \text{Beneficio Mensual} - \text{Costo Operativo Mensual} = \text{S/ } 7,106.20 - \text{S/ } 450.00 = \text{S/ } 6,656.20$$

Considerando una curva de adopción gradual durante el primer año (meses 1 a 3 al 50%, meses 4 a 6 al 80%, y meses 7 a 12 al 100%), se construye el flujo de caja proyectado:

### Tabla 8
*Flujo de Caja Económico Proyectado (Horizonte a 12 Meses en Soles)*

| Periodo | Ingresos / Ahorros (S/) | Costos Operativos (S/) | Flujo Neto Efectivo (S/) | Factor Descuento (COK 14% anual) | Valor Presente (S/) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **Mes 0** | 0.00 | 15,825.30 (Inversión) | **-15,825.30** | 1.0000 | -15,825.30 |
| **Mes 1** | 3,553.10 | 450.00 | 3,103.10 | 0.9891 | 3,069.28 |
| **Mes 2** | 3,553.10 | 450.00 | 3,103.10 | 0.9783 | 3,035.76 |
| **Mes 3** | 3,553.10 | 450.00 | 3,103.10 | 0.9677 | 3,002.87 |
| **Mes 4** | 5,684.96 | 450.00 | 5,234.96 | 0.9571 | 5,010.38 |
| **Mes 5** | 5,684.96 | 450.00 | 5,234.96 | 0.9467 | 4,955.94 |
| **Mes 6** | 5,684.96 | 450.00 | 5,234.96 | 0.9364 | 4,902.02 |
| **Mes 7** | 7,106.20 | 450.00 | 6,656.20 | 0.9262 | 6,164.97 |
| **Mes 8** | 7,106.20 | 450.00 | 6,656.20 | 0.9161 | 6,097.75 |
| **Mes 9** | 7,106.20 | 450.00 | 6,656.20 | 0.9062 | 6,031.85 |
| **Mes 10** | 7,106.20 | 450.00 | 6,656.20 | 0.8963 | 5,965.95 |
| **Mes 11** | 7,106.20 | 450.00 | 6,656.20 | 0.8865 | 5,900.72 |
| **Mes 12** | 7,106.20 | 450.00 | 6,656.20 | 0.8769 | 5,836.82 |
| **TOTALES** | **68,221.28** | **21,225.30** | **46,995.98** | - | **+44,149.01** |

#### 5.1.2.1. Relación Beneficio/Costo (B/C)
$$\text{Relación B/C} = \frac{\text{Valor Presente de Beneficios Netos}}{\text{Inversión Inicial}} = \frac{\text{S/ } 59,974.31}{\text{S/ } 15,825.30} = \mathbf{3.79}$$

*Criterio de Decisión:* Al ser $\mathbf{B/C = 3.79 > 1.0}$, por cada sol invertido en el proyecto se recupera la inversión y se generan S/ 2.79 adicionales de beneficio económico neto. **El proyecto es altamente recomendable.**

#### 5.1.2.2. Valor Actual Neto (VAN)
$$\text{VAN} = \sum_{t=1}^{12} \frac{F_t}{(1 + r)^t} - I_0 = \text{S/ } 59,974.31 - \text{S/ } 15,825.30 = \mathbf{+S/\ 44,149.01}$$

*Criterio de Decisión:* Dado que el $\mathbf{VAN = +S/\ 44,149.01 > 0}$, el proyecto no solo recupera el capital invertido y compensa el costo de oportunidad del capital (COK 14%), sino que genera una ganancia neta superior a los cuarenta y cuatro mil soles en su primer año de operación. **El proyecto se acepta categóricamente.**

#### 5.1.2.3. Tasa Interna de Retorno (TIR)
Calculando la tasa que iguala el valor presente de los flujos netos con la inversión inicial ($\text{VAN} = 0$):
$$\mathbf{TIR = 31.45\%\ \text{mensual}}\quad (\mathbf{TIR\ Anualizada > 100\%})$$

*Criterio de Decisión:* La $\mathbf{TIR = 31.45\%}$ mensual supera con creces la tasa de costo de oportunidad de capital mensualizada ($1.10\%$ mensual / $14\%$ anual). **El proyecto demuestra una rentabilidad extraordinaria y retorno acelerado.**

#### Periodo de Recuperación de la Inversión (Payback):
El punto de equilibrio y retorno completo del capital ocurre durante el **Mes 4** de operaciones ($3,103.10 \times 3 + 5,234.96 = \text{S/ } 14,544.26$, alcanzando los S/ 15,825.30 antes de finalizar dicho mes).

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 6. Conclusiones

1. **Viabilidad Multidimensional Demostrada:** El estudio de factibilidad confirma de manera contundente la viabilidad técnica, económica, operativa, legal, social y ambiental del sistema **Monitor de Métricas BI**. La solución tecnológica seleccionada no presenta barreras de infraestructura física, costos de licenciamiento prohibitivos ni impedimentos normativos.
2. **Solidez Financiera Excepcional:** Los indicadores financieros proyectados confirman la rentabilidad del proyecto: un **VAN de +S/ 44,149.01**, una **TIR de 31.45% mensual** y una relación **Beneficio/Costo de 3.79**, con recuperación íntegra de la inversión inicial de S/ 15,825.30 en menos de 4 meses de puesta en marcha.
3. **Alto Impacto Operativo y Productividad:** La erradicación del proceso de recolección manual reduce el tiempo de auditoría de métricas de 48 horas a menos de 1.5 segundos, liberando más de 117 horas-hombre mensuales para actividades pedagógicas y de ingeniería de alto valor.
4. **Innovación Arquitectónica y Resiliencia:** La incorporación del mecanismo de **Fallback Seguro para Microsoft Power BI** supera de forma definitiva las restricciones históricas del tenant educativo institucional de la UPT (`@virtual.upt.pe`), garantizando disponibilidad continua del 100% para la toma de decisiones directivas.
5. **Aprobación del Proyecto:** En mérito a los resultados expuestos, se recomienda proceder de inmediato con las fases de especificación formal de requerimientos (FD03), diseño arquitectónico (FD04) y construcción del producto de software.
