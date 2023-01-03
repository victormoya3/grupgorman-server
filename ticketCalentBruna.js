const Printer = require('printer');

class TicketCalentBruna {

    printerCalentsBruna;
    platsCalentsBruna = [];

    brunaCalentsTitol = 'CALENTS - BRUNA';
    venta = 'Venta - Comanda';

    grupGormanOrder;
    recollidaTipus;
    horaRecollida;

    constructor(platsCalents,printer, order, recollidaTipus, horaRecollida){
        this.printerCalentsBruna = printer;
        this.printerCalentsBruna.clear();
        this.grupGormanOrder = order;
        this.recollidaTipus = recollidaTipus;
        this.horaRecollida = horaRecollida;
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
        this.printerCalentsBruna.bold(true);
        this.printerCalentsBruna.invert(true);
        this.printerCalentsBruna.newLine();

        this.printerCalentsBruna.println(this.brunaCalentsTitol);
        this.printerCalentsBruna.newLine();

        this.printerCalentsBruna.invert(false);
        // this.printerCalentsBruna.print
        // this.printerCalentsBruna.setTextSize(1,1);
        this.printerCalentsBruna.newLine();
        this.printerCalentsBruna.bold(false);
        this.printerMito.leftRight(this.venta,this.grupGormanOrder.date_created);
        // AFEGIR META DATA PURCHASE INFO
        // horaRecollida, recollidaTipus, alergensClient
        this.printerMito.leftRight(this.recollidaTipus,this.horaRecollida);
        this.printerCalentsBruna.drawLine();
        
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

            this.printerCalentsBruna.drawLine();

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

                if (item.meta_data.length > 0){

                    let subTableObj = {
                        text : '',
                        align : '',
                        width : ''
                    };

                    let subFilaArray = [];

                    item.meta_data.forEach(function(metaData){
                        // console.log('order metaData',metaData);
                        if (metaData.key.indexOf('_') >= 0) { return; }
                        // aplicar
                        subFilaArray = [];
                        subTableObj = {};
        
                        subTableObj.text = '';
                        subTableObj.align = 'LEFT';
                        subTableObj.width = '0.2';

                        // subTableObj.width = '0.1';
                        subFilaArray.push(subTableObj);

                        subTableObj = {};

                        subTableObj.text = '-';
                        subTableObj.align = 'LEFT';
                        subTableObj.width = '0.4';

                        subFilaArray.push(subTableObj);

                        subTableObj = {};

                        subTableObj.text = metaData.value.toString();
                        subTableObj.align = 'LEFT';
                        subTableObj.width = '0.3';

                        subFilaArray.push(subTableObj);
        
                        //console.log(' filaArray to push ', filaArray)
        
                        _that.printerCalentsBruna.tableCustom(subFilaArray);
        
                    }) 
                }

            })  

            this.printerCalentsBruna.newLine();
            this.printerCalentsBruna.drawLine();
            this.printerCalentsBruna.newLine();
            this.printerCalentsBruna.cut();
        
            this.executePrint();
        }
    }

}

module.exports = TicketCalentBruna;