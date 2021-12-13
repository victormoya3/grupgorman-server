const TicketCalentMito = require("./ticketCalentMito");
const TicketFredMito = require("./ticketFredMito");

class TicketCompraMito {

    printerMito;
    MITO_SKU_FRED = [];
    MITO_SKU_CALENT = [];

    constructor(order,printer){
        this.printerMito = printer;
       if(order != undefined && order.length > 0) this.executeCompraMito(order);
       else this.executeTestCompraMito();
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

    executeCompraMito(newOrder){
        console.log('**************** MITO TICKET NOVA COMPRA ****************');
        console.log(JSON.parse(newOrder));
        console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
        this.getComandaCalents(newOrder);
        this.getComandaFreds(newOrder)
    }

    getComandaCalents(platsCalents) {
        let platsCalentsToPrint = [];
        platsCalents.forEach((platC)=>{
            if(this.MITO_SKU_CALENT.includes(platC.sku)) platsCalentsToPrint.push(platC);
        })

        let platsCalentsMito = new TicketCalentMito(platsCalentsToPrint);
        console.log(platsCalentsMito);
    }

    getComandaFreds(platsFreds){
        let platsFredsToPrint = [];
        platsFreds.forEach((platF)=>{
            if(this.MITO_SKU_FRED.includes(platF.sku)) platsFredsToPrint.push(platF);
        })

        let platsFredsMito = new TicketFredMito(platsFredsToPrint);
        console.log(platsFredsMito);
    }
}

module.exports = TicketCompraMito;