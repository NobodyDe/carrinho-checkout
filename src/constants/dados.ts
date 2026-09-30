import type { Cupom, Produto } from "../types/props";

export const CATALOGO: Produto[] = [
  {
    id: "p1",
    nome: "Teclado mecânico 65%",
    descricao:
      "Teclado mecânico compacto com layout 65%, switches de alta resposta e acabamento preto fosco para setups minimalistas.",
    precoCentavos: 34900,
    estoque: 5,
    imgUrl:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSaGLp6vXGS4PyP3TFxWRcFdAOv2dW8bPw9wQDdsKnNUMT5uU_1eIiShFDyCbN93kr8MMgeEY2H1HvATNFajMrvSnKKJSAHiRaE53mHAzm8EKTvp6CtCj7wgcc",
  },
  {
    id: "p2",
    nome: "Mouse sem fio logitec",
    descricao:
      "Mouse sem fio com sensor óptico de alta precisão, conexão estável via receptor USB e bateria de longa duração.",
    precoCentavos: 12990,
    estoque: 3,
    imgUrl:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTpYHmHxPf-ocT48-qw-lYTXNDGWrAnJsI8QjA_3n2hPCFpoWi2lde8fMR3eSatsqcekdtFuhKgMQg7P0t9D_VKl19qgK9H",
  },
  {
    id: "p3",
    nome: 'Monitor 27 Acer nitro"',
    descricao:
      "Monitor gamer de 27 polegadas da linha Acer Nitro, com alta taxa de atualização e cores vivas para jogos e produtividade.",
    precoCentavos: 149900,
    estoque: 2,
    imgUrl:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTw1KtVlUsNVYd8APIVoB6m_jZkFq0tJ3v5nSP8AdCoSHZq7MWJzCOvYwfw55cRCyIpd3V7RN0E12gbZlledzmpDXB0lHZN",
  },
  {
    id: "p4",
    nome: "Cabo HDMI",
    descricao:
      "Cabo HDMI de alta velocidade para transmissão de áudio e vídeo em alta definição entre dispositivos.",
    precoCentavos: 3990,
    estoque: 10,
    imgUrl:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSYgmJlanPqJmPHOF0_BPsiRkOEeqJbjUN_Au_5n0e6pkK0SIMqvNuWKiD0FpyYHyH7H1sGMcIFSH4w4czGC1k4DT3YYwXCzZKBPtISJTr7PtxaQrF1P-Tr2g",
  },
  {
    id: "p5",
    nome: "Headset Hyperx",
    descricao:
      "Headset HyperX com drivers de 50mm, som envolvente e almofadas confortáveis para longas sessões de uso.",
    precoCentavos: 3990,
    estoque: 10,
    imgUrl:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ0ByEGN20ZxsbHmkInxWHeZnW9qv9GaQ-2tCc983iGcRuGpEd8LInN1zXtuM6OyzRWUxyKxn_wHx--MKYuiXFMqrbdgz0TVJy7_Q4G1S5x9U6KxXNUGfc5QQ",
  },
  {
    id: "p6",
    nome: "Webcam 1080p clear",
    descricao:
      "Webcam Full HD 1080p com imagem nítida e microfone integrado, ideal para videochamadas e streams.",
    precoCentavos: 3990,
    estoque: 10,
    imgUrl:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSoVKZucChp8Shma7R0l1AOowSuk2zFah1N7Y_vERS0ZMSEPwF7yub1bBM-K7wrIrNpjxVmSFq2P6t_5EGOdl-i8bPvyOFdTA82YabRZ-s",
  },
];

export const CUPONS: Cupom[] = [
  {
    codigo: "BEMVINDO10",
    tipo: "percentual",
    percentual: 10,
    minimoCentavos: 0,
  },
  {
    codigo: "MENOS50",
    tipo: "fixo",
    valorCentavos: 5000,
    minimoCentavos: 20000,
  },
  {
    codigo: "METADE",
    tipo: "percentual",
    percentual: 50,
    minimoCentavos: 100000,
  },
];
