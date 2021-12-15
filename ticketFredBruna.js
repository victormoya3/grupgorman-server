class TicketFredBruna {

    printerFredBruna;
    platsFredsBruna = [];

    constructor(platsFreds,printer){
        this.printerFredBruna = printer;
       if(platsFreds.length > 0) this.executeFredsBruna(platsFreds);
    }

    executeFredsBruna(plats){
        console.log('**************** BRUNA TICKET FREDS ****************');
        console.log(plats);
        console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
    }

}

module.exports = TicketFredBruna;
