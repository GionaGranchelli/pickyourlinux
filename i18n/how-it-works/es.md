# Como funciona

Esta pagina ofrece una vista basada en la documentacion del motor de decision, el modelo de datos y las reglas de explicabilidad de Pick Your Linux.

## Fuentes de documentacion cubiertas

- ARCHITECTURE.md
- DATA_CONTRACT.md
- DATA_RULES.md
- QUESTION_CATALOG.md
- CONSTRAINT_MAPPING.md
- RESULTS_COPY.md
- TESTING.md
- TONE_AND_COPY.md
- FRONTEND-IMPLEMENTATION-RULES.md

## 1. Promesa del producto

Pick Your Linux es un motor de compatibilidad determinista. No clasifica, no puntua ni sugiere una unica mejor distro. Solo filtra con reglas explicitas y muestra razones transparentes.

- Es normal tener varias coincidencias cuando varias distros cumplen las mismas restricciones.
- No hay pesos ocultos, puntuaciones de popularidad ni recomendaciones subjetivas.
- Puedes cambiar respuestas y ver al instante como cambian los resultados.

## 2. Arquitectura principal

El sistema esta dividido en capas estrictas para mantener la logica testeable y la UI sin decisiones.

- Capa de datos (`/src/data`): esquemas, catalogo de preguntas y dataset de distros.
- Capa de logica (`/src/engine/logic.ts`): evaluacion pura de condiciones y parches.
- Capa de estado (`/src/engine/state.ts`): orquestacion del flujo, progreso, deshacer y modelos de resultados.
- Capa UI (`/src/components`): componentes de renderizado que consumen modelos.
- La direccion de importacion es unica: UI -> state -> logic.

## 3. Contrato de datos (UserIntent)

Cada respuesta actualiza un unico objeto `UserIntent` validado. Ese es el estado de decision.

- Preferencias de instalacion y mantenimiento definen tolerancia a friccion inicial y posterior.
- Preferencia por software propietario controla la aceptacion de componentes cerrados.
- Contexto de hardware incluye arquitectura, RAM, secure boot y detalles de GPU.
- Las etiquetas de uso incluyen Gaming, Privacy, Work, Server y OldHardware.
- Campos de refinamiento opcional incluyen escritorio, modelo de lanzamiento, init system y gestor de paquetes.

## 4. Motor de preguntas

Las preguntas son data-driven. Cada opcion contiene parches JSON deterministas. La visibilidad se controla solo con condiciones explicitas.

- Operaciones de parche permitidas: `set`, `add_tag`, `remove_tag`.
- Operaciones de condicion permitidas: `eq`, `neq`, `in`, `contains`, `and`, `or`.
- No hay funciones en datos, callbacks ni `eval` en runtime.
- El orden de preguntas y el comportamiento por fase vienen del catalogo, no de la UI.

## 5. Flujo por fases

La profundidad del flujo es progresiva y solo hacia adelante: Rapido (Beginner) -> Intermedio -> Avanzado.

- Rapido recoge restricciones de alta senal en poco tiempo.
- Intermedio agrega refinamientos practicos (estilo de escritorio, modelo de actualizacion, aclaraciones de hardware).
- Avanzado agrega preferencias explicitas del sistema (init, gestor de paquetes, controles mas estrictos).
- Puedes parar en resultados tras rapido/intermedio y seguir refinando despues sin reiniciar.

## 6. Restricciones duras (Pasa/Falla)

Las restricciones duras excluyen distros incompatibles. Si una distro falla una regla dura, queda fuera.

- Requerir instalador GUI excluye distros con instalador manual.
- Requerir mantenimiento sin terminal excluye distros de mantenimiento practico/manual.
- Evitar software propietario excluye distros que lo requieren.
- Requerir software propietario excluye distros que no lo soportan.
- Requerir compatibilidad con hardware antiguo excluye distros no aptas para equipos modestos.
- Preferencias de Secure Boot y NVIDIA aplican validaciones adicionales explicitas.

## 7. Razones de compatibilidad suave

Las razones suaves no ordenan distros. Solo explican por que una distro compatible puede encajar mejor con ciertos objetivos.

- Gaming y postura de privacidad generan razones de explicabilidad.
- Preferencias de escritorio/lanzamiento/init/paquetes agregan razones explicitas.
- En resultados se muestran por separado razones por elecciones y coincidencias de filtros estrictos.

## 8. Resultados y explicabilidad

Los resultados se presentan como compatibilidad, no como recomendaciones.

- Cada tarjeta incluye filtros estrictos coincidentes, razones por elecciones y friccion potencial.
- El panel de explicabilidad muestra restricciones activas y motivos de exclusion.
- La pagina de comparacion expone atributos lado a lado usando la misma fuente de datos.
- El orden por defecto es mas coincidencias primero; los filtros del usuario son explicitos y reversibles.

## 9. Calidad de datos y auditorias

Los datos de distros pasan validacion por esquema y auditorias de consistencia.

- La validacion de esquema exige valores legales para cada atributo.
- Las reglas de auditoria detectan combinaciones sospechosas (por ejemplo soporte NVIDIA vs politica propietaria).
- Las afirmaciones de Secure Boot y expectativas de mantenimiento rolling se auditan para asegurar consistencia.

## 10. Pruebas y validaciones

Los cambios deben pasar pipelines de validacion deterministas.

- El validador de flujo comprueba coherencia de visibilidad y transiciones.
- Validadores de preguntas y distros hacen cumplir integridad de esquema y catalogo.
- Pruebas del motor cubren logica de condiciones, parches, finalizacion y deshacer.
- El objetivo es un comportamiento explicable y reproducible con tipado estricto y control por esquema.

## 11. Reglas de UX y copy

El lenguaje esta disenado para claridad y reversibilidad.

- Evita palabras como mejor, top, recomendado o afirmaciones basadas en popularidad.
- Evita marcos de juicio de habilidad en la UI; prioriza comodidad y objetivos.
- Cada eleccion debe sentirse reversible: revisar respuestas, editar o reiniciar.
