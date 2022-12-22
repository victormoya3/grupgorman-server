const TicketCalentBruna = require("./ticketCalentBruna");
const TicketFredBruna = require("./ticketFredBruna");
const Printer = require('printer');

class TicketCompraBruna {

    printerBruna;
    brunaOrderItems;
    BRUNA_SKU_BEGUDES = [
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
    ];
    
    BRUNA_SKU_CALENT = [
        'BBAO1', // All i Oli
        'BBBF1', // bomba Formatge
        'BBBR1', // De Brie
        'BBCA1', // Cangreburger
        'BBCB1', // Cabra Boja
        'BBDB1', // Doble Bruna
        'BBDF1', // De Foie
        // 'BBDP1', // De Pebrots
        'BBY1', // De la Yaya
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
        // 'BTM01', // Teque Mozzarella
        'BTS01', // Teque Sobrasada
        'BAC01', // Amanida Cesar
        'BAL01', // Amanida Lionesa
        'BENV1', // Nachos Veggie
        'BPSX1', // Sopa xocolata Blanca
        'BPTI1', // Tiramisu
        'BTF01', // Teque Frankfurt
        'BTG01', // Teque Gouda
    ];

    businessName = 'La Bruna Grill';
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
    alergensClient = 'Alergens: ';

    footerBusinessInfo = 'Gorman Restauració S.L.U';
    footerCIFNIF = 'CIF/NIF:';
    footerSerialFactura = 'Serie de Factura:';
    footerNumeroFactura = 'Numero de Factura:';

    constructor(order,orderItems,printer){
        console.log('**** BRUNA PRINTING CLASS ********');
        //console.log('***** PARAM : order --> ', order);
        //console.log('***** PARAM : orderItems --> ', orderItems);
        //console.log('***** PARAM : printer --> ', printer);
        this.setUpTicketVariables(order);
        this.printerBruna = printer;
        this.printerBruna.clear();
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
        // get key: alergenos_cliente value: X
        this.alergensClient += order.meta_data.filter((metaData) => metaData.key === 'alergenos_cliente')[0].value;
    }

    generateRawTicket(orderObj){
        console.log('GENERATING TICKET FOR ORDER :',orderObj.id);

        let brunaTotalPreu = 0;
        // TICKET HEADER
        this.printerBruna.newLine();
        //this.printerBruna.printImage();
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
        // this.printerBruna.setTextSize(1,1);
        this.printerBruna.bold(true);
        this.printerBruna.println(this.businessName);
        this.printerBruna.bold(false);
        this.printerBruna.newLine();
        this.printerBruna.alignCenter();
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
        this.printerBruna.newLine();
        this.printerBruna.alignLeft();
        const adrecaOrder = `${orderObj?.billing?.address_1}, ${orderObj?.billing?.address_2}`
        this.printerBruna.println(adrecaOrder);
        const adrecaOrder2 = `${orderObj?.billing?.postcode}, ${orderObj?.billing?.city}`;
        const adrecaOrder3 = `${orderObj?.billing?.state}, ${orderObj?.billing?.country}`
        this.printerBruna.leftRight(adrecaOrder2, adrecaOrder3);
        this.printerBruna.newLine();
        this.printerBruna.println(this.sector);
        this.printerBruna.newLine();
        this.printerBruna.alignLeft();
        this.printerBruna.println('Contacte: ' + orderObj?.billing?.phone);
        // TICKET PURCHASE INFO
        this.printerBruna.newLine();
        this.printerBruna.println(this.purchaseType + orderObj.id);
        this.printerBruna.newLine();
        this.printerBruna.println(this.usuari);
        this.printerBruna.newLine();
        this.printerBruna.leftRight(this.taula + orderObj.id,this.comensals);
        this.printerBruna.leftRight(this.venta,orderObj.date_created);
        // AFEGIR META DATA PURCHASE INFO
        // horaRecollida, recollidaTipus, alergensClient
        this.printerBruna.leftRight(this.recollidaTipus,this.horaRecollida);
        this.printerBruna.println(this.alergensClient);
        // TICKET ORDER ITEMS TABLE INFO
        this.printerBruna.newLine();
        this.printerBruna.drawLine();
        if(this.brunaOrderItems.length > 0){
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

            this.printerBruna.tableCustom(filaArray);

            this.printerBruna.drawLine();

            let filasArray = [];
            let _that = this;

            this.brunaOrderItems.forEach(function(item){
                // console.log('order item',item);

                brunaTotalPreu += item.total;

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
                tableObj.width = '0.5';

                filaArray.push(tableObj);

                tableObj = {};
                tableObj.text = item.total;
                tableObj.align = 'RIGHT';
                tableObj.width = '0.2';

                filaArray.push(tableObj);
                //console.log(' filaArray to push ', filaArray)
                _that.printerBruna.tableCustom(filaArray); 

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
                        _that.printerBruna.tableCustom(subFilaArray);
        
                    }) 
                }

            })
            
        }

        this.printerBruna.newLine();
        this.printerBruna.drawLine();
        this.printerBruna.bold(true);
        // this.printerBruna.setTextSize(2,2);
        this.printerBruna.leftRight('TOTAL CON IVA', brunaTotalPreu);
        // this.executePrint();
        // this.printerBruna.clear();
        this.printerBruna.bold(false);
        // this.printerBruna.setTextSize(1,1);
        // TICKET FOOTER INFO
        this.printerBruna.newLine();
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

}

module.exports = TicketCompraBruna;
