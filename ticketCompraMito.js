const TicketCalentMito = require("./ticketCalentMito");
const TicketFredMito = require("./ticketFredMito");
const Printer = require('printer');

class TicketCompraMito {

    printerMito;
    MITO_SKU_FRED = [
        '01', // Edamamme
        '101', // Mocchi Xocolata
        '102', // Mocchi Te Verd
        '104', // Mocchi Cheseecake
        '106', // Dorayaki Xocolata
        '107', // Dorayaki Te Verd
        '108', // Dorayaki Maduixa
        '113', // Mocchi Oreo
        '114', // Mocchi Temporada
        '132', // Uramaki Foie micuit, gelee figa, coulis de gerds i nous
        '143', // Uramaki a la italiana
        '183', // Futomaki Cheese Roll
        '200', // Poke Bowl Salmo, Alvocat, Wakamw, Edamame i soja
        '201', // Poke bowl toyina, mango, shitake, pastanaga i salsa mel
        '202', // Poke bowl vegetaria
        '21', // Sashimi salmo
        '22', // Salmo tonyina
        '24', // Tartar tonyina
        '25', // Tartar salmo
        '41', // Niguiri salmo
        '42', // Niguiri tonyina
        '47', // Niguiri tonyina flamejat
        '48', // Niguiri salmo flamejada
        '52', // Maki Salmo
        '63', // Maki de tonyina
        '66', // Maki de llagosti
        '69', // Maki tempuritzat amb brie amb mermelada
        '73', // Maki tempuritzart de foie caramelitzat
        '79', // Maki tempuritzat alvocat amb tonyina, salsa teriyaki picant
        '80', // Maki tempuritzat amb salmo, salsa teriyaki picant
        '81', // Uramaki salmo i alvocat
        '82', // Uramaki toyina i alvocat
        '83', // Uramaki de tonyina picant i mango
        '88', // Uramaki de foie, poma, porto i ceba cruixent
        '89', // Uramaki de pollastre kar-age, ceba car, mango i salsa de ceba
        '94', // Uramaki de pollastre kar-age, mezclum i salsa cajun
        '130', // Uramaki Alvocat ceba car, salmo flamejat, salsa teriyaki
        '132', // Uramaki Foie micuit, gelee figa, coulis de gerds i nous
        '136', // Farcit Alvocat, ceba car, tartar salmo, tartarai tobiko
        '141', // Uramaki Alvocat amb ceba, llagosti tempuritzat, salsa fruita passio i coco
        '144' // Uramaki de llagosti en tempura, mzclum, mermelada maduixa
    ];
    MITO_SKU_CALENT = [
        '04', // Yakisoba Verdures
        '05', // Gyozas Verdures
        '06', // Gyoza Verdura i Pollastre
        '07', // Gyoza Verdura i Marisc
        '08', // Gyoza Mito
        '08B', // Gyoza de Rostit
        '08C', // Gyozas 2.0
        '08E', // Gyozas Bolets
        '10', // Yakimeshi
        '12', // Torikatsu de Pollastre
        '16', // Ebi Tempura llagosti tempuritzat
        '162', // Pa Bao
        '164', // Pa Bao Vedella
        '165', // Pa Bao Festa Major
        '1B', // Edammame picant
        '37', // Ramen
        '69', // Maki tempuritzat amb brie amb mermelada
        '73', // Maki tempuritzart de foie caramelitzat
        '75', // Pollastre Kar-Age amb salsa cajun
        '76', // Pollastre amb teriyaki a la catalana
        '78', // Udon
        '79', // Maki tempuritzat alvocat amb tonyina, salsa teriyaki picant
        '80', // Maki tempuritzat amb salmo, salsa teriyaki picant
        'O8D' // Gyozas fricando
    ];

    constructor(order,orderItems,printer){
        console.log('**** MITO PRINTING CLASS ********');
        console.log('***** PARAM : order --> ', order);
        console.log('***** PARAM : orderItems --> ', orderItems);
        console.log('***** PARAM : printer --> ', printer);
        this.printerMito = printer;
       if(order != undefined && orderItems.length > 0) this.executeCompraMito(order,orderItems);
       else this.executeTestCompraMito();
    }

    executePrint(){

        let epsonPrinter = Printer.getPrinter('EPSON_TM-m30II-H');
        console.log('********************** EPSON_TM-m30II-H Printer **********************');
        console.log(epsonPrinter);

        Printer.printDirect({
            data: this.printerMito.getBuffer(),
            printer: 'EPSON_TM-m30II-H',
            type: 'RAW',
            success: function (jobID) {
                console.log(`printer job: ${jobID}`);
                //console.log('***** EPSON PRINTER ************');
                //console.log(epsonPrinter)
                //this.printer.clear();
            },
            error: function (err) {
                console.log(err);
            }
        })

        this.printerMito.clear()

    }

    async executeTestCompraMito(){
        try {
            this.printerMito.print('***** GrupGorman MITO COMPRA TICKET ********');
            console.log('********************** EXECUTING PRINT PROCESS ******************');
            console.log(this.printerMito.print('***** GrupGorman MITO COMPRA TICKET ********'));
            console.log('******************************************************************');
        } catch(printError){
            throw new Error('[EPSON Print] Error printing Mito process: ', printError);
        }
    }

    async executeCompraMito(newOrder,orderItems){
        console.log('**************** MITO TICKET NOVA COMPRA ****************');
        console.log(newOrder);
        console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
        this.generateRawTicket(newOrder,orderItems);
        this.getComandaCalents(orderItems);
        this.getComandaFreds(orderItems)
    }

    generateRawTicket(orderObj,orderItems){
        this.printerMito.newLine();
        this.printerMito.println('****** HELLO MITO !!! *********');
        this.printerMito.newLine();

        this.executePrint();
    }
    getComandaCalents(platsCalents) {
        let platsCalentsToPrint = [];
        platsCalents.forEach((platC)=>{
            if(this.MITO_SKU_CALENT.includes(platC.sku)) platsCalentsToPrint.push(platC);
        })
        console.log('platsCalentsMito -->', platsCalentsToPrint)
        let platsCalentsMito = new TicketCalentMito(platsCalentsToPrint);
        console.log(platsCalentsMito);
    }

    getComandaFreds(platsFreds){
        let platsFredsToPrint = [];
        platsFreds.forEach((platF)=>{
            if(this.MITO_SKU_FRED.includes(platF.sku)) platsFredsToPrint.push(platF);
        })
        console.log('platsFredsMito -->', platsFredsToPrint)
        let platsFredsMito = new TicketFredMito(platsFredsToPrint);
        console.log(platsFredsMito);
    }
}

module.exports = TicketCompraMito;