class TicketFredMito {

    printerFredMito;
    platsFreds = [];

    constructor(platsFreds,printer){
        this.printerFredMito = printer;
       if(platsFreds.length > 0) this.executeFredsMito(platsFreds);
    }

    executeFredsMito(plats){
        console.log('**************** MITO TICKET FREDS ****************');
        console.log(plats);
        console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
    }

}

module.exports = TicketFredMito;