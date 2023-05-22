const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');
const fs = require('fs');

app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/authRoute");
const cartRoutes = require("./routes/cartRoute");
const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRoute");

app.get('/images/:name',(req,res)=>{
    const image_name = req.params.name;
    
    fs.readFile(`./images/${image_name}`, function(err, data) {
        if (err) throw err;
          res.writeHead(200, {'Content-Type': 'image/jpeg'});
          res.end(data); 
      });
});

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/product", productRoutes);
app.use("/user", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));