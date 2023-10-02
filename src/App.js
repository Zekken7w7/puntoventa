import React, { useState } from "react";
import "./GameCard.css";
import "./GameList.css";
import "./App.css";

// Importa las imágenes
import juego1 from "./juego_1.png";
import juego2 from "./juego_2.png";
import juego3 from "./juego_3.png";
import juego4 from "./juego_4.png";
import juego5 from "./juego_5.png";
import juego6 from "./juego_6.png";
import juego7 from "./juego_7.png";
import juego8 from "./juego_8.png";
import juego9 from "./juego_9.png";

const App = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Juego 1",
      price: 29.99,
      stock: 10,
      image: juego1,
    },
    {
      id: 2,
      name: "Juego 2",
      price: 39.99,
      stock: 5,
      image: juego2,
    },
    {
      id: 3,
      name: "Juego 3",
      price: 49.99,
      stock: 15,
      image: juego3,
    },
    {
      id: 4,
      name: "Juego 4",
      price: 29.99,
      stock: 3,
      image: juego4,
    },
    {
      id: 5,
      name: "Juego 5",
      price: 29.99,
      stock: 3,
      image: juego5,
    },
    {
      id: 6,
      name: "Juego 6",
      price: 35.99,
      stock: 15,
      image: juego6,
    },
    {
      id: 7,
      name: "Juego 7",
      price: 86.99,
      stock: 3,
      image: juego7,
    },
    {
      id: 8,
      name: "Juego 8",
      price: 65.99,
      stock: 85,
      image: juego8,
    },
    {
      id: 9,
      name: "Juego 9",
      price: 25.1,
      stock: 19,
      image: juego9,
    },
  ]);

  const [cart, setCart] = useState([]);
  const [isPaymentProcessing, setPaymentProcessing] = useState(false);

  const addToCart = (product) => {
    if (product.stock > 0) {
      setCart([...cart, product]);
      setProducts(
        products.map((p) =>
          p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        )
      );
    } else {
      alert("No hay suficiente stock de este producto.");
    }
  };

  const cancelProduct = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);

    const canceledProduct = cart.find((product) => product.id === productId);
    if (canceledProduct) {
      setProducts(
        products.map((product) =>
          product.id === canceledProduct.id
            ? { ...product, stock: product.stock + 1 }
            : product
        )
      );
    }

    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  const processPayment = () => {
    const isStockAvailable = cart.every((product) => product.stock > 0);

    if (isStockAvailable) {
      setPaymentProcessing(true);

      setTimeout(() => {
        setCart([]);
        setPaymentProcessing(false);

        alert("Pago completado con éxito");
      }, 2000);
    } else {
      alert("No hay suficiente stock de uno o más productos en el carrito.");
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Gamer's Haven</h1>
      </header>
      <section className="product-list">
        <h2>¡Sumérgete en la Aventura, Juega con Estilo! 🎮✨</h2>
        <h3>Productos disponibles a continuacion: </h3>
        <div className="game-cards-container">
          {products.map((product) => (
            <div key={product.id} className="game-card">
              <img src={product.image} alt={product.name} />
              <div>
                <h3>{product.name}</h3>
                <p>Precio: ${product.price}</p>
                <p>Stock: {product.stock}</p>
                <button onClick={() => addToCart(product)}>
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="cart">
        <h2>Carrito de Compras</h2>
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <button
                className="cancel-button"
                onClick={() => cancelProduct(product.id)}
              >
                Cancelar
              </button>
            </li>
          ))}
        </ul>
        <p>Total: ${calculateTotal()}</p>
        {isPaymentProcessing ? (
          <p>Procesando pago...</p>
        ) : (
          <button onClick={processPayment}>Procesar Pago</button>
        )}
      </section>
    </div>
  );
};

export default App;
