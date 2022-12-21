const TicketCalentMito = require("./ticketCalentMito");
const TicketFredMito = require("./ticketFredMito");
const Printer = require('printer');

class TicketCompraClient {

    printer;
    orderItems;

    businessName = 'Gorman Restauració S.L.U';
    direccioBusiness = 'C/ Hospital, 46';
    codiPostalPobalcio = '08211, Castellar del Vallès, Barcelona';
    paisBusiness = 'Espanya';

    purchaseType = 'FACTURA SIMPLICIFICADA GENERAL - ';
    taula = 'Taula: ';
    usuari = 'Usuari Generic ';
    comensals = 'Comensals: ';
    venta = 'Venta - Comanda';

    sector = 'Sector: ';
    horaRecollida = 'Entrega: ';
    recollidaTipus = 'Recollida: ';
    comensalsMitoSoja = 'Soja ';
    comensalsMitoPalillos = 'Palillos'
    comensalsMitoWasabi = 'Wasabi';
    comensalsMitoGengibre = 'Gengibre';
    alergensClient = 'Alergens: ';

    footerBusinessInfo = 'Gorman Restauració S.L.U';
    footerCIFNIF = 'CIF/NIF:';
    footerSerialFactura = 'Serie de Factura:';
    footerNumeroFactura = 'Numero de Factura:';

    existMitoProducts = false;

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
        '141', // Uramaki Alvocat amb ceba, llagosti tempuritzat, salsa fruita passio i coco
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
        '52', // Maki Salmo
        '63', // Maki de tonyina
        '66', // Maki de llagosti
        '69', // Maki tempuritzat amb brie amb mermelada
        '73', // Maki tempuritzart de foie caramelitzat
        '75', // Pollastre Kar-Age amb salsa cajun
        '76', // Pollastre amb teriyaki a la catalana
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
    ]

    constructor(order,orderItems,printer){
        console.log('**** GRUP GORMAN ORDER PRINTING CLASS ********');
        //console.log('***** PARAM : order --> ', order);
        //console.log('***** PARAM : orderItems --> ', orderItems);
        //console.log('***** PARAM : printer --> ', printer);
        this.setUpTicketVariables(order);
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
                // return cb(jobID)
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
            console.log('printErrorException: ', printErrorException);
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
            console.log('error: ', printError);
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

    setUpTicketVariables(order) {
        // get key: sector value: JSON.parse(JSON.stringify(value)) + camp del valor
        console.log('alergenos ', order.meta_data.filter((metaData) => metaData.key === 'alergenos_cliente'));
        this.sector += JSON.parse(JSON.stringify(order.meta_data.filter((metaData) => metaData.key === 'sector')[0].value));
        // get key: comensals value: X
        this.comensals += order.meta_data.filter((metaData) => metaData.key === 'comensals')[0].value;
        // get key: hora_recollida value: JSON.parse(JSON.stringify(value)) + camp del valor
        this.horaRecollida += JSON.parse(JSON.stringify(order.meta_data.filter((metaData) => metaData.key === 'hora_recollida')[0].value));
        // get key: recollida_tipus value: JSON.parse(JSON.stringify(value)) + camp del valor
        this.recollidaTipus += JSON.parse(JSON.stringify(order.meta_data.filter((metaData) => metaData.key === 'recollida_tipus')[0].value));
        // get key: complements_mito_palillos value: JSON.parse(JSON.stringify(value)) + camp del valor
        this.comensalsMitoPalillos += JSON.parse(JSON.stringify(order.meta_data.filter((metaData) => metaData.key === 'complements_mito_palillos')[0].value));
        // get key: complements_mito_soja value: JSON.parse(JSON.stringify(value))+ camp del valor
        this.comensalsMitoSoja += JSON.parse(JSON.stringify(order.meta_data.filter((metaData) => metaData.key === 'complements_mito_soja')[0].value));
        // get key: complements_mito_wasabi value: JSON.parse(JSON.stringify(value))+ camp del valor
        this.comensalsMitoWasabi += JSON.parse(JSON.stringify(order.meta_data.filter((metaData) => metaData.key === 'complements_mito_wasabi')[0].value)); 
        // get key: complements_mito_gengibre value: JSON.parse(JSON.stringify(value))+ camp del valor
        this.comensalsMitoGengibre += JSON.parse(JSON.stringify(order.meta_data.filter((metaData) => metaData.key === 'complements_mito_gengibre')[0].value));
        // get key: alergenos_cliente value: X
        this.alergensClient += order.meta_data.filter((metaData) => metaData.key === 'alergenos_cliente')[0].value;
    }

    generateRawTicket(orderObj){
        console.log('GENERATING TICKET FOR ORDER :',orderObj.id);

        // Printer Compra Ticket
        // TICKET HEADER
        this.printer.newLine();
        //this.printer.printImage();
        this.printer.newLine();
        this.printer.alignCenter();
        // this.printer.setTextSize(1,1);
        this.printer.bold(true);
        this.printer.println(this.businessName);
        this.printer.bold(false);
        this.printer.newLine();
        this.printer.alignCenter();
        this.printer.println(this.direccioBusiness);
        this.printer.alignCenter();
        this.printer.println(this.codiPostalPobalcio);
        this.printer.alignCenter();
        this.printer.println(this.paisBusiness);
        // TICKET CLIENT INFO
        this.printer.newLine();
        this.printer.alignLeft();
        const orderOwner = `${orderObj?.billing?.first_name} ${orderObj?.billing?.last_name}`
        this.printer.println(orderOwner);
        this.printer.newLine();
        this.printer.alignLeft();
        const adrecaOrder = `${orderObj?.billing?.address_1}, ${orderObj?.billing?.address_2}`
        this.printer.println(adrecaOrder);
        const adrecaOrder2 = `${orderObj?.billing?.postcode}, ${orderObj?.billing?.city}`;
        const adrecaOrder3 = `${orderObj?.billing?.state}, ${orderObj?.billing?.country}`
        this.printer.leftRight(adrecaOrder2, adrecaOrder3);
        this.printer.newLine();
        this.printer.println(this.sector);
        this.printer.newLine();
        this.printer.alignLeft();
        this.printer.println('Contacte: ' + orderObj?.billing?.phone);
        // TICKET PURCHASE INFO
        this.printer.newLine();
        this.printer.println(this.purchaseType + orderObj.id);
        this.printer.newLine();
        this.printer.println(this.usuari);
        this.printer.newLine();
        this.printer.leftRight(this.taula + orderObj.id,this.comensals);
        this.printer.leftRight(this.venta,orderObj.date_created);
        // AFEGIR META DATA PURCHASE INFO
        // horaRecollida, recollidaTipus, alergensClient
        this.printer.leftRight(this.recollidaTipus,this.horaRecollida);
        this.printer.println(this.alergensClient);
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
            tableObj.width = '0.2';

            filaArray.push(tableObj);

            tableObj = {};
            tableObj.text = 'ID';
            tableObj.align = 'LEFT';
            tableObj.width = '0.2';

            filaArray.push(tableObj);

            tableObj = {};
            tableObj.text = 'DESC';
            tableObj.align = 'LEFT';
            tableObj.width = '0.3';

            filaArray.push(tableObj);

            tableObj = {};
            tableObj.text = 'PREU';
            tableObj.align = 'RIGHT';
            tableObj.width = '0.2';

            filaArray.push(tableObj);

            this.printer.tableCustom(filaArray);

            this.printer.drawLine();

            let filasArray = [];
            let _that = this;

            orderObj.line_items.forEach(function(item){
                console.log('order item',item);

                _that.checkIfMitoProductsExist(item);

                filaArray = [];
                tableObj = {};

                tableObj.text = item.quantity.toString();
                tableObj.align = 'LEFT';
                tableObj.width = '0.2';
                filaArray.push(tableObj);

                tableObj = {};
                tableObj.text = item.sku;
                tableObj.align = 'LEFT';
                tableObj.width = '0.2';

                filaArray.push(tableObj);

                tableObj = {};
                tableObj.text = item.name;
                tableObj.align = 'LEFT';
                tableObj.width = '0.3';

                filaArray.push(tableObj);

                tableObj = {};
                tableObj.text = item.total;
                tableObj.align = 'RIGHT';
                tableObj.width = '0.2';

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

                    let subFilaArray = [];

                    item.meta_data.forEach(function(metaData){
                        console.log('order metaData',metaData);
                        if (metaData.key.indexOf('_') >= 0) { return; }
                        // aplicar
                        subFilaArray = [];
                        subTableObj = {};
        
                        subTableObj.text = '';
                        subTableObj.align = 'LEFT';
                        subTableObj.width = '0.2';

                        // subTableObj.width = '0.1';
                        subFilaArray.push(subTableObj);

                        subTableObj = {};

                        subTableObj.text = metaData.key.toString();
                        subTableObj.align = 'LEFT';
                        subTableObj.width = '0.4';

                        subFilaArray.push(subTableObj);

                        subTableObj = {};

                        subTableObj.text = metaData.value.toString();
                        subTableObj.align = 'LEFT';
                        subTableObj.width = '0.3';

                        subFilaArray.push(subTableObj);
        
                        //console.log(' filaArray to push ', filaArray)
        
                        //console.log(' filaArray to push ', filaArray)
                        _that.printer.tableCustom(subFilaArray);
        
                    }) 
                }

            })
            
            setTimeout(() => {
                
                if (this.existMitoProducts === true){
                    this.addInfoComplementsMito(_that.printer);
                }

            },100);
            
        }

        this.printer.newLine();
        this.printer.drawLine();
        this.printer.bold(true);
        // this.printer.setTextSize(2,2);
        this.printer.leftRight('TOTAL CON IVA', orderObj.total);
        // this.executePrint();
        // this.printer.clear();
        this.printer.bold(false);
        // this.printer.setTextSize(1,1);
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
        
        this.executePrint()

        // ANTERIOR SOLUCION
        // const companyCallback = (jobId) => {
        //     console.log('retornant jobId: ', jobId, ' al proces de generacio del ticket, continuem...');
        //     this.printer.clear();
        //     // TICKET BUSINESS INFO
        //     this.printer.setTextSize(1,1);
        //     this.printer.newLine();
        //     this.printer.alignCenter();
        //     this.printer.println(this.direccioBusiness);
        //     // this.printer.setTextSize(1,1);
        //     this.printer.alignCenter();
        //     this.printer.println(this.codiPostalPobalcio);
        //     this.printer.alignCenter();
        //     this.printer.println(this.paisBusiness);
        //     // TICKET CLIENT INFO
        //     this.printer.newLine();
        //     this.printer.alignLeft();
        //     const orderOwner = `${orderObj?.billing?.first_name} ${orderObj?.billing?.last_name}`
        //     this.printer.println(orderOwner);
        //     this.printer.alignLeft();
        //     const adrecaOrder = `${orderObj?.billing?.address_1}, ${orderObj?.billing?.address_2}, ${orderObj?.billing?.postcode}, ${orderObj?.billing?.city}, ${orderObj?.billing?.state}, ${orderObj?.billing?.country}`
        //     this.printer.println(adrecaOrder);
        //     this.printer.alignLeft();
        //     this.printer.println(orderObj?.billing?.phone);
        //     // TICKET PURCHASE INFO
        //     this.printer.newLine();
        //     this.printer.leftRight(this.purchaseType,this.taula + orderObj.id);
        //     this.printer.leftRight(this.usuari,this.comensals);
        //     this.printer.leftRight(this.venta,orderObj.date_created);
        //     // TICKET ORDER ITEMS TABLE INFO
        //     this.printer.newLine();
        //     this.printer.drawLine();
        //     if(orderObj.line_items.length > 0){
        //         let filaArray = [];
        //         let tableObj = {
        //             text : '',
        //             align : '',
        //             width : ''
        //         }

        //         tableObj.text = 'QTY';
        //         tableObj.align = 'LEFT';
        //         tableObj.width = '0.1';

        //         filaArray.push(tableObj);

        //         tableObj = {};
        //         tableObj.text = 'ID';
        //         tableObj.align = 'LEFT';
        //         tableObj.width = '0.2';

        //         filaArray.push(tableObj);

        //         tableObj = {};
        //         tableObj.text = 'DESC';
        //         tableObj.align = 'LEFT';
        //         tableObj.width = '0.6';

        //         filaArray.push(tableObj);

        //         tableObj = {};
        //         tableObj.text = 'PREU';
        //         tableObj.align = 'RIGHT';
        //         tableObj.width = '0.1';

        //         filaArray.push(tableObj);

        //         this.printer.tableCustom(filaArray);

        //         let filasArray = [];
        //         let _that = this;

        //         orderObj.line_items.forEach(function(item){
        //             console.log('order item',item);
        //             filaArray = [];
        //             tableObj = {};

        //             tableObj.text = item.quantity.toString();
        //             tableObj.align = 'LEFT';
        //             tableObj.width = '0.1';
        //             filaArray.push(tableObj);

        //             tableObj = {};
        //             tableObj.text = item.sku;
        //             tableObj.align = 'LEFT';
        //             tableObj.width = '0.2';

        //             filaArray.push(tableObj);

        //             tableObj = {};
        //             tableObj.text = item.name;
        //             tableObj.align = 'LEFT';
        //             tableObj.width = '0.6';

        //             filaArray.push(tableObj);

        //             tableObj = {};
        //             tableObj.text = item.total;
        //             tableObj.align = 'RIGHT';
        //             tableObj.width = '0.1';

        //             filaArray.push(tableObj);
        //             //console.log(' filaArray to push ', filaArray)
        //             _that.printer.tableCustom(filaArray); 

        //             // condicional para saber si hay meta datos associados al elemento del pedido o no
        //             if (item.meta_data.length > 0){

        //                 let subTableObj = {
        //                     text : '',
        //                     align : '',
        //                     width : ''
        //                 };
        //                 let subFilaArray = []
        //                 item.meta_data.forEach(function(metaData){
        //                     console.log('order metaData',metaData);
        //                     // aplicar
        //                     subFilaArray = [];
        //                     subTableObj = {};
            
        //                     subTableObj.text = metaData.key.toString();
        //                     subTableObj.align = 'LEFT';
        //                     // subTableObj.width = '0.1';
        //                     subFilaArray.push(subTableObj);
            
        //                     //console.log(' filaArray to push ', filaArray)
        //                     _that.printer.tableCustom(subFilaArray); 

        //                     subFilaArray = [];
        //                     subTableObj = {};

        //                     subTableObj.text = metaData.value.toString();
        //                     subTableObj.align = 'LEFT';
        //                     // subTableObj.width = '0.1';
        //                     subFilaArray.push(subTableObj);
            
        //                     //console.log(' filaArray to push ', filaArray)
        //                     _that.printer.tableCustom(subFilaArray);
            
        //                 }) 
        //             }

        //         })
                
        //     }

        //     const comandaCallback = (jobId2) => {
        //         console.log('retornant jobId - 2: ', jobId2, ' al proces de generacio del ticket, continuem...');
        //         this.printer.clear();
        //         this.printer.newLine();
        //         this.printer.drawLine();
        //         this.printer.bold(true);
        //         this.printer.setTextSize(2,2);
        //         this.printer.leftRight('TOTAL CON IVA', orderObj.total);
        //         this.executePrint();
        //         this.printer.clear();
        //         this.printer.bold(false);
        //         this.printer.setTextSize(1,1);
        //         // TICKET FOOTER INFO
        //         this.printer.newLine();
        //         this.printer.alignCenter();
        //         this.printer.println(this.footerBusinessInfo);
        //         this.printer.alignCenter();
        //         this.printer.println(this.footerCIFNIF);
        //         this.printer.alignCenter();
        //         this.printer.println(this.footerSerialFactura + orderObj.cart_hash);
        //         this.printer.alignCenter();
        //         this.printer.println(this.footerNumeroFactura + orderObj.id);
        //         //Partial Cut for other tickets
        //         this.printer.cut();

        //         const compraCallback = (jobId3) => {
        //             console.log('retornant jobId - 3: ', jobId3, ' al proces de generacio del ticket, finalitzem!');
        //         }
        //         this.executePrint(compraCallback);
        //     }

        //     this.executePrint(comandaCallback);
        // }

        // this.executePrint(companyCallback);
        
    }

    checkIfMitoProductsExist(producteComanda){
        this.existMitoProducts = this.MITO_SKU_LIST.includes(producteComanda.sku) === true; 
    }

    addInfoComplementsMito(printer) {
        filaArray = [];
        tableObj = {};

        tableObj.text = this.comensalsMitoSoja;
        tableObj.align = 'LEFT';
        tableObj.width = '0.9';
        filaArray.push(tableObj);

        tableObj = {};

        tableObj.text = this.comensalsMitoPalillos;
        tableObj.align = 'LEFT';
        tableObj.width = '0.9';
        filaArray.push(tableObj);

        tableObj = {};

        tableObj.text = this.comensalsMitoWasabi;
        tableObj.align = 'LEFT';
        tableObj.width = '0.9';
        filaArray.push(tableObj);

        tableObj = {};

        tableObj.text = this.comensalsMitoGengibre;
        tableObj.align = 'LEFT';
        tableObj.width = '0.9';
        filaArray.push(tableObj);
        
        //console.log(' filaArray to push ', filaArray)
        printer.tableCustom(filaArray); 
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