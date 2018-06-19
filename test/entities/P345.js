const data = {
  type: 'property',
  datatype: 'external-id',
  id: 'P345',
  labels: {
    en: {
      language: 'en',
      value: 'IMDb ID',
    },
    fr: {
      language: 'fr',
      value: 'identifiant IMDb',
    },
    ru: {
      language: 'ru',
      value: '\u043a\u043e\u0434 IMDb',
    },
  },
  descriptions: {
    en: {
      language: 'en',
      value: 'identifier for the Internet Movie Database (IMDb) [with prefix \'tt\', \'nm\', \'ch\', \'co\', \'ev\', or \'ni\']',
    },
    ru: {
      language: 'ru',
      value: '\u043a\u043e\u0434 \u0432 Internet Movie Database (IMDb) \u0441 \u043f\u0440\u0435\u0444\u0438\u043a\u0441\u043e\u043c (tt-, nm-, ch-, co-, ev-)',
    },
    fr: {
      language: 'fr',
      value: 'identifiant Internet Movie Database (IMDb) avec un pr\u00e9fixe (tt-, nm-, ch-, co-, ni-)',
    },
  },
  claims: {
    P1630: [
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P1630',
          hash: 'ce2912a40d0d2c5edad49b1a98d9acc9c3884620',
          datavalue: {
            value: 'https://tools.wmflabs.org/wikidata-externalid-url/?p=345&url_prefix=http://www.imdb.com/&id=$1',
            type: 'string',
          },
          datatype: 'string',
        },
        type: 'statement',
        id: 'P345$ebb7ee4d-46df-e78f-6371-e9711a4acd82',
        rank: 'preferred',
      },
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P1630',
          hash: '72bde3ddbdc570e16066ac8a5a07d9d2c4e23963',
          datavalue: {
            value: 'https://www.imdb.com/news/$1/',
            type: 'string',
          },
          datatype: 'string',
        },
        'type': 'statement',
        'qualifiers': {
          P1793: [
            {
              snaktype: 'value',
              property: 'P1793',
              hash: '68f04bee96da544b067417ec4e67ee4eff9dccc7',
              datavalue: {
                value: 'ni\\d{8}',
                type: 'string',
              },
              datatype: 'string',
            },
          ],
        },
        'qualifiers-order': [
          'P1793',
        ],
        'id': 'P345$d80d0d93-4412-f8ad-15ca-1a54f6555060',
        'rank': 'normal',
      },
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P1630',
          hash: '33e63c0de24d59dccd38dc9b28d6a926f4712ee8',
          datavalue: {
            value: 'https://www.imdb.com/title/$1/',
            type: 'string',
          },
          datatype: 'string',
        },
        'type': 'statement',
        'qualifiers': {
          P1793: [
            {
              snaktype: 'value',
              property: 'P1793',
              hash: 'b21d2f7f1d06329fb894f2525329cee7edfef740',
              datavalue: {
                value: 'tt\\d{7}',
                type: 'string',
              },
              datatype: 'string',
            },
          ],
        },
        'qualifiers-order': [
          'P1793',
        ],
        'id': 'P345$f7a83c2e-4d92-6c76-60a0-c99ce77dc5e7',
        'rank': 'normal',
      },
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P1630',
          hash: 'c11afc3b0c73bb44461f344eefff3454a0269fa1',
          datavalue: {
            value: 'https://www.imdb.com/name/$1/',
            type: 'string',
          },
          datatype: 'string',
        },
        'type': 'statement',
        'qualifiers': {
          P1793: [
            {
              snaktype: 'value',
              property: 'P1793',
              hash: '36ca20a4b490ab6df81902eb7c39d2762e499c6c',
              datavalue: {
                value: 'nm\\d{7}',
                type: 'string',
              },
              datatype: 'string',
            },
          ],
        },
        'qualifiers-order': [
          'P1793',
        ],
        'id': 'P345$10e02b47-4a09-2eac-3657-77609899878b',
        'rank': 'normal',
      },
    ],
    P3254: [
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P3254',
          hash: 'a3cf13cd832a5453255ea40b85cad98312242b9d',
          datavalue: {
            value: 'https://www.wikidata.org/wiki/Wikidata:Property_proposal/Archive/4#P345',
            type: 'string',
          },
          datatype: 'url',
        },
        type: 'statement',
        id: 'P345$6335667C-15F6-40C0-96A8-CB59559A0DB4',
        rank: 'normal',
      },
    ],
    P2302: [
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P2302',
          hash: '3ab788a79997cfb672590fc69472661329379611',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 21502404,
              'id': 'Q21502404',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        'type': 'statement',
        'qualifiers': {
          P1793: [
            {
              snaktype: 'value',
              property: 'P1793',
              hash: '76bf92568212e037b93605ff2bfa53b067b06d43',
              datavalue: {
                value: '|ev\\d{7}\\/(19|20)\\d{2}(-\\d)?|(ch|co|ev|nm|tt)\\d{7}|ni\\d{8}',
                type: 'string',
              },
              datatype: 'string',
            },
          ],
        },
        'qualifiers-order': [
          'P1793',
        ],
        'id': 'P345$A6981E7B-716E-41ED-BF77-0BBB553F2AEF',
        'rank': 'normal',
      },
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P2302',
          hash: '60d5b5bf5da8d7ec1e010402497e0015713c2bbf',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 21502838,
              'id': 'Q21502838',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        'type': 'statement',
        'qualifiers': {
          P2306: [
            {
              snaktype: 'value',
              property: 'P2306',
              hash: 'c80b10b5e1e231d8fb29c63903aa48da0afe0b3e',
              datavalue: {
                value: {
                  'entity-type': 'property',
                  'numeric-id': 31,
                  'id': 'P31',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-property',
            },
          ],
          P2305: [
            {
              snaktype: 'value',
              property: 'P2305',
              hash: 'f5f6a0a1bfad0c7e6c8b3e01a3d679b7d229175d',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1371849,
                  'id': 'Q1371849',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2305',
              hash: 'bef2f53f1856d0b9a98de473de62b3a308b53844',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 4167410,
                  'id': 'Q4167410',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2305',
              hash: 'e4c163410f6dc3b7b76d7285d7b848e6a9d160bd',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 4167836,
                  'id': 'Q4167836',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2305',
              hash: 'ac506e10f5b52f8f0620408f8940c77d7d4e94b0',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 14204246,
                  'id': 'Q14204246',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2305',
              hash: 'bb9d4baa15399514941d55763fd31ed082f11cb2',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 11266439,
                  'id': 'Q11266439',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
          ],
          P2316: [
            {
              snaktype: 'value',
              property: 'P2316',
              hash: 'd50c571a43e6102d65b729ccc7049a0a2f867e34',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 21502408,
                  'id': 'Q21502408',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
          ],
        },
        'qualifiers-order': [
          'P2306',
          'P2305',
          'P2316',
        ],
        'id': 'P345$32899772-2B27-4325-BA19-07D7F07DCE3A',
        'rank': 'normal',
      },
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P2302',
          hash: '60d5b5bf5da8d7ec1e010402497e0015713c2bbf',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 21502838,
              'id': 'Q21502838',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        'type': 'statement',
        'qualifiers': {
          P2306: [
            {
              snaktype: 'value',
              property: 'P2306',
              hash: 'c80b10b5e1e231d8fb29c63903aa48da0afe0b3e',
              datavalue: {
                value: {
                  'entity-type': 'property',
                  'numeric-id': 31,
                  'id': 'P31',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-property',
            },
          ],
          P2305: [
            {
              snaktype: 'value',
              property: 'P2305',
              hash: 'aff405ed933c09ed4066008fd8eb420c9b15c5cd',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 14756018,
                  'id': 'Q14756018',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2305',
              hash: '48c896b988fe5a6c0d3616ab7938ed2d8bbbbf28',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 2301325,
                  'id': 'Q2301325',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2305',
              hash: 'e6c0f9317791ced1f7d23f1a3bce995d8b7aeaaf',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 14073567,
                  'id': 'Q14073567',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2305',
              hash: 'bc419512650d4cf9c4cfcc9f74cf14283abaf2ea',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 3046146,
                  'id': 'Q3046146',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2305',
              hash: '84ab493d169fc17e2c61ed5a4c095ff3c1c8d51d',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1141470,
                  'id': 'Q1141470',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2305',
              hash: '07696ff3da7f72d833dcee584d669104ba51ee95',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 31184,
                  'id': 'Q31184',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2305',
              hash: '1ddc363c4ab1f72a4587c9a3f1237e5844813265',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 16334295,
                  'id': 'Q16334295',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2305',
              hash: 'd4aa3ceb4f8c16fcb6d26791c322c9bc8b752b29',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 281643,
                  'id': 'Q281643',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2305',
              hash: 'aae32b20c5340bef7599646ea91c53f5a6d4fc8f',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 10648343,
                  'id': 'Q10648343',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2305',
              hash: 'a2e66f3cd38b4791722ac22c3c720f77104673ee',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 16979650,
                  'id': 'Q16979650',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
          ],
          P2303: [
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '793671e2d8faf36a0126e9ca1ca770a47593e88c',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 16028224,
                  'id': 'Q16028224',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '8205c836eba7d71b71994d54eb34a8f5bc123fcf',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 4039264,
                  'id': 'Q4039264',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'ddd70ed6a628a8adaa86b451c03aacceb54a2dff',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 894612,
                  'id': 'Q894612',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '1f20238d7de6b4b6576ba5165b0a7d7c40506520',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 60806,
                  'id': 'Q60806',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'b02441817e361c1df0d50efe16e3c83571b661f0',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 3999174,
                  'id': 'Q3999174',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '15c580d514fa1040b970d594c518d1fb8f8c29c8',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 17122814,
                  'id': 'Q17122814',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'fb4727a4d82d163b579fb736593e016a847461ac',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 5002456,
                  'id': 'Q5002456',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '6c0e9112fb714770ccf1107027b21d978b69bcc7',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 7713072,
                  'id': 'Q7713072',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '8955d823c206400fa571b644e35c5d3907d270b4',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 734756,
                  'id': 'Q734756',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '081682c236c6484826d9f949d95197c1022f962e',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 161723,
                  'id': 'Q161723',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '7ebd0eb7bfe2df5e8909f8073c804822afe74d87',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 452258,
                  'id': 'Q452258',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'c4f5e902f80fbeb7b1d280be7b6690358ee786ca',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 765119,
                  'id': 'Q765119',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '06e6b03cde84b1357ea25dcfcb8365f13d7f6e70',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 798963,
                  'id': 'Q798963',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '148e1f6c624644ede3a38e919c2e1ac136be4f82',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 972398,
                  'id': 'Q972398',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'fc37ec6db3801e15801471c32257d4edf72f8ae0',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1058820,
                  'id': 'Q1058820',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'f058b208e35353eabbc917b337ea04a85cced0d0',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 2078198,
                  'id': 'Q2078198',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '00eddacec43f9df908514dd0ef4825fa933bbe49',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 2502018,
                  'id': 'Q2502018',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '6fcd1f80cdc2357e56487ae2fd91377fcf8c184e',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 4699622,
                  'id': 'Q4699622',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '2ce8285ac7237f9f8f20a650b726007459cdf774',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 64450,
                  'id': 'Q64450',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'e047f0e7c293afd980367867682a5f34645b5964',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 2031406,
                  'id': 'Q2031406',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '6b012e67e68421109191bb0462d9fd948ba54925',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1161836,
                  'id': 'Q1161836',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'eac161c507600d519ee1b937f833367e85a6e123',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 7319459,
                  'id': 'Q7319459',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'd4980df39bfa3702af4e1c64cb3e0dad62218367',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 7559106,
                  'id': 'Q7559106',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '1b3c76211e96a6b289e5d31277f9b4716ad0e4c4',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1271984,
                  'id': 'Q1271984',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '50df99adc9ee2f6a70899623ed5ad79067e234a7',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 130317,
                  'id': 'Q130317',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '107a2421dd008536954bfe392604ba37f073579b',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 3989772,
                  'id': 'Q3989772',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'd32e77e1ed272afa646cd8ce3496db00ac45294c',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 4934704,
                  'id': 'Q4934704',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '04e3652b415a070518e4db18639de19c3a9f0154',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 6912589,
                  'id': 'Q6912589',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'ebf57dccf39b16a724ab1cd35fe551b7e23a974b',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 16732422,
                  'id': 'Q16732422',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'ade851e7cce0b96a1cba253c262e6d8cc573756e',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 201811,
                  'id': 'Q201811',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'a1c5daaa308c32f996fc627a855552dcd4ca976a',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 8046429,
                  'id': 'Q8046429',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'eaf626fb2630bd496bfd3dd2332f4b7da91e7212',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 16954890,
                  'id': 'Q16954890',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'ee1ae8b02357da446c3a705fdb8b6ed7b63a2a71',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 21484743,
                  'id': 'Q21484743',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '15beaaa53c4c8be9b279f79e3d8aacaa16460a48',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 158477,
                  'id': 'Q158477',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '1a02dba7f7f9a0e4d2dcbcd2a773b26e1e6e0447',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 193218,
                  'id': 'Q193218',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'a00717e37e50db325a709b0636245915f031eb20',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1073330,
                  'id': 'Q1073330',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '868db14edc4856849e412dcd2b8918ac9bd91734',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 2065185,
                  'id': 'Q2065185',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '51d566d78ce47a40cce158ec5bf7af98cdf7411d',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 2555780,
                  'id': 'Q2555780',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'b020d44200e9e50a22cbca5e313b502ea8ac4153',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 3021742,
                  'id': 'Q3021742',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '0db93151e537b6fa554e6bf6eaf4d42295a69a59',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 3989862,
                  'id': 'Q3989862',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '792eba563d5d417724e89c726d0616b727ca0bcd',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 4894621,
                  'id': 'Q4894621',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '7a9394c704d42318aa59e7cc68d51b8e94766222',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 4962892,
                  'id': 'Q4962892',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'bde715d2b06c6c24fb9382f6cacffe14bd4f35dd',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 6303574,
                  'id': 'Q6303574',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '576258c184596acb6fc8086fc4f78762c82e5f8f',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 7334493,
                  'id': 'Q7334493',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '0e9bb7405e0fb51a1e6a832ed16ac73176f725f8',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 19664695,
                  'id': 'Q19664695',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '263142f6d77bf8e20881ec4550b3aa48a788263c',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1422381,
                  'id': 'Q1422381',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'a87ff332805a720efba2bb4abfe800de21c656d0',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 907445,
                  'id': 'Q907445',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '56d2e62bf3426bf9113624c6e997062f05037fae',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 313779,
                  'id': 'Q313779',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'd14587e7dc1eab07e9d1863bc5287b5bebdd8967',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 584735,
                  'id': 'Q584735',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '022f1bf4603f16e1a3b6ec99bd9c501686df1d75',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 725246,
                  'id': 'Q725246',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '653dfe7a4a61d87de820e6d09805209e8daa0703',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 207706,
                  'id': 'Q207706',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '6962473b2253404f6aa9453eba95ac54b3021864',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 268160,
                  'id': 'Q268160',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'be4d7fa05cbc29ff1e439e75a74831025190b6d5',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 3567756,
                  'id': 'Q3567756',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'ed36598866dd1464f14871d87a712f09ebd3fc7a',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 6928652,
                  'id': 'Q6928652',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'f3550bc1a88f5674b03911298c59498f71d4c559',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 3340006,
                  'id': 'Q3340006',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
          ],
        },
        'qualifiers-order': [
          'P2306',
          'P2305',
          'P2303',
        ],
        'id': 'P345$90820E82-3D94-440A-BB2C-E7E83FC470AF',
        'rank': 'normal',
      },
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P2302',
          hash: 'bc9f04ae1b17d1f0be97eae471d20ac6a83546ed',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 19474404,
              'id': 'Q19474404',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        'type': 'statement',
        'qualifiers': {
          P2303: [
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '81346e9f3a88afd44b685c85080e52bdbf5dacf6',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 91,
                  'id': 'Q91',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '998d409589396ec1e589bd5ba7b67393ad24a325',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 30487,
                  'id': 'Q30487',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '1da35cb4274a55760b2716936033d276785d2f24',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 39318,
                  'id': 'Q39318',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '7af8240697acbc5b52e50370fe1724643aa486ef',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 80492,
                  'id': 'Q80492',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'a5f4c60a3234c3433a1514abbbbf8d04f049a473',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 191224,
                  'id': 'Q191224',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '5913d2694f77ec16d392eb9b5928d25e31007cca',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 226822,
                  'id': 'Q226822',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'ad69e12077bbdc84b6070ff1ca176d8a1f1c8dde',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 402401,
                  'id': 'Q402401',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '2758293e468ed2c8b144063bea6530cded80fd2a',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 460163,
                  'id': 'Q460163',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '781a6fe18c71c5ed9296dc060c544a1149ea3878',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 473554,
                  'id': 'Q473554',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '8fe31cae86471933ea91c097cbdf2f310d3fda1a',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 522242,
                  'id': 'Q522242',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'd2040f75d18559ba79410285e4a8be22e3556f2b',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 603433,
                  'id': 'Q603433',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'e6472ffe35b026675a5f03c0679e3ec37c25e05c',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 611993,
                  'id': 'Q611993',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '865e97c5b8d162b32dbe67857eccb0f131021625',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 632212,
                  'id': 'Q632212',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'c2aa360f9eebe059001c0f718589479abd393b1f',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 770064,
                  'id': 'Q770064',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '835ecc6a2af6b1a7d90f4d90a6662bc55ecfb031',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 967064,
                  'id': 'Q967064',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'b8d97543dfdce47448b74bcd6f96d0689bea304d',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1329701,
                  'id': 'Q1329701',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '51f5bab42bb798c400a9267811aabba7f95eeda4',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1639228,
                  'id': 'Q1639228',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'd69483a9b5a9b1e59c7238c5c36f238688258ec4',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1779361,
                  'id': 'Q1779361',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '4a06e350cfd011bd940dd6aa550e23eee13f6530',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 2377661,
                  'id': 'Q2377661',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '765cb6d09bc16de7322eefdf9417a835b098b5d3',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 2477510,
                  'id': 'Q2477510',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'fee4f52f18dece97605e0d2042fca77ab14b9154',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 2620643,
                  'id': 'Q2620643',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '7b8893cec6cf9591fead83c0e72cef1a33d65a3a',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 2670985,
                  'id': 'Q2670985',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'cb796eb406bc9a0f9baa65c9cd26fe75380b5e98',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 3346699,
                  'id': 'Q3346699',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '4a6b15a0390e0b5afce69d8befd19eb4ecbc23b6',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 3702502,
                  'id': 'Q3702502',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'cfd0c14cff7e216c821e8fc090dc5bbbc7b14fd9',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 4366865,
                  'id': 'Q4366865',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'a423b9f5a774b5e9216af38ad0bb7eb553dadf38',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 4660506,
                  'id': 'Q4660506',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '67ae9cb1dd87c9c8c6b3871489c92d51fe16ccfe',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 5979541,
                  'id': 'Q5979541',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '77e24e5dcff662c945a7be432d1e8b24c1aeae25',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 7968558,
                  'id': 'Q7968558',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '3935e41a72f28557728fccf0b76980dfcf3b980e',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 12309105,
                  'id': 'Q12309105',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '599810a7642d4b43d7ff241459ea836d9e94a682',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 12320933,
                  'id': 'Q12320933',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'ac6a8825e0d6b0c07678969dbc6bca04d371476c',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 3773223,
                  'id': 'Q3773223',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '78bd4ade32e160a2e426fde93a9587d577f207a7',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 4953110,
                  'id': 'Q4953110',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'ebf57dccf39b16a724ab1cd35fe551b7e23a974b',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 16732422,
                  'id': 'Q16732422',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '8955d823c206400fa571b644e35c5d3907d270b4',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 734756,
                  'id': 'Q734756',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '156936274ffdf171926a09b0e1e2090959204d3e',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 255,
                  'id': 'Q255',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '5dd9f343d483375aa05e80178a2702fdadc7caf7',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1264,
                  'id': 'Q1264',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'e1e037ac0524ec4180c3309fbf5f3c2dde983935',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 9640,
                  'id': 'Q9640',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'f4a309e22807cea1121786ee05f18ce466d6c701',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 9696,
                  'id': 'Q9696',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '76169df3a698b1942cab58d990555b1c1f9fd91d',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 25310,
                  'id': 'Q25310',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'fe516202b8645104d112f4314f7bd7537f8d7790',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 35314,
                  'id': 'Q35314',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '7c898d09adbfa7473ce915dffba33e69ed122e12',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 45682,
                  'id': 'Q45682',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '3d798a5a22a020d7023830f5a435bda628257390',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 101886,
                  'id': 'Q101886',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'c5fdcc202a1a292fc4b1597ef16299c35ced4dde',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 171128,
                  'id': 'Q171128',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'aa1e007b4115825c3a6cb17efe10d652a24710dc',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 187447,
                  'id': 'Q187447',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '38a2fc8977b4e0ad2e7a40708b58799563172ffd',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 190116,
                  'id': 'Q190116',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '6dae2631de8db90a5369ed0843b254af702caad2',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 311719,
                  'id': 'Q311719',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '7bc4222c9b394ff0901905d69d6210316f88cf15',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 313972,
                  'id': 'Q313972',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '6cc6e75db0ba43173af543891c4ff0dfaa45fc33',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 332170,
                  'id': 'Q332170',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'f21d25b2d18fd4d422bdb6c10ec0797620c1e512',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 333123,
                  'id': 'Q333123',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '3e1c663b936ee82c9561c2644f881cec377bcf43',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 452772,
                  'id': 'Q452772',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '1fe748a3b56fa62c54612af5b707241536378c64',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 41749,
                  'id': 'Q41749',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '1a1d919cadd07b23ff1adf8aece92a92998786a9',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 66075,
                  'id': 'Q66075',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'f34c521cc57fe330d0a2085dd85bc97676a9e1b5',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 261041,
                  'id': 'Q261041',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'a3e145b4f37537d71685b362b2c263eb8555fcd4',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 264127,
                  'id': 'Q264127',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'd7c56f4dea121279c85219173e24aa17cf91f830',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 365456,
                  'id': 'Q365456',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '1c02363e5b280920ae6e0e425dad45a890d467c6',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 436419,
                  'id': 'Q436419',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'c3e8a78a9f002e0996b05e102f2810c695c0207b',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 552828,
                  'id': 'Q552828',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'a2af091f95994bc116687c2bc4bb61c05fa1e342',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 654231,
                  'id': 'Q654231',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'a0f8e0da64bccfc6c8b60cf32455b6c9687b9cfd',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 718415,
                  'id': 'Q718415',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '933c491b8468cfa61b2b3c796cd934f6e8266233',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 765165,
                  'id': 'Q765165',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '625c13edf5c2bdfb609c25fa01d0c93260a589a4',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 5443784,
                  'id': 'Q5443784',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'a3d0fb94aa7b13b43204d37aa9fa39c86ce9ad9d',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 6282262,
                  'id': 'Q6282262',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '75c2bece9a971e1d6a1ddcc2443a44cf7efd31f1',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 14880810,
                  'id': 'Q14880810',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '98bc7c656a6f687c8bf053a872a8fbfc1d840dd2',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 15993108,
                  'id': 'Q15993108',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'f2959fd4d66db1f191076cc14ae1767f32115611',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 16145201,
                  'id': 'Q16145201',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '99688a3211c21edac9d6e92d495d43609595abfa',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 21090369,
                  'id': 'Q21090369',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'c7b4087bd765e0f80a3303a472056c2b338891a0',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 21090563,
                  'id': 'Q21090563',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '21bf6516d1bff2ee9780339ce9f28af326b29e1f',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 21296055,
                  'id': 'Q21296055',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '9888af6d5e801eb6692a9fbe97cb8bf5812cf180',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 21727535,
                  'id': 'Q21727535',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '7bc6d886ccaa94723ac14f752ed344dbf9a551e3',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 21727611,
                  'id': 'Q21727611',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '553fc13cc31f9f75e0ee09e2a4bd617dceb18c8d',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 21727772,
                  'id': 'Q21727772',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'dab186e9d730769c80dca929974ad92854116d01',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 24299713,
                  'id': 'Q24299713',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'ae2d8729afac76dd15abfe19be76a18d0b0355ac',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 24301426,
                  'id': 'Q24301426',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '716bd595532dfbc18c268772d78ad5a022a9fe0e',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 24302233,
                  'id': 'Q24302233',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '9205c898e9711ec64f072f9ae37fc93595d3145f',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 42775,
                  'id': 'Q42775',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'ab50797a192d81afcf5db41e9a3dfb636596bd81',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 60025,
                  'id': 'Q60025',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'a4e9bb5580d00d5a359d0a9ce184d5c4c6bc54fd',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 82180,
                  'id': 'Q82180',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'ae6488fe931e48a10eca0d922e5634ec2f7be52a',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 102301,
                  'id': 'Q102301',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '2d178e79c49f91e561ef4c473876a96d30d2ee1c',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 131545,
                  'id': 'Q131545',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'c0a7ca348086a0b5fa3925970441b8a210ad300a',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 188783,
                  'id': 'Q188783',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'aac5f6434d06099b94f04ee3d01eeaefe3bac05d',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 201927,
                  'id': 'Q201927',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '1b09f937bfd1892acc9e6533239a13b6dff975f7',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 204369,
                  'id': 'Q204369',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '74925ba3051a989a821cd79fea543c9364084436',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 217790,
                  'id': 'Q217790',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '6cdcaaede15b963bc61d8880300559cfcb1585b7',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 218718,
                  'id': 'Q218718',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'add6295c8866ab3f24661d12a85b324de50f27de',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 232783,
                  'id': 'Q232783',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '189c1b9f8ef9d4aa25e86475739b581b6575ade7',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 239251,
                  'id': 'Q239251',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '5d49b78386fb80c44b97f63038a794b76d94345a',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 265658,
                  'id': 'Q265658',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'ab10852ec47b16f9962f94fdb1af272407d68ac8',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 311604,
                  'id': 'Q311604',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'aae82093b8d4f3f13c11fbb6199f1d267feb72e7',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 314051,
                  'id': 'Q314051',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'ede298f90cc122bf86f2b37957a4da14ff943b53',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 314675,
                  'id': 'Q314675',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '18be4ad05dea99605bf08a9b1fa30a61816f346c',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 335798,
                  'id': 'Q335798',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '03d1f1a513e8c14eb31d82b02cef255b76834478',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 344977,
                  'id': 'Q344977',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'e6e8c3e3d3f1fd5ac9e1f030da0abdaeeb6c4c1c',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 372783,
                  'id': 'Q372783',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '67d1e753ff9bdfe03b840d91bc6c47e55913ab1e',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 406078,
                  'id': 'Q406078',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '3fdd32129baa56fd289b37ae600c9b91e519f50b',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 431015,
                  'id': 'Q431015',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'ec4f6ac69ebb8ccc7da33703f0692ca381c75ca4',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 443607,
                  'id': 'Q443607',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'e22ae2040d22c5dff2e19a0bde802a137b881241',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 705289,
                  'id': 'Q705289',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '07fa8ab3c3cd640d52efe1a19d68a6203d48623b',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1107971,
                  'id': 'Q1107971',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '2eaa8a50850168599bcfe0ae97f69d5c308afa10',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1258697,
                  'id': 'Q1258697',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '9e9bef4707436836cd8ff8a6bfede78583f7eb24',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1277670,
                  'id': 'Q1277670',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '414e41c68861b142e823e05297045fb8f7652d82',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1387284,
                  'id': 'Q1387284',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '64779bd0c4beedf25a48940e1d8eeb551acf9371',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1655816,
                  'id': 'Q1655816',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '47af3e0baabf5055fde0e350d34cc3b2a31be1ff',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 2505040,
                  'id': 'Q2505040',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '34380f52f0ce4560ae927b870e84e0a0bf07a455',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 2620474,
                  'id': 'Q2620474',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '79e5caa53388749010dc1baff07600f6feb4cb2b',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 5402192,
                  'id': 'Q5402192',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '027e083a15f6ac8567ae41018e28eeffc7a3f8c2',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 6943755,
                  'id': 'Q6943755',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'bebb87956260e2d996c41e4d45b2023b94f88c15',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 7922443,
                  'id': 'Q7922443',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'e3591813b22e23ece2025b643bfe7c9b92480812',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 19666734,
                  'id': 'Q19666734',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '665f66b115931da7ac2d7569569e05b5dd474541',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 19864411,
                  'id': 'Q19864411',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'ddb06b14c158475511f182ac7177ad16644673fd',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 21727594,
                  'id': 'Q21727594',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'eb4c3a3f25a937ed4b47ecac30b54a3eb28c2b91',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 22928210,
                  'id': 'Q22928210',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '3579773f2c9e0f307abeb3b9995aa43541b87b29',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 319090,
                  'id': 'Q319090',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'cc433a684e438f4fd45d5f475f8a8735b6e54d2f',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 445606,
                  'id': 'Q445606',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '3f41c0d9d6cb41305eb1b25b618e45e55eb043ee',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 7001649,
                  'id': 'Q7001649',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '1a4c49a2ccb141b868efe8e7d74e49f269a805d0',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 46550571,
                  'id': 'Q46550571',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
          ],
        },
        'qualifiers-order': [
          'P2303',
        ],
        'id': 'P345$2756692D-FB6A-472B-8854-ABFBA409DD1D',
        'rank': 'normal',
      },
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P2302',
          hash: '21338c72d362b7921eb042484db5c6e29d245add',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 21502410,
              'id': 'Q21502410',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        'type': 'statement',
        'qualifiers': {
          P2303: [
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '2758293e468ed2c8b144063bea6530cded80fd2a',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 460163,
                  'id': 'Q460163',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '17510fa81c454708b2b558f8db2e1bc53ae0ab38',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 5094942,
                  'id': 'Q5094942',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '78cc6c79997931752d91c6bbdbb6ede25adaa73e',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 7499225,
                  'id': 'Q7499225',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '583fdef7334997d42d390aeaf19878891e4a24a7',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 7532265,
                  'id': 'Q7532265',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '06206d9567479a1b15455cbe0e7c5b5b28fb9896',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 13114252,
                  'id': 'Q13114252',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'ac6a8825e0d6b0c07678969dbc6bca04d371476c',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 3773223,
                  'id': 'Q3773223',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'c5545c68712b625737651aa34df1b2a7d4022c2f',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 384930,
                  'id': 'Q384930',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '83ff3b5e9ef75c04234248cc94f18f3ed3ac917d',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 13416804,
                  'id': 'Q13416804',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'fba8f8a3dad48da4d17e5ea13ba9e497a0124588',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 17165527,
                  'id': 'Q17165527',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '931210f43a58413ba0c427b01e6a95cc7b87c937',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 2559332,
                  'id': 'Q2559332',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'f91ab73a7e5f6b4284d6a81c92aea745d73e41a5',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 13685096,
                  'id': 'Q13685096',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'f414367ce4ded408b9fa764bd877f17d10260766',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 209515,
                  'id': 'Q209515',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '41e4f37fea4f240ce55c3dcdd2d0a1dabc64d7e3',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1358109,
                  'id': 'Q1358109',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '47af3e0baabf5055fde0e350d34cc3b2a31be1ff',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 2505040,
                  'id': 'Q2505040',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '04f00bcfd8ee35430137edf03f5914a885f749ab',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 2739228,
                  'id': 'Q2739228',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '5f53afaa47afefc4a39eb9106512e7cfd721c459',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 14153484,
                  'id': 'Q14153484',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '1447a3f3799365ad49a8c22dd8cfe9a6c77e4a29',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 319918,
                  'id': 'Q319918',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '596e0dc2ead4bb2c373089cf27b9852ee58e41ae',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 2348663,
                  'id': 'Q2348663',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '1c5c6f2905bd0946720b69cb4704a3ace604280e',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 17422086,
                  'id': 'Q17422086',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: 'c2a0b2205eb1572fc9e14960f2ac0cf8a0ce795c',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 25408770,
                  'id': 'Q25408770',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '3920d42dd630acccb8ef38b6d64baf0b5f84dbd3',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 7489069,
                  'id': 'Q7489069',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '2280f6f3cc7922cb61f35a347e125ffe4bdb9168',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 25095746,
                  'id': 'Q25095746',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '4c8ce12ec47c0b25c52f19ab80f530837889749b',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 4526407,
                  'id': 'Q4526407',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '1e2bf59e2b9d03c49faf060b1ba68bf5101c0dad',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 16252357,
                  'id': 'Q16252357',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '39f4239fc34913d47a018b314b250b1a4a3aec9f',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 25217690,
                  'id': 'Q25217690',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
          ],
        },
        'qualifiers-order': [
          'P2303',
        ],
        'id': 'P345$BA7E673A-A48E-48A4-8F95-AA70C5F854C4',
        'rank': 'normal',
      },
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P2302',
          hash: 'fede01024807ea412f925e250a71651eda314b38',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 21503247,
              'id': 'Q21503247',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        'type': 'statement',
        'qualifiers': {
          P2306: [
            {
              snaktype: 'value',
              property: 'P2306',
              hash: 'c80b10b5e1e231d8fb29c63903aa48da0afe0b3e',
              datavalue: {
                value: {
                  'entity-type': 'property',
                  'numeric-id': 31,
                  'id': 'P31',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-property',
            },
          ],
        },
        'qualifiers-order': [
          'P2306',
        ],
        'id': 'P345$246E530F-56E9-4035-B367-004906044AEE',
        'rank': 'normal',
      },
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P2302',
          hash: '60d5b5bf5da8d7ec1e010402497e0015713c2bbf',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 21502838,
              'id': 'Q21502838',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        'type': 'statement',
        'qualifiers': {
          P2306: [
            {
              snaktype: 'value',
              property: 'P2306',
              hash: 'c80b10b5e1e231d8fb29c63903aa48da0afe0b3e',
              datavalue: {
                value: {
                  'entity-type': 'property',
                  'numeric-id': 31,
                  'id': 'P31',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-property',
            },
          ],
          P2305: [
            {
              snaktype: 'value',
              property: 'P2305',
              hash: '46b75584e9e62508687639dfd1a204c964e2197c',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 7366,
                  'id': 'Q7366',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2305',
              hash: '4df483d5500c8c6d8781feb3acce21dbabe8944e',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 3464665,
                  'id': 'Q3464665',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
          ],
          P2303: [
            {
              snaktype: 'value',
              property: 'P2303',
              hash: '684f54be5c30615a95b37a0ac55a5d29dc6383f5',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 1420677,
                  'id': 'Q1420677',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
          ],
        },
        'qualifiers-order': [
          'P2306',
          'P2305',
          'P2303',
        ],
        'id': 'P345$2424FE2F-DD1D-4FE1-BFBD-01AD4E72E0D5',
        'rank': 'normal',
      },
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P2302',
          hash: '55cfe775ff19641cea395be018002e38e05f3749',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 21510851,
              'id': 'Q21510851',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        'type': 'statement',
        'qualifiers': {
          P2306: [
            {
              snaktype: 'value',
              property: 'P2306',
              hash: '953efef50f83bb75e15ccaf4a702a566cd9dafe0',
              datavalue: {
                value: {
                  'entity-type': 'property',
                  'numeric-id': 1932,
                  'id': 'P1932',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-property',
            },
            {
              snaktype: 'value',
              property: 'P2306',
              hash: '50dff7ea0eeaa59ae5e0f26edcd8dfec54decfe3',
              datavalue: {
                value: {
                  'entity-type': 'property',
                  'numeric-id': 2241,
                  'id': 'P2241',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-property',
            },
            {
              snaktype: 'value',
              property: 'P2306',
              hash: '3df82f2a9acae21bb37237b2b8b7bb930a479379',
              datavalue: {
                value: {
                  'entity-type': 'property',
                  'numeric-id': 17,
                  'id': 'P17',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-property',
            },
            {
              snaktype: 'value',
              property: 'P2306',
              hash: 'e5fc8faae696236abc9557bfd2b15b492b6edfe2',
              datavalue: {
                value: {
                  'entity-type': 'property',
                  'numeric-id': 1810,
                  'id': 'P1810',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-property',
            },
          ],
        },
        'qualifiers-order': [
          'P2306',
        ],
        'id': 'P345$2c20b246-4d96-7a95-ee99-87fbcfe97f48',
        'rank': 'normal',
      },
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P2302',
          hash: 'a00327947c6d834f33f6ee14916142d6a2008aef',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 21503250,
              'id': 'Q21503250',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        'type': 'statement',
        'qualifiers': {
          P2308: [
            {
              snaktype: 'value',
              property: 'P2308',
              hash: '9af68f91baa1d1a8ac07c73c690ab423ac4c82ff',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 386724,
                  'id': 'Q386724',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2308',
              hash: '6507af56cd83ccb72044b460a8b439e1746afa1a',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 5,
                  'id': 'Q5',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
            {
              snaktype: 'value',
              property: 'P2308',
              hash: '205cc3b2ec25a33f3cdbb571b34f217b3a55ff3f',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 16334295,
                  'id': 'Q16334295',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
          ],
          P2309: [
            {
              snaktype: 'value',
              property: 'P2309',
              hash: '8d7afee22e0fa6211dd8c95f247e1dd7b38daf70',
              datavalue: {
                value: {
                  'entity-type': 'item',
                  'numeric-id': 21503252,
                  'id': 'Q21503252',
                },
                type: 'wikibase-entityid',
              },
              datatype: 'wikibase-item',
            },
          ],
        },
        'qualifiers-order': [
          'P2308',
          'P2309',
        ],
        'id': 'P345$3d71b8ea-4d2d-009e-daa4-7df12d74262c',
        'rank': 'normal',
      },
    ],
    P3709: [
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P3709',
          hash: 'dce0b14a05930bd6fb424d397a9f79c3c7a644f3',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 32582648,
              'id': 'Q32582648',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: 'P345$591FE75E-00B3-48B9-948C-3AD41D06D1F6',
        rank: 'normal',
      },
    ],
    P31: [
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P31',
          hash: '5f7b59a784b030304fdb2358d1a6cfeaee9edf7e',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 22964274,
              'id': 'Q22964274',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: 'P345$d01db4b0-4b99-5208-544e-6f3a410f80e5',
        rank: 'normal',
      },
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P31',
          hash: '98246fd755b911933faa8ad1f754df6a4955aa38',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 19595382,
              'id': 'Q19595382',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: 'P345$a3f4700e-4271-6826-2f17-a28959d230f3',
        rank: 'normal',
      },
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P31',
          hash: '26c0ec74a8b932dd96e62bf1d56775728e561a19',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 29542094,
              'id': 'Q29542094',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: 'P345$dcda073c-468a-f07f-567f-be797e0a003d',
        rank: 'normal',
      },
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P31',
          hash: 'b54bc679d1718a37edf71e26b2e0abbabf68a4ac',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 30041186,
              'id': 'Q30041186',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: 'P345$9a0ba92f-4f96-9c81-a899-9540e1e6a93f',
        rank: 'normal',
      },
    ],
    P1793: [
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P1793',
          hash: '4a47884277c22b26d905e684d3c53cff58ed1318',
          datavalue: {
            value: 'ev\\d{7}\\/(19|20)\\d{2}(-\\d)?|(ch|co|ev|nm|tt)\\d{7}|ni\\d{8}',
            type: 'string',
          },
          datatype: 'string',
        },
        type: 'statement',
        id: 'P345$39074b66-4952-0175-8ade-6f29b310d751',
        rank: 'normal',
      },
    ],
    P1855: [
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P1855',
          hash: '6840431d5896914089d4103dc184bec156913e70',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 47703,
              'id': 'Q47703',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        'type': 'statement',
        'qualifiers': {
          P345: [
            {
              snaktype: 'value',
              property: 'P345',
              hash: '35fb8fdaae9c568cd27b9eaeba0e88bedfab33c9',
              datavalue: {
                value: 'tt0068646',
                type: 'string',
              },
              datatype: 'external-id',
            },
          ],
        },
        'qualifiers-order': [
          'P345',
        ],
        'id': 'P345$abc07b54-4255-3dbe-85ea-978871474032',
        'rank': 'normal',
      },
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P1855',
          hash: '9563ad4df8bc763f4bc861db081e02e6acf95932',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 762,
              'id': 'Q762',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        'type': 'statement',
        'qualifiers': {
          P345: [
            {
              snaktype: 'value',
              property: 'P345',
              hash: 'bd2ce5b570abcbc0890b420b3e6d94857582bb49',
              datavalue: {
                value: 'nm1827914',
                type: 'string',
              },
              datatype: 'external-id',
            },
          ],
        },
        'qualifiers-order': [
          'P345',
        ],
        'id': 'P345$b2a03c21-4c65-e8f1-7b35-30603ade1020',
        'rank': 'normal',
      },
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P1855',
          hash: 'd23ef30bd35da0af2d5af88f1546c66d35e1ee6c',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 3244512,
              'id': 'Q3244512',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        'type': 'statement',
        'qualifiers': {
          P345: [
            {
              snaktype: 'value',
              property: 'P345',
              hash: 'e667284d7694b4d511277ece9e311bfe359cb261',
              datavalue: {
                value: 'ch0000985',
                type: 'string',
              },
              datatype: 'external-id',
            },
          ],
        },
        'qualifiers-order': [
          'P345',
        ],
        'id': 'P345$40115832-45c5-7120-8654-62805749d546',
        'rank': 'deprecated',
      },
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P1855',
          hash: 'c4a3d470c0063219c07bebd773792f932dfc7270',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 242446,
              'id': 'Q242446',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        'type': 'statement',
        'qualifiers': {
          P345: [
            {
              snaktype: 'value',
              property: 'P345',
              hash: 'd5f3985efb3835d63dfe7d3404c2cdd1744456f6',
              datavalue: {
                value: 'co0071326',
                type: 'string',
              },
              datatype: 'external-id',
            },
          ],
        },
        'qualifiers-order': [
          'P345',
        ],
        'id': 'P345$5008d074-4eaf-d2b1-bbd6-e487af2451de',
        'rank': 'normal',
      },
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P1855',
          hash: 'fbc39222b8f7900ec89f9ce78cc85d403e0a654d',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 16773560,
              'id': 'Q16773560',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        'type': 'statement',
        'qualifiers': {
          P345: [
            {
              snaktype: 'value',
              property: 'P345',
              hash: 'c1cdf0171efd7d124f142a7daa677b8725a93bf1',
              datavalue: {
                value: 'ev0000003/2015',
                type: 'string',
              },
              datatype: 'external-id',
            },
          ],
        },
        'qualifiers-order': [
          'P345',
        ],
        'id': 'P345$02858ec5-4b20-05da-a85c-7a0963b80433',
        'rank': 'normal',
      },
      {
        'mainsnak': {
          snaktype: 'value',
          property: 'P1855',
          hash: '2a6e1c14661262e3cf8cbe41b3fc075067e9b117',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 29512115,
              'id': 'Q29512115',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        'type': 'statement',
        'qualifiers': {
          P345: [
            {
              snaktype: 'value',
              property: 'P345',
              hash: '690de90e9206f845cc54d96e373c2653d3a1018b',
              datavalue: {
                value: 'ni61008607',
                type: 'string',
              },
              datatype: 'external-id',
            },
          ],
        },
        'qualifiers-order': [
          'P345',
        ],
        'id': 'P345$1151a1bb-4a10-f25d-4a02-22e684c05c9f',
        'rank': 'normal',
      },
    ],
    P1629: [
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P1629',
          hash: '69e5cbfbe8cf565af8ef0ff627b7abf0f47519ab',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 28777282,
              'id': 'Q28777282',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: 'P345$8517e100-40d3-4774-d69d-610b99cf4489',
        rank: 'normal',
      },
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P1629',
          hash: '55615f42241520e43187c818e0b4a2a12564ca01',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 28786124,
              'id': 'Q28786124',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: 'P345$7ca172de-4044-7608-8c05-2b7de9a085f0',
        rank: 'normal',
      },
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P1629',
          hash: 'bf1f7470bb7ad576a7757ab38470c3ab2d8032d8',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 37312,
              'id': 'Q37312',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: 'P345$10a0aec5-448c-e2ae-97c0-9bedb486a5a1',
        rank: 'preferred',
      },
    ],
    P1896: [
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P1896',
          hash: '1d91f3129a74575a3f417a20958c89e397eaccbb',
          datavalue: {
            value: 'http://www.imdb.com/',
            type: 'string',
          },
          datatype: 'url',
        },
        type: 'statement',
        id: 'P345$fbf86c01-4831-1c48-6f69-2bd72dd9e6b7',
        rank: 'normal',
      },
    ],
    P2875: [
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P2875',
          hash: '802c1464be2582cc7ef15be98b281fe2a9612f9d',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 26997818,
              'id': 'Q26997818',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: 'P345$5FAD0803-2226-47D2-9815-ED32D243A994',
        rank: 'normal',
      },
    ],
    P3303: [
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P3303',
          hash: '427f7fdab94b0920acbb8394a0dcc8ff380b3145',
          datavalue: {
            value: 'https://www.omdbapi.com/?i=$1',
            type: 'string',
          },
          datatype: 'string',
        },
        type: 'statement',
        id: 'P345$9adc45c8-42c3-f99a-5371-d227f5f0bc9e',
        rank: 'normal',
      },
    ],
    P3713: [
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P3713',
          hash: '85890d93faa0d8fdcc28b75cb5c7b1a6fba68f6a',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 26220045,
              'id': 'Q26220045',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: 'P345$EC8AFA0D-2E63-4B29-9812-0B8F6B160CF3',
        rank: 'normal',
      },
    ],
    P2667: [
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P2667',
          hash: '5da2baa6626bf83a9526d5876ab72d89f89fd938',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 13220022,
              'id': 'Q13220022',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: 'P345$a997f94d-4696-cdc5-ca17-b35955c0375c',
        rank: 'normal',
      },
    ],
    P3734: [
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P3734',
          hash: '792dc2d8cbf79e838104e1f86710c7c7b3e683f2',
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': 32583390,
              'id': 'Q32583390',
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: 'P345$3B2348C2-DECA-4F14-A5F4-82FC75D04042',
        rank: 'normal',
      },
    ],
    P1628: [
      {
        mainsnak: {
          snaktype: 'value',
          property: 'P1628',
          hash: 'bbc2df983caea52d7a8c5d67bb3cdb471334e738',
          datavalue: {
            value: 'http://purl.org/ontology/mo/imdb',
            type: 'string',
          },
          datatype: 'url',
        },
        type: 'statement',
        id: 'P345$8e258556-4a6f-30c4-05f3-941e3d986a50',
        rank: 'normal',
      },
    ],
  },
};

export default data;