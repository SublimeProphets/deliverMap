
export class Store {


  id: number;
  name: string;
  slug: string;
  group: string; // write always lowercase
  address?: string;
  customerCount?: number = 0;
  lat?: number;
  lng?: number;
  type?: string;
}

export var STORES: Store[] = [
      { 
        id: 11, 
        name: 'Migros Bielerhof', 
        slug: 'Bielerhof Migros',
        group: "migros",
        address: "Beispielstrasse", 
        customerCount: 1,
        lat: 47.134946,
        lng: 7.244083
      },
      { 
        id: 12, 
        name: 'Migros Neumarkt', 
        slug: 'Neumarkt Migros',
        group: "migros",
        address: "Testweg 12", 
        customerCount: 3,
        lat: 47.140773,
        lng: 7.247239
      },
      { 
        id: 11, 
        name: 'Migros Madretsch', 
        slug: 'Madretsch Migros',
        group: "migros",
        address: "Beispielsgasse 23", 
        customerCount: 1,
        lat: 47.131820,
        lng: 7.252453
      },
      { 
        id: 1, 
        name: 'Migros Bözingen', 
        slug: 'Bözingen Migros',
        group: "migros",
        address: "Beispielstrasse", 
        customerCount: 1,
        lat: 47.152059,
        lng: 7.267360
      },


      // COOP
       { 
        id: 1, 
        name: 'Coop Megastore Bahnhof', 
        slug: 'Bahnhof Coop',
        group: "coop",
        address: "ba", 
        customerCount: 1,
        lat: 47.130289,
        lng: 7.242938
      },
       { 
        id: 1, 
        name: 'City Coop', 
        slug: 'City Coop',
        group: "coop",
        address: "", 
        customerCount: 1,
        lat: 47.139634,
        lng: 7.246738
      },


      // APOTHEKEN
      { 
        id: 1, 
        name: 'Apotheke 55', 
        slug: 'Apotheke 55',
        group: "apotheke",
        address: "", 
        customerCount: 1,
        lat: 47.136515,
        lng: 7.246271
      },
      { 
        id: 1, 
        name: 'City Apotheke', 
        slug: 'City-Apotheke',
        group: "apotheke",
        address: "", 
        customerCount: 1,
        lat: 47.135559,
        lng: 7.245548
      },
      { 
        id: 1, 
        name: 'Hilfiker Apotheke', 
        slug: 'Hilfiker',
        group: "apotheke",
        address: "", 
        customerCount: 1,
        lat: 47.132895,
        lng: 7.244160
      },
      { 
        id: 1, 
        name: 'Apotheke Dufour', 
        slug: 'Pharmacie dufour',
        group: "apotheke",
        address: "", 
        customerCount: 1,
        lat: 47.142241,
        lng: 7.252614
      },
      { 
        id: 1, 
        name: 'Battenberg Apotheke', 
        slug: 'Battenberg Apotheke',
        group: "apotheke",
        address: "", 
        customerCount: 1,
        lat: 47.143053,
        lng: 7.272842
      },
      { 
        id: 1, 
        name: 'Madretsch Apotheke', 
        slug: 'Madretsch-Apotheke',
        group: "apotheke",
        address: "", 
        customerCount: 1,
        lat: 47.132033,
        lng: 7.251996
      },

      { 
        id: 1, 
        name: 'Bözingen Apotheke', 
        slug: 'Bözingen Apotheke',
        group: "apotheke",
        address: "", 
        customerCount: 1,
        lat: 47.152504,
        lng: 7.267005
      },


      // DENNER
      { 
        id: 11, 
        name: 'Denner Florastrasse', 
        slug: 'Denner Florastrasse',
        group: "denner",
        address: "", 
        customerCount: 5,
        lat: 47.138405,
        lng: 7.247312
      },
      { 
        id: 1, 
        name: 'Denner Bielerhof', 
        slug: 'Denner Bielerhof',
        group: "denner",
        address: "", 
        customerCount: 1,
        lat: 47.134999,
        lng: 7.244166
      },
      { 
        id: 1, 
        name: 'Denner Silbergasse', 
        slug: 'Denner Silbergasse',
        group: "denner",
        address: "", 
        customerCount: 1,
        lat: 47.134980,
        lng: 7.249562
      },
      { 
        id: 1, 
        name: 'Denner Bözingen', 
        slug: 'Denner Bözingen',
        group: "denner",
        address: "", 
        customerCount: 1,
        lat: 47.150470,
        lng: 7.263020
      },
      { 
        id: 1, 
        name: 'Denner Poststrasse (Mett)', 
        slug: 'Denner Poststrasse',
        group: "denner",
        address: "", 
        customerCount: 1,
        lat: 47.146270,
        lng: 7.272325
      },
      { 
        id: 1, 
        name: 'Florever', 
        slug: 'Florever',
        group: "blumen",
        address: "", 
        customerCount: 1,
        lat: 47.133128,
        lng: 7.245424
      },
      { 
        id: 1, 
        name: 'Sunneblueme', 
        slug: 'Sunne-Blume Biel-Mett',
        group: "blumen",
        address: "", 
        customerCount: 1,
        lat: 47.146341,
        lng: 7.273550
      },
      { 
        id: 1, 
        name: 'Genossenschaft Wein (EGB)', 
        slug: 'Einkaufsgenossenschaft EGB',
        group: "egb",
        address: "Schwanengasse", 
        customerCount: 1,
        lat: 47.137421,
        lng: 7.253906
      },
      { 
        id: 1, 
        name: 'Manor', 
        slug: 'Manor',
        group: "manor",
        address: "", 
        customerCount: 1,
        lat: 47.137581,
        lng: 7.245810
      },
      { 
        id: 1, 
        name: 'Confiserie Progin', 
        slug: 'Progin',
        group: "confiserie",
        address: "", 
        customerCount: 1,
        lat: 47.135585,
        lng: 7.244915
      }
    ];
