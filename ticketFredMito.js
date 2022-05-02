const Printer = require('printer');

class TicketFredMito {

    printerFredMito;
    platsFredsMito = [];
    mitoFredTitol = 'FREDS';
    
    constructor(platsFreds,printer){
        this.printerFredMito = printer;
        this.printerFredMito.clear();
       if(platsFreds.length > 0) this.executeFredsMito(platsFreds);
    }

    executePrint(){

        let epsonPrinter = Printer.getPrinter('EPSON_TM-m30II-H');
        console.log('********************** EPSON_TM-m30II-H Printer for Mito Process **********************');
        //console.log(epsonPrinter);

        try{

            Printer.printDirect({
                data: this.printerFredMito.getBuffer(),
                printer: 'EPSON_TM-m30II-H',
                type: 'RAW',
                success: function (jobID) {
                    console.log(`printer job MITO Fred: ${jobID}`);
                    //console.log('***** EPSON PRINTER ************');
                    //console.log(epsonPrinter)
                    //this.printer.clear();
                    // callback(jobID)
                },
                error: function (err) {
                    console.log(err);
                }
            })

        } catch(printErrorException) {

        }

    }

    executeFredsMito(plats){
        console.log('**************** MITO TICKET FREDS ****************');
        console.log(plats);
        console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
        this.printerFredMito.newLine();
        this.printerFredMito.alignCenter();
        this.printerFredMito.setTextSize(1,1);
        this.printerFredMito.bold(true);
        this.printerFredMito.invert(true);
        this.printerFredMito.println(this.mitoFredTitol);
        this.printerFredMito.invert(false);
        // this.printerFredMito.print
        this.printerFredMito.newLine();
        this.printerFredMito.setTextSize(1,1);
        this.printerFredMito.println('--------------------------------');
        this.printerFredMito.bold(false);
        if(plats.length > 0){
            let filaArray = [];
            let tableObj = {
                text : '',
                align : '',
                width : ''
            }

            tableObj.text = 'QTY';
            tableObj.align = 'LEFT';
            tableObj.width = '0.1';

            filaArray.push(tableObj);

            tableObj = {};
            tableObj.text = 'ID';
            tableObj.align = 'LEFT';
            tableObj.width = '0.2';

            filaArray.push(tableObj);

            tableObj = {};
            tableObj.text = 'DESC';
            tableObj.align = 'LEFT';
            tableObj.width = '0.6';

            filaArray.push(tableObj);

            this.printerFredMito.tableCustom(filaArray);

            let filasArray = [];
            let _that = this;

            plats.forEach(function(item){
                console.log('order item',item);
                filaArray = [];
                tableObj = {};

                tableObj.text = item.quantity.toString();
                tableObj.align = 'LEFT';
                tableObj.width = '0.1';
                filaArray.push(tableObj);

                tableObj = {};
                tableObj.text = item.sku;
                tableObj.align = 'LEFT';
                tableObj.width = '0.2';

                filaArray.push(tableObj);

                tableObj = {};
                tableObj.text = item.name;
                tableObj.align = 'LEFT';
                tableObj.width = '0.6';

                filaArray.push(tableObj);

                //console.log(' filaArray to push ', filaArray)
                _that.printerFredMito.tableCustom(filaArray); 

            })  

            this.printerFredMito.newLine();
            this.printerFredMito.println('--------------------------------');
            this.printerFredMito.newLine();
            this.printerFredMito.cut();
        
            this.executePrint();
        }
    }

}

module.exports = TicketFredMito;