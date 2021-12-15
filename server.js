const express = require('express');
const NewOrder = require('./newOrder');
//const { WooCommerceStatus } = require('./src/app/model/woocommerceOrder');
const app = express();

app.get('/',(req , res) => {
    res.send('Entering Grup Groman World Express!');
})

app.listen(8085, () => {

    console.log('app server listen on port 8085!');
    var WooComerceAPI = require('woocommerce-api');
    const cron = require('node-cron');

    const ThermalPrinter = require("node-thermal-printer").printer;
    const PrinterTypes = require("node-thermal-printer").types;
    //console.log('ThermalPrinter :', ThermalPrinter);
    //console.log('PrinterTypes :',PrinterTypes);

    var WooCommerce = new WooComerceAPI({
        url : 'https://www.grupgorman.es/',
        consumerKey : 'ck_7de1ccdc07994b46f8229ff38d6827463275ffde',
        consumerSecret : 'cs_0f640b36b58bd9d7698329405be23665e739ed9f',
        wpAPI : true,
        version : 'wc/v1',
        verifySsl : false,
        queryStringAuth : true,
        encoding : 'utf-8'
    })

    cron.schedule('*/2 * * * *',function(cron){
        console.log('running a task each 2 minutes!!!');
        let pendingOrders = [];
        let processingOrdersToProcess = [];
        let processingOrders = [];
        let onHoldOrders = [];
        let completedOrders = [];
        let completedOrdersToProcess = [];
        let cancelledOrders = [];
        let refundedOrders = [];
        let trashOrders = [];
        let failedOrders = [];

        WooCommerce.getAsync('orders').then(function(result) {
            
            const orders = JSON.parse(result.toJSON().body);
            orders.forEach((orderItem,i)=>{
                //let newWooCommerceOrder = new WooCommerceOrder()
                console.log(orderItem);
                let orderInfoObj = {
                    identificadorComanda : orderItem.id,
                    estatComanda: orderItem.status,
                    dataComanda: orderItem.date_created,
                    nom: `${orderItem?.billing?.first_name} ${orderItem?.billing?.last_name}`,
                    adrecaEntrega: `${orderItem?.shipping?.address_1} ${orderItem?.shipping?.address_2} ,${orderItem?.shipping?.city}, ${orderItem?.shipping?.state}, ${orderItem?.shipping.postcode}, ${orderItem.shipping.country}`,
                    preu : orderItem?.total,
                    numeroComandes : orderItem?.line_items?.length
                };

                switch(orderInfoObj.estatComanda){
                    case 'pending' /*WooCommerceStatus.Pending */: 
                        pendingOrders.push(orderInfoObj);
                        break;

                    case 'processing' : // WooCommerceStatus.Processing : 
                        processingOrders.push(orderInfoObj);
                        processingOrdersToProcess.push(orderItem);
                        break;

                    case 'on-hold' : //WooCommerceStatus.OnHold : 
                        onHoldOrders.push(orderInfoObj);
                        break;

                    case 'completed' : //WooCommerceStatus.Completed : 
                        completedOrders.push(orderInfoObj);
                        completedOrdersToProcess.push(orderItem);
                        break;

                    case 'cancelled': // WooCommerceStatus.Cancelled : 
                        cancelledOrders.push(orderInfoObj);
                        break;

                    case 'refunded' : //WooCommerceStatus.Refunded : 
                        refundedOrders.push(orderInfoObj);
                        break;
                    
                    case 'failed' : //WooCommerceStatus.Failed : 
                        failedOrders.push(orderInfoObj);
                        break;

                    case 'trash' : //WooCommerceStatus.Trash : 
                        trashOrders.push(orderInfoObj);
                        break;

                    default:
                        break;
                }
                
            });

            console.log('*********** PENDING ORDERS **********');
            console.table(pendingOrders);
            console.log('*************************************');
            console.log('*********** PROCESSING ORDERS **********');
            console.table(processingOrders);
            console.log('*************************************');
            console.log('*********** ON-HOLD ORDERS **********');
            console.table(onHoldOrders);
            console.log('*************************************');
            console.log('*********** COMPLETE ORDERS **********');
            console.table(completedOrders);
            console.log('*************************************');
            console.log('*********** CANCELLED ORDERS **********');
            console.table(cancelledOrders);
            console.log('*************************************');
            console.log('*********** REFUNDED ORDERS **********');
            console.table(refundedOrders);
            console.log('*************************************');
            console.log('*********** FAILED ORDERS **********');
            console.table(failedOrders);
            console.log('*************************************');
            console.log('*********** TRASH ORDERS **********');
            console.table(trashOrders);
            console.log('*************************************');
            if(processingOrdersToProcess.length > 0){
                processingOrdersToProcess.forEach((printOrder,k) => {
                    console.log('ORDER TO PRINT ------------- ',k);
                    printOrder.line_items.forEach(function(lineItem){
                        console.table(lineItem)
                        lineItem.meta.forEach(function(metaObj){
                            console.table(metaObj)
                        })
                    })
                    new NewOrder(printOrder);
                })
            } else {
                new NewOrder({});
            }

          });

    })
    
})