import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://api-vercel-first-project.vercel.app",
    ],
    credentials: true,
  })
);

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "Shirt",
      price: 10.99,
    },
    {
      id: 2,
      name: "Pant",
      price: 19.99,
    },
    {
      id: 3,
      name: "Trouser",
      price: 15.99,
    },
  ];
  //http://localhost:3000/api/products?search=shirt

  const search = req.query.search;

  if (search) {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    res.send(filteredProducts);
    return;
  }

  setTimeout(() => {
    res.send(products);
  }, 3000);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
