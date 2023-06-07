import { useEffect, useRef,useMemo } from 'react';
import drawingFuncs from "./funcs";
import "./css/main/style.css"
function App() {
  const canvasRef = useRef()
  const mouseIcon = useRef()
  const pngLinkElement = useRef()
  const colorInput = useRef()
  const drawingFuncsClass = useMemo(()=>new drawingFuncs(canvasRef.current),[])
  const selectTool = (e,tool)=>{
    const parent = e.target.parentElement
    for(const x of parent.children){
      x.classList.remove("selected")
    }
    e.target.classList.add("selected")
    drawingFuncsClass.toolChange(tool)
  }
  useEffect(()=>{
    drawingFuncsClass.start(canvasRef.current)
    window.addEventListener("mousemove",(e)=>{
      if(e.clientX <= canvasRef.current.width && e.clientY <= canvasRef.current.height){
        let iconHeight = window.getComputedStyle(mouseIcon.current).height
        iconHeight = Number(iconHeight.slice(0,iconHeight.indexOf("px")))
        
        let iconWidth = window.getComputedStyle(mouseIcon.current).width
        iconWidth = Number(iconWidth.slice(0,iconWidth.indexOf("px")))
        
        mouseIcon.current.style.top = (e.clientY - iconHeight / 2) + "px"
        mouseIcon.current.style.left = (e.clientX - iconWidth / 2) + "px"
      }
    })
  },[drawingFuncsClass])
  const mouseIconUpdate = ()=>{
    if(drawingFuncsClass.pen === "diameter"){
      const diameter = Number(drawingFuncsClass.diameter)
      mouseIcon.current.style.width = (diameter * 2) + "px"
      mouseIcon.current.style.height = (diameter * 2) + "px"
      mouseIcon.current.classList.add("diameter")
    }
    else 
    {
      mouseIcon.current.style.width = (drawingFuncsClass.squareEdge) + "px"
      mouseIcon.current.style.height = (drawingFuncsClass.squareEdge) + "px"
      mouseIcon.current.classList.remove("diameter")
    }
  
  }
  const downloadDraw = (canvas)=>{
    const canvasUrl = canvas.toDataURL();
    pngLinkElement.current.href = canvasUrl
    pngLinkElement.current.download = drawingFuncsClass.fileName
    pngLinkElement.current.click();

  }
  return (
    <div id="drawing-app">
      <div id='canvas-container'>
        <canvas ref={canvasRef} width={1500} height={800} onMouseUp={(e)=>drawingFuncsClass.drawEnd(e)} onMouseDown={(e)=>drawingFuncsClass.drawStart(e)}>Tarayıcınız Canvas Desteklemiyor Lütfen Başka Tarayıcıdan Kullanmayı Deneyiniz</canvas>
        <div ref={mouseIcon} id={'mouse-icon'}></div>
      </div>
      <div id={'property-and-item-container'}>
        <div id="items">
          <i className={"fa-solid fa-eraser"} onClick={(e)=>{
            selectTool(e,"eraser")
            colorInput.current.value = "#ffffff"
          }}></i>
          <i className={"fa-solid fa-pen selected"}  onClick={(e)=>selectTool(e,"pen")}></i>
          <i className={"fa fa-refresh"} aria-hidden="true" onClick={()=>{
            drawingFuncsClass.clear()
            colorInput.current.value = "#ffffff"
          }}></i>
        </div>
        <div id={'properties'}>
          <select type={"number"} placeholder={"Şekil"} onChange={(e)=>{
            drawingFuncsClass.pen = e.target.value
            mouseIconUpdate()
            }}>
            <option value={"square"}>Kare</option>
            <option value={"diameter"}>Yuvarlak</option>
          </select>
          <input type={"number"} placeholder={"Kare Kenarı"} defaultValue={drawingFuncsClass.squareEdge} onChange={(e)=>{
            drawingFuncsClass.squareEdge = e.target.value
            mouseIconUpdate()
          }}/>
          <input type={"number"} placeholder={"Çap"} defaultValue={drawingFuncsClass.diameter} onChange={(e)=>{
            drawingFuncsClass.diameter = e.target.value
            mouseIconUpdate()
            }}/>
          <input type={"color"} ref={colorInput} defaultValue={"#ffffff"} placeholder={"Renk"} onChange={(e)=>{drawingFuncsClass.colorChange(e.target.value)}}/>
          <input type={"text"}  defaultValue={"canvas"} placeholder={"Dosya Adı"} onChange={(e)=>{drawingFuncsClass.fileName = e.target.value}}/>
          <input type={'button'} value={"Png Olarak İndir"} onClick={()=>downloadDraw(drawingFuncsClass.canvas)}/>
          <a href='#' ref={pngLinkElement} download={"Canvas"} style={{display:"none"}}></a>
        </div>
      </div>
    </div>
  );
}

export default App;
