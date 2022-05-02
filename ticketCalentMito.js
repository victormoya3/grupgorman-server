const Printer = require('printer');

class TicketCalentMito {

    printerCalentsMito;
    platsCalentsMito = [];

    mitoCalentsTitol = 'CALENTS'
    constructor(platsCalents,printer){
        this.printerCalentsMito = printer;
        this.printerCalentsMito.clear();
       if(platsCalents.length > 0) this.executeCalentsMito(platsCalents);
    }

    executePrint(){

        let epsonPrinter = Printer.getPrinter('EPSON_TM-m30II-H');
        console.log('********************** EPSON_TM-m30II-H Printer for Mito Process **********************');
        //console.log(epsonPrinter);

        try{

            Printer.printDirect({
                data: this.printerCalentsMito.getBuffer(),
                printer: 'EPSON_TM-m30II-H',
                type: 'RAW',
                success: function (jobID) {
                    console.log(`printer job MITO Calents: ${jobID}`);
                    //console.log('***** EPSON PRINTER ************');
                    //console.log(epsonPrinter)
                    // callback(jobID)
                },
                error: function (err) {
                    console.log(err);
                }
            })

        } catch(printErrorException) {

        }

    }

    executeCalentsMito(plats){
        console.log('**************** MITO TICKET CALENTS ****************');
        console.log(plats);
        console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
        this.printerCalentsMito.newLine();
        this.printerCalentsMito.alignCenter();
        this.printerCalentsMito.setTextSize(1,1);
        this.printerCalentsMito.bold(true);
        this.printerCalentsMito.invert(true);
        this.printerCalentsMito.println(this.mitoCalentsTitol);
        this.printerCalentsMito.invert(false);
        // this.printerCalentsMito.print
        this.printerCalentsMito.newLine();
        this.printerCalentsMito.setTextSize(1,1);
        this.printerCalentsMito.println('--------------------------------');
        this.printerCalentsMito.bold(false);
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

            this.printerCalentsMito.tableCustom(filaArray);

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
                _that.printerCalentsMito.tableCustom(filaArray); 

            })  

            this.printerCalentsMito.newLine();
            this.printerCalentsMito.println('--------------------------------');
            this.printerCalentsMito.newLine();
            this.printerCalentsMito.cut();
        
            this.executePrint();
        }
    }

}

module.exports = TicketCalentMito;
