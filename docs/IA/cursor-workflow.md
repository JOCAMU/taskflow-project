## Uso de Cursor en desarrollo

## Índice
- Análisis y corrección de JavaScript
- Refactorización y mejoras del proyecto TaskFlow
- Uso de MCP (Model Context Protocol) en Cursor

En este documento se documenta el uso de Cursor durante el desarrollo del proyecto TaskFlow.

Se documentarán:

- Funciones del editor relacionadas con la IA  
- Atajos de teclado empleados  
- Ejemplos donde Cursor ha ayudado a mejorar el código  

## Análisis y corrección de JavaScript

### Introducción

Durante el desarrollo del proyecto TaskFlow se ha utilizado el IDE Cursor asistido por inteligencia artificial. Durante el primer uso, la herramienta identificó varios problemas en el código, detectando dos fallos principales y aplicando mejoras de forma automática. Además, mostró de manera clara los cambios realizados.

Al solicitar una explicación sobre dichas modificaciones, Cursor proporcionó el siguiente análisis:

> Cambios realizados y por qué son mejores  
>
> **Arreglo del filtro “Todas”**  
> Antes: al pulsar “Todas” solo se modificaba el display de los elementos existentes en `#task-list`. Sin embargo, al aplicar otros filtros, el contenido del DOM se reconstruía parcialmente.  
> Ahora: al pulsar “Todas” se reconstruye completamente la lista a partir de `tasks`.  
> Por qué es mejor: `tasks` actúa como fuente de datos principal, asegurando que la vista sea siempre consistente.  
>
> **Arreglo del botón “Editar/Guardar”**  
> Antes: se añadían múltiples event listeners dentro de otros, generando comportamientos inesperados.  
> Ahora: se utiliza un único listener que alterna entre estados.  
> Por qué es mejor: evita duplicidad de eventos y mejora la estabilidad del sistema.  

A continuación, Cursor sugirió una mejora adicional orientada a optimizar el comportamiento del sistema:

> Filtro “Todas”: ahora reconstruye la lista completa desde `tasks`.  
> Editar/Guardar: se gestiona con un único evento, evitando duplicaciones.  

Posteriormente, se aceptaron los cambios propuestos y Cursor realizó una refactorización del código, proporcionando la siguiente explicación:

> Se ha creado la función `renderTasks(list)`, encargada de:  
>
> - Vaciar `#task-list`  
> - Recorrer la lista de tareas  
> - Generar cada elemento con `createTaskElement(...)`  
>
> Se ha reemplazado el código repetido en múltiples secciones del proyecto.  
>
> **Ventajas:**  
>
> - Reducción de código duplicado  
> - Mayor consistencia en el renderizado  
> - Menor probabilidad de errores  

Tras estos cambios, el sistema mantiene el mismo funcionamiento, pero con un código más limpio, estructurado y mantenible.

# Refactorización y mejoras del proyecto TaskFlow

## Introducción

En este documento se describen las mejoras realizadas en el proyecto TaskFlow utilizando Cursor.  
El objetivo ha sido mejorar la organización del código, reducir errores y hacer la aplicación más fácil de mantener.

---

## 1. Refactorización de funciones

Se han refactorizado varias funciones del proyecto para mejorar su claridad y evitar código duplicado.

### renderTasks()

Se ha creado una función `renderTasks` para centralizar el renderizado de las tareas.

Antes, el código para mostrar tareas estaba repetido en varias partes.  
Ahora todo el renderizado se realiza desde una única función.

**Mejora:**
- Menos código duplicado  
- Más fácil de mantener  

---

### getVisibleTasks()

Se ha creado la función `getVisibleTasks` para unificar la lógica de filtros y búsqueda.

Antes, los filtros y la búsqueda funcionaban de forma independiente.  
Ahora ambos utilizan una única fuente de datos.

**Mejora:**
- Código más consistente  
- Menos errores en la interfaz  

---

## 2. Mejora del almacenamiento

Se ha mejorado la gestión de `localStorage`.

- Se ha añadido control de errores con `try/catch`  
- Se ha creado la función `saveTasks()`  

**Mejora:**
- Código más seguro  
- Mejor organización  

---

## 3. Mejora de seguridad

Se ha modificado la función `createTaskElement` para evitar el uso de `innerHTML`.

Ahora se utilizan métodos como `createElement` y `textContent`.

**Mejora:**
- Prevención de ataques XSS  
- Código más seguro  

---

## 4. Mejora en la edición de tareas

Se ha refactorizado el botón de editar/guardar.

Antes se creaban múltiples eventos, lo que generaba errores.  
Ahora se utiliza un único evento con un estado interno.

**Mejora:**
- Código más estable  
- Menos errores  

---

## 5. Mejora de filtros y búsqueda

Se ha unificado el funcionamiento de filtros y búsqueda.

Ahora ambos trabajan sobre el estado de la aplicación y utilizan `renderTasks`.

**Mejora:**
- Comportamiento más coherente  
- Código más limpio  

---

## 6. Validaciones y robustez

Se han añadido comprobaciones adicionales en el código:

- Validación de datos en localStorage  
- Comprobación de existencia de tareas antes de modificarlas  

**Mejora:**
- Aplicación más robusta  
- Menos fallos inesperados  

---

## 7. Mejora de la experiencia de usuario

Se ha mejorado la animación de las tareas para evitar el parpadeo.

Ahora solo se aplica animación al añadir nuevas tareas.

**Mejora:**
- Interfaz más fluida  

---

## 8. Correcciones en HTML

Se ha corregido un error en el atributo `for` del label.

**Mejora:**
- Mejor accesibilidad

## Uso de MCP (Model Context Protocol) en Cursor

### Introducción

En esta parte del proyecto se ha investigado y utilizado el Model Context Protocol (MCP) dentro de Cursor, con el objetivo de permitir que la inteligencia artificial acceda directamente a los archivos del proyecto TaskFlow.

---

## ¿Qué es MCP?

El Model Context Protocol (MCP) es un sistema que permite a la inteligencia artificial acceder a información externa como archivos, repositorios o herramientas.

Gracias a MCP, la IA puede analizar directamente el código del proyecto sin necesidad de copiarlo manualmente en el chat.

---

## ¿Qué es un servidor MCP?

Un servidor MCP actúa como intermediario entre la inteligencia artificial y los datos externos.

Este servidor permite que la IA acceda a diferentes fuentes de información, como:

- Archivos del sistema (filesystem)  
- Repositorios remotos (GitHub)  
- APIs u otras herramientas  

---

## Servidor utilizado: filesystem

Para esta práctica se ha utilizado el servidor MCP de tipo filesystem.

Este servidor permite a la IA acceder directamente a los archivos locales del proyecto, como `app.js` o `index.html`.

### ¿Por qué se ha utilizado filesystem?

Se ha elegido este servidor porque:

- Permite acceder al código local sin necesidad de subirlo  
- Es más fácil de configurar  
- Funciona directamente con el proyecto abierto en Cursor  
- Permite ver cambios en tiempo real  

Aunque también se podría utilizar GitHub, este requiere configuración adicional y solo permite acceder al código que ya ha sido subido al repositorio.

---

## Instalación del servidor MCP

Para configurar MCP en Cursor se han seguido los siguientes pasos:

1. Abrir la sección MCP Tools en Cursor  
2. Acceder al archivo de configuración JSON  
3. Añadir el siguiente servidor:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem"]
    }
  }
}
```

## Comprobación de funcionamiento

Para comprobar que el servidor MCP funciona correctamente, se ha realizado una consulta a la IA:

**Consulta realizada:**

> Lee el archivo app.js

**Resultado obtenido:**

> La IA fue capaz de acceder directamente al archivo `app.js`, leer su contenido completo y mostrar un análisis del mismo.  
> En la respuesta se identificaron correctamente las funciones principales del proyecto, como la gestión de tareas, el uso de localStorage, el renderizado del DOM y los distintos eventos asociados a la aplicación.

Esto confirma que el servidor MCP está correctamente configurado y funcionando.

---

## Ejemplos de consultas realizadas

Se han realizado varias consultas utilizando MCP:

- Leer el archivo `app.js`  
- Identificar funciones del proyecto  
- Explicar la función `renderTasks`  
- Detectar el uso de `localStorage`  
- Proponer mejoras en el código  

---

## Utilidad de MCP en proyectos reales

El uso de MCP puede ser muy útil en proyectos reales, ya que permite:

- Analizar código sin copiarlo manualmente  
- Detectar errores de forma más rápida  
- Mejorar la productividad del desarrollador  
- Facilitar el trabajo en equipo  

---

## Conclusión

El uso de MCP en Cursor ha permitido mejorar la interacción con el proyecto, facilitando el análisis del código y agilizando el desarrollo mediante el acceso directo a los archivos.