const TicketCalentBruna = require("./ticketCalentBruna");
const TicketFredBruna = require("./ticketFredBruna");

class TicketCompraBruna {

    printerBruna;
    BRUNA_SKU_FRED = [];
    BRUNA_SKU_CALENT = [];

    constructor(order,printer){
        this.printerBruna = printer;
        //this.constructThermalPrinter();
       if(order != undefined && order.length > 0) this.executeCompraBruna(order);
       else this.executeTestCompraBruna();
    }

    

    async executeTestCompraBruna(){
        try {
            let printingTest = await this.printerBruna.print('***** GrupGorman BRUNA COMPRA TICKET ********');
            console.log('********************** EXECUTING PRINT PROCESS ******************');
            console.log(printingTest);
            console.log('******************************************************************');
        } catch(printError){
            throw new Error('[EPSON Print] Error printing Bruna process: ', printError);
        }
    }

    executeCompraBruna(newOrder){
        console.log('**************** BRUNA TICKET NOVA COMPRA ****************');
        console.log(JSON.parse(newOrder));
        console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
        this.getComandaCalents(newOrder);
        this.getComandaFreds(newOrder)
    }

    getComandaCalents(platsCalents) {
        let platsCalentsToPrint = [];
        platsCalents.forEach((platC)=>{
            if(this.BRUNA_SKU_CALENT.includes(platC.sku)) platsCalentsToPrint.push(platC);
        })

        let platsCalentsMito = new TicketCalentBruna(platsCalentsToPrint);
        console.log(platsCalentsMito);
    }

    getComandaFreds(platsFreds){
        let platsFredsToPrint = [];
        platsFreds.forEach((platF)=>{
            if(this.BRUNA_SKU_FRED.includes(platF.sku)) platsFredsToPrint.push(platF);
        })

        let platsFredsMito = new TicketFredBruna(platsFredsToPrint);
        console.log(platsFredsMito);
    }
}

module.exports = TicketCompraBruna;
