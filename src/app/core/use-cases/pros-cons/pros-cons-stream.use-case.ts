import { environment } from "environments/environment";


export const prosConsStreamUseCase = async ( prompt: string) => {
  try {

     const resp = await fetch(`${ environment.backendApi}/pros-cons-discusser-stream`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt })

        });

         if ( !resp.ok ) throw new Error('No se puedo realiar la comparación');

        // El getReader() sirve para obtener un objeto lector (reader) que permite leer los datos del stream de manera controlada, generalmente en fragmentos (chunks).
        const reader = resp.body?.getReader();
        if ( !reader ) {
          console.log('No se pudo generar el reader');
          throw new Error('No se pudo generar el reader')
        }

        // decodificar datos binarios (por ejemplo, un ArrayBuffer o un Uint8Array) en texto legible, usando una codificación específica como UTF-8, UTF-16
        const decoder = new TextDecoder();
        let text = '';

        // Esta función lee datos de un stream de manera asíncrona y los convierte en texto en tiempo real.
        while(true) {
          //Usa reader.read() para leer el siguiente fragmento (chunk) de datos del stream.
          const { value, done } = await reader.read();
          //Si done es true, significa que no hay más datos y el bucle se detiene con break.
          if ( done) {
            break;
          }
          //Si hay datos, usa decoder.decode(value, {stream: true}) para convertir el fragmento binario en texto
          const decodeChunk = decoder.decode( value, {stream: true })
          //Agrega el texto decodificado a la variable text
          text += decodeChunk;
          console.log(text);
        }

        return null;


  } catch (error) {
    return null;
  }
}
