const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const { TicketCalentBruna } = require("./ticketCalentBruna");
const TicketFredBruna = require("./ticketFredBruna");

class TicketCompraBruna {

    printer;
    BRUNA_SKU_FRED = [];
    BRUNA_SKU_CALENT = [];

    constructor(order){
        this.constructThermalPrinter();
       if(order.length > 0) this.executeCompraBruna(order);
       else this.executeTestCompraBruna();
    }

    constructThermalPrinter(){

        this.printer = new ThermalPrinter({
            type : PrinterTypes.EPSON,
            interface : 'tcp://',
        });

    }

    executeTestCompraBruna(){

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
