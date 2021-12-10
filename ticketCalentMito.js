class TicketCalentMito {

    printerCalentsMito;
    platsCalents = [];

    constructor(platsCalents,printer){
        this.printerCalentsMito = printer;
       if(platsCalents.length > 0) this.executeCalentsMito(platsCalents);
    }

    executeCalentsMito(plats){
        console.log('**************** MITO TICKET CALENTS ****************');
        console.log(JSON.parse(plats));
        console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
    }

}

module.exports = TicketCalentMito;
