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

    constructor(order,orderItems,printer){
        console.log('**** BRUNA PRINTING CLASS ********');
        //console.log('***** PARAM : order --> ', order);
        //console.log('***** PARAM : orderItems --> ', orderItems);
        //console.log('***** PARAM : printer --> ', printer);
        this.printerBruna = printer;
        this.brunaOrderItems = orderItems;
        //this.constructThermalPrinter();
       if(order != undefined && orderItems.length > 0) this.executeCompraBruna(order);
       else this.executeTestCompraBruna();
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
        this.printerBruna.newLine();
        this.printerBruna.println('****** HELLO BRUNA !!! *********');
        this.printerBruna.newLine();

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
