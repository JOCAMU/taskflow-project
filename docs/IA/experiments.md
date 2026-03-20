


# Experimentos con IA en programación

## Introducción

En este apartado he realizado varios experimentos para comparar cómo cambia la forma de trabajar al usar inteligencia artificial frente a hacerlo de forma manual.

El objetivo ha sido ver diferencias en el tiempo que se tarda, la calidad del código y lo bien que se entiende cada problema.

---

## Experimento 1: Filtrar números pares

### Sin IA

Primero hice una función para obtener los números pares de una lista usando un bucle `for`.

**Tiempo invertido:** unos 5 minutos  
**Calidad:** correcta, aunque algo larga  
**Comprensión:** buena, ya que lo hice yo paso a paso  

---

### Con IA

Después le pedí a la IA que hiciera lo mismo.

**Resultado:**
Utilizó el método `filter()`, haciendo el código mucho más corto.

**Tiempo invertido:** 1 minuto  
**Calidad:** más limpia y moderna  
**Comprensión:** buena, aunque tuve que revisar cómo funcionaba `filter()`  

---

### Comparación

La IA fue mucho más rápida y el código quedó mejor, aunque hacerlo sin IA ayuda más a entenderlo desde cero.

---

## Experimento 2: Validación de formulario

### Sin IA

Implementé una validación básica para evitar que el usuario introduzca una tarea vacía.

**Tiempo invertido:** unos 10 minutos  
**Calidad:** funcional pero simple  
**Comprensión:** completa  

---

### Con IA

Le pedí a la IA que mejorara la validación.

**Resultado:**
Añadió comprobaciones como `trim()` y control de errores.

**Tiempo invertido:** 2 minutos  
**Calidad:** más completa  
**Comprensión:** buena  

---

### Comparación

La IA ayudó a mejorar la validación rápidamente, aunque yo ya tenía la base hecha.

---

## Experimento 3: Refactorización de función

### Sin IA

Intenté mejorar una función larga reorganizando el código manualmente.

**Tiempo invertido:** unos 15 minutos  
**Calidad:** mejor que antes, pero aún mejorable  
**Comprensión:** completa  

---

### Con IA

Le pedí a la IA que refactorizara la función.

**Resultado:**
Simplificó la lógica y eliminó partes repetidas.

**Tiempo invertido:** 3 minutos  
**Calidad:** bastante mejor  
**Comprensión:** buena  

---

### Comparación

La IA facilita mucho este tipo de tareas, sobre todo para detectar cosas que se pueden simplificar.

---

## Experimentos en el proyecto TaskFlow

### Experimento 4: renderTasks

**Sin IA:**
Tenía código repetido en varias partes para mostrar las tareas.

**Con IA:**
Se creó una función `renderTasks` que centraliza todo.

**Resultado:**
El código quedó más limpio y fácil de mantener.

---

### Experimento 5: getVisibleTasks

**Sin IA:**
Los filtros y la búsqueda estaban separados.

**Con IA:**
Se unificó todo en una sola función.

**Resultado:**
El comportamiento es más consistente y fácil de entender.

---

### Experimento 6: createTaskElement

**Sin IA:**
Usaba `innerHTML` para generar el contenido.

**Con IA:**
Se cambió a `createElement` y `textContent`.

**Resultado:**
El código es más seguro y claro.

---

## Conclusión

Después de hacer estos experimentos, creo que la inteligencia artificial es muy útil para ahorrar tiempo y mejorar el código.

Sin embargo, también es importante entender lo que hace, ya que si no se revisa, se puede usar código sin saber realmente cómo funciona.

En general, combinar trabajo manual con IA es la mejor opción.