# Prompt Engineering aplicado al desarrollo

## Introducción
En este documento se recopilan prompts utilizados para interactuar con asistentes de inteligencia artificial durante el desarrollo del proyecto TaskFlow.
Además, se describen técnicas de prompt engineering que ayudan a obtener respuestas más útiles y aplicables al código real.

## Técnicas aplicadas
- Definición de rol (p. ej. “desarrollador senior”)
- Few-shot prompting (dar un ejemplo de entrada/salida esperado)
- Razonamiento paso a paso
- Uso de restricciones (por ejemplo, “no uses `innerHTML`”)

## Prompts utilizados con ejemplos reales

### 1. Definición de rol (desarrollador senior)
**Prompt:**
Actúa como un desarrollador senior y revisa la función `renderTasks` proponiendo mejoras.

**Resultado aplicado:**
Se mejoró la función `renderTasks`, centralizando el renderizado de tareas y eliminando código duplicado.

**Por qué funciona:**
Definir un rol hace que la IA responda con un enfoque más profesional y centrado en buenas prácticas.

---

### 2. Definición de rol (experto en JavaScript)
**Prompt:**
Actúa como un experto en JavaScript y optimiza la función `getVisibleTasks`.

**Resultado aplicado:**
Se mejoró la lógica de filtrado combinando búsqueda y estado en una única función.

**Por qué funciona:**
La IA adapta sus respuestas al contexto técnico específico del lenguaje.

---

### 3. Few-shot prompting (con ejemplo)
**Prompt:**
Ejemplo:
Entrada: función simple  
Salida: función optimizada y comentada  

Ahora haz lo mismo con `createTaskElement`.

**Resultado aplicado:**
Se refactorizó `createTaskElement`, mejorando la estructura del código y añadiendo claridad.

**Por qué funciona:**
Dar ejemplos ayuda a la IA a entender mejor el formato esperado.

---

### 4. Razonamiento paso a paso
**Prompt:**
Explica paso a paso qué hace la función `getVisibleTasks`.

**Resultado aplicado:**
Se obtuvo una explicación clara del flujo de filtrado y búsqueda de tareas.

**Por qué funciona:**
Obliga a la IA a descomponer el problema, facilitando la comprensión.

---

### 5. Uso de restricciones
**Prompt:**
Refactoriza `createTaskElement` sin usar `innerHTML` y manteniendo el mismo comportamiento.

**Resultado aplicado:**
Se reemplazó `innerHTML` por `createElement` y `textContent`, mejorando la seguridad.

**Por qué funciona:**
Las restricciones evitan soluciones incorrectas o innecesarias.

---

### 6. Generación de código
**Prompt:**
Crea una función que marque todas las tareas como completadas.

**Resultado aplicado:**
Se implementó la funcionalidad “Completar todas” dentro del proyecto.

**Por qué funciona:**
Define claramente el objetivo, facilitando la generación de código útil.

---

### 7. Refactorización
**Prompt:**
Refactoriza el código relacionado con los filtros para evitar duplicación.

**Resultado aplicado:**
Se creó la función `getVisibleTasks` y se unificó la lógica de filtros.

**Por qué funciona:**
Indica exactamente qué mejorar, guiando a la IA hacia una solución concreta.

---

### 8. Documentación (JSDoc)
**Prompt:**
Añade comentarios JSDoc a la función `renderTasks`.

**Resultado aplicado:**
Se añadieron comentarios explicando parámetros y finalidad de la función.

**Por qué funciona:**
Ayuda a estandarizar el formato y mejorar la documentación del código.

---

### 9. Detección de errores
**Prompt:**
Detecta posibles errores en `createTaskElement`.

**Resultado aplicado:**
Se detectó el uso de `innerHTML` con datos de usuario y se corrigió para evitar vulnerabilidades.

**Por qué funciona:**
Hace que la IA analice el código de forma crítica.

---

### 10. Mejora de nombres
**Prompt:**
Mejora los nombres de variables en `app.js` para que sean más descriptivos.

**Resultado aplicado:**
Se renombraron variables como `tasklist` a `taskList`, mejorando la claridad del código.

**Por qué funciona:**
Mejora la legibilidad sin alterar la lógica del programa.

## Aplicación en el proyecto
Estos prompts se aplicaron directamente en el desarrollo de TaskFlow para:
- Refactorizar funciones
- Mejorar la seguridad del código
- Optimizar la estructura
- Añadir documentación
- Detectar y corregir errores

## Conclusión
El uso de prompt engineering permitió obtener mejores resultados al trabajar con inteligencia artificial: se mejoró la calidad del código, la seguridad y la mantenibilidad del proyecto.