import { useState } from "react";

function ColorSizeSelector({ variants, onSelectColor, onSelectSize }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleColorChange = (event) => {
    const color = event.target.value;
    setSelectedColor(color);
    onSelectColor(color);
  };

  const handleSizeChange = (event) => {
    const size = event.target.value;
    setSelectedSize(size);
    onSelectSize(size);
  };

  return (
    <div>
      <select value={selectedColor} onChange={handleColorChange}>
        <option value="">Selecione...</option>
        {variants.map((variant) => (
          <option key={variant.id} value={variant.values[1]}>
            {variant.values[1]}
          </option>
        ))}
      </select>
      {selectedColor && (
        <div>
          <h3>Tamanho:</h3>
          <select value={selectedSize} onChange={handleSizeChange}>
            <option value="">Selecione...</option>
            {variants
              .filter((variant) => variant.values[1] === selectedColor)
              .map((variant) => (
                <option key={variant.id} value={variant.values[0]}>
                  {variant.values[0]}
                </option>
              ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default ColorSizeSelector;
