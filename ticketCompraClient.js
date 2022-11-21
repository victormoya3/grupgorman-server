const TicketCalentMito = require("./ticketCalentMito");
const TicketFredMito = require("./ticketFredMito");
const Printer = require('printer');

class TicketCompraClient {

    printer;
    orderItems;
    
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

    businessName = 'Gorman Restauració S.L.U';
    direccioBusiness = 'C/ Hospital, 46';
    codiPostalPobalcio = '08211, Castellar del Vallès, Barcelona';
    paisBusiness = 'Espanya';

    purchaseType = 'FACTURA SIMPLICIFICADA GENERAL';
    taula = 'Taula:';
    usuari = 'Usuari Generic';
    comensals = 'Comensals:';
    venta = 'Venta - Comanda';

    footerBusinessInfo = 'Gorman Restauració S.L.U';
    footerCIFNIF = 'CIF/NIF:';
    footerSerialFactura = 'Serie de Factura:';
    footerNumeroFactura = 'Numero de Factura:';

    constructor(order,orderItems,printer){
        console.log('**** GRUP GORMAN ORDER PRINTING CLASS ********');
        //console.log('***** PARAM : order --> ', order);
        //console.log('***** PARAM : orderItems --> ', orderItems);
        //console.log('***** PARAM : printer --> ', printer);
        this.printer = printer;
        this.printer.clear();
        this.orderItems = orderItems;
       if(order != undefined && orderItems.length > 0) this.executeCompra(order);
       //else this.executeTestCompraMito();
    }

    executePrint(){

        let epsonPrinter = Printer.getPrinter('EPSON_TM-m30II-H');
        console.log('********************** EPSON_TM-m30II-H Printer Order process **********************');
        //console.log(epsonPrinter);

        try{
            
            let callback = ( jobID ) => {
                console.log(`printer job: ${jobID}`);
                // setTimeout(() => {
                //     this.getComandaCalents(this.mitoOrderItems);
                // },3000)

            }

            Printer.printDirect({
                data: this.printer.getBuffer(),
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
            throw new Error('[EPSON Print] Error printing Order process: ', printErrorException);
        }

    }

    async executeTestCompraMito(){
        try {
            console.log('********************** ORDER TICKET EMPTY ******************');
            //this.printer.print('***** GrupGorman MITO COMPRA TICKET ********');
            //console.log('********************** EXECUTING PRINT PROCESS ******************');
            //console.log(this.printer.print('***** GrupGorman MITO COMPRA TICKET ********'));
            //console.log('******************************************************************');
        } catch(printError){
            throw new Error('[EPSON Print] Error printing order process: ', printError);
        }
    }

    async executeCompra(newOrder){
        //console.log('**************** GORMAN TICKET NOVA COMPRA ****************');
        //console.log(newOrder);
        //console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
        this.generateRawTicket(newOrder);
        
    }

    generateRawTicket(orderObj){
        console.log('GENERATING TICKET FOR ORDER :',orderObj.id);
        // TEXT SIZE ON PRINT TEST
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(1,1);
        // this.printer.println('SIZE 1,1');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(1,2);
        // this.printer.println('SIZE 1,2');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(1,3);
        // this.printer.println('SIZE 1,3');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(1,4);
        // this.printer.println('SIZE 1,4');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(1,5);
        // this.printer.println('SIZE 1,5');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(1,6);
        // this.printer.println('SIZE 1,6');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(1,7);
        // this.printer.println('SIZE 1,7');

        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(2,1);
        // this.printer.println('SIZE 2,1');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(2,2);
        // this.printer.println('SIZE 2,2');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(2,3);
        // this.printer.println('SIZE 2,3');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(2,4);
        // this.printer.println('SIZE 2,4');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(2,5);
        // this.printer.println('SIZE 2,5');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(2,6);
        // this.printer.println('SIZE 2,6');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(2,7);
        // this.printer.println('SIZE 2,7');

        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(3,1);
        // this.printer.println('SIZE 3,1');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(3,2);
        // this.printer.println('SIZE 3,2');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(3,3);
        // this.printer.println('SIZE 3,3');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(3,4);
        // this.printer.println('SIZE 3,4');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(3,5);
        // this.printer.println('SIZE 3,5');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(3,6);
        // this.printer.println('SIZE 3,6');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(3,7);
        // this.printer.println('SIZE 3,7');

        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(4,1);
        // this.printer.println('SIZE 4,1');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(4,2);
        // this.printer.println('SIZE 4,2');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(4,3);
        // this.printer.println('SIZE 4,3');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(4,4);
        // this.printer.println('SIZE 4,4');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(4,5);
        // this.printer.println('SIZE 4,5');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(4,6);
        // this.printer.println('SIZE 4,6');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(4,7);
        // this.printer.println('SIZE 4,7');

        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(5,1);
        // this.printer.println('SIZE 5,1');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(5,2);
        // this.printer.println('SIZE 5,2');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(5,3);
        // this.printer.println('SIZE 5,3');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(5,4);
        // this.printer.println('SIZE 5,4');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(5,5);
        // this.printer.println('SIZE 5,5');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(5,6);
        // this.printer.println('SIZE 5,6');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(5,7);
        // this.printer.println('SIZE 5,7');

        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(6,1);
        // this.printer.println('SIZE 6,1');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(6,2);
        // this.printer.println('SIZE 6,2');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(6,3);
        // this.printer.println('SIZE 6,3');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(6,4);
        // this.printer.println('SIZE 6,4');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(6,5);
        // this.printer.println('SIZE 6,5');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(6,6);
        // this.printer.println('SIZE 6,6');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(6,7);
        // this.printer.println('SIZE 6,7');

        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(7,1);
        // this.printer.println('SIZE 7,1');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(7,2);
        // this.printer.println('SIZE 7,2');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(7,3);
        // this.printer.println('SIZE 7,3');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(7,4);
        // this.printer.println('SIZE 4,4');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(7,5);
        // this.printer.println('SIZE 7,5');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(7,6);
        // this.printer.println('SIZE 7,6');
        // this.printer.newLine();
        // this.printer.alignCenter();
        // this.printer.setTextSize(7,7);
        // this.printer.println('SIZE 7,7');
        
        // this.printer.cut();
        // Printer Compra Ticket
        // TICKET HEADER
        this.printer.newLine();
        //this.printer.printImage();
        this.printer.newLine();
        this.printer.alignCenter();
        this.printer.setTextSize(2,2);
        this.printer.println(this.businessName);
        this.executePrint();
        this.printer.clear();
        // TICKET BUSINESS INFO
        this.printer.newLine();
        this.printer.alignCenter();
        this.printer.setTextSize(1,1);
        this.printer.println(this.direccioBusiness);
        // this.printer.setTextSize(1,1);
        this.printer.alignCenter();
        this.printer.println(this.codiPostalPobalcio);
        this.printer.alignCenter();
        this.printer.println(this.paisBusiness);
        // TICKET CLIENT INFO
        this.printer.newLine();
        this.printer.alignLeft();
        const orderOwner = `${orderObj?.billing?.first_name} ${orderObj?.billing?.last_name}`
        this.printer.println(orderOwner);
        this.printer.alignLeft();
        const adrecaOrder = `${orderObj?.billing?.address_1}, ${orderObj?.billing?.address_2}, ${orderObj?.billing?.postcode}, ${orderObj?.billing?.city}, ${orderObj?.billing?.state}, ${orderObj?.billing?.country}`
        this.printer.println(adrecaOrder);
        this.printer.alignLeft();
        this.printer.println(orderObj?.billing?.phone);
        // TICKET PURCHASE INFO
        this.printer.newLine();
        this.printer.leftRight(this.purchaseType,this.taula + orderObj.id);
        this.printer.leftRight(this.usuari,this.comensals + '1');
        this.printer.leftRight(this.venta,orderObj.date_created);
        // TICKET ORDER ITEMS TABLE INFO
        this.printer.newLine();
        this.printer.drawLine();
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

            this.printer.tableCustom(filaArray);

            let filasArray = [];
            let _that = this;

            orderObj.line_items.forEach(function(item){
                console.log('order item',item);
                filaArray = [];
                tableObj = {};

                tableObj.text = item.quantity.toString();
                tableObj.align = 'LEFT';
                tableObj.width = '0.1';
                filaArray.push(tableObj);

                tableObj = {};
                tableObj.text = item.sku;
                tableObj.align = 'LEFT';
                tableObj.width = '0.2';

                filaArray.push(tableObj);

                tableObj = {};
                tableObj.text = item.name;
                tableObj.align = 'LEFT';
                tableObj.width = '0.6';

                filaArray.push(tableObj);

                tableObj = {};
                tableObj.text = item.total;
                tableObj.align = 'RIGHT';
                tableObj.width = '0.1';

                filaArray.push(tableObj);
                //console.log(' filaArray to push ', filaArray)
                _that.printer.tableCustom(filaArray); 

                // condicional para saber si hay meta datos associados al elemento del pedido o no
                if (item.meta_data.length > 0){

                    let subTableObj = {
                        text : '',
                        align : '',
                        width : ''
                    };
                    let subFilaArray = []
                    item.forEach(function(metaData){
                        console.log('order metaData',metaData);
                        // aplicar
                        subFilaArray = [];
                        subTableObj = {};
        
                        subTableObj.text = metaData.key.toString();
                        subTableObj.align = 'LEFT';
                        // subTableObj.width = '0.1';
                        subFilaArray.push(subTableObj);
        
                        //console.log(' filaArray to push ', filaArray)
                        _that.printer.tableCustom(subFilaArray); 

                        subFilaArray = [];
                        subTableObj = {};
                        
                        subTableObj.text = metaData.value.toString();
                        subTableObj.align = 'LEFT';
                        // subTableObj.width = '0.1';
                        subFilaArray.push(subTableObj);
        
                        //console.log(' filaArray to push ', filaArray)
                        _that.printer.tableCustom(subFilaArray);
        
                    }) 
                }

            })  

               
        }

        this.executePrint();
        this.printer.clear();
        this.printer.newLine();
        this.printer.drawLine();
        this.printer.bold(true);
        this.printer.setTextSize(2,2);
        this.printer.leftRight('TOTAL CON IVA', orderObj.total);
        this.executePrint();
        this.printer.clear();
        this.printer.bold(false);
        this.printer.setTextSize(1,1);
        // TICKET FOOTER INFO
        this.printer.newLine();
        this.printer.alignCenter();
        this.printer.println(this.footerBusinessInfo);
        this.printer.alignCenter();
        this.printer.println(this.footerCIFNIF);
        this.printer.alignCenter();
        this.printer.println(this.footerSerialFactura + orderObj.cart_hash);
        this.printer.alignCenter();
        this.printer.println(this.footerNumeroFactura + orderObj.id);
        //Partial Cut for other tickets
        this.printer.cut();

        this.executePrint();
    }

    // getComandaCalents(platsCalents) {
    //     let platsCalentsToPrint = [];
    //     platsCalents.forEach((platC)=>{
    //         if(this.MITO_SKU_CALENT.includes(platC.sku)) platsCalentsToPrint.push(platC);
    //     })
    //     //console.log('platsCalentsMito -->', platsCalentsToPrint)

    //     let platsCalentsMito = new TicketCalentMito(platsCalentsToPrint,this.printer);
    //     //console.log(platsCalentsMito);
    //     setTimeout(() => {
    //         this.getComandaFreds(this.mitoOrderItems);
    //     },3000)
    // }

    // getComandaFreds(platsFreds){
    //     let platsFredsToPrint = [];
    //     platsFreds.forEach((platF)=>{
    //         if(this.MITO_SKU_FRED.includes(platF.sku)) platsFredsToPrint.push(platF);
    //     })
    //     //console.log('platsFredsMito -->', platsFredsToPrint)
    //     let platsFredsMito = new TicketFredMito(platsFredsToPrint ,this.printer);
    //     //console.log(platsFredsMito);
    //     setTimeout(() => {
    //         this.getComandaSala(this.mitoOrderItems);
    //     },3000)  
    // }

    // getComandaSala(begudes){
    //     let begudesToPrint = [];
    //     begudes.forEach((beg)=>{
    //         if(this.MITO_SKU_BEGUDES.includes(beg.sku)) begudesToPrint.push(beg);
    //     })
    //     console.log('begudes mito -->', begudesToPrint)
    //     //let platsFredsBruna = new TicketFredBruna(platsFredsToPrint, this.printerBruna);
    //     //console.log(platsFredsBruna);
    // }
}

module.exports = TicketCompraClient;