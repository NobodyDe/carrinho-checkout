export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  precoCentavos: number;
  estoque: number;
  imgUrl: string;
};

export type ItemCarrinho = {
  produto: Produto;
  quantidade: number;
};

export type Cupom =
  | {
      codigo: string;
      tipo: "percentual";
      percentual: number;
      minimoCentavos: number;
    }
  | {
      codigo: string;
      tipo: "fixo";
      valorCentavos: number;
      minimoCentavos: number;
    };

export type ResumoCarrinho = {
  subtotalCentavos: number;
  descontoCentavos: number;
  freteCentavos: number;
  totalCentavos: number;
};
