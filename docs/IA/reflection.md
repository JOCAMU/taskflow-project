# Reflexión sobre el uso de la IA en programación

## Contexto
Este documento resume la experiencia usando herramientas de IA durante el desarrollo de TaskFlow.

## Reflexión final
Durante el proceso se utilizaron sugerencias de Cursor para mejorar refactorizaciones, corregir errores detectados y aumentar la seguridad del código. Sin embargo, fue necesario revisar manualmente los cambios y validar el comportamiento en la interfaz para asegurar consistencia.

## Anexo: Prompt engineering aplicado al desarrollo

## Introducción

En este apartado se han utilizado distintas técnicas de prompt engineering dentro de Cursor para mejorar la calidad de las respuestas al trabajar con el proyecto TaskFlow.

Se han aplicado estrategias como definición de rol, ejemplos (few-shot), razonamiento paso a paso y uso de restricciones.

---

## Prompts utilizados con ejemplos reales

### 1. Definición de rol (desarrollador senior)

**Prompt:**

Actúa como un desarrollador senior y revisa la función renderTasks proponiendo mejoras.

**Resultado aplicado:**

Se mejoró la función `renderTasks`, centralizando el renderizado de tareas y eliminando código duplicado.

**Por qué funciona:**

Definir un rol hace que la IA responda con un enfoque más profesional y centrado en buenas prácticas.

---

### 2. Definición de rol (experto en JavaScript)

**Prompt:**

Actúa como un experto en JavaScript y optimiza la función getVisibleTasks.

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

Ahora haz lo mismo con createTaskElement.

**Resultado aplicado:**

Se refactorizó `createTaskElement`, mejorando la estructura del código y añadiendo claridad.

**Por qué funciona:**

Dar ejemplos ayuda a la IA a entender mejor el formato esperado.

---

### 4. Razonamiento paso a paso

**Prompt:**

Explica paso a paso qué hace la función getVisibleTasks.

**Resultado aplicado:**

Se obtuvo una explicación clara del flujo de filtrado y búsqueda de tareas.

**Por qué funciona:**

Obliga a la IA a descomponer el problema, facilitando la comprensión.

---

### 5. Uso de restricciones

**Prompt:**

Refactoriza createTaskElement sin usar innerHTML y manteniendo el mismo comportamiento.

**Resultado aplicado:**

Se reemplazó el uso de `innerHTML` por `createElement` y `textContent`, mejorando la seguridad.

**Por qué funciona:**

Limita la respuesta y evita soluciones incorrectas o innecesarias.

---

### 6. Generación de código

**Prompt:**

Crea una función que marque todas las tareas como completadas.

**Resultado aplicado:**

Se implementó la funcionalidad de “Completar todas” dentro del proyecto.

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

Añade comentarios JSDoc a la función renderTasks.

**Resultado aplicado:**

Se añadieron comentarios explicando parámetros y funcionamiento de la función.

**Por qué funciona:**

Define el formato esperado y mejora la documentación del código.

---

### 9. Detección de errores

**Prompt:**

Detecta posibles errores en createTaskElement.

**Resultado aplicado:**

Se detectó el uso de `innerHTML` con datos del usuario y se corrigió para evitar vulnerabilidades.

**Por qué funciona:**

Hace que la IA analice el código de forma crítica.

---

### 10. Mejora de nombres

**Prompt:**

Mejora los nombres de variables en app.js para que sean más descriptivos.

**Resultado aplicado:**

Se renombraron variables como `tasklist` a `taskList`, mejorando la claridad del código.

**Por qué funciona:**

Permite mejorar la legibilidad sin cambiar la lógica del programa.

---

## Aplicación en el proyecto

Estos prompts se han aplicado directamente en el desarrollo de TaskFlow para:

- Refactorizar funciones  
- Mejorar la seguridad del código  
- Optimizar la estructura del proyecto  
- Añadir documentación  
- Detectar errores  

---

## Conclusión

El uso de prompt engineering ha permitido obtener mejores resultados al trabajar con la inteligencia artificial, mejorando la calidad del código y facilitando el desarrollo del proyecto.