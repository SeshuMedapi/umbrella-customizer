const UmbrellaDisplay = ({
  color,
  logo,
  isAnimating = false,
  slideDirection = null,
}) => {
  const umbrellaImages = {
    pink: "/images/Pink umbrella.png",
    blue: "/images/Blue umbrella.png",
    yellow: "/images/Yellow umbrella.png",
  };

  const getAnimationClass = () => {
    if (!isAnimating) return "";

    if (slideDirection === "left") {
      return "umbrella-slide-left";
    } else if (slideDirection === "right") {
      return "umbrella-slide-right";
    } else {
      return "umbrella-zoom-animation";
    }
  };

  return (
    <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">
      <div className={`relative w-full h-full flex items-center justify-center ${getAnimationClass()}`}>
        <img
          src={umbrellaImages[color]}
          alt={`${color} umbrella`}
          className="max-w-full h-auto select-none pointer-events-none drop-shadow-2xl transition-transform duration-300"
        />

        {logo && (
          <img
            src={logo}
            alt="Uploaded Logo"
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-24 h-24 object-contain drop-shadow-xl"
          />
        )}
      </div>
    </div>
  );
};

export default UmbrellaDisplay;
