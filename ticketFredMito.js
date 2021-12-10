const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

class TicketFredMito {

    printer;
    platsFreds = [];

    constructor(platsFreds){
        this.constructThermalPrinter();
       if(platsFreds.length > 0) this.executeFredsMito(platsFreds);
    }

    constructThermalPrinter(){

        this.printer = new ThermalPrinter({
            type : PrinterTypes.EPSON,
            interface : 'tcp://',
        });

    }

    executeFredsMito(plats){
        console.log('**************** MITO TICKET FREDS ****************');
        console.log(JSON.parse(plats));
        console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
    }

}
