import axios from 'axios';
import * as cheerio from 'cheerio';

type BehanceUser = {
  display_name: string;
  occupation: string;
  images: Record<string, string>;
  url: string;
};

// Placeholder base64 de uma imagem 1x1 cinza
const PLACEHOLDER_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

export async function scrapeBehanceUser(username: string): Promise<BehanceUser | null> {
  const url = `https://www.behance.net/${username}`;
  
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Utilizando seletores mais específicos e com fallbacks
    const displayName = $('[data-id="profile-name"]').text().trim() || 
                       $('.Profile-name').text().trim() ||
                       $('h1').first().text().trim();

    const occupation = $('[data-id="profile-occupation"]').text().trim() ||
                      $('.Profile-occupation').text().trim() ||
                      $('.UserInfo-line').first().text().trim();

    // Buscando a imagem do perfil com múltiplos seletores possíveis
    const profileImage = $('img[alt*="avatar" i]').attr('src') ||              // Busca por alt contendo "avatar"
    $('img[alt*="profile picture" i]').attr('src') ||      // Busca por alt contendo "profile picture"
    $('div[class*="Avatar"] img').attr('src') ||           // Busca em div com classe contendo "Avatar"
    $('div[class*="UserInfo"] img').first().attr('src');   // Busca na seção de informações do usuário


                        
    console.log("tempo", profileImage)

    if (!displayName) {
      throw new Error('Nome do usuário não encontrado');
    }

    // Usando o placeholder local em base64
    const finalProfileImage = profileImage || PLACEHOLDER_IMAGE;

    return {
      display_name: displayName,
      occupation: occupation || 'Profissional Criativo',
      images: { '276': finalProfileImage },
      url,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao buscar informações do usuário:', error.message);
    } else {
      console.error('Erro ao buscar informações do usuário:', error);
    }
    return null;
  }
}