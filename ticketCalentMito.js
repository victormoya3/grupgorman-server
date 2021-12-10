const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

class TicketCalentMito {

    printer;
    platsCalents = [];

    constructor(platsCalents){
        this.constructThermalPrinter();
       if(platsCalents.length > 0) this.executeCalentsMito(platsCalents);
    }

    constructThermalPrinter(){

        this.printer = new ThermalPrinter({
            type : PrinterTypes.EPSON,
            interface : 'tcp://',
        });

    }

    executeCalentsMito(plats){
        console.log('**************** MITO TICKET CALENTS ****************');
        console.log(JSON.parse(plats));
        console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
    }

}
