const colorOptions = [
  { name: "pink", bg: "bg-pink-400", ring: "ring-pink-500" },
  { name: "blue", bg: "bg-blue-400", ring: "ring-blue-500" },
  { name: "yellow", bg: "bg-yellow-400", ring: "ring-yellow-500" },
];

const ColorSwatches = ({ selectedColor, onColorChange }) => {
  return (
    <div className="flex gap-4">
      {colorOptions.map((color) => {
        const isSelected = selectedColor === color.name;

        return (
          <button
            key={color.name}
            onClick={() => onColorChange(color.name)}
            className={`
              w-14 h-14 rounded-full
              ${color.bg}
              transition-all duration-300 hover:scale-110
              ${isSelected ?
                `ring-4 ${color.ring} ring-offset-2 scale-110`
                : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"}
            `}
            aria-label={`Select ${color.name} color`}
          />
        );
      })}
    </div>
  );
};

export default ColorSwatches;
