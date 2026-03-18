## Uso de Cursor en desarrollo

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