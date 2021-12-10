const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

class TicketFredBruna {

    printer;
    platsFreds = [];

    constructor(platsFreds){
        this.constructThermalPrinter();
       if(platsFreds.length > 0) this.executeFredsBruna(platsFreds);
    }

    constructThermalPrinter(){

        this.printer = new ThermalPrinter({
            type : PrinterTypes.EPSON,
            interface : 'tcp://',
        });

    }

    executeFredsBruna(plats){
        console.log('**************** BRUNA TICKET FREDS ****************');
        console.log(JSON.parse(plats));
        console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
    }

}
