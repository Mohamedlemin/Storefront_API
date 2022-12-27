import express from 'express';

import bodyParser from 'body-parser';
import product_route from './handlers/product_handler'
import user_route from './handlers/user_handler'
import order_route from './handlers/orders_handler'
import cors from 'cors';

const app: express.Application = express();
const port = 3000;


app.use(bodyParser.json())
app.use('/dev',product_route);
app.use('/dev',user_route);
app.use('/dev',order_route);



app.listen(port,()=>{
    console.log(`server started on localhost ${port}`);
});

export default app