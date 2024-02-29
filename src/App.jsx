import { useState, useEffect } from "react";
import "./App.css";

import ColorSizeSelector from "./components/ColorSizeSelector";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [price, setPrice] = useState("00,00");
  const [imageUrl, setImageUrl] = useState(
    "https://dcdn.mitiendanube.com/stores/003/595/948/products/transparent-t-shirt-mockup-of-a-fit-young-man-against-a-plain-background-215521-385de5ee7dc37d38d616922668227703-1024-1024.png"
  );

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    setSelectedSize("");
    updatePrice(color, selectedSize);
    updateImage(color, selectedSize);
    checkInventory(color, selectedSize);
  };

  const handleSelectSize = (size) => {
    setSelectedSize(size);
    updatePrice(selectedColor, size);
    updateImage(selectedColor, size);
    checkInventory(selectedColor, size);
  };

  const updatePrice = (color, size) => {
    const variant = data.variants.find(
      (variant) => variant.values[1] === color && variant.values[0] === size
    );

    if (variant) {
      setPrice(variant.price);
    } else {
      setPrice(null);
    }
  };
  const updateImage = (color, size) => {
    const variant = data.variants.find(
      (variant) => variant.values[1] === color && variant.values[0] === size
    );

    if (variant) {
      setImageUrl(variant.image_url);
    } else {
      setImageUrl(null);
    }
  };
  const checkInventory = (color, size) => {
    const variant = data.variants.find(
      (variant) => variant.values[1] === color && variant.values[0] === size
    );

    if (variant && variant.inventory_quantity < 1) {
      alert("Este produto está fora de estoque no momento.");
    }
  };
  const handleBuyButtonClick = () => {
    // Verificar se todos os dados necessários foram selecionados
    if (selectedColor && selectedSize && price && imageUrl) {
      // Aqui você pode enviar os dados para o processo de checkout
      const checkoutData = {
        selectedColor,
        selectedSize,
        price,
        imageUrl,
        // Adicione outros dados relevantes aqui, se necessário
      };
      console.log("Dados para o checkout:", checkoutData);
      alert("Dados para o checkout:", checkoutData);
      // Execute sua lógica de checkout aqui, como redirecionar para a página de checkout
    } else {
      alert("Por favor, selecione a cor e o tamanho antes de comprar.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://app.landingpage.com.br/Ajax/buscarDetalhesProdutoNuvemshop/LPL2gc/180064575"
        );
        if (!response.ok) {
          throw new Error("Erro ao carregar dados");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  return (
    <div>
      {data && (
        <div className="overlay-nuvem active carregou">
          <div className="modal-buybutton-nuvem">
            <div className="produto-imagem">
              <img
                loading="lazy"
                data-componente="imagem"
                src={imageUrl}
                alt=""
              />
            </div>

            <div className="produto-desc">
              <div>
                <h1 className="produto-titulo" data-componente="titulo">
                  {data.title}
                </h1>
              </div>

              <div className="produto-precos">
                <p
                  data-componente="comparado"
                  className="produto-preco-comparado"
                >
                  {price}
                </p>
              </div>
              <div className="produto-opts">
                <div className="produtos-variantes">
                  <div className="produto-select">
                    <span>Cor:</span>
                    <ColorSizeSelector
                      variants={data.variants}
                      onSelectColor={handleSelectColor}
                      onSelectSize={handleSelectSize}
                    />
                  </div>
                </div>
              </div>

              <div className="produto-compra">
                <button className="btn-comprar btn">
                  <div className="text-btn" onClick={handleBuyButtonClick}>
                    Comprar
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
