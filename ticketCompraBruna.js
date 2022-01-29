const TicketCalentBruna = require("./ticketCalentBruna");
const TicketFredBruna = require("./ticketFredBruna");
const Printer = require('printer');

class TicketCompraBruna {

    printerBruna;
    brunaOrderItems;
    BRUNA_SKU_BEGUDES = [
        
    ];
    
    BRUNA_SKU_CALENT = [
        'BBAO1', // All i Oli
        'BBBF1', // bomba Formatge
        'BBBR1', // De Brie
        'BBCA1', // Cangreburger
        'BBCB1', // Cabra Boja
        'BBDB1', // Doble Bruna
        'BBDF1', // De Foie
        'BBDP1', // De Pebrots
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
        'BETP1', // Tires de Pollastre
        'BEXB1', // Xips Beicon
        'BPTN1', // Teques Nutella
        'BPXC1', // Coulant
        'BTC01', // Teque Formatge Cabra
        'BTM01', // Teque Mozzarella
        'BTS01', // Teque Sobrasada
        'BAC01', // Amanida Cesar
        'BAL01', // Amanida Lionesa
        'BENV1', // Nachos Veggie
        'BPSX1', // Sopa xocolata Blanca
        'BPTI1', // Tiramisu
    ];

    businessName = 'La Bruna Grill Restaurant';
    direccioBusiness = 'C/ Hospital, 46';
    codiPostalPobalcio = '08211, Castellar del Vallès, Barcelona';
    paisBusiness = 'Espanya';

    purchaseType = 'FACTURA SIMPLICIFICADA GENERAL';
    taula = 'Taula:';
    usuari = 'Usuari Generic';
    comensals = 'Comensals:';
    venta = 'Venta - Comanda';

    footerBusinessInfo = 'Bruna Grill';
    footerCIFNIF = 'CIF/NIF:';
    footerSerialFactura = 'Serie de Factura:';
    footerNumeroFactura = 'Numero de Factura:';

    constructor(order,orderItems,printer){
        console.log('**** BRUNA PRINTING CLASS ********');
        //console.log('***** PARAM : order --> ', order);
        //console.log('***** PARAM : orderItems --> ', orderItems);
        //console.log('***** PARAM : printer --> ', printer);
        this.printerBruna = printer;
        this.brunaOrderItems = orderItems;
        //this.constructThermalPrinter();
       if(order != undefined && orderItems.length > 0) this.executeCompraBruna(order);
       //else this.executeTestCompraBruna();
    }

    
    executePrint(){

        let epsonPrinter = Printer.getPrinter('EPSON_TM-m30II-H');
        console.log('********************** EPSON_TM-m30II-H Printer for Bruna Process **********************');
        //console.log(epsonPrinter);

        try{

            let callback = ( jobID ) => {
                console.log(`printer job: ${jobID}`);
                setTimeout(() => {
                    this.getComandaCalents(this.brunaOrderItems);
                },3000)
                
                setTimeout(() => {
                    this.getComandaSala(this.brunaOrderItems);
                    this.printerBruna.clear()
                },6000)
                
            }

            Printer.printDirect({
                data: this.printerBruna.getBuffer(),
                printer: 'EPSON_TM-m30II-H',
                type: 'RAW',
                success: function (jobID) {
                    //console.log(`printer job: ${jobID}`);
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
            console.log(printErrorException);
        }

    }

    async executeTestCompraBruna(){
        try {
            //this.printerBruna.print('***** GrupGorman BRUNA COMPRA TICKET ********');
            console.log('********************** BRUNA TICKET EMPTY ******************');
            //console.log(this.printerBruna.print('***** GrupGorman BRUNA COMPRA TICKET ********'));
            //console.log('******************************************************************');
        } catch(printError){
            throw new Error('[EPSON Print] Error printing Bruna process: ', printError);
        }
    }

    async executeCompraBruna(newOrder){
        //console.log('**************** BRUNA TICKET NOVA COMPRA ****************');
        //console.log(newOrder);
        //console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
        this.generateRawTicket(newOrder);
        
    }

    generateRawTicket(orderObj){
        console.log('GENERATING TICKET FOR ORDER :',orderObj.id);
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(1,1);
        this.printerBruna.println('SIZE 1,1');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(1,2);
        this.printerBruna.println('SIZE 1,2');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(1,3);
        this.printerBruna.println('SIZE 1,3');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(1,4);
        this.printerBruna.println('SIZE 1,4');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(1,5);
        this.printerBruna.println('SIZE 1,5');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(1,6);
        this.printerBruna.println('SIZE 1,6');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(1,7);
        this.printerBruna.println('SIZE 1,7');

        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(2,1);
        this.printerBruna.println('SIZE 2,1');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(2,2);
        this.printerBruna.println('SIZE 2,2');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(2,3);
        this.printerBruna.println('SIZE 2,3');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(2,4);
        this.printerBruna.println('SIZE 2,4');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(2,5);
        this.printerBruna.println('SIZE 2,5');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(2,6);
        this.printerBruna.println('SIZE 2,6');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(2,7);
        this.printerBruna.println('SIZE 2,7');

        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(3,1);
        this.printerBruna.println('SIZE 3,1');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(3,2);
        this.printerBruna.println('SIZE 3,2');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(3,3);
        this.printerBruna.println('SIZE 3,3');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(3,4);
        this.printerBruna.println('SIZE 3,4');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(3,5);
        this.printerBruna.println('SIZE 3,5');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(3,6);
        this.printerBruna.println('SIZE 3,6');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(3,7);
        this.printerBruna.println('SIZE 3,7');

        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(4,1);
        this.printerBruna.println('SIZE 4,1');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(4,2);
        this.printerBruna.println('SIZE 4,2');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(4,3);
        this.printerBruna.println('SIZE 4,3');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(4,4);
        this.printerBruna.println('SIZE 4,4');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(4,5);
        this.printerBruna.println('SIZE 4,5');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(4,6);
        this.printerBruna.println('SIZE 4,6');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(4,7);
        this.printerBruna.println('SIZE 4,7');

        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(5,1);
        this.printerBruna.println('SIZE 5,1');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(5,2);
        this.printerBruna.println('SIZE 5,2');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(5,3);
        this.printerBruna.println('SIZE 5,3');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(5,4);
        this.printerBruna.println('SIZE 5,4');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(5,5);
        this.printerBruna.println('SIZE 5,5');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(5,6);
        this.printerBruna.println('SIZE 5,6');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(5,7);
        this.printerBruna.println('SIZE 5,7');

        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(6,1);
        this.printerBruna.println('SIZE 6,1');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(6,2);
        this.printerBruna.println('SIZE 6,2');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(6,3);
        this.printerBruna.println('SIZE 6,3');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(6,4);
        this.printerBruna.println('SIZE 6,4');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(6,5);
        this.printerBruna.println('SIZE 6,5');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(6,6);
        this.printerBruna.println('SIZE 6,6');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(6,7);
        this.printerBruna.println('SIZE 6,7');

        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(7,1);
        this.printerBruna.println('SIZE 7,1');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(7,2);
        this.printerBruna.println('SIZE 7,2');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(7,3);
        this.printerBruna.println('SIZE 7,3');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(7,4);
        this.printerBruna.println('SIZE 4,4');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(7,5);
        this.printerBruna.println('SIZE 7,5');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(7,6);
        this.printerBruna.println('SIZE 7,6');
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(7,7);
        this.printerBruna.println('SIZE 7,7');
        
        this.printerBruna.cut();
        // Printer Compra Ticket
        // TICKET HEADER
        this.printerBruna.newLine();
        //this.printerBruna.printImage();
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(2,2);
        this.printerBruna.println(this.businessName);
        
        // TICKET BUSINESS INFO
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        this.printerBruna.setTextSize(1,1);
        this.printerBruna.println(this.direccioBusiness);
        this.printerBruna.alignCenter();
        this.printerBruna.println(this.codiPostalPobalcio);
        this.printerBruna.alignCenter();
        this.printerBruna.println(this.paisBusiness);
        // TICKET CLIENT INFO
        this.printerBruna.newLine();
        this.printerBruna.alignLeft();
        const orderOwner = `${orderObj?.billing?.first_name} ${orderObj?.billing?.last_name}`
        this.printerBruna.println(orderOwner);
        this.printerBruna.alignLeft();
        const adrecaOrder = `${orderObj?.billing?.address_1}, ${orderObj?.billing?.address_2}, ${orderObj?.billing?.postcode}, ${orderObj?.billing?.city}, ${orderObj?.billing?.state}, ${orderObj?.billing?.country}`
        this.printerBruna.println(adrecaOrder);
        this.printerBruna.alignLeft();
        this.printerBruna.println(orderObj?.billing?.phone);
        // TICKET PURCHASE INFO
        this.printerBruna.newLine();
        this.printerBruna.leftRight(this.purchaseType,this.taula + orderObj.id);
        this.printerBruna.leftRight(this.usuari,this.comensals + '1');
        this.printerBruna.leftRight(this.venta,orderObj.date_created);
        // TICKET ORDER ITEMS TABLE INFO
        this.printerBruna.newLine();
        this.printerBruna.println('--------------------------------');
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

            this.printerBruna.tableCustom(filaArray);

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
                _that.printerBruna.tableCustom(filaArray); 

            })  

               
        }
        this.printerBruna.newLine();
        this.printerBruna.println('--------------------------------');
        this.printerBruna.bold(true);
        this.printerBruna.setTextSize(2,2);
        this.printerBruna.leftRight('TOTAL CON IVA', orderObj.total);
        // TICKET FOOTER INFO
        this.printerBruna.newLine();
        this.printerBruna.bold(false);
        this.printerBruna.setTextSize(1,1);
        this.printerBruna.alignCenter();
        this.printerBruna.println(this.footerBusinessInfo);
        this.printerBruna.alignCenter();
        this.printerBruna.println(this.footerCIFNIF);
        this.printerBruna.alignCenter();
        this.printerBruna.println(this.footerSerialFactura + orderObj.cart_hash);
        this.printerBruna.alignCenter();
        this.printerBruna.println(this.footerNumeroFactura + orderObj.id);
        //Partial Cut for other tickets
        this.printerBruna.cut();
        
        this.executePrint();
    }

    getComandaCalents(platsCalents) {
        let platsCalentsToPrint = [];
        platsCalents.forEach((platC)=>{
            if(this.BRUNA_SKU_CALENT.includes(platC.sku)) platsCalentsToPrint.push(platC);
        })
        //console.log('platsCalentsBruna -->', platsCalentsToPrint)
        let platsCalentsBruna = new TicketCalentBruna(platsCalentsToPrint, this.printerBruna);
        //console.log(platsCalentsMito);
    }

    getComandaSala(begudes){
        let begudesToPrint = [];
        begudes.forEach((beg)=>{
            if(this.BRUNA_SKU_BEGUDES.includes(beg.sku)) begudesToPrint.push(beg);
        })
        console.log('begudes bruna-->', begudesToPrint)
        //let platsFredsBruna = new TicketFredBruna(platsFredsToPrint, this.printerBruna);
        //console.log(platsFredsBruna);
    }

}

module.exports = TicketCompraBruna;
