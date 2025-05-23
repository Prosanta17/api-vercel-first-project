import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
// import CustomReactQuery from "./hooks/CustomReactQuery";

function App() {
  // const [products, error, loading] = CustomReactQuery("/api/products");

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const delayDebounce = setTimeout(() => {
      (async () => {
        try {
          setLoading(true);
          setError(false);
          const response = await axios.get(
            "https://api-vercel-first-project.onrender.com/api/products?search=" +
              search,
            {
              signal: controller.signal,
            }
          );
          console.log(response.data);
          setProducts(response.data);
          setLoading(false);
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log(" st cancelled", error.message);
            return;
          }
          console.log(error);
          setError(true);
          setLoading(false);
        }
      })();
    }, 500);

    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [search]);

  // if (error) {
  //   return <h1>Something went wrong</h1>;
  // }

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

  const handleProductDisplay = () => {
    setShowProducts(!showProducts);
  };

  return (
    <>
      <h1>Hello world</h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <br />
      <button onClick={handleProductDisplay}>
        {showProducts ? "Show Products" : "Hide Products"}
      </button>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Something went wrong</h1>}
      <h2>Number of Products are: {products.length}</h2>
      {showProducts && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
