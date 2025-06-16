import type { ProsConsResponse } from "@interfaces/pros-cons.response";
import { environment } from "environments/environment.development"


export const prosConsDiscusserUseCase = async ( prompt: string ) => {
  try {
    const resp = await fetch(`${ environment.backendApi}/pros-cons-discusser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })

    });


     if ( !resp.ok ) throw new Error('No se puedo realiar la comparación');

    const data = await resp.json() as ProsConsResponse

    return {
      ok: true,
      ...data,
    }

  } catch (error) {
    //throw new Error('No se puedo realiar la comparación')
    return {
      ok: false,
      role:'',
      content: 'No se pudo realizar la comparación'
    }
  }
}
