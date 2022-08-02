const Printer = require('printer');

class TicketCalentBruna {

    printerCalentsBruna;
    platsCalentsBruna = [];

    brunaCalentsTitol = 'CALENTS'
    constructor(platsCalents,printer){
        this.printerCalentsBruna = printer;
        this.printerCalentsBruna.clear();
       if(platsCalents.length > 0) this.executeCalentsBruna(platsCalents);
    }

    executePrint(){

        let epsonPrinter = Printer.getPrinter('EPSON_TM-m30II-H');
        console.log('********************** EPSON_TM-m30II-H Printer for Bruna Process **********************');
        //console.log(epsonPrinter);

        try{

            Printer.printDirect({
                data: this.printerCalentsBruna.getBuffer(),
                printer: 'EPSON_TM-m30II-H',
                type: 'RAW',
                success: function (jobID) {
                    console.log(`printer job BRUNA Calents: ${jobID}`);
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

    executeCalentsBruna(plats){
        console.log('**************** BRUNA TICKET CALENTS ****************');
        // console.log(plats);
        // console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
        // CALENTS TITOL

        this.printerCalentsBruna.newLine();
        this.printerCalentsBruna.alignCenter();
        this.printerCalentsBruna.setTextSize(1,1);
        this.printerCalentsBruna.bold(true);
        this.printerCalentsBruna.invert(true);
        this.printerCalentsBruna.println(this.brunaCalentsTitol);
        this.printerCalentsBruna.invert(false);
        // this.printerCalentsBruna.print
        this.printerCalentsBruna.newLine();
        this.printerCalentsBruna.setTextSize(1,1);
        this.printerCalentsBruna.println('--------------------------------');
        this.printerCalentsBruna.bold(false);
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

            this.printerCalentsBruna.tableCustom(filaArray);

            let filasArray = [];
            let _that = this;

            plats.forEach(function(item){
                // console.log('order item',item);
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
                _that.printerCalentsBruna.tableCustom(filaArray); 

            })  

            this.printerCalentsBruna.newLine();
            this.printerCalentsBruna.println('--------------------------------');
            this.printerCalentsBruna.newLine();
            this.printerCalentsBruna.cut();
        
            this.executePrint();
        }
    }

}

module.exports = TicketCalentBruna;