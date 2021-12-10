'use strict';

const { TicketCompraBruna } = require("./ticketCompraBruna");
const { TicketCompraMito } = require("./ticketCompraMito");

class NewOrder {

    mitoOrder;
    brunaOrder;

    mitoSKUs = [];
    brunaSKUs = [];

    MITO_SKU_LIST = [

    ]

    BRUNA_SKU_LIST = [
        
    ]

    constructor(newOrder){
        if(newOrder){
            this.generateTicketsForMitoAndBruna(newOrder);
        } else {
            this.generateFakeTickets();
        }
    }

    generateTicketsForMitoAndBruna(order){
        let mitoOrder = this.filterValuesFromLocation(order.line_items,this.MITO_SKU_LIST);
        let brunaOrder = this.filterValuesFromLocation(order.line_items,this.BRUNA_SKU_LIST);
        let mitoPrintProcess = new TicketCompraMito(mitoOrder);
        let brunaPrintProcess = new TicketCompraBruna(brunaOrder);
        console.log('MITO PRINT PROCESS :',mitoPrintProcess);
        console.log('BRUNA PRINT PROCESS :',brunaPrintProcess);
    }

    generateFakeTickets(){

    }

    filterValuesFromLocation(order,skuFrom){
        let filteredArray = [];// generate a reduce from list
        //order?.line_items.forEach((orderItem) => {

        //})
    }
}

//exports = { NewOrder }