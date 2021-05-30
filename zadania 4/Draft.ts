export interface entityRangesInterface {
  offset: number;
  length: number;
  key: number;
}

export interface blockInterface {
  key: string;
  text: string;
  type: string;
  depth: number;
  inlineStyleRanges: Array<any>;
  entityRanges: Array<entityRangesInterface>;
  data: Object
}

export interface entityInterface {
  type: string;
  mutability: string;
  data: {
    href: string;
    target?: string;
    url: string;
  };
}

export interface draftInterface {
  blocks: Array<blockInterface>;
  entityMap: Map<number, entityInterface>;
}

export const draft: draftInterface = {
  blocks: [
    {
      key: 'cppid',
      text: 'Jak każdej konferencji online czasu pandemii, wystąpieniom towarzyszyły problemy techniczne, z których najzabawniejszym okazało się nagłe zniknięcie z wizji prezydenta Francji Emmanuela Macrona. Zamiast niego na ekranach pojawił się Władimir Putin – najwyraźniej nieświadomy, że ogląda go cały świat. Po kilku minutach wszystko wróciło do normy i mogliśmy usłyszeć, że również Rosja przejmuje się globalnym ociepleniem…',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
  ],
  entityMap: new Map()
};
