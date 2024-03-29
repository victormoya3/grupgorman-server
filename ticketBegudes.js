const Printer = require('printer');

class TicketBegudes {

    printerBegudes;
    begudes_GG = [];

    begudesTitol = 'BEGUDES';

    constructor(begudes,printer){
        this.printerBegudes = printer;
        this.printerBegudes.clear();
       if(begudes.length > 0) this.executeBegudes(begudes);
    }

    executePrint(){

        let epsonPrinter = Printer.getPrinter('EPSON_TM-m30II-H');
        console.log('********************** EPSON_TM-m30II-H Printer for Begudes Process **********************');
        //console.log(epsonPrinter);

        try{

            Printer.printDirect({
                data: this.printerBegudes.getBuffer(),
                printer: 'EPSON_TM-m30II-H',
                type: 'RAW',
                success: function (jobID) {
                    console.log(`printer job Begudes: ${jobID}`);
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

    executeBegudes(begudes){
        console.log('**************** BEGUDES TICKET ****************');
        // console.log(plats);
        // console.log('***********************************************************')
        // Generar ticket de compra i cridar funcions per a filtrat de la comanda i generacio dels tickets de cuina
        this.printerBegudes.newLine();
        this.printerBegudes.alignCenter();
        // this.printerBegudes.setTextSize(1,1);
        this.printerBegudes.bold(true);
        this.printerBegudes.invert(true);
        this.printerBegudes.setTextDoubleHeight();
        this.printerBegudes.setTextDoubleWidth();
        this.printerBegudes.println(this.begudesTitol);
        this.printerBegudes.invert(false);
        // this.printerBegudes.print
        this.printerBegudes.newLine();
        // this.printerBegudes.setTextSize(1,1);
        this.printerBegudes.setTextNormal();
        this.printerBegudes.drawLine();
        this.printerBegudes.bold(false);
        if(begudes.length > 0){
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

            this.printerBegudes.tableCustom(filaArray);

            this.printerBegudes.drawLine();

            let filasArray = [];
            let _that = this;

            begudes.forEach(function(item){
                // console.log('beguda: ',item);
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
                _that.printerBegudes.tableCustom(filaArray); 

            })  

            this.printerBegudes.newLine();
            this.printerBegudes.drawLine();
            this.printerBegudes.newLine();
            this.printerBegudes.cut();
        
            this.executePrint();
        }
    }

}

module.exports = TicketBegudes;