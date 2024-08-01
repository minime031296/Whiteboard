"use client";

import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useKeycloak } from '@react-keycloak/nextjs';
import ColorPalette from '../../../common/Colors/ColorPalette';
import InsertImage from '../../../common/ImageUploader/InsertImage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { redirect } from "next/dist/server/api-utils";

const socket = io();

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [options, setOptions] = useState({ lineColor: "#000000", lineWidth: 6 });
  const [drawing, setDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<[number, number] | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isErasing, setIsErasing] = useState(false);

  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResizeDrawing = () => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      };

      handleResizeDrawing();
      window.addEventListener("resize", handleResizeDrawing);

      return () => {
        window.removeEventListener("resize", handleResizeDrawing);
      };
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctxRef.current = ctx;
    }
  }, [options.lineWidth, options.lineColor]);

  const handleStartDrawing = (x: number, y: number) => {
    setDrawing(true);
    setLastPos([x, y]);
  };

  const handleEndDrawing = () => {
    setDrawing(false);
    setLastPos(null);
  };

  const handleDraw = (x: number, y: number) => {
    if (!drawing || !lastPos) return;
    const [lastX, lastY] = lastPos;

    if (ctxRef.current) {
      ctxRef.current.lineWidth = options.lineWidth;
      ctxRef.current.strokeStyle = isErasing ? "#FFFFFF" : options.lineColor;

      ctxRef.current.beginPath();
      ctxRef.current.moveTo(lastX, lastY);
      ctxRef.current.lineTo(x, y);
      ctxRef.current.stroke();
      ctxRef.current.closePath();

      socket.emit("socket_draw", [[lastX, lastY], [x, y]], options);
    }
    setLastPos([x, y]);
  };

  const handleSetDrawing = (flag: boolean) => {
    setIsErasing(flag);
  };

  const handleLogout = () => {
    if (keycloak && keycloak.authenticated) {
      keycloak.logout();
      redirect.push('http:localhost/8000/')
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        width={size.width}
        height={size.height}
        className="border"
        onMouseDown={(e) => handleStartDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
        onMouseUp={handleEndDrawing}
        onMouseMove={(e) => handleDraw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
      />
      <div className="d-flex justify-content-center py-2">
        <button className="btn btn-secondary me-2" onClick={() => setShowColorPicker(!showColorPicker)}>
          Color
        </button>
        <button className="btn btn-danger me-2" onClick={() => handleSetDrawing(true)}>
          Eraser
        </button>
        <button className="btn btn-primary me-2" onClick={() => handleSetDrawing(false)}>
          Draw
        </button>
        <button className="btn btn-warning" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {showColorPicker && (
        <div className="position-absolute top-50 start-50 translate-middle p-3 bg-white border shadow">
          <ColorPalette setOptions={setOptions} />
        </div>
      )}
      <div className="position-absolute top-0 end-0 m-3 p-2 bg-white border rounded shadow">
        <InsertImage ctxRef={ctxRef} size={size} />
      </div>
    </div>
  );
};

export default Whiteboard;
