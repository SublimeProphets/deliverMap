import { environment } from '../environments/environment';
import { Store, StoreGroup } from "./settings.service";
/*
export const hostURL = "";
if (environment.production) {
    const hostURL = 'http://192.168.189.109';
} else {
  const hostURL = 'http://localhost:4200';
}
*/
export const hostURL = 'http://192.168.189.109/php-interface.php';
export const VERSION = "0.1.0";
export const DEFAULT_WORKSPACES = {
    domicile: {
          slug: "domicile",
          name: "1-2-Domicile",
          exportColumns:  [
            { slug: "name", name:"Name"},
            { slug: "address", name:"Adresse"},
            { slug: "postleihzahl", name:"PLZ"},
            { slug: "city", name:"Ort"},
            { slug: "tel",   name:"Telefon"},
            { slug: "abo", name:"Abo"},
            { slug: "email", name:"eMail"},
            { slug: "deliveryCount", name:"Anzahl Lieferungen"},
            { slug: "defaultStore", name:"Kunde von Geschäft"},
            { slug: "lastDeliveryDate", name:"Letzte Lieferung"},
            { slug: "firstOrderDate", name:"Erste Lieferung"},
            { slug: "starred", name:"Favorit"},
            { slug: "comments", name:"Kommentare"},
            { slug: "lng", name:"Längengraden"},
            { slug: "lat", name:"Breitengraden"}
          ]
    },
    wili: {
          slug: "wili",
          name: "Service Wili",
          exportColumns:  [
            { slug: "name", name:"Name"},
            { slug: "address", name:"Adresse"},
            { slug: "postleihzahl", name:"PLZ"},
            { slug: "city", name:"Ort"},
            { slug: "tel",   name:"Telefon"},
            { slug: "serviceType", name:"Service-Typ"},
            { slug: "serviceTime", name:"Service-Zeit"},
            { slug: "deliveryCount", name:"Anzahl Lieferungen"},
            { slug: "defaultStore", name:"Kunde von Geschäft"},
            { slug: "lastDeliveryDate", name:"Letzte Lieferung"},
            { slug: "firstOrderDate", name:"Erste Lieferung"},
            { slug: "starred", name:"Favorit"},
            { slug: "comments", name:"Kommentare"},
            { slug: "lng", name:"Längengraden"},
            { slug: "lat", name:"Breitengraden"}
          ]
        }
  }
// TODO: Replay any with Array[Store] (i had to change it so i can c&p content from localstorage)

export const DEFAULT_STORES:Array<any> = [
    {
		"id": 1,
		"name": "Distribution Madrid",
		"slug": "Distribution Madrid",
		"group": 1,
		"address": "Valle de Cavalleros 76b",
		"customerCount": 1,
		"lat": 40.713955826286046,
		"lng": -3.7353515625000004,
		"updated": "1507503939317",
		"plz": "2345",
		"city": "Madrid"
	}, {
		"id": 2,
		"name": "Easteurope Shipping Center",
		"slug": "Easteurope Shipping Center",
		"group": 1,
		"address": "Lorem Ipsum dolor sit amet",
		"customerCount": 3,
		"lat": 50.45575537567455,
		"lng": 30.415649414062504,
		"plz": "9876",
		"city": "Kiev",
		"updated": "1507504058612"
	}, {
		"id": 3,
		"name": "Jakarta Distribution Inc.",
		"slug": "Jakarta Distribution Inc.",
		"group": 1,
		"address": "Selamat Pagi 123",
		"customerCount": 1,
		"lat": -6.189024687286995,
		"lng": 106.79534912109376,
		"plz": "8765",
		"city": "Jakarta Apa Kabar",
		"updated": "1507504137516"
	}, {
		"id": 4,
		"name": "OnlineShopper.xy Storage",
		"slug": "OnlineShopper.xy Storage",
		"group": 2,
		"address": "Breitenrainstrasse 456",
		"customerCount": 1,
		"lat": 46.95776134668866,
		"lng": 7.448730468750001,
		"plz": "3000",
		"city": "Bern 25",
		"updated": "1507504224438"
	}, {
		"id": 5,
		"name": " Floras del Hollandia",
		"slug": "Bahnhof Coop",
		"group": 4,
		"address": "Aekersold 34",
		"customerCount": 1,
		"lat": 51.986571643810834,
		"lng": 4.770812988281251,
		"plz": "4657",
		"city": "Rotterdam",
		"updated": "1507504314497"
	}, {
		"id": 6,
		"name": "Storage LasCosas.nc",
		"slug": "Storage LasCosas.nc",
		"group": 2,
		"address": "Calle 12b #c3",
		"customerCount": 1,
		"lat": 12.013129123340724,
		"lng": -83.77109527587892,
		"plz": "2435",
		"city": "Bluefields",
		"updated": "1507504466576"
	}
  /*{
      id: 1,
      name: 'Migros Bielerhof',
      slug: 'Bielerhof Migros',
      group: 1,
      address: "Beispielstrasse",
      customerCount: 1,
      lat: 47.134946,
      lng: 7.244083
    },
    {
      id: 2,
      name: 'Migros Neumarkt',
      slug: 'Neumarkt Migros',
      group: 1,
      address: "Testweg 12",
      customerCount: 3,
      lat: 47.140773,
      lng: 7.247239
    },
    {
      id: 3,
      name: 'Migros Madretsch',
      slug: 'Madretsch Migros',
      group: 1,
      address: "Beispielsgasse 23",
      customerCount: 1,
      lat: 47.131820,
      lng: 7.252453
    },
    {
      id: 4,
      name: 'Migros Bözingen',
      slug: 'Bözingen Migros',
      group: 1,
      address: "Beispielstrasse",
      customerCount: 1,
      lat: 47.152059,
      lng: 7.267360
    },


    // COOP
    {
      id: 5,
      name: 'Coop Megastore Bahnhof',
      slug: 'Bahnhof Coop',
      group: 2,
      address: "ba",
      customerCount: 1,
      lat: 47.130289,
      lng: 7.242938
    },
    {
      id: 6,
      name: 'City Coop',
      slug: 'City Coop',
      group: 2,
      address: "",
      customerCount: 1,
      lat: 47.139634,
      lng: 7.246738
    },


    // APOTHEKEN
    {
      id: 7,
      name: 'Apotheke 55',
      slug: 'Apotheke 55',
      group: 3,
      address: "",
      customerCount: 1,
      lat: 47.136515,
      lng: 7.246271
    },
    {
      id: 8,
      name: 'City Apotheke',
      slug: 'City-Apotheke',
      group: 3,
      address: "",
      customerCount: 1,
      lat: 47.135559,
      lng: 7.245548
    },
    {
      id: 9,
      name: 'Hilfiker Apotheke',
      slug: 'Hilfiker',
      group: 3,
      address: "",
      customerCount: 1,
      lat: 47.132895,
      lng: 7.244160
    },
    {
      id: 10,
      name: 'Apotheke Dufour',
      slug: 'Pharmacie dufour',
      group: 3,
      address: "",
      customerCount: 1,
      lat: 47.142241,
      lng: 7.252614
    },
    {
      id: 11,
      name: 'Battenberg Apotheke',
      slug: 'Battenberg Apotheke',
      group: 3,
      address: "",
      customerCount: 1,
      lat: 47.143053,
      lng: 7.272842
    },
    {
      id: 12,
      name: 'Madretsch Apotheke',
      slug: 'Madretsch-Apotheke',
      group: 3,
      address: "",
      customerCount: 1,
      lat: 47.132033,
      lng: 7.251996
    },

    {
      id: 13,
      name: 'Bözingen Apotheke',
      slug: 'Bözingen Apotheke',
      group: 3,
      address: "",
      customerCount: 1,
      lat: 47.152504,
      lng: 7.267005
    },


    // DENNER
    {
      id: 14,
      name: 'Denner Florastrasse',
      slug: 'Denner Florastrasse',
      group: 5,
      address: "",
      customerCount: 5,
      lat: 47.138405,
      lng: 7.247312
    },
    {
      id: 15,
      name: 'Denner Bielerhof',
      slug: 'Denner Bielerhof',
      group: 5,
      address: "",
      customerCount: 1,
      lat: 47.134999,
      lng: 7.244166
    },
    {
      id: 16,
      name: 'Denner Silbergasse',
      slug: 'Denner Silbergasse',
      group: 5,
      address: "",
      customerCount: 1,
      lat: 47.134980,
      lng: 7.249562
    },
    {
      id: 17,
      name: 'Denner Bözingen',
      slug: 'Denner Bözingen',
      group: 5,
      address: "",
      customerCount: 1,
      lat: 47.150470,
      lng: 7.263020
    },
    {
      id: 18,
      name: 'Denner Poststrasse (Mett)',
      slug: 'Denner Poststrasse',
      group: 5,
      address: "",
      customerCount: 1,
      lat: 47.146270,
      lng: 7.272325
    },
    {
      id: 19,
      name: 'Florever',
      slug: 'Florever',
      group: 4,
      address: "",
      customerCount: 1,
      lat: 47.133128,
      lng: 7.245424
    },
    {
      id: 20,
      name: 'Sunneblueme',
      slug: 'Sunne-Blume Biel-Mett',
      group: 4,
      address: "",
      customerCount: 1,
      lat: 47.146341,
      lng: 7.273550
    },
    {
      id: 21,
      name: 'Genossenschaft Wein (EGB)',
      slug: 'Einkaufsgenossenschaft EGB',
      group: 0,
      address: "Schwanengasse",
      customerCount: 1,
      lat: 47.137421,
      lng: 7.253906
    },
    {
      id: 22,
      name: 'Manor',
      slug: 'Manor',
      group: 0,
      address: "",
      customerCount: 1,
      lat: 47.137581,
      lng: 7.245810
    },
    {
      id: 23,
      name: 'Confiserie Progin',
      slug: 'Progin',
      group: 0,
      address: "",
      customerCount: 1,
      lat: 47.135585,
      lng: 7.244915
    }*/
]

// TODO: Replay any with StoreGroup[] (i had to change it so i can c&p content from localstorage)
export const DEFAULT_STORESGROUPS: any = [
    {
		"id": 0,
		"slug": "various",
		"name": "Various",
		"image": {
			"full": "assets/icons/stores/diverses_full.svg",
			"icon": "assets/icons/stores/diverses_icon.svg"
		},
		"$$index": 0,
		"updated": "1507503277534"
	}, {
		"id": 1,
		"slug": "distribution",
		"name": "Distribution Center",
		"image": {
			"full": "assets/icons/stores/migros_full.svg",
			"icon": "assets/icons/stores/migros_icon.svg"
		},
		"$$index": 1,
		"updated": "1507503306680"
	}, {
		"id": 2,
		"slug": "onlineshop",
		"name": "Online Shop",
		"image": {
			"full": "assets/icons/stores/coop_full.svg",
			"icon": "assets/icons/stores/coop_icon.svg"
		},
		"$$index": 2,
		"updated": "1507503327551"
	}, {
		"id": 3,
		"slug": "apotheken",
		"name": "Apotheken",
		"image": {
			"full": "assets/icons/stores/apotheken_full.svg",
			"icon": "assets/icons/stores/apotheken_icon.svg"
		},
		"$$index": 3,
		"updated": "1507502814524"
	}, {
		"id": 4,
		"slug": "blumen",
		"name": "Flowercenter",
		"image": {
			"full": "assets/icons/stores/blumen_full.svg",
			"icon": "assets/icons/stores/blumen_icon.svg"
		},
		"$$index": 4,
		"updated": "1507503350051"
	},
  /*{
      id: 0,
      slug: "diverses",
      name: "Diverses",
      image: {
        full: "assets/icons/stores/diverses_full.svg",
        icon: "assets/icons/stores/diverses_icon.svg"
      }
    },
    {
      id: 1,
      slug: "migros",
      name: "Migros Genossenschaft",
      image: {
        full: "assets/icons/stores/migros_full.svg",
        icon: "assets/icons/stores/migros_icon.svg"
      }
    },
    {
      id: 2,
      slug: "coop",
      name: "Coop",
      image: {
        full: "assets/icons/stores/coop_full.svg",
        icon: "assets/icons/stores/coop_icon.svg"
      }
    },
    {
      id: 3,
      slug: "apotheken",
      name: "Apotheken",
      image: {
        full: "assets/icons/stores/apotheken_full.svg",
        icon: "assets/icons/stores/apotheken_icon.svg"
      }
    },
    {
      id: 4,
      slug: "blumen",
      name: "Blumenladen",
      image: {
        full: "assets/icons/stores/blumen_full.svg",
        icon: "assets/icons/stores/blumen_icon.svg"
      }
    },
    {
      id: 5,
      slug: "denner",
      name: "Denner",
      image: {
        full: "assets/icons/stores/denner_full.svg",
        icon: "assets/icons/stores/denner_icon.svg"
      }
    }*/
  ];