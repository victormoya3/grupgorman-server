const Printer = require('printer');

class TicketFredBruna {

    printerFredBruna;
    platsFredsBruna = [];

    brunaFredTitol = 'FREDS'
    constructor(platsFreds,printer){
        this.printerFredBruna = printer;
        this.printerFredBruna.clear();
       if(platsFreds.length > 0) this.executeFredsBruna(platsFreds);
    }

    executePrint(){

        let epsonPrinter = Printer.getPrinter('EPSON_TM-m30II-H');
        console.log('********************** EPSON_TM-m30II-H Printer for Bruna Process **********************');
        //console.log(epsonPrinter);

        try{

            Printer.printDirect({
                data: this.printerFredBruna.getBuffer(),
                printer: 'EPSON_TM-m30II-H',
                type: 'RAW',
                success: function (jobID) {
                    console.log(`printer job BRUNA Fred: ${jobID}`);
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

    executeFredsBruna(plats){
        console.log('**************** BRUNA TICKET FREDS ****************');
        console.log(plats);
        console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
        this.printerFredBruna.newLine();
        this.printerFredBruna.alignCenter();
        this.printerFredBruna.setTextSize(1,1);
        this.printerFredBruna.bold(true);
        this.printerFredBruna.invert(true);
        this.printerFredBruna.println(this.brunaFredTitol);
        this.printerFredBruna.invert(false);
        // this.printerFredBruna.print
        this.printerFredBruna.newLine();
        this.printerFredBruna.setTextSize(1,1);
        this.printerFredBruna.println('--------------------------------');
        this.printerFredBruna.bold(false);
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

            this.printerFredBruna.tableCustom(filaArray);

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
                _that.printerFredBruna.tableCustom(filaArray); 

            })  

            this.printerFredBruna.newLine();
            this.printerFredBruna.println('--------------------------------');
            this.printerFredBruna.newLine();
            this.printerFredBruna.cut();
        
            this.executePrint();
        }
    }

}

module.exports = TicketFredBruna;
