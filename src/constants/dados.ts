import type { Cupom, Produto } from "../types/props";

export const CATALOGO: Produto[] = [
  {
    id: "p1",
    nome: "Teclado mecânico 65% Noir",
    precoCentavos: 34900,
    estoque: 5,
  },
  { id: "p2", nome: "Mouse sem fio logitec", precoCentavos: 12990, estoque: 3 },
  {
    id: "p3",
    nome: 'Monitor 27 Acer nitro"',
    precoCentavos: 149900,
    estoque: 2,
  },
  { id: "p4", nome: "Cabo HDMI", precoCentavos: 3990, estoque: 10 },
  { id: "p5", nome: "Headset Hyperx", precoCentavos: 3990, estoque: 10 },
  { id: "p6", nome: "Webcam 1080p clear", precoCentavos: 3990, estoque: 10 },
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
