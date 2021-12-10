const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const { TicketCalentMito } = require("./ticketCalentMito");
const TicketFredMito = require("./ticketFredMito");

class TicketCompraMito {

    printer;
    MITO_SKU_FRED = [];
    MITO_SKU_CALENT = [];

    constructor(order){
        this.constructThermalPrinter();
       if(order.length > 0) this.executeCompraMito(order);
       else this.executeTestCompraMito();
    }

    constructThermalPrinter(){

        this.printer = new ThermalPrinter({
            type : PrinterTypes.EPSON,
            interface : 'tcp://',
        });

    }

    executeTestCompraMito(){

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
