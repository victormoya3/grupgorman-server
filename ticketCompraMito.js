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
        '141', // Uramaki Alvocat amb ceba, llagosti tempuritzat, salsa maduixa
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
        '11', // Bolets pollastre
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
        // '76', // Pollastre amb teriyaki a la catalana
        '78', // Udon
        '79', // Maki tempuritzat alvocat amb tonyina, salsa teriyaki picant
        '80', // Maki tempuritzat amb salmo, salsa teriyaki picant
        'O8D' // Gyozas fricando
    ];

    MITO_SKU_BEGUDES = [
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

    businessName = 'Mito Sushi Restaurant';
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
    comensalsMitoSoja = 'Soja: ';
    comensalsMitoPalillos = 'Palillos: '
    comensalsMitoWasabi = 'Wasabi: ';
    comensalsMitoGengibre = 'Gengibre: ';
    alergensClient = 'Alergens: ';

    footerBusinessInfo = 'Gorman Restauració S.L.U';
    footerCIFNIF = 'CIF/NIF: B66927856';
    footerSerialFactura = 'Serie de Factura:';
    footerNumeroFactura = 'Numero de Factura:';

    grupGormanOrder;

    esCopia

    constructor(order,orderItems,printer, copia){
        console.log('**** MITO PRINTING CLASS ********');
        //console.log('***** PARAM : order --> ', order);
        //console.log('***** PARAM : orderItems --> ', orderItems);
        //console.log('***** PARAM : printer --> ', printer);
        this.setUpTicketVariables(order);
        this.printerMito = printer;
        this.printerMito.clear();
        this.mitoOrderItems = orderItems;
        this.grupGormanOrder = order;
        this.esCopia = copia;
       if(order != undefined && orderItems.length > 0) this.executeCompraMito(order);
       //else this.executeTestCompraMito();
    }

    executePrint(){

        let epsonPrinter = Printer.getPrinter('EPSON_TM-m30II-H');
        console.log('********************** EPSON_TM-m30II-H Printer Mito process **********************');
        //console.log(epsonPrinter);

        try{
            
            let callback = ( jobID ) => {
                console.log(`printer job: ${jobID}`);
                if (this.esCopia === true) { return; }

                setTimeout(() => {
                    this.getComandaCalents(this.mitoOrderItems);
                },2000)

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
            throw new Error('[EPSON Print] Error printing Mito process: ', printErrorException);
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

    setUpTicketVariables(order) {
        // get key: sector value: JSON.parse(JSON.stringify(value)) + camp del valor
        // console.log('alergenos ', order.meta_data.filter((metaData) => metaData.key === 'alergenos_cliente'));
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
        // TEXT SIZE ON PRINT TEST
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(1,1);
        // this.printerMito.println('SIZE 1,1');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(1,2);
        // this.printerMito.println('SIZE 1,2');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(1,3);
        // this.printerMito.println('SIZE 1,3');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(1,4);
        // this.printerMito.println('SIZE 1,4');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(1,5);
        // this.printerMito.println('SIZE 1,5');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(1,6);
        // this.printerMito.println('SIZE 1,6');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(1,7);
        // this.printerMito.println('SIZE 1,7');

        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(2,1);
        // this.printerMito.println('SIZE 2,1');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(2,2);
        // this.printerMito.println('SIZE 2,2');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(2,3);
        // this.printerMito.println('SIZE 2,3');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(2,4);
        // this.printerMito.println('SIZE 2,4');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(2,5);
        // this.printerMito.println('SIZE 2,5');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(2,6);
        // this.printerMito.println('SIZE 2,6');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(2,7);
        // this.printerMito.println('SIZE 2,7');

        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(3,1);
        // this.printerMito.println('SIZE 3,1');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(3,2);
        // this.printerMito.println('SIZE 3,2');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(3,3);
        // this.printerMito.println('SIZE 3,3');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(3,4);
        // this.printerMito.println('SIZE 3,4');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(3,5);
        // this.printerMito.println('SIZE 3,5');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(3,6);
        // this.printerMito.println('SIZE 3,6');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(3,7);
        // this.printerMito.println('SIZE 3,7');

        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(4,1);
        // this.printerMito.println('SIZE 4,1');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(4,2);
        // this.printerMito.println('SIZE 4,2');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(4,3);
        // this.printerMito.println('SIZE 4,3');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(4,4);
        // this.printerMito.println('SIZE 4,4');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(4,5);
        // this.printerMito.println('SIZE 4,5');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(4,6);
        // this.printerMito.println('SIZE 4,6');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(4,7);
        // this.printerMito.println('SIZE 4,7');

        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(5,1);
        // this.printerMito.println('SIZE 5,1');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(5,2);
        // this.printerMito.println('SIZE 5,2');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(5,3);
        // this.printerMito.println('SIZE 5,3');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(5,4);
        // this.printerMito.println('SIZE 5,4');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(5,5);
        // this.printerMito.println('SIZE 5,5');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(5,6);
        // this.printerMito.println('SIZE 5,6');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(5,7);
        // this.printerMito.println('SIZE 5,7');

        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(6,1);
        // this.printerMito.println('SIZE 6,1');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(6,2);
        // this.printerMito.println('SIZE 6,2');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(6,3);
        // this.printerMito.println('SIZE 6,3');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(6,4);
        // this.printerMito.println('SIZE 6,4');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(6,5);
        // this.printerMito.println('SIZE 6,5');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(6,6);
        // this.printerMito.println('SIZE 6,6');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(6,7);
        // this.printerMito.println('SIZE 6,7');

        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(7,1);
        // this.printerMito.println('SIZE 7,1');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(7,2);
        // this.printerMito.println('SIZE 7,2');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(7,3);
        // this.printerMito.println('SIZE 7,3');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(7,4);
        // this.printerMito.println('SIZE 4,4');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(7,5);
        // this.printerMito.println('SIZE 7,5');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(7,6);
        // this.printerMito.println('SIZE 7,6');
        // this.printerMito.newLine();
        // this.printerMito.alignCenter();
        // this.printerMito.setTextSize(7,7);
        // this.printerMito.println('SIZE 7,7');
        
        // this.printerMito.cut();

        // Printer Compra Ticket
        let mitoTotalPreu = 0;
        // TICKET HEADER
        this.printerMito.newLine();
        // aplicar fondo negro por si se ve
        // this.printerMito.printImage('./src/assets/imatges/mito/MITO-logo-final-01-1-1024x724.png');
        this.printerMito.newLine();
        this.printerMito.alignCenter();
        // this.printerMito.setTextSize(1,1);
        this.printerMito.bold(true);
        // printer.setTextNormal();                                    // Set text to normal
        // printer.setTextDoubleHeight();                              // Set text to double height
        // printer.setTextDoubleWidth();  
        this.printerMito.setTextDoubleHeight();
        this.printerMito.setTextDoubleWidth();
        this.printerMito.println(this.businessName);
        this.printerMito.bold(false);
        this.printerMito.newLine();
        this.printerMito.alignCenter();
        this.printerMito.setTextNormal();
        this.printerMito.println(this.direccioBusiness);
        this.printerMito.alignCenter();
        this.printerMito.println(this.codiPostalPobalcio);
        this.printerMito.alignCenter();
        this.printerMito.println(this.paisBusiness);
        // TICKET CLIENT INFO
        this.printerMito.newLine();
        this.printerMito.alignLeft();
        const orderOwner = `${orderObj?.billing?.first_name} ${orderObj?.billing?.last_name}`
        this.printerMito.println(orderOwner);
        this.printerMito.newLine();
        this.printerMito.alignLeft();
        const adrecaOrder = `${orderObj?.billing?.address_1}, ${orderObj?.billing?.address_2}`
        this.printerMito.println(adrecaOrder);
        const adrecaOrder2 = `${orderObj?.billing?.postcode}, ${orderObj?.billing?.city}`;
        const adrecaOrder3 = `${orderObj?.billing?.state}, ${orderObj?.billing?.country}`
        this.printerMito.leftRight(adrecaOrder2, adrecaOrder3);
        this.printerMito.newLine();
        this.printerMito.println(this.sector);
        this.printerMito.newLine();
        this.printerMito.alignLeft();
        this.printerMito.println('Contacte: ' + orderObj?.billing?.phone);
        // TICKET PURCHASE INFO
        this.printerMito.newLine();
        this.printerMito.println(this.purchaseType + orderObj.id);
        this.printerMito.newLine();
        this.printerMito.println(this.usuari);
        this.printerMito.newLine();
        this.printerMito.leftRight(this.taula + orderObj.id,this.comensals);
        this.printerMito.leftRight(this.venta,orderObj.date_created);
        // AFEGIR META DATA PURCHASE INFO
        // horaRecollida, recollidaTipus, alergensClient
        this.printerMito.leftRight(this.recollidaTipus,this.horaRecollida);
        this.printerMito.println(this.alergensClient);
        // TICKET ORDER ITEMS TABLE INFO
        this.printerMito.newLine();
        this.printerMito.drawLine();
        if(this.mitoOrderItems.length > 0){
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
            tableObj.width = '0.4';

            filaArray.push(tableObj);

            tableObj = {};
            tableObj.text = 'PREU';
            tableObj.align = 'RIGHT';
            tableObj.width = '0.2';

            filaArray.push(tableObj);

            this.printerMito.tableCustom(filaArray);

            this.printerMito.drawLine();

            let filasArray = [];
            let _that = this;

            this.mitoOrderItems.forEach(function(item){
                // console.log('order item',item);

                mitoTotalPreu += +item.total;

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
                tableObj.width = '0.4';

                filaArray.push(tableObj);

                let metaDataDesglosemPreu = false;
                let totalPreuExtras = 0;

                if (item.meta_data.length > 0){
                    // funcio per saber si hem de restar els preus del topings desglosats o el preu total del producte
                    // comprovar els valors que tenim per a complements mito
                    item.meta_data.forEach(function(metaData){
                        console.log('order metaData',metaData);
                        if (Array.isArray(metaData.value) === true) { 
                            metaDataDesglosemPreu = (metaData.key.indexOf('Topings') > 0 || metaData.key.indexOf('Salses') > 0) ? true : false
                            metaData.value.forEach((extra) => {
                                totalPreuExtras += extra.price.toFixed(2);
                            })
                        }
                    });
                }

                tableObj = {};
                tableObj.text = metaDataDesglosemPreu === true ? (item.total - totalPreuExtras).toFixed(2) : item.total; // hauriem de mirar el tema de la metadata abans per setejar els flags corresponents?
                tableObj.align = 'RIGHT';
                tableObj.width = '0.2';

                filaArray.push(tableObj);
                //console.log(' filaArray to push ', filaArray)
                _that.printerMito.tableCustom(filaArray); 

                // condicional para saber si hay meta datos associados al elemento del pedido o no
                if (item.meta_data.length > 0){

                    let subTableObj = {
                        text : '',
                        align : '',
                        width : ''
                    };

                    let subFilaArray = [];

                    item.meta_data.forEach(function(metaData){
                        // console.log('order metaData mito',metaData);
                        if (metaData.key.indexOf('_') >= 0) { return; }
                        // aplicar
                        subFilaArray = [];
                        subTableObj = {};
        
                        subTableObj.text = '';
                        subTableObj.align = 'LEFT';
                        subTableObj.width = '0.2';

                        subTableObj = {};
                        // if metadata key contains topings or salses, qualsevol cosa que contingui un preu a sumar
                        subTableObj.text = metaDataDesglosemPreu === true ? metaData.value.toString() : '-';
                        subTableObj.align = 'LEFT';
                        subTableObj.width = metaDataDesglosemPreu === true ? '0.4' : '0.2';

                        subFilaArray.push(subTableObj);

                        subTableObj = {};

                        subTableObj.text = metaDataDesglosemPreu === true ? '+ ' + (metaData.key.toString().split(';')[1].split(')')[0]) + ' €' : metaData.value.toString();
                        subTableObj.align = 'LEFT';
                        subTableObj.width = metaDataDesglosemPreu === true ? '0.3' : '0.5';

                        subFilaArray.push(subTableObj);

                        _that.printerMito.tableCustom(subFilaArray);
        
                    }) 
                }

            })
                            
            this.addInfoComplementsMito(_that.printerMito);
            
        }

        this.printerMito.newLine();
        this.printerMito.drawLine();
        // DESGLOSE SENSE IVA
        this.printerMito.newLine();
        this.printerMito.leftRight('IVA 10% ' + (+mitoTotalPreu.toFixed(2) - (+mitoTotalPreu.toFixed(2) * 0.1)) + ' €', (mitoTotalPreu.toFixed(2) * 0.1) + ' €    ' + (+mitoTotalPreu.toFixed(2) - (+mitoTotalPreu.toFixed(2) * 0.1)) + ' €');
        this.printerMito.println('Total sin IVA ' + (+mitoTotalPreu.toFixed(2) - (+mitoTotalPreu.toFixed(2) * 0.1)) + ' €');
        // afegir Logica per a sumar + preu transport
        this.printerMito.drawLine();
        this.printerMito.bold(true);
        // this.printerMito.setTextSize(2,2);
        //  TOTAL CON IVA
        this.printerMito.leftRight('TOTAL CON IVA', mitoTotalPreu.toFixed(2) + ' €');
        // this.executePrint();
        // this.printerMito.clear();
        this.printerMito.bold(false);
        // this.printerMito.setTextSize(1,1);
        // TICKET FOOTER INFO
        this.printerMito.newLine();
        this.printerMito.alignCenter();
        this.printerMito.println(this.footerBusinessInfo);
        this.printerMito.alignCenter();
        this.printerMito.println(this.footerCIFNIF);
        this.printerMito.alignCenter();
        this.printerMito.println(this.footerSerialFactura + orderObj.cart_hash);
        this.printerMito.alignCenter();
        this.printerMito.println(this.footerNumeroFactura + orderObj.id);
        //Partial Cut for other tickets
        this.printerMito.cut();
        
        this.executePrint();
    }

    addInfoComplementsMito(printer) {
        let filaArray = [];
        let tableObj = {};

        tableObj.text = this.comensalsMitoSoja;
        tableObj.align = 'LEFT';
        tableObj.width = '1';
        filaArray.push(tableObj);

        tableObj = {};

        tableObj.text = this.comensalsMitoPalillos;
        tableObj.align = 'LEFT';
        tableObj.width = '1';
        filaArray.push(tableObj);

        tableObj = {};

        tableObj.text = this.comensalsMitoWasabi;
        tableObj.align = 'LEFT';
        tableObj.width = '1';
        filaArray.push(tableObj);

        tableObj = {};

        tableObj.text = this.comensalsMitoGengibre;
        tableObj.align = 'LEFT';
        tableObj.width = '1';
        filaArray.push(tableObj);
        
        //console.log(' filaArray to push ', filaArray)
        printer.tableCustom(filaArray); 
    }

    getComandaCalents(platsCalents) {
        let platsCalentsToPrint = [];
        platsCalents.forEach((platC)=>{
            if(this.MITO_SKU_CALENT.includes(platC.sku)) platsCalentsToPrint.push(platC);
        })
        //console.log('platsCalentsMito -->', platsCalentsToPrint)

        let platsCalentsMito = new TicketCalentMito(platsCalentsToPrint,this.printerMito, this.grupGormanOrder, this.recollidaTipus, this.horaRecollida);
        //console.log(platsCalentsMito);
        setTimeout(() => {
            this.getComandaFreds(this.mitoOrderItems);
        },2000)
    }

    getComandaFreds(platsFreds){
        let platsFredsToPrint = [];
        platsFreds.forEach((platF)=>{
            if(this.MITO_SKU_FRED.includes(platF.sku)) platsFredsToPrint.push(platF);
        })
        //console.log('platsFredsMito -->', platsFredsToPrint)
        let platsFredsMito = new TicketFredMito(platsFredsToPrint ,this.printerMito, this.grupGormanOrder, this.recollidaTipus, this.horaRecollida);
        //console.log(platsFredsMito);
    }

}

module.exports = TicketCompraMito;