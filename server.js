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
        version : 'wc/v3',
        verifySsl : false,
        queryStringAuth : true,
        encoding : 'utf-8'
    })

    // const aperturaTenda = cron.schedule('0 0 19 * * *', function(cronI) {
        console.log('--------- OBRINT TENDA VIRTUAL ------------');
        // A partir de les 19 cada 2 minuts demanem les comandes a WooCommerce
        const comandes = cron.schedule('*/2 * * * *',function(cronI){
            console.log('running a task each 2 minutes!!!');
            let pendingOrders = [];
            let processingOrdersToProcess = [];
            let processingOrders = [];
            let onHoldOrders = [];
            let completedOrders = [];
            let pendingOrdersToProcess = [];
            let cancelledOrders = [];
            let refundedOrders = [];
            let trashOrders = [];
            let failedOrders = [];
            
            // WooCommerce.get('orders').then((res) => {
            //     console.log('res sync orders:',JSON.parse(res));
            // })
            WooCommerce.getAsync('orders?status=processing,pending').then(function(result) {
                // console.log('ORDERS ',result.toJSON());
                // console.log('ORDERS ',result);
                const orders = JSON.parse(result.toJSON().body);
                orders.forEach((orderItem,i)=>{
                    //let newWooCommerceOrder = new WooCommerceOrder()
                    console.log('ORDER ',i, ' - STATUS :', orderItem.status);
                    // console.log(orderItem);
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
                            pendingOrdersToProcess.push(orderItem);
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

                const ordersToProcess = processingOrdersToProcess.concat(pendingOrdersToProcess);
    
                console.log('*********** PENDING ORDERS **********');
                console.log(pendingOrders.length);
                console.log('*************************************');
                console.log('*********** PROCESSING ORDERS **********');
                console.log(processingOrders.length);
                console.log('*************************************');
                console.log('*********** ORDERS **********');
                console.log(ordersToProcess.length);
                console.log('*************************************');
                if(ordersToProcess.length > 0){
                    ordersToProcess.forEach((printOrder,k) => {
                        console.log('ORDER TO PRINT ------------- ',printOrder.id);
                        // this.getOrder(printOrder);
                        if(k === 0){
                            console.log('ORDER JSON ------------- ',printOrder);
                            printOrder.line_items.forEach((producte) => {
                                // console.log('producte metaData: ', producte.meta_data);
                            })
                            new NewOrder(printOrder, WooCommerce);
                        }
                        // WooCommerce.getAsync('orders/' + printOrder.id).then((res) => {
                        //     // console.log('ORDER OBJ FROM WC API:', res.toJSON().body);
                        //     const order = JSON.parse(res.toJSON().body);
                        //     if (order === null) { return; }
                        //     // new NewOrder(order, WooCommerce);
                        //     order.meta_data.forEach((customField) => {
                        //         // console.log('CUSTOM FIELD ON ORDER :', customField);
                        //     });
                        // })
    
                        // WooCommerce.getAsync('orders/'+ printOrder.id + '/notes').then((res) => {
                        //     // console.log('ORDER NOTES OBJ FROM WC API:', JSON.parse(res.toJSON().body));
                        // })
                        
                    })
                }
    
            });
    
        })

        cron.schedule('0 30 22 * * *',function(cron){
            console.log('--------- TANCANT PETICIO COMANDES ------------');
            comandes.stop();
        })

    // });

    cron.schedule('0 30 22 * * *',function(cron){
        console.log('--------- TANCANT TENDA VIRTUAL ------------');
        aperturaTenda.stop();
    })
    
})