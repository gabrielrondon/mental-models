# OKRs Ciberseguridad 2027

> **Resumo**: 4 bloques estratégicos + 2 ejes transversales · objetivos cuantitativos, KPI y dependencias cruzadas (Cyber y DT&D)
> **Fonte Original**: https://claude.ai/artifact/LRGKyyAP8pN879w18iRiLA
> **Extraído via**: Firecrawl (Full Scrape & Extraction de todas as partes)

## Índice de Ejes y Bloques

- **Bloque 1: Resiliencia y Continuidad Tecnológica** (7 objetivos)
- **Bloque 2: Respuesta Eficiente y Orquestada** (7 objetivos)
- **Bloque 3: Facilitadores de los Procesos de Negocio** (5 objetivos)
- **Bloque 4: Capacitación y Concienciación** (4 objetivos)
- **Transversal A: Equipo Evolucionado y Región (Transform 4 Cyber)** (6 objetivos)
- **Transversal B: IA: Triple Misión** (7 objetivos)

---

## Bloque 1: Resiliencia y Continuidad Tecnológica

**Propósito / Para qué:**
> Asegurar la robustez operativa de los procesos críticos del negocio y la adaptabilidad de los sistemas ante fallos tecnológicos, incidentes, ataques e interrupciones graves.

### Objetivos de Bloque 1

#### `[b1-1]` Escalar BIA/BCP a áreas críticas

- **Descripción**: Extender el modelo de BIA/BCP validado en Supply a las siguientes áreas de negocio priorizadas por el catálogo de servicios tecnológicos.
- **KPI 2027**: 4 áreas de negocio con BIA/BCP completo (base 2026: 1 — Supply)
- **Dependencias**:
  - 🔒 **Cyber [ta-4]**: Fin a la dependencia de perfil único en servicios críticos
  - 🔷 **DT&D**: Sistemas Disponibles al 99,95% (Desafío 4, DT&D)

#### `[b1-2]` Criticidad y RTO/RPO en el catálogo de servicios

- **Descripción**: Asignar nivel de criticidad y objetivos de recuperación (RTO/RPO) a cada servicio del catálogo tecnológico ya diseñado en 2026.
- **KPI 2027**: 60% del catálogo de servicios con criticidad y RTO/RPO asignado
- **Dependencias**:
  - 🔒 **Cyber [b1-1]**: Escalar BIA/BCP a áreas críticas

#### `[b1-3]` TPRM como filtro recurrente

- **Descripción**: Aplicar la metodología de riesgo de terceros como control obligatorio en la entrada y renovación de proveedores críticos, no como ejercicio puntual.
- **KPI 2027**: 100% de proveedores críticos evaluados con cláusula contractual exigida
- **Dependencias**:
  - 🔒 **Cyber [tb-7]**: Data Masking y AI-BOM en proveedores de IA

#### `[b1-4]` Políticas formales con control técnico verificado

- **Descripción**: Publicar el marco de políticas críticas con owner y control técnico asociado, y auditar la brecha entre lo escrito y lo implementado.
- **KPI 2027**: 100% de políticas críticas publicadas; brecha política-control cerrada en el 70% de los casos
- **Dependencias**:
  - 🔷 **DT&D**: Auditorías ciber/accesibilidad > 80% (Desafío 1, DT&D)

#### `[b1-5]` DLP en canales críticos

- **Descripción**: Desplegar prevención de fuga de datos sobre correo y documentos como primera fase de cobertura.
- **KPI 2027**: DLP activo en 2 canales críticos (correo, documentos)
- **Dependencias**:
  - 🔒 **Cyber [tb-3]**: Reducción de shadow AI tras ofrecer alternativa

#### `[b1-6]` Simulacros reales de DRP y crisis

- **Descripción**: Ejecutar los primeros simulacros con caída real de servicio y activación de equipo, no ejercicios de escritorio.
- **KPI 2027**: 2 simulacros reales ejecutados (Supply + 1 área adicional)
- **Dependencias**:
  - 🔒 **Cyber [b1-1]**: Escalar BIA/BCP a áreas críticas
  - 🔒 **Cyber [ta-1]**: Dashboard único de KPI/KRI vivo

#### `[b1-7]` Inventario y segmentación de activos OT

- **Descripción**: Iniciar el inventario de activos OT y un primer nivel de segmentación tipo Purdue en almacenes críticos piloto.
- **KPI 2027**: Inventario de activos OT completado en 2 almacenes piloto
- **Dependencias**:
  - 🔷 **DT&D**: Industrialización de Proyectos y Soporte (Desafío 4, DT&D)

---

## Bloque 2: Respuesta Eficiente y Orquestada

**Propósito / Para qué:**
> Fortalecer la capacidad de prevenir, detectar y responder a incidentes, reduciendo volumen e impacto — y evolucionar de equipo reactivo a unidad SWAT proactiva.

### Objetivos de Bloque 2

#### `[b2-1]` Completar el catálogo de alertas SIEM/MDR

- **Descripción**: Terminar la implementación del catálogo de alertas diseñado en 2026, hoy parcial.
- **KPI 2027**: 100% del catálogo de alertas SIEM/MDR implementado
- **Dependencias**: *Sin dependencias registradas*

#### `[b2-2]` Canal único regional de atención de incidencias

- **Descripción**: Centralizar la atención de incidencias de toda la región en un único punto de entrada, sustituyendo los canales locales fragmentados.
- **KPI 2027**: Canal único operativo (fecha objetivo: Q2 2027)
- **Dependencias**:
  - 🔒 **Cyber [ta-3]**: Ejecución del roadmap 2026-2027 por equipo

#### `[b2-3]` Threat hunting proactivo recurrente

- **Descripción**: Instaurar la caza de amenazas como actividad calendarizada, apoyada en IA para triaje y priorización.
- **KPI 2027**: 4 ejercicios de threat hunting ejecutados (cadencia trimestral)
- **Dependencias**:
  - 🔒 **Cyber [b2-1]**: Completar el catálogo de alertas SIEM/MDR
  - 🔒 **Cyber [tb-5]**: Casos de uso de IA de Cyber en producción real

#### `[b2-4]` Runbooks y playbooks críticos documentados

- **Descripción**: Documentar y mantener vivo el conocimiento operativo crítico para reducir la dependencia de personas concretas.
- **KPI 2027**: 80% de los servicios core con runbook vivo y transferible
- **Dependencias**:
  - 🔒 **Cyber [ta-2]**: Rotación interna y shadowing

#### `[b2-5]` Reducción del tiempo de reacción en red team

- **Descripción**: Medir la capacidad de reacción actual del equipo en ejercicios de red team y reducirla de forma objetiva.
- **KPI 2027**: Baseline definido en Q1; reducción del 20% en H2 frente al baseline
- **Dependencias**:
  - 🔒 **Cyber [b3-2]**: Arquitectura de referencia de seguridad
  - 🔒 **Cyber [tb-4]**: Postura ante ataques generados con IA

#### `[b2-6]` Incidencias resueltas en menos de 24h

- **Descripción**: Mejorar la velocidad de resolución tras dos años de estancamiento en esta métrica.
- **KPI 2027**: 65% de incidencias resueltas en menos de 24h (base 2026: 54-60%)
- **Dependencias**:
  - 🔒 **Cyber [b2-1]**: Completar el catálogo de alertas SIEM/MDR
  - 🔒 **Cyber [b2-2]**: Canal único regional de atención de incidencias

#### `[b2-7]` Cobertura CTEM/EASM de activos expuestos

- **Descripción**: Desplegar gestión continua de exposición a amenazas sobre los activos críticos priorizados, cerrando el hueco de capacidad "prevenir".
- **KPI 2027**: 50% de activos críticos con cobertura CTEM
- **Dependencias**:
  - 🔒 **Cyber [b1-2]**: Criticidad y RTO/RPO en el catálogo de servicios

---

## Bloque 3: Facilitadores de los Procesos de Negocio

**Propósito / Para qué:**
> Garantizar que los proyectos estratégicos salen a producción seguros por diseño, reduciendo retrabajos, agilizando el time-to-market y evitando interrupciones de servicio.

### Objetivos de Bloque 3

#### `[b3-1]` Controles técnicos en el pipeline (SAST/DAST/SCA/Secrets)

- **Descripción**: Integrar los cuatro controles directamente en el CI/CD, pasando de evaluar el proyecto a bloquear técnicamente lo que no cumple.
- **KPI 2027**: 100% de proyectos nuevos con los 4 controles integrados en CI/CD
- **Dependencias**:
  - 🔷 **DT&D**: Security by Design — RACI Eudin A/R (DT&D)

#### `[b3-2]` Arquitectura de referencia de seguridad

- **Descripción**: Definir patrones de arquitectura segura reutilizables para los tipos de proyecto más frecuentes.
- **KPI 2027**: 100% de proyectos estratégicos nuevos con arquitectura de referencia aplicada desde diseño
- **Dependencias**:
  - 🔒 **Cyber [b3-1]**: Controles técnicos en el pipeline (SAST/DAST/SCA/Secrets)

#### `[b3-3]` Bastionado de infraestructura crítica

- **Descripción**: Formalizar un baseline de hardening (tipo CIS/NIST) y verificar su aplicación sobre los activos críticos.
- **KPI 2027**: 50% de activos críticos con baseline de hardening verificado
- **Dependencias**:
  - 🔒 **Cyber [b1-2]**: Criticidad y RTO/RPO en el catálogo de servicios

#### `[b3-4]` PAM Just-in-Time

- **Descripción**: Eliminar privilegios permanentes en accesos administrativos, sustituyéndolos por acceso bajo ventana de mantenimiento.
- **KPI 2027**: 70% de accesos administrativos privilegiados bajo modelo Just-in-Time
- **Dependencias**:
  - 🔒 **Cyber [tb-6]**: Gobierno de identidades no-humanas y agentes de IA

#### `[b3-5]` SSPM sobre aplicaciones SaaS

- **Descripción**: Evaluar de forma continua la postura de seguridad de las aplicaciones SaaS utilizadas por el negocio.
- **KPI 2027**: Evaluación continua desplegada sobre el 100% del catálogo de SaaS corporativo
- **Dependencias**:
  - 🔷 **DT&D**: % Adopción GAF (Desafío 2, DT&D)

---

## Bloque 4: Capacitación y Concienciación

**Propósito / Para qué:**
> Dotar a las áreas de negocio y de digital de conocimiento y herramientas para incorporar la privacidad y la ciberseguridad por defecto en su día a día, sin fricción.

### Objetivos de Bloque 4

#### `[b4-1]` Rediseño de talleres presenciales

- **Descripción**: Adaptar formato, duración y encaje horario de los talleres presenciales tras la baja participación de 2026.
- **KPI 2027**: Participación en talleres presenciales al 60%
- **Dependencias**: *Sin dependencias registradas*

#### `[b4-2]` Programa diferenciado para tienda y almacén

- **Descripción**: Diseñar contenido y formato propios para el entorno operativo de tienda y almacén, no una adaptación del contenido de oficina.
- **KPI 2027**: Programa lanzado con 70% de cobertura de tiendas y almacenes
- **Dependencias**:
  - 🔷 **DT&D**: Cultura de la paranoia y preparación real del equipo (Cross Personas/Cultura, DT&D)

#### `[b4-3]` Participación con desglose por colectivo

- **Descripción**: Mantener la participación global y visibilizar el dato por colectivo (oficina, tienda, almacén) en vez de un promedio único.
- **KPI 2027**: ≥85% de participación global, con desglose por colectivo reportado
- **Dependencias**:
  - 🔒 **Cyber [b4-1]**: Rediseño de talleres presenciales
  - 🔒 **Cyber [b4-2]**: Programa diferenciado para tienda y almacén

#### `[b4-4]` Programa AI-Safety Champions

- **Descripción**: Certificar referentes de uso seguro de IA por área de negocio, incluyendo reconocimiento de fraude por IA generativa.
- **KPI 2027**: 1 AI-Safety Champion certificado por unidad de negocio
- **Dependencias**:
  - 🔒 **Cyber [tb-2]**: Alternativa corporativa de IA para el negocio

---

## Transversal A: Equipo Evolucionado y Región (Transform 4 Cyber)

**Propósito / Para qué:**
> Consolidar el modelo de equipo regional integrado nacido en 2026: de operador técnico a gestor responsable de su área, con autonomía, juicio de riesgo y capacidad de comunicar con negocio.

### Objetivos de Transversal A

#### `[ta-1]` Dashboard único de KPI/KRI vivo

- **Descripción**: Pasar el panel de control consolidado de "entregado" a herramienta usada de forma recurrente en la toma de decisiones.
- **KPI 2027**: Actualización mensual; citado en al menos 4 comités de dirección al año
- **Dependencias**:
  - 🔒 **Cyber [b1-6]**: Simulacros reales de DRP y crisis

#### `[ta-2]` Rotación interna y shadowing

- **Descripción**: Sistematizar la rotación entre servicios de Cyber para sostener la perspectiva transversal del equipo.
- **KPI 2027**: 100% del equipo con al menos un ciclo de rotación completado
- **Dependencias**: *Sin dependencias registradas*

#### `[ta-3]` Ejecución del roadmap 2026-2027 por equipo

- **Descripción**: Convertir en resultado real el roadmap que cada equipo definió al cierre de 2026.
- **KPI 2027**: 75% de las acciones del roadmap completadas
- **Dependencias**: *Sin dependencias registradas*

#### `[ta-4]` Fin a la dependencia de perfil único en servicios críticos

- **Descripción**: Documentar y capacitar backup en cada servicio crítico, cerrando el riesgo de continuidad ligado a una sola persona.
- **KPI 2027**: 100% de servicios críticos con al menos 2 personas capacitadas para operarlo
- **Dependencias**:
  - 🔒 **Cyber [b2-4]**: Runbooks y playbooks críticos documentados

#### `[ta-5]` Madurez de equipo integrado

- **Descripción**: Consolidar el paso de "Work Together" a "Integrated Team" según el propio marco de evolución de Transform 4 Cyber.
- **KPI 2027**: Nivel "Integrated Team" alcanzado, verificado por evaluación interna
- **Dependencias**:
  - 🔒 **Cyber [ta-2]**: Rotación interna y shadowing
  - 🔒 **Cyber [ta-3]**: Ejecución del roadmap 2026-2027 por equipo

#### `[ta-6]` Contribución a proyectos mutualizados de la región

- **Descripción**: Reportar de forma explícita los servicios y proyectos de Cyber que se mutualizan a nivel Iberia.
- **KPI 2027**: 3 servicios/proyectos de Cyber mutualizados reportados en el año
- **Dependencias**:
  - 🔷 **DT&D**: Modelo Regional Iberia / Proyectos mutualizados (Desafío 2, DT&D)

---

## Transversal B: IA: Triple Misión

**Propósito / Para qué:**
> Que Cyber mitigue el riesgo de la IA, habilite su adopción segura en el negocio, y use la IA para potenciar la capacidad del propio equipo.

### Objetivos de Transversal B

#### `[tb-1]` Arnés de seguridad IA4Business / IA4Tech

- **Descripción**: Implantar el arnés de seguridad ya planificado en 2026 para ambas plataformas de IA corporativa.
- **KPI 2027**: Arnés implantado y en uso (fecha objetivo: Q2 2027)
- **Dependencias**:
  - 🔒 **Cyber [b3-1]**: Controles técnicos en el pipeline (SAST/DAST/SCA/Secrets)
  - 🔷 **DT&D**: Innovación y Liderazgo en IA — AI Powered (Desafío 3, DT&D)

#### `[tb-2]` Alternativa corporativa de IA para el negocio

- **Descripción**: Ofrecer una herramienta de IA oficial y aprobada antes de seguir reforzando el bloqueo de shadow AI.
- **KPI 2027**: Alternativa disponible y comunicada al 100% de las BUs
- **Dependencias**:
  - 🔒 **Cyber [tb-1]**: Arnés de seguridad IA4Business / IA4Tech

#### `[tb-3]` Reducción de shadow AI tras ofrecer alternativa

- **Descripción**: Medir la caída real de herramientas de IA no oficiales una vez exista sustituto corporativo.
- **KPI 2027**: Reducción del 50% de herramientas no oficiales detectadas
- **Dependencias**:
  - 🔒 **Cyber [tb-2]**: Alternativa corporativa de IA para el negocio

#### `[tb-4]` Postura ante ataques generados con IA

- **Descripción**: Ejecutar un ejercicio de red team con técnicas de IA adversaria para establecer una línea base de defensa y mejorarla.
- **KPI 2027**: 1 ejercicio ejecutado; reducción del 20% en hallazgos críticos frente al baseline
- **Dependencias**:
  - 🔒 **Cyber [b2-5]**: Reducción del tiempo de reacción en red team

#### `[tb-5]` Casos de uso de IA de Cyber en producción real

- **Descripción**: Pasar el uso de IA del propio equipo de exploración a herramienta operativa fiable y trazable (triaje, informes GRC, priorización de vulnerabilidades).
- **KPI 2027**: 4 casos de uso de IA en producción operativa real
- **Dependencias**:
  - 🔒 **Cyber [b2-3]**: Threat hunting proactivo recurrente
  - 🔷 **DT&D**: +60 casos de uso de IA / 80% de procesos core con agentes (Desafío 3, DT&D)

#### `[tb-6]` Gobierno de identidades no-humanas y agentes de IA

- **Descripción**: Inventariar y aplicar política de identidad, privilegio mínimo y trazabilidad a los agentes de IA en producción.
- **KPI 2027**: 100% de los agentes en producción con identidad gobernada
- **Dependencias**:
  - 🔒 **Cyber [b3-4]**: PAM Just-in-Time
  - 🔒 **Cyber [tb-1]**: Arnés de seguridad IA4Business / IA4Tech

#### `[tb-7]` Data Masking y AI-BOM en proveedores de IA

- **Descripción**: Exigir anonimización de datos de entrenamiento y trazabilidad de procedencia de modelo en nuevos contratos de proveedores de IA.
- **KPI 2027**: 100% de nuevos contratos de proveedores de IA con certificación AI-BOM exigida
- **Dependencias**:
  - 🔒 **Cyber [b1-3]**: TPRM como filtro recurrente

---

## Tabla Consolidada de Todos los Objetivos (36 OKRs)

| ID | Eje / Bloque | Objetivo | KPI 2027 | Dependencias |
|---|---|---|---|---|
| `b1-1` | Bloque 1 | Escalar BIA/BCP a áreas críticas | 4 áreas de negocio con BIA/BCP completo (base 2026: 1 — Supply) | ta-4; DT&D: Sistemas Disponibles al 99,95% (Desafío 4, DT&D) |
| `b1-2` | Bloque 1 | Criticidad y RTO/RPO en el catálogo de servicios | 60% del catálogo de servicios con criticidad y RTO/RPO asignado | b1-1 |
| `b1-3` | Bloque 1 | TPRM como filtro recurrente | 100% de proveedores críticos evaluados con cláusula contractual exigida | tb-7 |
| `b1-4` | Bloque 1 | Políticas formales con control técnico verificado | 100% de políticas críticas publicadas; brecha política-control cerrada en el 70% de los casos | DT&D: Auditorías ciber/accesibilidad > 80% (Desafío 1, DT&D) |
| `b1-5` | Bloque 1 | DLP en canales críticos | DLP activo en 2 canales críticos (correo, documentos) | tb-3 |
| `b1-6` | Bloque 1 | Simulacros reales de DRP y crisis | 2 simulacros reales ejecutados (Supply + 1 área adicional) | b1-1; ta-1 |
| `b1-7` | Bloque 1 | Inventario y segmentación de activos OT | Inventario de activos OT completado en 2 almacenes piloto | DT&D: Industrialización de Proyectos y Soporte (Desafío 4, DT&D) |
| `b2-1` | Bloque 2 | Completar el catálogo de alertas SIEM/MDR | 100% del catálogo de alertas SIEM/MDR implementado | - |
| `b2-2` | Bloque 2 | Canal único regional de atención de incidencias | Canal único operativo (fecha objetivo: Q2 2027) | ta-3 |
| `b2-3` | Bloque 2 | Threat hunting proactivo recurrente | 4 ejercicios de threat hunting ejecutados (cadencia trimestral) | b2-1; tb-5 |
| `b2-4` | Bloque 2 | Runbooks y playbooks críticos documentados | 80% de los servicios core con runbook vivo y transferible | ta-2 |
| `b2-5` | Bloque 2 | Reducción del tiempo de reacción en red team | Baseline definido en Q1; reducción del 20% en H2 frente al baseline | b3-2; tb-4 |
| `b2-6` | Bloque 2 | Incidencias resueltas en menos de 24h | 65% de incidencias resueltas en menos de 24h (base 2026: 54-60%) | b2-1; b2-2 |
| `b2-7` | Bloque 2 | Cobertura CTEM/EASM de activos expuestos | 50% de activos críticos con cobertura CTEM | b1-2 |
| `b3-1` | Bloque 3 | Controles técnicos en el pipeline (SAST/DAST/SCA/Secrets) | 100% de proyectos nuevos con los 4 controles integrados en CI/CD | DT&D: Security by Design — RACI Eudin A/R (DT&D) |
| `b3-2` | Bloque 3 | Arquitectura de referencia de seguridad | 100% de proyectos estratégicos nuevos con arquitectura de referencia aplicada desde diseño | b3-1 |
| `b3-3` | Bloque 3 | Bastionado de infraestructura crítica | 50% de activos críticos con baseline de hardening verificado | b1-2 |
| `b3-4` | Bloque 3 | PAM Just-in-Time | 70% de accesos administrativos privilegiados bajo modelo Just-in-Time | tb-6 |
| `b3-5` | Bloque 3 | SSPM sobre aplicaciones SaaS | Evaluación continua desplegada sobre el 100% del catálogo de SaaS corporativo | DT&D: % Adopción GAF (Desafío 2, DT&D) |
| `b4-1` | Bloque 4 | Rediseño de talleres presenciales | Participación en talleres presenciales al 60% | - |
| `b4-2` | Bloque 4 | Programa diferenciado para tienda y almacén | Programa lanzado con 70% de cobertura de tiendas y almacenes | DT&D: Cultura de la paranoia y preparación real del equipo (Cross Personas/Cultura, DT&D) |
| `b4-3` | Bloque 4 | Participación con desglose por colectivo | ≥85% de participación global, con desglose por colectivo reportado | b4-1; b4-2 |
| `b4-4` | Bloque 4 | Programa AI-Safety Champions | 1 AI-Safety Champion certificado por unidad de negocio | tb-2 |
| `ta-1` | Transversal A | Dashboard único de KPI/KRI vivo | Actualización mensual; citado en al menos 4 comités de dirección al año | b1-6 |
| `ta-2` | Transversal A | Rotación interna y shadowing | 100% del equipo con al menos un ciclo de rotación completado | - |
| `ta-3` | Transversal A | Ejecución del roadmap 2026-2027 por equipo | 75% de las acciones del roadmap completadas | - |
| `ta-4` | Transversal A | Fin a la dependencia de perfil único en servicios críticos | 100% de servicios críticos con al menos 2 personas capacitadas para operarlo | b2-4 |
| `ta-5` | Transversal A | Madurez de equipo integrado | Nivel "Integrated Team" alcanzado, verificado por evaluación interna | ta-2; ta-3 |
| `ta-6` | Transversal A | Contribución a proyectos mutualizados de la región | 3 servicios/proyectos de Cyber mutualizados reportados en el año | DT&D: Modelo Regional Iberia / Proyectos mutualizados (Desafío 2, DT&D) |
| `tb-1` | Transversal B | Arnés de seguridad IA4Business / IA4Tech | Arnés implantado y en uso (fecha objetivo: Q2 2027) | b3-1; DT&D: Innovación y Liderazgo en IA — AI Powered (Desafío 3, DT&D) |
| `tb-2` | Transversal B | Alternativa corporativa de IA para el negocio | Alternativa disponible y comunicada al 100% de las BUs | tb-1 |
| `tb-3` | Transversal B | Reducción de shadow AI tras ofrecer alternativa | Reducción del 50% de herramientas no oficiales detectadas | tb-2 |
| `tb-4` | Transversal B | Postura ante ataques generados con IA | 1 ejercicio ejecutado; reducción del 20% en hallazgos críticos frente al baseline | b2-5 |
| `tb-5` | Transversal B | Casos de uso de IA de Cyber en producción real | 4 casos de uso de IA en producción operativa real | b2-3; DT&D: +60 casos de uso de IA / 80% de procesos core con agentes (Desafío 3, DT&D) |
| `tb-6` | Transversal B | Gobierno de identidades no-humanas y agentes de IA | 100% de los agentes en producción con identidad gobernada | b3-4; tb-1 |
| `tb-7` | Transversal B | Data Masking y AI-BOM en proveedores de IA | 100% de nuevos contratos de proveedores de IA con certificación AI-BOM exigida | b1-3 |
