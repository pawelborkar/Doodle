import { useEffect, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { TwitterPicker } from "react-color";
import { FaTrashAlt, FaDownload, FaEraser } from "react-icons/fa";
import { ImUndo2, ImSun } from "react-icons/im";
import { BsFillMoonStarsFill } from "react-icons/bs";
const Canvas = () => {
  const [brushColor, setBrushColor] = useState("#EB144C");
  const [brushSize, setBrushSize] = useState(7);
  const [canvasBgColor, setCanvasBgColor] = useState("#ffffff");
  const [darkMode, setDarkMode] = useState(false);
  const canvasFunctions = useRef(null);

  const exportAsImage = () => {
    const a = document.createElement("a");
    a.href = canvasFunctions.current.getDataURL();
    a.download = `Doodle_${new Date().getTime()}`;
    a.click();
  };

  const handleErase = () => {
    const canvas = document.getElementById("Canvas");
    const context = canvas.getContext("2d");

    // Eraser
    // const erase = () => (context.globalCompositeOperation = "destination-out");

    return () => (context.globalCompositeOperation = "destination-out");
  };

  const handleDarkMode = () => {
    if (!darkMode) {
      setCanvasBgColor("#00002d");
      setDarkMode(true);
    } else {
      setCanvasBgColor("#ffffff");
      setDarkMode(false);
    }
  };

  const handleBrushSize = (e) => {
    setBrushSize(e.target.value);
  };

  const handleBrushColorChange = (color) => {
    setBrushColor(color.hex);
  };

  const handleClearAll = () => {
    canvasFunctions.current.eraseAll();
  };
  const handleUndo = () => {
    canvasFunctions.current.undo();
  };

  const handleShortcutKeys = (e) => {
    if (e.ctrlKey && e.keyCode === 90) {
      handleUndo();
    } else if (e.ctrlKey && e.shiftKey && e.keyCode === 68) {
      handleErase();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleShortcutKeys);

    return () => {
      document.removeEventListener("keydown", handleShortcutKeys);
    };
  });

  return (
    <div>
      <div className="ColorPalette">
        <TwitterPicker
          color={brushColor}
          onChangeComplete={handleBrushColorChange}
        />

        <div className="FunctionsContainer">
          <div className="btn erase" onClick={handleClearAll}>
            <FaTrashAlt color="#ff0000" />
          </div>
          <div className="btn" onClick={handleUndo}>
            <ImUndo2 color={darkMode ? "#ffffff" : "#000"} />
          </div>
          {/* <div className="btn" onClick={() => handleErase()}>
            <FaEraser color={darkMode ? "#ffffff" : "#000"} />
          </div> */}
          <div className="btn" onClick={exportAsImage}>
            <FaDownload color={darkMode ? "#ffffff" : "#000"} />
          </div>
          <div
            className="btn"
            onClick={() => handleDarkMode()}
            color={darkMode ? "#fff" : "#000"}
          >
            {!darkMode ? (
              <BsFillMoonStarsFill cursor="pointer" color="#000000" />
            ) : (
              <ImSun cursor="pointer" color="#ffffff" />
            )}
          </div>
          <div>
            <input
              className="range"
              min={1}
              max={20}
              type="range"
              name="brushSize"
              id="brushSize"
              value={brushSize}
              onChange={handleBrushSize}
            />
          </div>
        </div>
      </div>
      <div id="Canvas" className="Canvas">
        <CanvasDraw
          id={"myCanvas"}
          backgroundColor={canvasBgColor}
          brushColor={brushColor}
          enablePanAndZoom
          ref={canvasFunctions}
          canvasWidth={2500}
          canvasHeight={4000}
          brushRadius={brushSize}
          lazyRadius={1}
          style={{
            overflowX: "auto",
            overflowY: "scroll",
            overflow: "hidden",
            // cursor: "crosshair",
          }}
        />
      </div>
    </div>
  );
};
export default Canvas;
