import { useRef, useState } from 'react';
import { Upload, ChevronLeft, ChevronRight } from 'lucide-react';
import ColorSwatches from './ColorSwatches';
import UmbrellaDisplay from './UmbrellaDisplay';

const COLORS = ['pink', 'blue', 'yellow'];

const UmbrellaCustomizer = () => {
  const [selectedColor, setSelectedColor] = useState('pink');
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState(null);

  const pendingColorRef = useRef(null);
  const pendingLogoRef = useRef(undefined);

  const ZOOM_OUT_DURATION = 400;
  const ZOOM_IN_DURATION = 400;
  const TOTAL_ANIMATION_DURATION = ZOOM_OUT_DURATION + ZOOM_IN_DURATION;

  const startAnimation = (callback) => {
    if (isAnimating) return;

    setIsAnimating(true);
    callback();

    setTimeout(() => {
      if (pendingColorRef.current !== null) {
        setSelectedColor(pendingColorRef.current);
        pendingColorRef.current = null;
      }
      if (pendingLogoRef.current !== undefined) {
        setUploadedLogo(pendingLogoRef.current);
        pendingLogoRef.current = undefined;
      }
      setSlideDirection(null);
    }, ZOOM_OUT_DURATION);

    setTimeout(() => {
      setIsAnimating(false);
    }, TOTAL_ANIMATION_DURATION);
  };

  const handleColorChange = (color) => {
    if (color === selectedColor) return;
    pendingColorRef.current = color;
    startAnimation(() => {});
  };

  const getNextColor = () => {
    const currentIndex = COLORS.indexOf(selectedColor);
    const nextIndex = (currentIndex + 1) % COLORS.length;
    return COLORS[nextIndex];
  };

  const getPreviousColor = () => {
    const currentIndex = COLORS.indexOf(selectedColor);
    const prevIndex = (currentIndex - 1 + COLORS.length) % COLORS.length;
    return COLORS[prevIndex];
  };

  const handleNextColor = () => {
    const nextColor = getNextColor();
    pendingColorRef.current = nextColor;
    setSlideDirection('left');
    startAnimation(() => {});
  };

  const handlePreviousColor = () => {
    const prevColor = getPreviousColor();
    pendingColorRef.current = prevColor;
    setSlideDirection('right');
    startAnimation(() => {});
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const data = reader.result;
      pendingLogoRef.current = data;
      startAnimation(() => {});
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    pendingLogoRef.current = null;
    startAnimation(() => {});
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ${
        selectedColor === 'pink'
          ? 'bg-gradient-to-br from-pink-50 to-pink-100'
          : selectedColor === 'blue'
          ? 'bg-gradient-to-br from-blue-50 to-blue-100'
          : 'bg-gradient-to-br from-yellow-50 to-yellow-100'
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Umbrella Customizer
          </h1>
          <p className="text-gray-600">Choose your color and upload your logo</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Customize Your Umbrella
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Color
                </label>
                <ColorSwatches selectedColor={selectedColor} onColorChange={handleColorChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Upload Your Logo</label>
                <div className="space-y-3">
                  <label
                    htmlFor="logo-upload"
                    className={`flex items-center justify-center gap-2 px-6 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedColor === 'pink'
                        ? 'border-pink-300 hover:border-pink-400 hover:bg-pink-50'
                        : selectedColor === 'blue'
                        ? 'border-blue-300 hover:border-blue-400 hover:bg-blue-50'
                        : 'border-yellow-300 hover:border-yellow-400 hover:bg-yellow-50'
                    }`}
                  >
                    <Upload className="w-5 h-5" />
                    <span className="font-medium">{uploadedLogo ? 'Change Logo' : 'Upload Logo'}</span>
                  </label>

                  <input id="logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />

                  {uploadedLogo && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Logo uploaded successfully</span>
                      <button onClick={handleRemoveLogo} className="text-sm text-red-600 hover:text-red-700 font-medium">
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Preview Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Color:</span>{' '}
                    {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
                  </p>
                  <p>
                    <span className="font-medium">Logo:</span> {uploadedLogo ? 'Added' : 'Not added'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 lg:sticky lg:top-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Live Preview</h2>
            <div className="relative">
              <UmbrellaDisplay
                color={selectedColor}
                logo={uploadedLogo}
                isAnimating={isAnimating}
                slideDirection={slideDirection}
              />
              <button
                onClick={handlePreviousColor}
                disabled={isAnimating}
                className={`absolute left-2 top-1/2 -translate-y-1/2 p-4 rounded-full shadow-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed group ${
                  getPreviousColor() === 'pink'
                    ? 'bg-gradient-to-br from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600'
                    : getPreviousColor() === 'blue'
                    ? 'bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600'
                    : 'bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600'
                } hover:scale-110 hover:shadow-2xl`}
                aria-label="Previous color"
              >
                <ChevronLeft className="w-6 h-6 text-white drop-shadow-md" />
              </button>
              <button
                onClick={handleNextColor}
                disabled={isAnimating}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-4 rounded-full shadow-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed group ${
                  getNextColor() === 'pink'
                    ? 'bg-gradient-to-br from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600'
                    : getNextColor() === 'blue'
                    ? 'bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600'
                    : 'bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600'
                } hover:scale-110 hover:shadow-2xl`}
                aria-label="Next color"
              >
                <ChevronRight className="w-6 h-6 text-white drop-shadow-md" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmbrellaCustomizer;
