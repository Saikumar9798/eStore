import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Products } from "./Products";
import { auth, fs } from "../Config/Config";
import GetCurrentUser from "../utils/GetCurrentUser";

export const Home = (props) => {
  const [isPending, setIsPending] = useState(true);
  const [user, setUser] = useState(null);
  // getting current user uid
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }

  const uid = GetUserUid();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            setUser(snapshot.data().FullName);
            setIsPending(false);
          });
      } else {
        setIsPending(false);
        setUser(null);
      }
    });
  }, []);

  // state of products
  const [products, setProducts] = useState([]);

  // getting products function
  const getProducts = async () => {
    const products = await fs.collection("Products").get();
    const productsArray = [];
    for (const snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // state of totalProducts
  const [totalProducts, setTotalProducts] = useState(0);
  // getting cart products
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const qty = snapshot.docs.length;
          setTotalProducts(qty);
        });
      }
    });
  }, []);

  // globl variable
  let Product;

  // add to cart
  const addToCart = (product) => {
    if (uid !== null) {
      // console.log(product);
      Product = product;
      Product["qty"] = 1;
      Product["TotalProductPrice"] = Product.qty * Product.price;
      fs.collection("Cart " + uid)
        .doc(product.ID)
        .set(Product)
        .then(() => {
          console.log("successfully added to cart");
        });
    } else {
      props.history.push("/login");
    }
  };

  if (isPending)
    return (
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        Fetching new Products for you...
      </h2>
    );

  return (
    <>
      {!isPending && (
        <>
          <Navbar user={user} totalProducts={totalProducts} />
          <br></br>
          {products && products.length > 0 && (
            <div className="container-fluid">
              <h1 className="text-center">Products</h1>
              <div className="products-box">
                <Products products={products} addToCart={addToCart} />
              </div>
            </div>
          )}
          {/* {products.length < 1 && (
            <div className="container-fluid">Please wait....</div>
          )} */}
        </>
      )}
    </>
  );
};
