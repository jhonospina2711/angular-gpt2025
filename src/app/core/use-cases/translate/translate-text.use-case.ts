import type{ TranslateResponse } from "@interfaces/index";
import { environment } from "environments/environment.development";


export const translateTextUseCase = async ( prompt:string, lang: string) => {

  try {

    const resp = await fetch(`${ environment.backendApi}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt, lang })
    });

    if ( !resp.ok ) throw new Error('No se puedo realiar la traducción');

    const { message} = await resp.json() as TranslateResponse;

    return {
      ok: true,
      message: message,
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      userScore: 0,
      message: 'No se puedo realizar la traducción'
    }
  }

}
