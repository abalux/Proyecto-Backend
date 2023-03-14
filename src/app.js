import express from "express";
import { manager } from './productManager.js';


const app = express();
//app.use(express.static("public"));

const productsRouter = express.Router();
const cartsRouter = express.Router();

//Router.use(express.json());
Router.use(express.urlencoded({extended:true}));

//creo las rutas
app.use('/api/products/', productsRouter);
app.use('/api/carts/', cartsRouter);

//Configuro el servidor
const PORT = 8081;
const server = app.listen(PORT, () => {
    console.log('Servidor ejecutándose en el puerto: ', PORT);
})
server.on('error', error => console.log('Error en el servidor: ', PORT));

//Configuro las rutas
productsRouter.get('', async (req, res) => {
    const { limit } = req.query;
    const products = await manager.getProducts();
    res.send(products.slice(0, limit || products.length));
})

productsRouter.get(':pid', async(req,res) => {
    const pid = req.params['pid'];
    console.log(pid);
    const idFound = await manager.getProductById(pid)
    res.send(idFound);
    if (!idFound){
        res.send("No existe tal producto");
    }
})

productsRouter.post('guardar', async (req, res) => {
    let product = req.body;
    await manager.addProduct(product);
    res.send(product);
})

productsRouter.put('actualizar/:id', async(req, res) =>{
    let {id} = req.params;
    let product = req.body;
    await manager.updateProduct(product, id);
    res.json(product);
})

productsRouter.delete('borrar/:id', async(req, res) => {
    let {id} = req.params;
    let product = await manager.deleteProduct(id) 
    res.json(product);
})