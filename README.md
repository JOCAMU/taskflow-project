# Taskflow Project
## Diseño de la aplicación

Antes de implementar TaskFlow se creó un wireframe para definir la estructura de la interfaz.

La aplicación se compone de las siguientes secciones:

- Cabecera con el nombre de la aplicación.
- Formulario para añadir nuevas tareas.
- Lista de tareas con opción de marcar como completadas o eliminar.
- Buscador de tareas.
- Panel de estadísticas con el estado de las tareas.

### Wireframe



Aplicación web para gestionar tareas personales con soporte para modo oscuro, filtros y persistencia de datos.

## Tecnologías utilizadas

- HTML5
- Tailwind CSS (CDN)
- JavaScript (Vanilla)
- LocalStorage

## Funcionalidades

- Añadir tareas con prioridad (alta, media, baja)
- Marcar tareas como completadas
- Editar el título de una tarea
- Filtrar tareas: todas, pendientes y completadas
- Buscar tareas por texto
- Borrar tareas completadas
- Marcar todas las tareas como completadas
- Estadísticas en tiempo real (total, completadas, pendientes)
- Modo oscuro
- Persistencia de datos con LocalStorage
- Diseño responsive

## Cómo usar la aplicación

1. Escribe el nombre de la tarea en el campo de texto
2. Selecciona la prioridad (alta, media, baja)
3. Pulsa "Añadir"
4. Usa los filtros para ver todas, pendientes o completadas
5. Pulsa "completada" para marcar una tarea como hecha
6. Pulsa "editar" para modificar el título de una tarea
7. Pulsa "Borrar completadas" para eliminar las tareas completadas
8. Pulsa "Modo oscuro" para cambiar el tema

## Testing manual

### Prueba 1 - App con lista vacía
- Resultado: 
La aplicacion carga perfectamente sin ninguna tarea en la lista
### Prueba 2 - Añadir tarea sin título
- Resultado: 
La aplicacion no permite añadir tareas sin titulo
### Prueba 3 - Tarea con título muy largo
- Resultado: 
Se ha establecido un limite maximo de 50 caracteres
### Prueba 4 - Marcar varias tareas como completadas
- Resultado: 
 La aplicacion permite marcar varias tareas como completadas 
### Prueba 5 - Eliminar varias tareas completadas
- Resultado: 
 La aplicacion borra satisfactoriamente las tareas completadas 
### Prueba 6 - Recargar la página y comprobar persistencia
- Resultado: 
La persistencia en la aplicacion cuando recargas la pagina funciona
## URL de la aplicación

[TaskFlow en producción]()
