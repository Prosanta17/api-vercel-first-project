import { useState, useEffect } from "react";
import axios from "axios";

const CustomReactQuery = (urlpath) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(urlpath);
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    })();
  }, []);

  return [products, error, loading];
};

export default CustomReactQuery;
