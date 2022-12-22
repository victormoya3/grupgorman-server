'use strict';

const TicketCompraBruna = require("./ticketCompraBruna");
const TicketCompraClient = require("./ticketCompraClient");
const TicketCompraMito = require("./ticketCompraMito");
const TicketBegudes = require("./ticketBegudes");
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

class NewOrder {

    printer;
    mitoOrder;
    mitoOrderItems;
    brunaOrder;
    brunaOrderItems;
    begudes;
    WooCommerceAPI;

    MITO_SKU_LIST = [
        '01', // Edamamme
        '04', // Yakisoba Verdures
        '05', // Gyozas Verdures
        '06', // Gyoza Verdura i Pollastre
        '07', // Gyoza Verdura i Marisc
        '08', // Gyoza Mito
        '08B', // Gyoza de Rostit
        '08C', // Gyozas 2.0
        '08E', // Gyozas Bolets
        '10', // Yakimeshi
        '11', // Bolets pollastre
        '101', // Mocchi Xocolata
        '102', // Mocchi Te Verd
        '104', // Mocchi Cheseecake
        '106', // Dorayaki Xocolata
        '107', // Dorayaki Te Verd
        '108', // Dorayaki Maduixa
        '113', // Mocchi Oreo
        '114', // Mocchi Temporada
        '12', // Torikatsu de Pollastre
        '130', // Uramaki Alvocat ceba car, salmo flamejat, salsa teriyaki
        '132', // Uramaki Foie micuit, gelee figa, coulis de gerds i nous
        '136', // Farcit Alvocat, ceba car, tartar salmo, tartarai tobiko
        '141', // Uramaki Alvocat amb ceba, llagosti tempuritzat, salsa mermelada maduixa
        '143', // Uramaki a la italiana
        '144', // Uramaki de llagosti en tempura, mzclum, mermelada maduixa
        '16', // Ebi Tempura llagosti tempuritzat
        '162', // Pa Bao
        '164', // Pa Bao Vedella
        '165', // Pa Bao Festa Major
        '183', // Futomaki Cheese Roll
        '1B', // Edammame picant
        '200', // Poke Bowl Salmo, Alvocat, Wakamw, Edamame i soja
        '201', // Poke bowl toyina, mango, shitake, pastanaga i salsa mel
        '202', // Poke bowl vegetaria
        '21', // Sashimi salmo
        '22', // Salmo tonyina
        '24', // Tartar tonyina
        '25', // Tartar salmo
        '37', // Ramen
        '41', // Niguiri salmo
        '42', // Niguiri tonyina
        '47', // Niguiri tonyina flamejat
        '48', // Niguiri salmo flamejada
        '62', // Maki Salmo
        '63', // Maki de tonyina
        '66', // Maki de llagosti
        '69', // Maki tempuritzat amb brie amb mermelada
        '73', // Maki tempuritzart de foie caramelitzat
        '75', // Pollastre Kar-Age amb salsa cajun
        // '76', // Pollastre amb teriyaki a la catalana
        '78', // Udon
        '79', // Maki tempuritzat alvocat amb tonyina, salsa teriyaki picant
        '80', // Maki tempuritzat amb salmo, salsa teriyaki picant
        '81', // Uramaki salmo i alvocat
        '82', // Uramaki toyina i alvocat
        '83', // Uramaki de tonyina picant i mango
        '88', // Uramaki de foie, poma, porto i ceba cruixent
        '89', // Uramaki de pollastre kar-age, ceba car, mango i salsa de ceba
        '94', // Uramaki de pollastre kar-age, mezclum i salsa cajun
        'O8D', // Gyozas fricando
    ];

    BRUNA_SKU_LIST = [
        'BAC01', // Amanida Cesar
        'BAL01', // Amanida Lionesa
        'BBAO1', // All i Oli
        'BBBF1', // bomba Formatge
        'BBBR1', // De Brie
        'BBCA1', // Cangreburger
        'BBCB1', // Cabra Boja
        'BBDB1', // Doble Bruna
        'BBDF1', // De Foie
        // 'BBDP1', // De Pebrots
        'BBY1', // De la yaya
        'BBLG1', // La Gouda
        'BBLT1', // La Trufada
        'BBPB1', // Pollastre Brasa
        'BBPI1', // La Picada
        'BBRG1', // La Reglette
        'BBVB1', // Veggie Burger
        'BCA01', // Pa i Patates
        'BCB01', // Burger Bruna 180gr
        'BCB02', // Burger Bruna 120gr
        'BCB03', // Burger Pollastre 100gr
        'BCB04', // Burger Veggie
        'BEAC1', // Anelles de Ceba
        'BEFC1', // Fried Camembert
        'BENB1', // Nachos Beicon
        'BENV1', // Nachos Veggie
        'BETP1', // Tires de Pollastre
        'BEXB1', // Xips Beicon
        'BPSX1', // Sopa xocolata Blanca
        'BPTI1', // Tiramisu
        'BPTN1', // Teques Nutella
        'BPXC1', // Coulant
        'BTC01', // Teque Formatge Cabra
        // 'BTM01', // Teque Mozzarella
        'BTS01', // Teque Sobrasada
        'BTF01', // Teque Frankfurt
        'BTG01', // Teque Gouda
    ];

    BEGUDES_SKU_LIST = [
        'VINO02', // Abadal Blanc
        'VINO01', // Missenyora Blanc
        'BEB03', // Estrella Damm
        'BEB02', // Coca-Cola
        'BEB01', // Coca-Cola Zero
        'BEB07', // Aigua
        'BEB06', // Trina
        'BEB05', // Fanta Llimona
        'BEB04', // Fanta Taronja
        'CAVA02', // Bertha Rosa
        'CAVA01', // Bertha Blanc
        'VINO09', // Formiga Negre
        'VINO08', // Llavors Negre
        'VINO10', // Pura Vida
        'VINO07', // Marrec Negre
        'VINO06', // Petit Arnau Rosat
        'VINO05', // Cap Creus Blanc
        'VINO04', // Marrec Blanc
        'VINO03', // 
        'SAKE01' // Sake
    ];
    
    constructor(newOrder, WoocommerceInstance){
        this.WooCommerceAPI = WoocommerceInstance;
        this.constructThermalPrinter();
        setTimeout(() => {

            if(newOrder!={}){
                this.generateTicketsForMitoAndBruna(newOrder);
            } else {
                this.generateFakeTickets();
            }

        },4000)

    }

    async constructThermalPrinter(){

        this.printer = new ThermalPrinter({
            type : PrinterTypes.EPSON,
            //interface : 'printer:EPSON_TM-m30II-H', // 'usb://EPSON/TM-m30II-H?serial=583834520001450000',
            width : '48mm',
            characterSet : 'PC850_MULTILINGUAL',
            removeSpecialCharacters : false
        });

        try {
            let isEpsonConnected = await this.printer.isPrinterConnected();
            console.log('********** EPSON STATUS CONNECTED :',isEpsonConnected,' **************');
            //console.log(this.printer)
        } catch(connectedException){
            throw new Error('[EPSON Setup] Connection to printer fails!!');
        }

    }

    generateTicketsForMitoAndBruna(order){

        // console.log('order execute grup gorman process', order)
        this.mitoOrderItems = this.filterValuesFromLocation(order.line_items, this.MITO_SKU_LIST);
        this.brunaOrderItems = this.filterValuesFromLocation(order.line_items, this.BRUNA_SKU_LIST);
        this.begudes = this.filterValuesFromLocation(order.line_items, this.BEGUDES_SKU_LIST);

        if ( order.line_items.length > 0){
            const ticketClient = new TicketCompraClient(order, order.line_items, this.printer, 2);
            setTimeout(()=>{
                console.log('MITO PRINT PROCESS :',this.mitoOrderItems);
                if(this.mitoOrderItems.length > 0){
                    let mitoPrintProcess = new TicketCompraMito(order, this.mitoOrderItems, this.printer);
                }
            }, 6000)
    
            setTimeout(()=>{
                console.log('BRUNA PRINT PROCESS :',this.brunaOrderItems);
                if(this.brunaOrderItems.length > 0){
                    let brunaPrintProcess = new TicketCompraBruna(order,this.brunaOrderItems,this.printer);
                }
                
            },9000)
    
            setTimeout(()=>{
                if(this.begudes.length > 0){
                    let begudesPrintProcess = new TicketBegudes(this.begudes, this.printer)
                }
                
            },12000);
    
            setTimeout(()=>{
                if (order !== {}){
                    // this.actualitzarEstatComanda(order);
                }
                
            },18000)
        } 
        //console.lo =g('MITO PRINT PROCESS :',mitoPrintProcess);
        //console.log('BRUNA PRINT PROCESS :',brunaPrintProcess);
    }

    generateFakeTickets(){

    }

    filterValuesFromLocation(orderItems,skuFrom){
        let filteredArray = [];// generate a reduce from list
        orderItems?.forEach((orderItem) => {
            if(skuFrom.includes(orderItem.sku)){
                filteredArray.push(orderItem)
            }
        })
        return filteredArray;
    }

    actualitzarEstatComanda(comanda){

        const data = {
            status : 'completed'
        };

        const updateCallback = (response) => {
            // console.log('*** UPDATE RESPONSE ***')
            // console.log(response);
            // console.log(comanda);
        }
        this.WooCommerceAPI.put("orders/" + comanda.id, data, updateCallback);
    }
}

module.exports = NewOrder;
//exports = { NewOrder }