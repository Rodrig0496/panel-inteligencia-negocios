<center>

![Logo UPT](./media/logo-upt.png)

# **UNIVERSIDAD PRIVADA DE TACNA**
## **FACULTAD DE INGENIERÍA**
### **Escuela Profesional de Ingeniería de Sistemas**

---

### **DOCUMENTO DE ARQUITECTURA DE SOFTWARE (SAD)**
**Código Documental: FD04-EPIS | Versión 1.0**

---

### **Proyecto:**
# **MONITOR DE MÉTRICAS BI:**
### **SISTEMA INTELIGENTE DE ANALÍTICA DE REPOSITORIOS GITHUB, GESTIÓN DE EQUIPOS Y TOMA DE DECISIONES EMPRESARIALES**

**Curso:** Inteligencia de Negocios (SI-885) — Semestre 2026-II  
**Docente:** Mag. Patrick José Cuadros Quiroga  
**Grupo de Desarrollo:** Grupo N° 4  

**Integrantes:**
- **Ramos Atahuachi, Fabricio Farid Edmilson** (Código: 2023076798)
- **Colque Quispe, Rodrigo Sídney** (Código: 2023077078)
- **Choqueña Choque, Mauricio Adrian** (Código: 2023076799)

**Tacna – Perú**  
**2026**

</center>

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# CONTROL DE VERSIONES

### Tabla 1
*Historial de Revisiones y Control de Versiones del Documento FD04*

| Versión | Hecha por | Revisada por | Aprobada por | Fecha | Motivo |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **0.1** | F. Ramos / R. Colque | Mag. P. Cuadros | Comité EPIS | 20/09/2026 | Estructuración arquitectónica inicial y selección del modelo de vistas 4+1. |
| **1.0** | F. Ramos / R. Colque | Mag. P. Cuadros | Escuela EPIS | 06/10/2026 | Versión formal completa bajo el Modelo de Vistas 4+1 de Kruchten con diagramas Mermaid integrados y evaluados. |

<br>

<center>

### **Sistema Monitor de Métricas BI**
#### *(DevMetrics BI Solutions)*
### **Documento de Arquitectura de Software**
### **Versión 1.0**

</center>

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# ÍNDICE GENERAL

- [1. INTRODUCCIÓN](#1-introducción)
  - [1.1. Propósito (Diagrama 4+1)](#11-propósito-diagrama-41)
  - [1.2. Alcance](#12-alcance)
  - [1.3. Definición, siglas y abreviaturas](#13-definición-siglas-y-abreviaturas)
  - [1.4. Organización del documento](#14-organización-del-documento)
- [2. OBJETIVOS Y RESTRICCIONES ARQUITECTÓNICAS](#2-objetivos-y-restricciones-arquitectónicas)
  - [2.1. Priorización de requerimientos](#21-priorización-de-requerimientos)
    - [2.1.1. Requerimientos Funcionales](#211-requerimientos-funcionales)
    - [2.1.2. Requerimientos No Funcionales – Atributos de Calidad](#212-requerimientos-no-funcionales--atributos-de-calidad)
  - [2.2. Restricciones](#22-restricciones)
- [3. REPRESENTACIÓN DE LA ARQUITECTURA DEL SISTEMA](#3-representación-de-la-arquitectura-del-sistema)
  - [3.1. Vista de Caso de uso](#31-vista-de-caso-de-uso)
    - [3.1.1. Diagramas de Casos de uso](#311-diagramas-de-casos-de-uso)
  - [3.2. Vista Lógica](#32-vista-lógica)
    - [3.2.1. Diagrama de Subsistemas (paquetes)](#321-diagrama-de-subsistemas-paquetes)
    - [3.2.2. Diagrama de Secuencia (vista de diseño)](#322-diagrama-de-secuencia-vista-de-diseño)
    - [3.2.3. Diagrama de Colaboración (vista de diseño)](#323-diagrama-de-colaboración-vista-de-diseño)
    - [3.2.4. Diagrama de Objetos](#324-diagrama-de-objetos)
    - [3.2.5. Diagrama de Clases](#325-diagrama-de-clases)
    - [3.2.6. Diagrama de Base de datos (relacional o no relacional)](#326-diagrama-de-base-de-datos-relacional-o-no-relacional)
  - [3.3. Vista de Implementación (vista de desarrollo)](#33-vista-de-implementación-vista-de-desarrollo)
    - [3.3.1. Diagrama de arquitectura software (paquetes)](#331-diagrama-de-arquitectura-software-paquetes)
    - [3.3.2. Diagrama de arquitectura del sistema (Diagrama de componentes)](#332-diagrama-de-arquitectura-del-sistema-diagrama-de-componentes)
  - [3.4. Vista de procesos](#34-vista-de-procesos)
    - [3.4.1. Diagrama de Procesos del sistema (diagrama de actividad)](#341-diagrama-de-procesos-del-sistema-diagrama-de-actividad)
  - [3.5. Vista de Despliegue](#35-vista-de-despliegue)
    - [3.5.1. Diagrama de despliegue](#351-diagrama-de-despliegue)
- [4. ATRIBUTOS DE CALIDAD DEL SOFTWARE](#4-atributos-de-calidad-del-software)
  - [Escenario de Funcionalidad](#escenario-de-funcionalidad)
  - [Escenario de Usabilidad](#escenario-de-usabilidad)
  - [Escenario de Confiabilidad](#escenario-de-confiabilidad)
  - [Escenario de Rendimiento](#escenario-de-rendimiento)
  - [Escenario de Mantenibilidad](#escenario-de-mantenibilidad)
  - [Otros Escenarios](#otros-escenarios)
    - [4.1. Escalabilidad](#41-escalabilidad)
    - [4.2. Seguridad (Performance)](#42-seguridad-performance)
- [5. CONCLUSIONES](#5-conclusiones)
- [6. RECOMENDACIONES](#6-recomendaciones)

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 1. INTRODUCCIÓN

## 1.1. Propósito (Diagrama 4+1)
El presente **Documento de Arquitectura de Software (Software Architecture Document - SAD)** describe de manera rigurosa e integral la arquitectura técnica del sistema **Monitor de Métricas BI** (DevMetrics BI Solutions), empleando el **Modelo de Vistas Arquitectónicas 4+1** formulado por Philippe Kruchten (1995). 

El objetivo primordial es proporcionar una descripción multidimensional, cohesiva y desacoplada del sistema para todos los interesados clave (docente evaluador, arquitectos de software, desarrolladores y especialistas en Business Intelligence), cubriendo:
1. **Vista de Casos de Uso (el "+1"):** Escenarios arquitectónicamente significativos que guían el diseño del sistema.
2. **Vista Lógica:** Estructura conceptual, subsistemas, colaboraciones, objetos, clases y modelo de persistencia.
3. **Vista de Implementación (Desarrollo):** Organización física del código fuente, módulos empaquetados y componentes de software.
4. **Vista de Procesos:** Concurrencia, flujos asíncronos y sincronización reactiva entre capas.
5. **Vista de Despliegue:** Topología física de servidores en la nube, clientes web y servicios SaaS externos.

A continuación, se representa el Modelo 4+1 adaptado a la arquitectura de **Monitor de Métricas BI**:

```mermaid
flowchart TD
    subgraph VISTAS_ARQUITECTONICAS["MODELO DE VISTAS 4+1 (PHILIPPE KRUCHTEN)"]
        UC["<b>Vista de Casos de Uso (+1)</b><br/>• Autenticación GitHub OAuth 2.0<br/>• Extracción Concurrente de Métricas<br/>• Detección de Sobrecarga (>=3 issues)<br/>• Fallback Seguro Power BI (Tenant UPT)"]
        
        VL["<b>Vista Lógica</b><br/>• Subsistemas en 4 Capas<br/>• Clases del Dominio<br/>• Diagramas de Secuencia<br/>• Modelo NoSQL Firestore"]
        
        VI["<b>Vista de Implementación</b><br/>• Componentes React 19 + TypeScript<br/>• Módulos Vite 6 SPA<br/>• Servicios Firebase SDK v12<br/>• Integración Octokit / REST"]
        
        VP["<b>Vista de Procesos</b><br/>• Flujos Asíncronos Paralelos<br/>• Algoritmo de Balanceo de Carga<br/>• Evaluación Temporal de Milestones<br/>• Manejo de Excepciones y Rate Limit"]
        
        VD["<b>Vista de Despliegue</b><br/>• Cliente Web SPA Navegador<br/>• Firebase Hosting (CDN Global)<br/>• Cloud Firestore Serverless<br/>• GitHub API v3 & Power BI Service"]
    end

    VL --- UC
    VI --- UC
    VP --- UC
    VD --- UC

    classDef core fill:#EFF6FF,stroke:#2563EB,stroke-width:2px,color:#1E3A8A;
    classDef view fill:#F8FAFC,stroke:#475569,stroke-width:1px,color:#0F172A;
    class UC core;
    class VL,VI,VP,VD view;
```

*Figura 1. Representación del Modelo de Vistas 4+1 para el Sistema Monitor de Métricas BI.*

## 1.2. Alcance
El alcance arquitectónico documentado en este SAD abarca la totalidad de los subsistemas y componentes que conforman **Monitor de Métricas BI**:
- **Capa de Presentación Web:** Single Page Application (SPA) modular construida en **React 19**, tipada con **TypeScript 5+**, empaquetada mediante **Vite 6** y enriquecida con componentes iconográficos de **Lucide React**.
- **Capa de Identidad y Seguridad:** Autenticación federada mediante **GitHub OAuth 2.0** a través de **Firebase Authentication v12**, gestionando tokens de acceso en almacenamiento de sesión volátil (`sessionStorage`).
- **Capa de Persistencia Serverless:** Auditoría y resguardo no destructivo de perfiles de usuario en **Google Cloud Firestore** (colección `/users/{uid}`).
- **Capa de Ingesta Analítica:** Orquestador de peticiones concurrentes hacia la **GitHub REST API v3** para extracción de métricas de repositorios, incidencias abiertas, contribuidores e hitos cronológicos.
- **Capa de Inteligencia de Negocios y Fallback Institucional:** Integración de tableros directivos de **Microsoft Power BI Service**, incorporando el algoritmo de **Fallback Seguro y Tolerante a Fallos** ante políticas restrictivas de tenant educativo (`@virtual.upt.pe`).

El sistema no incluye servicios contables externos, pasarelas de pago ni modificación física de repositorios remotos (opera estrictamente bajo el principio de menor privilegio en modo sólo lectura).

## 1.3. Definición, siglas y abreviaturas

### Tabla 2
*Glosario de Términos, Siglas y Abreviaturas Arquitectónicas*

| Término / Sigla | Descripción Técnica |
| :--- | :--- |
| **SAD** | *Software Architecture Document* — Documento de Arquitectura de Software. |
| **SRS / ERS** | *Software Requirements Specification* — Especificación de Requisitos de Software (FD03). |
| **BI** | *Business Intelligence* — Inteligencia de Negocios y Analítica de Datos. |
| **SPA** | *Single Page Application* — Aplicación Web de Página Única basada en componentes reactivos. |
| **REST** | *Representational State Transfer* — Estilo de arquitectura para servicios web sobre HTTP/HTTPS. |
| **OAuth 2.0** | *Open Authorization 2.0* — Protocolo estándar para autorización delegada sin compartir contraseñas. |
| **NoSQL** | *Not Only SQL* — Modelo de base de datos no relacional orientada a documentos (Cloud Firestore). |
| **JWT** | *JSON Web Token* — Estándar compacto y autónomo para transmitir información segura entre partes. |
| **KPI** | *Key Performance Indicator* — Indicador Clave de Rendimiento. |
| **Milestone** | Hito temporal de agrupación de incidencias y tareas dentro de GitHub. |
| **Rate Limit** | Límite máximo de peticiones por hora admitido por una API (60 pet/h anónimas; 5,000 pet/h con OAuth). |
| **CSP** | *Content Security Policy* — Política de seguridad HTTP para mitigar ataques XSS y secuestro de clics. |
| **CORS** | *Cross-Origin Resource Sharing* — Mecanismo de seguridad para control de accesos cruzados entre dominios. |
| **Fallback** | Mecanismo de degradación suave y contingencia ante la falla o bloqueo de un servicio dependiente. |
| **BCE** | *Boundary-Control-Entity* — Patrón de robustez y análisis orientado a objetos. |

## 1.4. Organización del documento
El presente documento se estructura en seis secciones fundamentales:
- **Sección 1 – Introducción:** Propósito bajo el modelo 4+1, alcance, definiciones y organización.
- **Sección 2 – Objetivos y Restricciones Arquitectónicas:** Priorización de requerimientos funcionales (RF) y no funcionales (RNF), restricciones tecnológicas, legales, económicas y operativas.
- **Sección 3 – Representación de la Arquitectura del Sistema:** Detalle exhaustivo de las cinco vistas del modelo Kruchten (Casos de Uso, Lógica, Implementación, Procesos y Despliegue) con diagramas ejecutables en código Mermaid.
- **Sección 4 – Atributos de Calidad del Software:** Escenarios verificables de funcionalidad, usabilidad, confiabilidad, rendimiento, mantenibilidad, escalabilidad y seguridad.
- **Sección 5 – Conclusiones:** Síntesis valorativa de la solución arquitectónica implementada.
- **Sección 6 – Recomendaciones:** Pautas técnicas para la evolución futura de la plataforma.

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 2. OBJETIVOS Y RESTRICCIONES ARQUITECTÓNICAS

## 2.1. Priorización de requerimientos
La arquitectura de **Monitor de Métricas BI** se orienta a satisfacer con máxima eficiencia los 15 Requerimientos Funcionales (RF) y 12 Requerimientos No Funcionales (RNF) formalizados en el documento de especificación FD03-EPIS. Se priorizan según su criticidad arquitectónica y su impacto directo en la observabilidad y toma de decisiones.

### 2.1.1. Requerimientos Funcionales

### Tabla 3
*Matriz de Priorización de Requerimientos Funcionales*

| ID | Nombre del Requerimiento | Prioridad | Sprint | Módulo Arquitectónico |
| :---: | :--- | :---: | :---: | :--- |
| **RF-01** | Autenticación Federada GitHub OAuth 2.0 | Alta | Sprint 1 | Módulo de Identidad y Acceso |
| **RF-02** | Cierre de Sesión Seguro y Limpieza Volátil | Alta | Sprint 1 | Módulo de Identidad y Acceso |
| **RF-03** | Consulta Automatizada de Métricas de Repositorio | Alta | Sprint 1 | Módulo de Analítica y Métricas |
| **RF-04** | Catálogo Dinámico "Mis Repos" | Media | Sprint 2 | Módulo de Identidad y Acceso |
| **RF-05** | Visualización de Colaboradores y Contribuciones | Alta | Sprint 2 | Módulo de Equipos y Carga Laboral |
| **RF-06** | Detección Algorítmica de Sobrecarga ($\ge 3$ tareas) | Alta | Sprint 2 | Módulo de Equipos y Carga Laboral |
| **RF-07** | Supervisión de Progreso en Hitos (Milestones) | Alta | Sprint 2 | Módulo de Cronograma y Sprints |
| **RF-08** | Alerta Visual de Hitos Críticos Vencidos | Alta | Sprint 2 | Módulo de Cronograma y Sprints |
| **RF-09** | Configuración Dinámica de URL de Power BI | Media | Sprint 3 | Módulo de Inteligencia de Negocios |
| **RF-10** | Renderizado Embebido Limpio de Power BI | Alta | Sprint 3 | Módulo de Inteligencia de Negocios |
| **RF-11** | Fallback Seguro de Power BI (Tenant UPT) | Alta | Sprint 3 | Módulo de Contingencia y BI |
| **RF-12** | Auditoría y Persistencia en Cloud Firestore | Media | Sprint 1 | Módulo de Persistencia y Nube |
| **RF-13** | Sanitización Universal de URLs de Repositorio | Alta | Sprint 1 | Módulo de Lógica y Normalización |
| **RF-14** | Notificación y Mitigación de Rate Limit (HTTP 403) | Media | Sprint 2 | Módulo de Resiliencia y APIs |
| **RF-15** | Búsqueda Manual de Repositorios Arbitrarios | Alta | Sprint 1 | Módulo de Analítica y Métricas |

### 2.1.2. Requerimientos No Funcionales – Atributos de Calidad

### Tabla 4
*Matriz de Requerimientos No Funcionales según ISO/IEC 25010*

| ID | Atributo / Subcaracterística | Métrica de Aceptación Arquitectónica | Prioridad |
| :---: | :--- | :--- | :---: |
| **RNF-01** | Eficiencia de Desempeño (Tiempo de Respuesta) | Carga y renderizado de métricas en menos de **1.5 segundos** bajo red $\ge 10$ Mbps. | Alta |
| **RNF-02** | Eficiencia de Desempeño (Consumo de Memoria) | Consumo de memoria RAM en el navegador no superior a **150 MB** con 50 colaboradores. | Media |
| **RNF-03** | Seguridad (Confidencialidad de Tokens) | Tokens OAuth almacenados estrictamente en `sessionStorage`; eliminación al cerrar sesión. | Alta |
| **RNF-04** | Seguridad (Reglas de Control de Acceso) | Reglas de Firestore que restringen la escritura en `/users/{uid}` estrictamente al titular del `uid`. | Alta |
| **RNF-05** | Seguridad (Aislamiento de Secretos) | Sin secretos de cliente expuestos en frontend; variables centralizadas en Firebase Console. | Alta |
| **RNF-06** | Usabilidad (Capacidad de Aprendizaje) | Operabilidad autónoma por usuarios nóveles en menos de **30 segundos** sin manual formal. | Media |
| **RNF-07** | Usabilidad (Accesibilidad y Contraste) | Cumplimiento de pautas **WCAG 2.1 Nivel AA** con código cromático claro para alertas. | Media |
| **RNF-08** | Fiabilidad (Tolerancia a Fallos) | Cero colapsos (*no crash*) ante fallas de GitHub o bloqueos de tenant en Power BI. | Alta |
| **RNF-09** | Fiabilidad (Disponibilidad Operativa) | Disponibilidad garantizada del **99.9%** mediante Firebase Hosting y CDN multirregión. | Alta |
| **RNF-10** | Mantenibilidad (Modularidad y Cohesión) | Componentes reactivos desacoplados con responsabilidades únicas en React 19 y TS. | Alta |
| **RNF-11** | Mantenibilidad (Capacidad de Prueba) | Lógica pura de cálculo de sobrecarga y avance de hitos verificable mediante pruebas unitarias. | Media |
| **RNF-12** | Portabilidad (Compatibilidad Multiplataforma) | Ejecución homogénea en Chrome 115+, Firefox 115+, Edge 115+ y Safari 17+. | Media |

## 2.2. Restricciones
Las decisiones arquitectónicas se encuentran delimitadas por las siguientes restricciones técnicas, operativas y normativas:
- **Tecnológicas:** El frontend debe ser desarrollado bajo **React 19** con compilación de alto rendimiento en **Vite 6** y tipado estático en **TypeScript**. La capa de autenticación y base de datos debe ser **Google Cloud Firebase (Auth v12 y Cloud Firestore)**. El consumo de repositorios debe apegarse estrictamente a la **GitHub REST API v3**.
- **Legales y Regulatorias:** El sistema debe cumplir con la **Ley N° 29733 de Protección de Datos Personales del Perú**. No se almacenan contraseñas privadas de los usuarios; se opera exclusivamente con perfiles públicos provistos por GitHub. Todas las dependencias utilizadas deben contar con licencias de código abierto compatibles (**MIT** o **Apache 2.0**).
- **Económicas:** Inversión de desarrollo estimada en **S/ 15,825.30**, con costo de infraestructura operativa inicial de **S/ 0.00** gracias a la capa gratuita (*Spark Plan*) de Google Cloud Firebase y al uso de tokens personales de GitHub. El proyecto presenta un **VAN de +S/ 44,149.01**, una **TIR de 31.45% mensual** y una relación **B/C de 3.79** (conforme a FD01).
- **Operativas:** El sistema debe operar en entornos corporativos y universitarios sin requerir la instalación de software adicional en los equipos clientes, ejecutándose completamente en el navegador. La inducción a docentes y líderes técnicos no debe exceder los 15 minutos.
- **Seguridad e Integración Cloud:** Los tokens de acceso emitidos por GitHub OAuth tienen vida limitada a la sesión del navegador. Ante bloqueos del tenant institucional universitario (`@virtual.upt.pe`) en Microsoft Power BI, la arquitectura prohíbe técnicas invasivas de elusión de encabezados `X-Frame-Options` o CSP, obligando al uso del conmutador de **Fallback Seguro**.

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 3. REPRESENTACIÓN DE LA ARQUITECTURA DEL SISTEMA

## 3.1. Vista de Caso de uso
La vista de casos de uso constituye el eje central del modelo Kruchten (el "+1"). Representa los escenarios de interacción arquitectónicamente más significativos que modelan el comportamiento integral del sistema: autenticación federada, ingesta concurrente de indicadores, prevención de agotamiento laboral, control temporal de hitos y visualización resiliente de tableros directivos.

### 3.1.1. Diagramas de Casos de uso
A continuación, se presenta el modelo conceptual de Casos de Uso estructurado en cuatro paquetes funcionales interconectados con los actores humanos y los sistemas externos en la nube:

```mermaid
flowchart LR
    subgraph ACTORES_HUMANOS["Actores del Dominio"]
        PM["Líder Técnico /<br/>Scrum Master"]
        DEV["Desarrollador de<br/>Software"]
        DOC["Docente Evaluador /<br/>Directivo"]
    end

    subgraph SISTEMA_MONITOR_BI["Sistema Monitor de Métricas BI"]
        subgraph MOD_IDENTIDAD["Módulo 1: Identidad y Acceso"]
            CU01(["CU-01: Iniciar Sesión con GitHub OAuth"])
            CU02(["CU-02: Cerrar Sesión Segura"])
            CU04(["CU-04: Seleccionar Repositorio en 'Mis Repos'"])
            CU12(["CU-12: Auditar Sesión en Cloud Firestore"])
        end

        subgraph MOD_METRICAS["Módulo 2: Analítica de Repositorios"]
            CU03(["CU-03: Consultar Métricas de Repositorio"])
            CU13(["CU-13: Sanitizar URL / Slug de Repositorio"])
            CU15(["CU-15: Visualizar Tarjetas KPI de Software"])
        end

        subgraph MOD_EQUIPOS["Módulo 3: Equipos y Cronograma"]
            CU05(["CU-05: Monitorear Colaboradores"])
            CU06(["CU-06: Detectar Sobrecarga Laboral (>= 3 tareas)"])
            CU07(["CU-07: Supervisar Avance de Milestones"])
            CU08(["CU-08: Alertar Hitos Críticos Vencidos"])
        end

        subgraph MOD_BI["Módulo 4: Inteligencia de Negocios"]
            CU09(["CU-09: Configurar URL de Reporte Power BI"])
            CU10(["CU-10: Renderizar Reporte Power BI Embebido"])
            CU11(["CU-11: Activar Fallback Seguro (Tenant UPT)"])
        end
    end

    subgraph SISTEMAS_EXTERNOS["Sistemas Cloud Externos"]
        GH_API["GitHub Platform<br/>(OAuth & REST API v3)"]
        FB_CLOUD["Google Firebase<br/>(Auth & Firestore)"]
        PBI_SVC["Microsoft Power BI<br/>Service (Cloud)"]
    end

    %% Relaciones Actores -> Casos de Uso
    PM --> CU01
    PM --> CU03
    PM --> CU04
    PM --> CU05
    PM --> CU07
    PM --> CU10
    PM --> CU02

    DEV --> CU01
    DEV --> CU03
    DEV --> CU04
    DEV --> CU05
    DEV --> CU02

    DOC --> CU01
    DOC --> CU03
    DOC --> CU07
    DOC --> CU10
    DOC --> CU02

    %% Dependencias Internas <<include>> y <<extend>>
    CU01 -.->|"<<include>>"| CU12
    CU03 -.->|"<<include>>"| CU13
    CU03 -.->|"<<include>>"| CU15
    CU05 -.->|"<<include>>"| CU06
    CU07 -.->|"<<include>>"| CU08
    CU10 -.->|"<<extend>>\n(Restricción Tenant)"| CU11

    %% Interacciones con Servicios Externos
    CU01 ===> GH_API
    CU12 ===> FB_CLOUD
    CU03 ===> GH_API
    CU04 ===> GH_API
    CU05 ===> GH_API
    CU07 ===> GH_API
    CU10 ===> PBI_SVC
    CU11 ===> PBI_SVC

    classDef human fill:#DBEAFE,stroke:#2563EB,stroke-width:2px,color:#1E3A8A;
    classDef sys fill:#F1F5F9,stroke:#475569,stroke-width:2px,color:#0F172A;
    classDef usecase fill:#FFFFFF,stroke:#334155,stroke-width:1.5px,color:#0F172A;
    classDef alert fill:#FEE2E2,stroke:#DC2626,stroke-width:2px,color:#991B1B;

    class PM,DEV,DOC human;
    class GH_API,FB_CLOUD,PBI_SVC sys;
    class CU01,CU02,CU03,CU04,CU05,CU07,CU09,CU10,CU12,CU13,CU15 usecase;
    class CU06,CU08,CU11 alert;
```

*Figura 2. Diagrama General de Casos de Uso del Sistema Monitor de Métricas BI.*

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

## 3.2. Vista Lógica
La vista lógica describe la descomposición del sistema en capas arquitectónicas, la colaboración entre clases y objetos de negocio, los flujos temporales de interacción y la estructura de datos persistente. Monitor de Métricas BI adopta una **arquitectura por capas desacoplada** gobernada por principios SOLID.

### 3.2.1. Diagrama de Subsistemas (paquetes)
La descomposición en subsistemas asegura la alta cohesión interna y el mínimo acoplamiento estructural:

```mermaid
flowchart TD
    subgraph PRESENTACION["1. Capa de Presentación (Frontend SPA - React 19 / Vite)"]
        UI_AUTH["Módulo UI Autenticación<br/>(LoginView, UserHeader, MyReposSelect)"]
        UI_DASH["Módulo UI Analítica & KPIs<br/>(DashboardView, MetricCards, SearchBar)"]
        UI_TEAM["Módulo UI Equipos & Carga<br/>(TeamAnalyzerView, ContributorGrid, OverloadBadge)"]
        UI_SCHED["Módulo UI Cronograma<br/>(ScheduleMilestonesView, ProgressBar, OverdueBadge)"]
        UI_PBI["Módulo UI Power BI & Fallback<br/>(PowerBIContainer, CleanIframe, FallbackAlert)"]
    end

    subgraph LOGICA["2. Capa de Lógica de Negocio y Controladores (Services & Engines)"]
        CTRL_AUTH["AuthHandlerService<br/>(OAuth Flow & Token Session)"]
        CTRL_EXTRACT["MetricsExtractorEngine<br/>(Concurrent Promise.all Orquestador)"]
        CTRL_WORKLOAD["WorkloadAnalyzerEngine<br/>(Regla RN-01: Tasks >= 3 Sobrecarga)"]
        CTRL_SCHED["ScheduleProgressEngine<br/>(Reglas RN-02 y RN-03: % Avance y Overdue)"]
        CTRL_SANITIZER["UrlSanitizerService<br/>(Regla RN-04: Regex Regex Normalizer)"]
        CTRL_PBI["PowerBIUrlParser<br/>(Reglas RN-07 y RN-09: Iframe & Fallback UPT)"]
    end

    subgraph DOMINIO["3. Capa de Modelo del Dominio y Estado en Memoria"]
        MDL_USER["UserProfile<br/>(uid, email, token, photo)"]
        MDL_REPO["RepositoryData<br/>(commits, stars, forks, issues)"]
        MDL_CONTRIB["ContributorModel<br/>(login, avatar, assigned, isOverloaded)"]
        MDL_MILE["MilestoneModel<br/>(title, due_on, %, isOverdue)"]
        MDL_TASK["IssueTaskModel<br/>(id, title, state, assignees)"]
        MDL_PBICFG["PowerBIConfig<br/>(url, reportId, isFallbackActive)"]
    end

    subgraph PERSISTENCIA["4. Capa de Persistencia y Conectores Cloud"]
        CONN_GH["GitHub REST API v3 Client<br/>(HTTP Bearer Octokit / Fetch)"]
        CONN_FB["Firebase Auth v12 & Firestore SDK<br/>(Colección /users con merge)"]
        CONN_PBI["Microsoft Power BI Service Connector<br/>(Iframe Engine / Fallback Protocol)"]
    end

    %% Dependencias entre capas
    PRESENTACION -->|Invoca Servicios| LOGICA
    LOGICA -->|Actualiza y Lee| DOMINIO
    LOGICA -->|Peticiones Asíncronas| PERSISTENCIA

    classDef pkgPres fill:#EFF6FF,stroke:#2563EB,stroke-width:1.5px,color:#1E3A8A;
    classDef pkgLog fill:#F0FDF4,stroke:#16A34A,stroke-width:1.5px,color:#14532D;
    classDef pkgDom fill:#FEF3C7,stroke:#D97706,stroke-width:1.5px,color:#78350F;
    classDef pkgPer fill:#FDF2F8,stroke:#DB2777,stroke-width:1.5px,color:#831843;

    class UI_AUTH,UI_DASH,UI_TEAM,UI_SCHED,UI_PBI pkgPres;
    class CTRL_AUTH,CTRL_EXTRACT,CTRL_WORKLOAD,CTRL_SCHED,CTRL_SANITIZER,CTRL_PBI pkgLog;
    class MDL_USER,MDL_REPO,MDL_CONTRIB,MDL_MILE,MDL_TASK,MDL_PBICFG pkgDom;
    class CONN_GH,CONN_FB,CONN_PBI pkgPer;
```

*Figura 3. Diagrama de Subsistemas y Organización por Capas de Monitor de Métricas BI.*

---

### 3.2.2. Diagrama de Secuencia (vista de diseño)
A continuación se especifican las trazas temporales de diseño para los cuatro escenarios arquitectónicos críticos.

#### Secuencia 1 — CU-01: Autenticación OAuth 2.0 y Auditoría en Firestore

```mermaid
sequenceDiagram
    autonumber
    actor User as Usuario / Líder Técnico
    participant UI as App.tsx (React UI)
    participant AuthSvc as FirebaseAuthService
    participant GH as GitHub OAuth Provider
    participant StoreSvc as FirestoreSyncService
    participant StoreDB as Cloud Firestore (/users)

    User->>UI: Clic en "Iniciar Sesión con GitHub"
    UI->>AuthSvc: signInWithPopup(auth, githubProvider)
    AuthSvc->>GH: Apertura Popup OAuth 2.0 (Scope: 'repo')
    GH-->>User: Solicita consentimiento de acceso
    User->>GH: Concede autorización
    GH-->>AuthSvc: Código de autorización y accessToken
    AuthSvc-->>UI: Retorna UserCredential (User + OAuthToken)
    
    UI->>UI: sessionStorage.setItem('github_token', token)
    UI->>StoreSvc: syncUserProfile(user, token)
    StoreSvc->>StoreDB: setDoc(doc(db, "users", uid), userData, { merge: true })
    StoreDB-->>StoreSvc: Confirmación de persistencia auditada
    StoreSvc-->>UI: Sincronización exitosa
    UI-->>User: Despliega avatar, nombre y menú "Mis Repos"
```

*Figura 4. Diagrama de Secuencia de Autenticación Federada y Auditoría de Perfil.*

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

#### Secuencia 2 — CU-03: Ingesta y Extracción Concurrente de Métricas GitHub API v3

```mermaid
sequenceDiagram
    autonumber
    actor User as Usuario / Líder Técnico
    participant UI as DashboardView (React)
    participant Sanitizer as UrlSanitizerService
    participant Extractor as MetricsExtractorEngine
    participant GH_API as GitHub REST API v3
    participant Domain as RepositoryData Model

    User->>UI: Ingresa URL / Selecciona repositorio
    UI->>Sanitizer: sanitizeUrl(rawQuery)
    Sanitizer-->>UI: Retorna slug normalizado "owner/repo"
    UI->>UI: Activa indicador reactivo de carga (Loading Spinner)
    
    UI->>Extractor: fetchAllMetrics(owner, repo, token)
    
    par Ingesta Concurrente de Endpoints (Promise.all)
        Extractor->>GH_API: GET /repos/{owner}/{repo} (Authorization: Bearer)
        GH_API-->>Extractor: Metadatos (size, stars, forks, open_issues)
    and Ingesta de Incidencias Abiertas
        Extractor->>GH_API: GET /repos/{owner}/{repo}/issues?state=open&per_page=100
        GH_API-->>Extractor: Lista JSON de incidencias y assignees
    and Ingesta de Contribuidores
        Extractor->>GH_API: GET /repos/{owner}/{repo}/contributors?per_page=12
        GH_API-->>Extractor: Lista JSON de colaboradores y commits
    and Ingesta de Hitos Planificados
        Extractor->>GH_API: GET /repos/{owner}/{repo}/milestones?state=all
        GH_API-->>Extractor: Lista JSON de milestones (due_on, open/closed)
    end

    Extractor->>Domain: buildRepositorySummary(payloads)
    Domain-->>Extractor: Objeto consolidado RepositoryData
    Extractor-->>UI: Retorna métricas unificadas (< 1.5 s)
    UI->>UI: Desactiva spinner y renderiza Tarjetas KPI
    UI-->>User: Muestra Commits, Estrellas, Forks e Incidencias en pantalla
```

*Figura 5. Diagrama de Secuencia de Extracción Concurrente de Métricas de Repositorio.*

---

#### Secuencia 3 — CU-06: Detección y Alerta de Sobrecarga de Colaboradores

```mermaid
sequenceDiagram
    autonumber
    actor PM as Líder Técnico / PM
    participant UI as TeamAnalyzerView (React)
    participant Workload as WorkloadAnalyzerEngine
    participant ContribCard as ContributorCard Component

    UI->>Workload: evaluateWorkload(contributors, openIssues)
    loop Para cada colaborador en la lista
        Workload->>Workload: Contabilizar apariciones en openIssues.assignees
        alt Tareas asignadas >= 3 (Regla RN-01)
            Workload->>Workload: Marcar isOverloaded = true
            Workload->>ContribCard: Asignar clase visual roja y Badge " Sobrecarga (N tareas)"
        else Tareas asignadas < 3
            Workload->>Workload: Marcar isOverloaded = false
            Workload->>ContribCard: Asignar estilo equilibrado (Carga Normal)
        end
    end
    Workload-->>UI: Colección EvaluatedContributors con banderas
    UI-->>PM: Despliega cuadrícula de colaboradores con alertas visibles
```

*Figura 6. Diagrama de Secuencia de Detección Algorítmica de Sobrecarga.*

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

#### Secuencia 4 — CU-10 / CU-11: Visualización y Fallback Seguro de Reporte Power BI

```mermaid
sequenceDiagram
    autonumber
    actor Directivo as Docente / Directivo
    participant UI as PowerBIEmbedContainer
    participant Parser as PowerBIUrlParser
    participant PBI_Cloud as Microsoft Power BI Cloud Service
    actor Tenant as Políticas Tenant UPT (@virtual.upt.pe)

    Directivo->>UI: Navega a pestaña "Dashboard de Power BI"
    UI->>Parser: getSanitizedUrl()
    Parser->>Parser: Inyecta parámetros limpios (filterPaneEnabled=false)
    Parser-->>UI: Retorna URL depurada

    alt URL sin restricciones corporativas de Iframe
        UI->>PBI_Cloud: Renderiza <iframe src={cleanUrl}>
        PBI_Cloud-->>UI: Despliega gráficos DAX interactivos
        UI-->>Directivo: Visualización embebida completa
    else Bloqueo por directivas de tenant UPT (SAMEORIGIN / Tenant Restringido)
        PBI_Cloud--xUI: Bloqueo de marco Iframe por encabezados HTTP
        UI->>UI: Activa estado isFallbackActive = true (Regla RN-07)
        UI-->>Directivo: Despliega Tarjeta de Fallback Seguro con mensaje explicativo
        Directivo->>UI: Clic en botón "Abrir Reporte en Power BI"
        UI->>PBI_Cloud: Abre URL en nueva pestaña segura (target="_blank" rel="noopener")
        Directivo->>PBI_Cloud: Autentica credencial institucional UPT y visualiza reporte
    end
```

*Figura 7. Diagrama de Secuencia de Visualización y Fallback Seguro de Power BI.*

---

### 3.2.3. Diagrama de Colaboración (vista de diseño)
El diagrama de colaboración modela la red de interacciones y el orden de los mensajes intercambiados entre los objetos participantes durante el ciclo operativo de consulta y análisis:

```mermaid
flowchart TD
    User(["1: Solicita Consulta / Selección"]):::actorClass --> UI["2: App.tsx / UI Controller"]:::compClass
    UI -- "3: sanitizeUrl(rawQuery)" --> Sanitizer["UrlSanitizerService"]:::serviceClass
    Sanitizer -- "4: Retorna slug owner/repo" --> UI
    UI -- "5: dispatchFetch(query, token)" --> Extractor["MetricsExtractorEngine"]:::serviceClass
    Extractor -- "6: GET /repos, /issues, /contribs, /milestones" --> GH_API["GitHub REST API v3"]:::cloudClass
    GH_API -- "7: Retorna Payloads JSON Crudos" --> Extractor
    Extractor -- "8: evaluateWorkload(contribs, issues)" --> WorkloadEngine["WorkloadAnalyzerEngine"]:::serviceClass
    WorkloadEngine -- "9: evaluateProgress(milestones)" --> SchedEngine["ScheduleProgressEngine"]:::serviceClass
    SchedEngine -- "10: Retorna Modelos Enriquecidos con Alertas" --> Extractor
    Extractor -- "11: Retorna RepositoryData Completo" --> UI
    UI -- "12: checkTenantCompatibility(pbiUrl)" --> PBIParser["PowerBIUrlParser"]:::serviceClass
    PBIParser -- "13: Renderiza Iframe o Activa Fallback Seguro" --> UI
    UI -- "14: Presenta Tablero Ejecutivo Unificado (< 1.5s)" --> User

    classDef actorClass fill:#DBEAFE,stroke:#2563EB,stroke-width:2px,color:#1E3A8A;
    classDef compClass fill:#EFF6FF,stroke:#1D4ED8,stroke-width:2px,color:#1E3A8A;
    classDef serviceClass fill:#F0FDF4,stroke:#16A34A,stroke-width:2px,color:#14532D;
    classDef cloudClass fill:#FDF2F8,stroke:#DB2777,stroke-width:2px,color:#831843;
```

*Figura 8. Diagrama de Colaboración para la Extracción Analítica y Conmutación de Power BI.*

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

### 3.2.4. Diagrama de Objetos
El diagrama de objetos ilustra una configuración en memoria en tiempo de ejecución para un escenario representativo de auditoría en la asignatura SI-885:

```mermaid
classDiagram
    class UserProfile_Instancia {
        uid = "usr_github_987654"
        name = "Rodrigo Sídney Colque Quispe"
        email = "rcolqueq@virtual.upt.pe"
        screenName = "rcolque-dev"
        githubToken = "gho_SecureSessionToken98234..."
        lastLogin = "2026-10-06T13:14:00Z"
    }

    class Repository_Instancia {
        id = 894120531
        full_name = "UPT-FAING-EPIS/si885-2026-ii-proyecto-group-4"
        name = "si885-2026-ii-proyecto-group-4"
        isPrivate = false
        stargazers_count = 14
        forks_count = 6
        open_issues_count = 8
        size = 12450
    }

    class Contributor_Sobrecargado {
        id = 104231
        login = "fabricio-rf"
        contributions = 84
        assigned_tasks = 4
        isOverloaded = true
    }

    class Contributor_Equilibrado {
        id = 104232
        login = "rcolque-dev"
        contributions = 92
        assigned_tasks = 2
        isOverloaded = false
    }

    class Milestone_Vencido {
        id = 301
        title = "Sprint 1: Requerimientos y Arquitectura"
        state = "open"
        open_issues = 3
        closed_issues = 7
        due_on = "2026-09-30"
        progressPercentage = 70.0
        isOverdue = true
    }

    class PowerBIConfig_Instancia {
        reportUrl = "https://app.powerbi.com/view?r=eyJrIjoiOGM..."
        isEmbeddedSupported = false
        isFallbackActive = true
    }

    UserProfile_Instancia --> Repository_Instancia : audita
    Repository_Instancia *-- Contributor_Sobrecargado : miembro
    Repository_Instancia *-- Contributor_Equilibrado : miembro
    Repository_Instancia *-- Milestone_Vencido : hito
    Repository_Instancia ..> PowerBIConfig_Instancia : vincula
```

*Figura 9. Diagrama de Objetos en Tiempo de Ejecución con Instancias Reales del Dominio.*

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

### 3.2.5. Diagrama de Clases
El diagrama de clases formaliza las entidades del dominio de software, sus atributos con tipos primitivos, operaciones con firmas completas y relaciones estructurales de multiplicidad:

```mermaid
classDiagram
    class UserProfile {
        +String uid
        +String name
        +String email
        +String photoURL
        +String screenName
        +String githubToken
        +Timestamp lastLogin
        +loginWithGitHub() Promise~void~
        +logout() Promise~void~
        +fetchMyRepositories() Promise~Repository[]~
    }

    class Repository {
        +Number id
        +String full_name
        +String name
        +String description
        +Boolean isPrivate
        +Number stargazers_count
        +Number forks_count
        +Number open_issues_count
        +Number size
        +Date updated_at
        +String ownerAvatar
        +fetchRepoData(query: String) Promise~void~
        +sanitizeUrl(rawQuery: String) String
        +calculateSummary() MetricSummary
    }

    class Contributor {
        +Number id
        +String login
        +String avatar_url
        +Number contributions
        +Number assigned_tasks
        +Boolean isOverloaded
        +evaluateWorkload(threshold: Number) Boolean
    }

    class Milestone {
        +Number id
        +String title
        +String description
        +String state
        +Number open_issues
        +Number closed_issues
        +Date due_on
        +Number progressPercentage
        +Boolean isOverdue
        +calculateProgress() Number
        +checkOverdueStatus() Boolean
    }

    class IssueTask {
        +Number id
        +String title
        +String state
        +String[] assignees
        +countByAssignee() Map
    }

    class PowerBIConfig {
        +String reportUrl
        +String reportId
        +String ctid
        +Boolean isEmbeddedSupported
        +Boolean filterPaneEnabled
        +Boolean navContentPaneEnabled
        +saveToStorage(url: String) void
        +loadFromStorage() String
        +buildCleanIframeUrl() String
        +isFallbackRequired() Boolean
    }

    class MetricSummary {
        +String totalCommitsAprox
        +Number stars
        +Number forks
        +Number openIssues
    }

    UserProfile "1" o-- "0..*" Repository : consulta
    Repository "1" *-- "1..*" Contributor : integra
    Repository "1" *-- "0..*" Milestone : planifica
    Repository "1" *-- "0..*" IssueTask : contiene
    Contributor "1" o-- "0..*" IssueTask : asignadas
    Repository "1" -- "1" MetricSummary : resume
    Repository "1" ..> PowerBIConfig : vincula panel
```

*Figura 10. Diagrama de Clases del Dominio y Modelo Lógico de Datos.*

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

### 3.2.6. Diagrama de Base de datos (relacional o no relacional)
El modelo de datos del sistema es de naturaleza **NoSQL Serverless**, implementado sobre **Google Cloud Firestore**. Se organiza en torno a la colección raíz `/users`, vinculada conceptualmente a los almacenes locales (`sessionStorage` y `localStorage`) del navegador cliente:

```mermaid
erDiagram
    USERS_COLLECTION ||--o{ USER_SESSIONS : "inicia"
    USERS_COLLECTION ||--o{ USER_REPOSITORIES_CACHE : "consulta"
    USERS_COLLECTION ||--o| POWERBI_LOCAL_CONFIG : "configura"

    USERS_COLLECTION {
        string uid PK "ID único de usuario Firebase/GitHub"
        string displayName "Nombres y apellidos del usuario"
        string email "Correo electrónico corporativo / institucional"
        string photoURL "URL del avatar en GitHub"
        string screenName "Nombre de usuario login en GitHub"
        timestamp lastLogin "Marca de tiempo UTC del último acceso"
        string createdAt "Fecha de creación del registro"
        string role "Rol en el sistema (Estudiante / Líder / Docente)"
    }

    USER_SESSIONS {
        string sessionId PK "Identificador único de sesión temporal"
        string uid FK "Referencia al usuario activo"
        string github_token "Token OAuth temporal (sessionStorage)"
        timestamp sessionExpiresAt "Tiempo de expiración de la sesión"
        string clientIp "Dirección IP del cliente web"
    }

    USER_REPOSITORIES_CACHE {
        string repoId PK "ID numérico único del repositorio GitHub"
        string uid FK "Usuario que ejecutó la consulta"
        string fullName "Identificador compuesto owner/repo"
        number stars "Total de estrellas (stargazers)"
        number forks "Total de bifurcaciones (forks)"
        number openIssues "Total de incidencias abiertas"
        timestamp cachedAt "Marca temporal de la última ingesta"
    }

    POWERBI_LOCAL_CONFIG {
        string configKey PK "Clave en localStorage (powerbi_url)"
        string uid FK "Usuario propietario de la preferencia"
        string rawUrl "URL completa del reporte en Power BI"
        string sanitizedUrl "URL higienizada con parámetros limpios"
        boolean fallbackForced "Indicador de conmutación a fallback"
    }
```

*Figura 11. Diagrama Entidad-Relación Lógico del Modelo de Persistencia NoSQL en Cloud Firestore.*

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

## 3.3. Vista de Implementación (vista de desarrollo)
La vista de desarrollo describe la organización física y jerárquica de los artefactos de software en el entorno de desarrollo, estructurados en torno a TypeScript, React 19 y Vite 6.

### 3.3.1. Diagrama de arquitectura software (paquetes)
A continuación, se detalla la estructura física de directorios y módulos de código del proyecto:

```mermaid
flowchart TD
    subgraph ROOT["monitor-app / Directorio Raíz del Proyecto"]
        PKG_JSON["package.json<br/>(React 19, Firebase v12, Lucide)"]
        TS_CONFIG["tsconfig.json<br/>(Compilador TypeScript Strict)"]
        VITE_CONFIG["vite.config.ts<br/>(Plugins React & Build Optimizer)"]
        FIREBASE_JSON["firebase.json<br/>(Reglas Hosting & Firestore)"]
    end

    subgraph SRC["src / Código Fuente Principal"]
        MAIN_TSX["main.tsx<br/>(Punto de Entrada & React DOM Root)"]
        INDEX_CSS["index.css<br/>(Tokens de Estilo & Normalización)"]
        APP_TSX["App.tsx<br/>(Orquestador Principal de Estado)"]
        FIREBASE_TS["firebase.ts<br/>(Inicialización de Firebase SDK)"]
        
        subgraph ASSETS["assets / Recursos Estáticos"]
            LOGO["logo-upt.png & SVG Icons"]
        end
        
        subgraph COMPONENTES_LOGICOS["Componentes Lógicos y Funcionales en App.tsx"]
            COMP_NAV["Header & Auth Bar<br/>(Avatar, Logout, Selector Repos)"]
            COMP_KPI["Metric Cards Grid<br/>(Commits, Stars, Forks, Issues)"]
            COMP_TEAM["Team Contributor Cards<br/>(Avatar, Commits, Alerta Sobrecarga)"]
            COMP_SCHED["Milestones Timeline<br/>(Progress Bars, Alerta Overdue)"]
            COMP_PBI["Power BI Viewer & Fallback<br/>(Clean Iframe / UPT Fallback Button)"]
        end
    end

    ROOT --> SRC
    SRC --> MAIN_TSX
    MAIN_TSX --> APP_TSX
    APP_TSX --> COMP_NAV
    APP_TSX --> COMP_KPI
    APP_TSX --> COMP_TEAM
    APP_TSX --> COMP_SCHED
    APP_TSX --> COMP_PBI
    APP_TSX --> FIREBASE_TS
    APP_TSX --> INDEX_CSS

    classDef rootFile fill:#F1F5F9,stroke:#475569,stroke-width:1px,color:#0F172A;
    classDef srcFile fill:#EFF6FF,stroke:#2563EB,stroke-width:1.5px,color:#1E3A8A;
    classDef compFile fill:#DCFCE7,stroke:#15803D,stroke-width:1.5px,color:#14532D;

    class PKG_JSON,TS_CONFIG,VITE_CONFIG,FIREBASE_JSON rootFile;
    class MAIN_TSX,INDEX_CSS,APP_TSX,FIREBASE_TS,LOGO srcFile;
    class COMP_NAV,COMP_KPI,COMP_TEAM,COMP_SCHED,COMP_PBI compFile;
```

*Figura 12. Diagrama de Organización de Paquetes y Módulos de Código Fuente.*

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

### 3.3.2. Diagrama de arquitectura del sistema (Diagrama de componentes)
El diagrama de componentes especifica los bloques modulares ejecutables del sistema y sus contratos de interfaz:

```mermaid
flowchart TD
    subgraph CLIENTE_WEB["Navegador Web del Cliente (SPA Runtime)"]
        subgraph UI_MODULES["Módulos de Interfaz de Usuario"]
            C_LOGIN["Componente Login & Auth"]
            C_DASH["Componente Dashboard KPIs"]
            C_TEAM_UI["Componente Team Analyzer"]
            C_SCHED_UI["Componente Cronograma"]
            C_PBI_UI["Componente Power BI Fallback"]
        end

        subgraph CORE_SERVICES["Servicios Núcleo en Memoria"]
            SVC_OCTOKIT["Servicio Cliente API GitHub<br/>(Octokit / Fetch HTTP)"]
            SVC_STORE["Servicio Adaptador Firestore<br/>(setDoc / getDoc API)"]
            SVC_RULES["Motor de Reglas de Negocio<br/>(Sobrecarga & Milestones)"]
            SVC_SESSION["Gestor de Sesión Volátil<br/>(sessionStorage Wrapper)"]
        end
    end

    subgraph INFRAESTRUCTURA_EXTERNA["Infraestructura y Servicios Cloud Externos"]
        GH_REST["GitHub REST API v3<br/>https://api.github.com"]
        FB_HOSTING["Firebase Hosting CDN<br/>(Distribución de SPA Estática)"]
        FB_AUTH["Firebase Auth Service<br/>(OAuth Gateway)"]
        FB_DB["Google Cloud Firestore<br/>(Base de Datos NoSQL Serverless)"]
        PBI_SERVICE["Microsoft Power BI Service<br/>https://app.powerbi.com"]
    end

    %% Conexiones Cliente Internas
    C_LOGIN --> SVC_SESSION
    C_LOGIN --> SVC_STORE
    C_DASH --> SVC_OCTOKIT
    C_TEAM_UI --> SVC_RULES
    C_SCHED_UI --> SVC_RULES
    C_SCHED_UI --> SVC_OCTOKIT
    C_TEAM_UI --> SVC_OCTOKIT

    %% Conexiones con Infraestructura Externa
    SVC_OCTOKIT ===>|HTTPS / JSON Bearer| GH_REST
    SVC_SESSION ===>|OAuth Popup 2.0| FB_AUTH
    SVC_STORE ===>|gRPC / WebChannel| FB_DB
    C_PBI_UI ===>|Iframe HTTPS / Direct Link| PBI_SERVICE
    CLIENTE_WEB -.-|Descarga Bundle SPA| FB_HOSTING

    classDef compClient fill:#EFF6FF,stroke:#2563EB,stroke-width:1.5px,color:#1E3A8A;
    classDef svcClient fill:#F0FDF4,stroke:#16A34A,stroke-width:1.5px,color:#14532D;
    classDef cloudExt fill:#FDF2F8,stroke:#DB2777,stroke-width:1.5px,color:#831843;

    class C_LOGIN,C_DASH,C_TEAM_UI,C_SCHED_UI,C_PBI_UI compClient;
    class SVC_OCTOKIT,SVC_STORE,SVC_RULES,SVC_SESSION svcClient;
    class GH_REST,FB_HOSTING,FB_AUTH,FB_DB,PBI_SERVICE cloudExt;
```

*Figura 13. Diagrama de Componentes de Software y Contratos de Comunicación.*

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

## 3.4. Vista de procesos
La vista de procesos describe los aspectos dinámicos y de concurrencia del sistema: flujos de control de hilos, sincronización asíncrona, temporización y toma de decisiones en tiempo de ejecución.

### 3.4.1. Diagrama de Procesos del sistema (diagrama de actividad)
A continuación, se modela el flujo end-to-end de una sesión analítica completa, ilustrando la concurrencia de APIs y las bifurcaciones condicionales:

```mermaid
flowchart TD
    START([Inicio del Proceso]) --> A1[Usuario ingresa a la aplicación web Monitor BI]
    A1 --> A2{¿Existe sesión activa en sessionStorage?}
    
    A2 -- No --> A3[Usuario hace clic en 'Iniciar Sesión']
    A3 --> A4[Firebase despliega Popup GitHub OAuth 2.0]
    A4 --> A5[Usuario concede permisos en GitHub]
    A5 --> A6[Capturar token en sessionStorage y sincronizar perfil en Cloud Firestore]
    A6 --> A7[Cargar catálogo 'Mis Repos' en desplegable]
    
    A2 -- Sí --> A7
    
    A7 --> A8[Usuario selecciona repositorio propio o digita URL en caja de búsqueda]
    A8 --> A9[Sanitizar texto con Expresión Regular extrayendo 'owner/repo']
    
    A9 --> A10[Iniciar indicador visual de carga Loading Spinner]
    
    %% Flujo Concurrente Fork
    A10 --> FORK_CONCURRENTE{FORK CONCURRENTE: Peticiones HTTP Asíncronas}
    
    FORK_CONCURRENTE --> P1[GET /repos -> Metadata general Commits, Stars, Forks, Issues]
    FORK_CONCURRENTE --> P2[GET /issues?state=open -> Incidencias abiertas y asignatarios]
    FORK_CONCURRENTE --> P3[GET /contributors -> Lista de colaboradores y commits]
    FORK_CONCURRENTE --> P4[GET /milestones?state=all -> Hitos, fechas y estados]
    
    P1 --> JOIN_CONCURRENTE{JOIN CONCURRENTE: Promise.all Resuelto}
    P2 --> JOIN_CONCURRENTE
    P3 --> JOIN_CONCURRENTE
    P4 --> JOIN_CONCURRENTE
    
    JOIN_CONCURRENTE --> B1[Cruzar incidencias abiertas contra colaboradores]
    B1 --> B2{¿Tareas asignadas al colaborador >= 3?}
    B2 -- Sí --> B3[Activar distintivo visual rojo:  Sobrecarga N tareas]
    B2 -- No --> B4[Asignar indicador de Carga Equilibrada]
    
    B3 --> C1[Calcular porcentaje de avance por Milestone: closed/total * 100]
    B4 --> C1
    
    C1 --> C2{¿Hito abierto y fecha due_on < hoy?}
    C2 -- Sí --> C3[Activar bandera roja: ¡Atención: Atrasado! Fecha límite]
    C2 -- No --> C4[Asignar estado vigente o completado 100%]
    
    C3 --> D1[Evaluar compatibilidad del Reporte Power BI]
    C4 --> D1
    
    D1 --> D2{¿Admite incrustación directa sin bloqueo SAMEORIGIN?}
    D2 -- Sí --> D3[Renderizar Iframe interactivo con parámetros limpios]
    D2 -- No Tenant UPT --> D4[Renderizar panel Fallback Seguro con botón institucional directo]
    
    D3 --> END_VIEW[Desplegar Dashboard Ejecutivo Unificado en pantalla < 1.5 s]
    D4 --> END_VIEW
    
    END_VIEW --> DECISION[Usuario toma decisiones de reasignación y supervisión estratégica]
    DECISION --> FIN([Fin del Proceso])

    classDef step fill:#EFF6FF,stroke:#2563EB,stroke-width:1.5px,color:#1E3A8A;
    classDef decision fill:#FEF3C7,stroke:#D97706,stroke-width:2px,color:#78350F;
    classDef alert fill:#FEE2E2,stroke:#DC2626,stroke-width:1.5px,color:#991B1B;
    classDef ok fill:#DCFCE7,stroke:#16A34A,stroke-width:1.5px,color:#14532D;

    class A1,A4,A6,A7,A8,A9,A10,P1,P2,P3,P4,B1,C1,D1,END_VIEW,DECISION step;
    class A2,B2,C2,D2 decision;
    class B3,C3,D4 alert;
    class B4,C4,D3 ok;
```

*Figura 14. Diagrama de Actividad del Proceso de Monitoreo y Reglas de Negocio.*

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

## 3.5. Vista de Despliegue
La vista de despliegue modela la asignación física de los componentes de software en los nodos de hardware y plataformas en la nube, detallando protocolos de red, puertos y mecanismos de cifrado en tránsito.

### 3.5.1. Diagrama de despliegue
La arquitectura de despliegue de **Monitor de Métricas BI** se basa en un esquema **Cloud-Native Serverless** de cuatro capas:

```mermaid
flowchart TD
    subgraph CAPA_CLIENTES["1. Capa de Dispositivos Clientes (Nodos Finales)"]
        DEV_PC["Estación de Trabajo / Laptop<br/>(Chrome 115+, Firefox 115+, Edge 115+)<br/><b>OS: Windows 11 / Linux / macOS</b>"]
        DEV_TAB["Tablet / Pantalla Directiva<br/>(Safari 17+, Chrome Mobile)<br/><b>Resolución >= 1024x768</b>"]
    end

    subgraph CAPA_CDN["2. Capa de Distribución de Contenido Estático (CDN)"]
        FIREBASE_CDN["<b>Google Cloud Firebase Hosting</b><br/>• CDN Global con Anycast IP<br/>• Certificado SSL/TLS 1.3 Automatizado<br/>• Caché Edge de Archivos Estáticos (JS/CSS)<br/>• Puerto: 443 (HTTPS)"]
    end

    subgraph CAPA_CLOUD_SAAS["3. Capa de Servicios Cloud y Computación Serverless"]
        subgraph GCP_SERVICES["Google Cloud Platform (Firebase Backend)"]
            FB_AUTH_SVC["<b>Firebase Authentication</b><br/>• Proveedor Federado GitHub OAuth<br/>• Manejo de Tokens JWT"]
            FIRESTORE_DB["<b>Cloud Firestore</b><br/>• Base de Datos NoSQL Serverless<br/>• Colección /users/{uid}<br/>• Replicación Multirregión (us-central1)"]
        end

        subgraph GITHUB_PLATFORM["GitHub Cloud Platform"]
            GH_REST_API["<b>GitHub REST API v3</b><br/>• Servidor de APIs api.github.com<br/>• Cuota: 5,000 pet/h con OAuth<br/>• Protocolo HTTP/2 sobre TLS 1.3"]
        end

        subgraph MS_CLOUD["Microsoft 365 Cloud"]
            PBI_SERVICE_CLOUD["<b>Microsoft Power BI Service</b><br/>• Servidor app.powerbi.com<br/>• Tenant Institucional @virtual.upt.pe<br/>• Motor de Renderizado Analítico DAX"]
        end
    end

    %% Enlaces de Red y Protocolos
    DEV_PC ==>|HTTPS / Port 443<br/>Descarga Bundle SPA Estática| FIREBASE_CDN
    DEV_TAB ==>|HTTPS / Port 443<br/>Descarga Bundle SPA Estática| FIREBASE_CDN

    DEV_PC -.->|Popup OAuth 2.0 / HTTPS| FB_AUTH_SVC
    DEV_PC -.->|WebChannel / gRPC HTTPS| FIRESTORE_DB
    DEV_PC -.->|REST GET HTTP/2 Bearer Token| GH_REST_API
    DEV_PC -.->|Iframe HTTPS / Direct Fallback Link| PBI_SERVICE_CLOUD

    classDef clientNode fill:#EFF6FF,stroke:#2563EB,stroke-width:2px,color:#1E3A8A;
    classDef cdnNode fill:#FEF3C7,stroke:#D97706,stroke-width:2px,color:#78350F;
    classDef cloudNode fill:#F1F5F9,stroke:#334155,stroke-width:2px,color:#0F172A;

    class DEV_PC,DEV_TAB clientNode;
    class FIREBASE_CDN cdnNode;
    class FB_AUTH_SVC,FIRESTORE_DB,GH_REST_API,PBI_SERVICE_CLOUD cloudNode;
```

*Figura 15. Diagrama de Despliegue Físico y Topología de Red en la Nube.*

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 4. ATRIBUTOS DE CALIDAD DEL SOFTWARE

Los Atributos de Calidad (QAs) de **Monitor de Métricas BI** son propiedades medibles y evaluables que determinan el grado en que la arquitectura satisface las necesidades de sus interesados en la EPIS UPT (Bass et al., 2021). A continuación, se especifican formalmente los escenarios de calidad:

### Escenario de Funcionalidad
El sistema abarca 15 requerimientos funcionales distribuidos en cuatro módulos de arquitectura (Identidad, Analítica, Equipos/Cronograma y Business Intelligence), gobernados por 10 reglas de negocio estrictas. Las capacidades críticas incluyen:
- Autenticación federada en un clic con GitHub OAuth 2.0 sin necesidad de crear contraseñas adicionales.
- Ingesta concurrente y agregación de indicadores clave de repositorio (commits aproximados, estrellas, bifurcaciones e incidencias).
- Detección algorítmica de sobrecarga laboral ($\ge 3$ incidencias abiertas por desarrollador) para prevenir el agotamiento físico y mental (*burnout*).
- Supervisión proactiva de hitos cronológicos con cálculo porcentual dinámico y distintivo rojo de atraso.
- Integración de tableros de Microsoft Power BI con mecanismo de Fallback Seguro para el tenant educativo de la UPT (`@virtual.upt.pe`).

### Escenario de Usabilidad
El sistema está diseñado para ser completamente operable por docentes y líderes técnicos con **menos de 15 minutos de inducción previa (RNF-06)**. La interfaz SPA construida sobre React 19 y Lucide Icons es responsiva desde resoluciones de 1024px, garantizando visibilidad óptima en laptops y pantallas ejecutivas. 

El selector "Mis Repos" y la sanitización universal de URLs de repositorios eliminan la fricción operativa al interpretar indistintamente URLs completas (`https://github.com/owner/repo`) o slugs directos (`owner/repo`). Las alertas cromáticas (Verde: Carga Equilibrada; Rojo: Sobrecarga / Hito Vencido) proporcionan una respuesta sensorial inmediata según los estándares **WCAG 2.1 AA (RNF-07)**.

### Escenario de Confiabilidad
Monitor de Métricas BI garantiza una tasa de disponibilidad operativa del **99.9% (RNF-09)** mediante la infraestructura de red distribuida de **Firebase Hosting (Anycast CDN)**. La persistencia de perfiles en Google Cloud Firestore cuenta con replicación multirregión y almacenamiento no destructivo (`{ merge: true }`, RN-06).

Ante posibles caídas de conectividad con la API de GitHub o denegaciones de cuota (HTTP 403), el sistema implementa **degradación elegante**: captura los errores y muestra alertas informativas con el tiempo de reinicio de tasa sin colapsar la vista (*no crash*, RNF-08).

### Escenario de Rendimiento
El tiempo total de extracción, procesamiento en memoria y renderizado de métricas de un repositorio es **inferior a 1.5 segundos bajo condiciones normales de red ($\ge 10$ Mbps) (RNF-01)**. Este rendimiento se logra mediante tres pilares de optimización arquitectónica:
1. **Concurrencia con `Promise.all`:** Las peticiones HTTP a `/repos`, `/issues`, `/contributors` y `/milestones` se disparan simultáneamente en paralelo, reduciendo el tiempo de espera al del endpoint más lento en lugar de acumular tiempos en serie.
2. **Empaquetado Ultrarrápido con Vite 6:** La aplicación compila mediante módulos ES puros, garantizando un tiempo de carga inicial de la página inferior a 800 ms.
3. **Consumo Ligero de Memoria:** El consumo de memoria en el navegador se mantiene estrictamente por debajo de **150 MB (RNF-02)**, incluso al procesar proyectos con hasta 50 colaboradores y 100 incidencias abiertas.

### Escenario de Mantenibilidad
El código sigue estrictamente los principios **SOLID** y una modularización por componentes funcionales puros en **React 19 y TypeScript 5+ (RNF-10)**. La lógica algorítmica de cálculo de porcentajes y análisis de sobrecarga se encuentra desacoplada de la interfaz gráfica, permitiendo su validación mediante pruebas unitarias automatizadas (**RNF-11**). 

La compatibilidad multiplataforma está certificada para **Google Chrome 115+, Mozilla Firefox 115+, Microsoft Edge 115+ y Apple Safari 17+ (RNF-12)**.

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

### Otros Escenarios

#### 4.1. Escalabilidad
La arquitectura física se fundamenta en el paradigma **Serverless**:
- **Escalabilidad Elástica en la Nube:** Google Cloud Firebase Hosting y Cloud Firestore escalan automáticamente de forma transparente desde decenas hasta miles de solicitudes concurrentes sin requerir aprovisionamiento manual de instancias virtuales ni balanceadores de carga físicos.
- **Cuotas de Petición Optimizadas:** Al exigir autenticación OAuth, cada usuario aporta su propia cuota de 5,000 peticiones por hora otorgada por GitHub, lo que previene cuellos de botella centralizados y permite el escalado horizontal infinito del número de usuarios.
- **Evolución Modular:** La arquitectura modular permite incorporar en futuros sprints conectores para GitLab, Bitbucket o Azure DevOps sin refactorizar los componentes de visualización existentes.

#### 4.2. Seguridad (Performance)
- **Volatilidad Estricta de Credenciales:** El token de acceso OAuth de GitHub (`accessToken`) se resguarda exclusivamente en la memoria de sesión del navegador (`sessionStorage`) y **nunca en `localStorage` ni en cookies permanentes**. El token se anula de inmediato al presionar "Cerrar Sesión" o cerrar la pestaña del navegador (RNF-03).
- **Cifrado en Tránsito:** Todas las comunicaciones entre cliente y servidores externos se ejecutan bajo el protocolo **HTTPS con cifrado TLS 1.3**.
- **Reglas de Seguridad en Cloud Firestore:** Las reglas de acceso impiden escrituras o modificaciones cruzadas entre cuentas, verificando que `request.auth.uid == userId` en cada operación en la colección `/users/{uid}` (RNF-04).
- **Sanitización de Entradas:** Expresiones regulares universales limpian cadenas arbitrarias antes de formular solicitudes HTTP, previniendo ataques de inyección de parámetros o URLs maliciosas.
- **Respeto a Directivas de Tenant Institucional:** El mecanismo de Fallback Seguro previene que la aplicación intente violar encabezados `X-Frame-Options` o políticas CSP del tenant `@virtual.upt.pe`, canalizando la consulta a través de aperturas seguras con atributos `rel="noopener noreferrer"`.

<div style="page-break-after: always; visibility: hidden">\pagebreak</div>

---

# 5. CONCLUSIONES

1. **Idoneidad del Modelo de Vistas 4+1:** La formalización arquitectónica bajo el modelo de Philippe Kruchten permitió capturar de manera integral las dimensiones esenciales de **Monitor de Métricas BI**, articulando la visión del usuario (+1), la estructura de capas (Lógica), la organización del código (Implementación), la concurrencia asíncrona (Procesos) y la topología en la nube (Despliegue).
2. **Eficiencia y Reducción del 99.9% en Tiempos de Auditoría:** La arquitectura reactiva basada en React 19, Vite y consumo concurrente de la GitHub REST API v3 reduce el tiempo de consolidación de métricas de 48 horas a menos de 1.5 segundos, eliminando definitivamente la transcripción manual a hojas de cálculo.
3. **Resiliencia Mediante el Fallback Seguro de Power BI:** La incorporación del componente de Fallback Seguro resuelve la incompatibilidad histórica entre las aplicaciones web de terceros y las directivas de seguridad del tenant institucional universitario de la UPT (`@virtual.upt.pe`), garantizando disponibilidad ininterrumpida de los tableros analíticos para la toma de decisiones directivas.
4. **Impacto Positivo en la Equidad y Prevención del Burnout:** La implementación algorítmica de la regla de sobrecarga ($\ge 3$ incidencias) dota a la dirección de visibilidad proactiva para rebalancear tareas, promoviendo la salud ocupacional y reduciendo la probabilidad de defectos en las entregas de software.
5. **Diagramación Ejecutable en Mermaid:** Los modelos arquitectónicos documentados en sintaxis nativa Mermaid son completamente ejecutables, versionables en Git y renderizables en plataformas web, asegurando la trazabilidad viva entre el diseño arquitectónico y el código en producción.

---

# 6. RECOMENDACIONES

1. **Monitoreo de Rendimiento en Producción:** Se recomienda instrumentar la plataforma con un servicio de observabilidad de frontend (como Google Analytics 4 o Sentry) para medir la latencia real de las peticiones a la API de GitHub desde diferentes redes domésticas y universitarias.
2. **Migración Progresiva a GitHub GraphQL API v4:** Para versiones posteriores, se sugiere explorar la integración de GraphQL v4, compactando las cuatro solicitudes concurrentes de REST en una única consulta compuesta sobre el endpoint `https://api.github.com/graphql`.
3. **Canalización hacia Google BigQuery para Machine Learning:** Se aconseja evaluar la activación de una canalización periódica de datos desde Firestore hacia Google BigQuery, permitiendo entrenar modelos predictivos que anticipen la probabilidad de retraso de un hito en función de la cadencia histórica de commits.
4. **Habilitación de Áreas de Trabajo Seguras en Power BI:** Se sugiere a la Dirección de Tecnologías de Información de la Universidad Privada de Tacna evaluar la habilitación de licencias Power BI Pro o Premium por Usuario para fines de investigación académica, lo cual facultará la incrustación mediante tokens de organización de Azure Active Directory (*Embed for your organization*).
