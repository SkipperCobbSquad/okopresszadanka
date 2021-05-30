import { draft, draftInterface, entityInterface } from './Draft';

interface phraze {
  phraze: string;
  entity: entityInterface;
}

const addLinksExtra = (content: draftInterface, phraze: Array<phraze>) => {
  let entityMapIterator = 0;
  const map: Map<number, string> = new Map();
  for (const block of content.blocks) {
    for (const onePhrase of phraze) {
      let j = 0;
      while (block.text.slice(j).search(onePhrase.phraze) > -1) {
        const idx = block.text.slice(j).search(onePhrase.phraze);
        if (idx > -1) {
          map.set(idx, onePhrase.phraze);
          j += idx + 1;
        }
      }
    }
    const sortedMap = new Map([...map.entries()].sort((a, b) => a[0] - b[0]));
    sortedMap.forEach((v, k) => {
      console.log(k, v.length);
      block.entityRanges.push({
        offset: k,
        length: v.length,
        key: entityMapIterator,
      });
      content.entityMap.set(
        entityMapIterator,
        phraze!.find((item) => item.phraze === v)!.entity
      );
      entityMapIterator += 1;
    });
  }

  return content;
};

const addLinks = (content: draftInterface) => {
  const result = addLinksExtra(content, [
    {
      phraze: 'Joe Bidena',
      entity: {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          href: 'https://oko.press/ludzie/joe-biden/',
          url: 'https://oko.press/ludzie/joe-biden/',
        },
      },
    },
    {
      phraze: 'Władimir Putin',
      entity: {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          href: 'https://oko.press/ludzie/wladimir-putin/',
          url: 'https://oko.press/ludzie/wladimir-putin/',
        },
      },
    },
  ]);
  return {
    blocks: result.blocks,
    entityMap: Object.fromEntries(result.entityMap),
  }
};
const result = addLinks(draft);
console.log(JSON.stringify(result));

// console.log(result);
// console.log(result.blocks.forEach((bl) => console.log(bl.entityRanges)));

//Compare only two word!!!
// const addLinks = (content: draftInterface) => {
//   let entityMapIterator = 0;
//   for (const block of content.blocks) {
//     const splitedText = block.text.split(' ');
//     const spacebars = splitedText.length - 1;
//     for (let i = 0; i < spacebars; i += 1) {
//       if (splitedText[i] + ' ' + splitedText[i + 1] === 'Joe Bidena') {
//         const length = splitedText[i].length + splitedText[i + 1].length + 1;
//         console.log(i, i + 1, length);
//         const offset = splitedText.slice(0, i).join(' ').length + 1;
//         block.entityRanges.push({
//           key: entityMapIterator,
//           length,
//           offset,
//         });
//         content.entityMap.set(entityMapIterator, {
//           type: 'LINK',
//           mutability: 'MUTABLE',
//           data: {
//             href: 'https://oko.press/ludzie/wladimir-putin/',
//             url: 'https://oko.press/ludzie/wladimir-putin/',
//             target: '_blank',
//           },
//         });
//         entityMapIterator += 1;
//       }
//     }
//   }
//   return content;
// };
