# Manejo de Archivos (Asincrónico)
## Práctica
Se tiene el siguiente requerimiento funcional:<br>
* Dado un directorio, realizar un backup del mismo, en la misma ruta en donde se
encuentra el directorio objetivo.
* A este nuevo directorio sólo deben copiarse los archivos de tipo ‘documento’. Para ello,
solo consideraremos documentos a aquellos archivos que posean una extensión (o sea,
que terminan en ‘.algunaExtension’). Adicionalmente, filtraremos también aquellos
archivos cuyo nombre comience con “.” (punto) ya que esta nomenclatura suele
reservarse para archivos ocultos.
* Si alguna de las copias falla, eso no debe interferir con la ejecución de la copia de las
demás.

1. Desarrollar un programa que realice lo pedido, procesando los archivos en forma
sincrónica.
2. Realizar el mismo programa, pero que funcione en forma asincrónica, utilizando
callbacks
3. Realizar el mismo programa, pero utilizando Promises, con la sintaxis then/catch, y
luego usando async/await.
4. Para pensar y comentar:<br>
¿Encontrás alguna similitud entre las distintas variantes del programa desarrollado? ¿Se te
ocurren ventajas y desventajas de cada solución? Discutir