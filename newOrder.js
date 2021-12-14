'use strict';

const TicketCompraBruna = require("./ticketCompraBruna");
const TicketCompraMito = require("./ticketCompraMito");
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const Printer = require('printer');

class NewOrder {

    printer;
    mitoOrder;
    brunaOrder;

    mitoSKUs = [];
    brunaSKUs = [];

    MITO_SKU_LIST = [

    ]

    BRUNA_SKU_LIST = [
        
    ]
    
    constructor(newOrder){
        this.constructThermalPrinter();
        setTimeout(() => {

            if(newOrder!={}){
                this.generateTicketsForMitoAndBruna(newOrder);
            } else {
                this.generateFakeTickets();
            }

        },4000)

    }

    async constructThermalPrinter(){

        this.printer = new ThermalPrinter({
            type : PrinterTypes.EPSON,
            interface : 'usb://EPSON/TM-m30II-H?serial=583834520001450000',
            characterSet : 'PC850_MULTILINGUAL',
            removeSpecialCharacters : false
        });

        try {
            let isEpsonConnected = await this.printer.isPrinterConnected();
            console.log('********** EPSON STATUS CONNECTED :',isEpsonConnected,' **************');
            console.log(this.printer)
        } catch(connectedException){
            throw new Error('[EPSON Setup] Connection to printer fails!!');
        }
        
        let printers = Printer.getPrinters();
        console.log('********************** Printers **********************');
        console.table(printers);

    }

    generateTicketsForMitoAndBruna(order){
        this.mitoOrder = this.filterValuesFromLocation(order.line_items,this.MITO_SKU_LIST);
        this.brunaOrder = this.filterValuesFromLocation(order.line_items,this.BRUNA_SKU_LIST);
        let mitoPrintProcess = new TicketCompraMito(this.mitoOrder,this.printer);
        let brunaPrintProcess = new TicketCompraBruna(this.brunaOrder,this.printer);
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

module.exports = NewOrder;
//exports = { NewOrder }