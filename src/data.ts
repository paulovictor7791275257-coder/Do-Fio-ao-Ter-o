export interface Material {
  id: string;
  title: string;
  url: string;
  icon: string;
}

export interface Lesson {
  id: number; // 1 to 12
  title: string;
  description: string;
  youtubeId: string;
}

export interface Module {
  id: string; // e.g. "modulo-1"
  number: number;
  title: string;
  lessons: Lesson[];
}

export const MAIN_DRIVE_FOLDER = "https://drive.google.com/drive/folders/1vOvhQKvSxyUv7EGsp8aCnZtYD750Zaze?hl=pt-br";

export const MATERIALS: Material[] = [
  {
    id: "metodo",
    title: "Método do Terço com Propósito",
    url: "https://drive.google.com/file/d/12Ua8PNLYsbqwoi6nrAxwPgZxLrnMGe1E/view",
    icon: "📖"
  },
  {
    id: "modelos",
    title: "30 Modelos de Terços por Ocasião",
    url: "https://drive.google.com/file/d/1hYXDneV5LeMrlJCjVxBJjbW8m4TTxQZK/view",
    icon: "✨"
  },
  {
    id: "frases",
    title: "20 Frases para Cartão",
    url: "https://drive.google.com/file/d/1ie4P90lMalJDxN-nZiFeEYK-uSwDvE3H/view",
    icon: "💌"
  },
  {
    id: "embalagens",
    title: "Guia de Embalagens com Amor",
    url: "https://drive.google.com/file/d/1S_sl8mfBACZV4YUHt7_egoB9QqnuCIF2/view",
    icon: "🎁"
  },
  {
    id: "fornecedores",
    title: "Fornecedores",
    url: "https://drive.google.com/file/d/1ZkkQ5U-AVHy0T-6pdPMNEN6Nl3CnWm6N/view",
    icon: "🕊️"
  }
];

export const MODULES: Module[] = [
  {
    id: "modulo-1",
    number: 1,
    title: "Fundamentos",
    lessons: [
      {
        id: 1,
        title: "Bem-vinda ao Mundo dos Terços",
        description: "Introdução ao método, apresentação dos materiais e primeiros passos fundamentais para sua jornada.",
        youtubeId: "Q5745kPEaws"
      },
      {
        id: 2,
        title: "Conhecendo os Materiais",
        description: "Aprenda a selecionar fios de alta resistência, contas ideais, cruzes e medalhas que conferem acabamento premium.",
        youtubeId: "w1iXzudgUAk"
      },
      {
        id: 3,
        title: "O Nó Franciscano Passo a Passo",
        description: "Aprenda detalhadamente a fazer o nó base indispensável para a construção perfeita e segura dos terços.",
        youtubeId: "waAb--9vArQ"
      },
      {
        id: 4,
        title: "Montando sua Primeira Dezena",
        description: "Una as habilidades adquiridas e conclua a montagem estruturada do seu primeiro terço de uma dezena.",
        youtubeId: "bcBEeeuv2L8"
      }
    ]
  },
  {
    id: "modulo-2",
    number: 2,
    title: "Desenvolvendo",
    lessons: [
      {
        id: 5,
        title: "Terço Simples com Fio Encerado",
        description: "Compreenda a flexibilidade e robustez do fio encerado para criar terços rústicos e cotidianos duráveis.",
        youtubeId: "_fMy719LJto"
      },
      {
        id: 6,
        title: "Terço Personalizado",
        description: "Introduza nomes, iniciais e composições exclusivas de contas, aumentando drasticamente o valor afetivo de cada peça.",
        youtubeId: "AS2ojOU8dXk"
      },
      {
        id: 7,
        title: "Montando o Entremeio e Cruz",
        description: "O segredo dos encaixes refinados. Entenda como estruturar de forma firme o entremeio e o crucifixo.",
        youtubeId: "Jr4IYG9-5fw"
      },
      {
        id: 8,
        title: "Acabamento Final",
        description: "O detalhe que difere o amador do profissional. Aprenda cortes, queimas, travas e alinhamentos perfeitos.",
        youtubeId: "osQJkrzd_8o"
      }
    ]
  },
  {
    id: "modulo-3",
    number: 3,
    title: "Avançando",
    lessons: [
      {
        id: 9,
        title: "Fio de Aço e Contas Especiais",
        description: "Adentre nas técnicas de contra-pino, fios de aço e miçangas finas para criar terços de luxo de alta joalheria.",
        youtubeId: "XrX5wgtpplg"
      },
      {
        id: 10,
        title: "Terço da Batalha",
        description: "Aprenda a montar a modelagem e a forte estrutura do Terço da Batalha, peça com grande procura e alto valor espiritual.",
        youtubeId: "-2GGppJ5fZU"
      },
      {
        id: 11,
        title: "Modelos Exclusivos",
        description: "Variações de cores, miçangas peroladas, detalhes folheados a ouro e criações artísticas que encantam.",
        youtubeId: "rHxQYM8bfHc"
      },
      {
        id: 12,
        title: "Profissionalização",
        description: "Como precificar seus terços, embalar com sofisticação e dar os primeiros passos para transformar o artesanato em negócio.",
        youtubeId: "089KtvXsbKs"
      }
    ]
  }
];

export const PIX_CONFIG = {
  key: "77991283150",
  type: "PIX CELULAR / CNPJ / CHAVE",
  labelText: "PIX CELULAR",
  suggestedValue: "R$ 10,00"
};
