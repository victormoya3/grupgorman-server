const TicketCalentMito = require("./ticketCalentMito");
const TicketFredMito = require("./ticketFredMito");
const Printer = require('printer');

class TicketCompraMito {

    printerMito;
    mitoOrderItems;
    
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

    MITO_SKU_BEGUDES = [
        
    ];

    businessName = 'Mito Sushi Restaurant';
    direccioBusiness = 'Av/Sant Esteve, 83';
    codiPostalPobalcio = '08211 Castellar del Vallès';
    paisBusiness = 'Espanya';


    constructor(order,orderItems,printer){
        console.log('**** MITO PRINTING CLASS ********');
        //console.log('***** PARAM : order --> ', order);
        //console.log('***** PARAM : orderItems --> ', orderItems);
        //console.log('***** PARAM : printer --> ', printer);
        this.printerMito = printer;
        this.mitoOrderItems = orderItems;
       if(order != undefined && orderItems.length > 0) this.executeCompraMito(order);
       else this.executeTestCompraMito();
    }

    executePrint(){

        let epsonPrinter = Printer.getPrinter('EPSON_TM-m30II-H');
        console.log('********************** EPSON_TM-m30II-H Printer Mito process **********************');
        //console.log(epsonPrinter);

        try{
            
            let callback = ( jobID ) => {
                console.log(`printer job: ${jobID}`);
                setTimeout(() => {
                    this.getComandaCalents(this.mitoOrderItems);
                },3000)

            }

            Printer.printDirect({
                data: this.printerMito.getBuffer(),
                printer: 'EPSON_TM-m30II-H',
                type: 'RAW',
                success: function (jobID) {
                    //console.log('***** EPSON PRINTER ************');
                    //console.log(epsonPrinter)
                    //this.printer.clear();
                    callback(jobID)
                },
                error: function (err) {
                    console.log(err);
                }
            })                      

        } catch(printErrorException) {

        }

    }

    async executeTestCompraMito(){
        try {
            console.log('********************** MITO TICKET EMPTY ******************');
            //this.printerMito.print('***** GrupGorman MITO COMPRA TICKET ********');
            //console.log('********************** EXECUTING PRINT PROCESS ******************');
            //console.log(this.printerMito.print('***** GrupGorman MITO COMPRA TICKET ********'));
            //console.log('******************************************************************');
        } catch(printError){
            throw new Error('[EPSON Print] Error printing Mito process: ', printError);
        }
    }

    async executeCompraMito(newOrder){
        //console.log('**************** MITO TICKET NOVA COMPRA ****************');
        //console.log(newOrder);
        //console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
        this.generateRawTicket(newOrder);
    }

    generateRawTicket(orderObj){
        console.log('GENERATING TICKET FOR ORDER :',orderObj.id);
        // Printer Compra Ticket model to design it
        // TICKET HEADER
        this.printerMito.newLine();
        //this.printerMito.printImage();
        this.printerMito.newLine();
        this.printerMito.alignCenter();
        this.printerMito.println(this.businessName);
        this.printerMito.setTextSize(7,7);
        // TICKET CLIENT INFO
        //this.printerMito.newLine();
        this.printerMito.alignLeft();
        this.printerMito.println(orderObj?.billing?.first_name);
        this.printerMito.alignCenter();
        this.printerMito.println(this.codiPostalPobalcio);
        this.printerMito.alignCenter();
        this.printerMito.println(this.paisBusiness);
        // TICKET BUSINESS INFO
        //this.printerMito.newLine();
        this.printerMito.alignCenter();
        this.printerMito.println(this.direccioBusiness);
        this.printerMito.alignCenter();
        this.printerMito.println(this.codiPostalPobalcio);
        this.printerMito.alignCenter();
        this.printerMito.println(this.paisBusiness);
        // TICKET ORDER INFO 1
        this.printerMito.newLine();
        this.printerMito.newLine();
        this.printerMito.newLine();
        this.printerMito.println('--------------------------------');
        if(orderObj.line_items.length > 0){
            let filaArray = [];
            let tableObj = {
                text : '',
                align : '',
                width : ''
            }

            tableObj.text = 'QTY';
            tableObj.align = 'LEFT';
            tableObj.width = '0.1';

            filaArray.push(tableObj);

            tableObj = {};
            tableObj.text = 'ID';
            tableObj.align = 'LEFT';
            tableObj.width = '0.2';

            filaArray.push(tableObj);

            tableObj = {};
            tableObj.text = 'DESC';
            tableObj.align = 'LEFT';
            tableObj.width = '0.6';

            filaArray.push(tableObj);

            tableObj = {};
            tableObj.text = 'PREU';
            tableObj.align = 'RIGHT';
            tableObj.width = '0.1';

            filaArray.push(tableObj);

            this.printerMito.tableCustom(filaArray);

            orderObj.line_items.forEach(function(item){
                console.log('order item',item);
                filaArray = [];
                tableObj = {};
                tableObj.text = item.quantity;
                tableObj.align = 'LEFT';
                tableObj.width = '0.1';

                filaArray.push(tableObj);

                tableObj = {};
                tableObj.text = item.id;
                tableObj.align = 'LEFT';
                tableObj.width = '0.2';

                filaArray.push(tableObj);

                tableObj = {};
                tableObj.text = item.nom;
                tableObj.align = 'LEFT';
                tableObj.width = '0.6';

                filaArray.push(tableObj);

                tableObj = {};
                tableObj.text = item.price;
                tableObj.align = 'RIGHT';
                tableObj.width = '0.1';

                filaArray.push(tableObj);

                this.printerMito.tableCustom(filaArray);

            })
        }
        this.printerMito.newLine();
        this.printerMito.println('--------------------------------');
        this.printerMito.bold(true);
        this.printerMito.leftRight('TOTAL CON IVA', orderObj.total);

        //this.executePrint();
    }

    getComandaCalents(platsCalents) {
        let platsCalentsToPrint = [];
        platsCalents.forEach((platC)=>{
            if(this.MITO_SKU_CALENT.includes(platC.sku)) platsCalentsToPrint.push(platC);
        })
        //console.log('platsCalentsMito -->', platsCalentsToPrint)
        this.printerMito.clear();

        let platsCalentsMito = new TicketCalentMito(platsCalentsToPrint,this.printerMito);
        //console.log(platsCalentsMito);
        setTimeout(() => {
            this.printerMito.clear()
            this.getComandaFreds(this.mitoOrderItems);
        },3000)
    }

    getComandaFreds(platsFreds){
        let platsFredsToPrint = [];
        platsFreds.forEach((platF)=>{
            if(this.MITO_SKU_FRED.includes(platF.sku)) platsFredsToPrint.push(platF);
        })
        //console.log('platsFredsMito -->', platsFredsToPrint)
        let platsFredsMito = new TicketFredMito(platsFredsToPrint ,this.printerMito);
        //console.log(platsFredsMito);
        setTimeout(() => {
            this.printerMito.clear()
            this.getComandaSala(this.mitoOrderItems);
        },3000)  
    }

    getComandaSala(begudes){
        let begudesToPrint = [];
        begudes.forEach((beg)=>{
            if(this.MITO_SKU_BEGUDES.includes(beg.sku)) begudesToPrint.push(beg);
        })
        console.log('begudes mito -->', begudesToPrint)
        //let platsFredsBruna = new TicketFredBruna(platsFredsToPrint, this.printerBruna);
        //console.log(platsFredsBruna);
    }
}

module.exports = TicketCompraMito;