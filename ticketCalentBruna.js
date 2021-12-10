class TicketCalentBruna {

    printerCalentsBruna;
    platsCalents = [];

    constructor(platsCalents,printer){
        this.printerCalentsBruna = printer;
       if(platsCalents.length > 0) this.executeCalentsBruna(platsCalents);
    }

    executeCalentsBruna(plats){
        console.log('**************** BRUNA TICKET CALENTS ****************');
        console.log(JSON.parse(plats));
        console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
    }

}

module.exports = TicketCalentBruna;