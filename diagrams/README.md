# CATÁLOGO DE DIAGRAMAS UML EN PLANTUML — MONITOR DE MÉTRICAS BI
## Documento Técnico de Especificación de Requerimientos de Software (FD03-EPIS)
### Universidad Privada de Tacna — Facultad de Ingeniería — Escuela Profesional de Ingeniería de Sistemas

---

## 1. INTRODUCCIÓN Y GUÍA DE USO

Este repositorio de diagramas contiene la especificación formal del modelado visual del sistema **Monitor de Métricas BI**, estructurado bajo el estándar internacional **Unified Modeling Language (UML 2.5)** y el estándar **IEEE Std 830-1998 / ISO/IEC/IEEE 29148:2018**. Todos los diagramas han sido desarrollados en sintaxis declarativa **PlantUML** (`.puml`), lo que permite:

1. **Control de Versiones Granular:** Seguimiento de cambios línea por línea en Git sin artefactos binarios opacos.
2. **Generación Automatizada:** Renderizado continuo en formatos vectoriales (SVG) o matriciales de alta resolución (PNG, PDF) mediante herramientas de integración continua o el servidor oficial PlantUML.
3. **Consistencia Metodológica:** Coherencia estricta entre la arquitectura conceptual, el modelo lógico, las reglas de negocio y los flujos temporales del sistema.

---

## 2. INVENTARIO DE MODELOS PLANTUML

A continuación se detalla la matriz de diagramas organizados según el índice canónico del informe **FD03-EPIS**:

| N° | Archivo Fuente (`.puml`) | Sección FD03 | Tipo de Diagrama UML | Propósito y Contenido Principal |
|:---:|:---|:---|:---|:---|
| **01** | `01_organigrama_empresa.puml` | **I.4 Organigrama** | Estructura Organizacional | Jerarquía funcional de la consultora tecnológica, detallando Gerencia, Calidad, CTO, PMO, Business Intelligence y Desarrollo. |
| **02** | `02_proceso_actual_actividades.puml` | **III.a Proceso Actual** | Diagrama de Actividades (Swimlanes) | Flujo operativo manual y artesanal de recolección de métricas en hojas de cálculo con cuellos de botella y demoras de 2 a 3 días. |
| **03** | `03_proceso_propuesto_actividades.puml` | **III.b Proceso Propuesto** | Diagrama de Actividades (Concurrente) | Flujo automatizado en tiempo real con OAuth 2.0, consumo de API GitHub v3 en paralelo, cálculo de sobrecarga y renderizado reactivo (< 1.5 s). |
| **04** | `04_diagrama_paquetes.puml` | **V.2.a Diagrama de Paquetes** | Diagrama de Paquetes | Arquitectura modular por capas: Presentación (React 19 SPA), Lógica y Servicios, Modelo y Persistencia (Firestore), y Servicios Cloud Externos. |
| **05** | `05_diagrama_casos_de_uso.puml` | **V.2.b Casos de Uso** | Casos de Uso del Sistema | Modelado completo de 12 casos de uso nucleares organizados por paquetes funcionales, con relaciones `<<include>>` y actores del sistema. |
| **06** | `06_analisis_objetos_robustez.puml` | **V.3.a Análisis de Objetos** | Diagrama de Robustez (BCE) | Descomposición en Objetos de Frontera (Boundary), Controladores (Control) y Entidades de Datos (Entity) para los flujos críticos. |
| **07** | `07_actividades_con_objetos.puml` | **V.3.b Actividades con Objetos** | Actividades con Pines de Datos | Flujo de procesamiento analítico modelando explícitamente los estados y objetos de datos transitados a través de swimlanes organizacionales. |
| **08** | `08_diagramas_secuencia.puml` | **V.3.c Diagrama de Secuencia** | Diagrama de Secuencia Integral | Traza temporal end-to-end con 4 fases: Autenticación, Ingesta Concurrente, Reglas de Negocio (Sobrecarga/Hitos) y Fallback de Power BI. |
| **09** | `09_diagrama_clases.puml` | **V.3.d Diagrama de Clases** | Diagrama de Clases del Dominio | Estructura estática orientada a objetos: clases del dominio (`UserProfile`, `Repository`, `Contributor`, `Milestone`, `PowerBIConfig`) con atributos tipados y operaciones. |

---

## 3. DIAGRAMAS AUXILIARES Y COMPONENTES ESPECIALIZADOS

Además de los 9 diagramas principales, el directorio incluye modelos de soporte para análisis de subsistemas específicos:

- `03_secuencia_autenticacion.puml`: Secuencia focalizada en el flujo OAuth 2.0 con GitHub y Cloud Firestore.
- `04_secuencia_metricas_repositorio.puml`: Ingesta y agregación de indicadores de repositorio vía API REST v3.
- `05_secuencia_powerbi_fallback.puml`: Mecanismo de tolerancia a fallos ante restricciones de directivas de tenant educativo (`@virtual.upt.pe`).
- `06_secuencia_sobrecarga_equipo.puml`: Detección algorítmica de sobrecarga laboral (regla: asignaciones $\ge 3$).
- `07_secuencia_cronograma_milestones.puml`: Auditoría cronológica de hitos y alertas de desfase temporal.
- `10_estados_milestone.puml`: Diagrama de transición de estados del ciclo de vida del Hito (`Open`, `In Progress`, `Overdue`, `Closed`).
- `11_robustez_bce.puml`: Robustez detallada con participantes desacoplados.
- `12_componentes_sistema.puml`: Diagrama de componentes físicos y arquitectura de despliegue en la nube.

---

## 4. INSTRUCCIONES DE COMPILACIÓN Y RENDERIZADO

### Opción A: Verificación y Renderizado Automático con el Script Python
El proyecto incluye el verificador automatizado `verify_all_diagrams.py` que comprueba la sintaxis y renderiza los diagramas a formato vectorial:

```bash
python verify_all_diagrams.py
```

### Opción B: Uso del CLI Oficial de PlantUML (Java)
Si se dispone de Java y `plantuml.jar` instalado localmente:

```bash
# Renderizar un diagrama a formato PNG
java -jar plantuml.jar diagrams/01_organigrama_empresa.puml

# Renderizar todos los diagramas del directorio a formato vectorial SVG
java -jar plantuml.jar -tsvg diagrams/*.puml
```

### Opción C: Renderizado en Visual Studio Code
1. Instalar la extensión **PlantUML** (autor: *jebbs*).
2. Abrir cualquier archivo `.puml` en el editor.
3. Presionar el atajo `Alt + D` para activar la previsualización interactiva en tiempo real.

---

## 5. ESTÁNDARES Y CONVENCIONES DE ESTILO UTILIZADAS

Todos los archivos `.puml` han sido diseñados bajo una paleta armónica moderna con compatibilidad de impresión:
- **Fondo:** `#F8FAFC` (Slate 50) para evitar contrastes agresivos.
- **Tipografía:** `Segoe UI`, Arial, sans-serif con tamaños jerárquicos legibles (11pt cuerpo, 12-15pt títulos).
- **Esquinas redondeadas:** `roundcorner 8` a `12` para una estética contemporánea.
- **Sin sombras:** `skinparam shadowing false` para máxima nitidez en exportaciones vectoriales y documentos impresos.
- **Colores Semánticos:**
  - *Actores / Roles:* `#DBEAFE` (Azul Suave) con bordes `#2563EB`.
  - *Controladores y Procesos:* `#F0FDF4` (Verde Menta) con bordes `#16A34A`.
  - *Entidades de Datos:* `#FEF3C7` (Ámbar Claro) con bordes `#D97706`.
  - *Fronteras y UI:* `#EFF6FF` (Azul Hielo) con bordes `#1D4ED8`.
  - *Alertas y Alveolos de Error:* `#FEE2E2` (Rojo Claro) con bordes `#DC2626`.

---
*Escuela Profesional de Ingeniería de Sistemas — Universidad Privada de Tacna — 2026*
