export default class drawingFuncs{
    constructor(){
        this.canvas = null 
        this.ctx = null
        this.tool = "pen"
        this.pen = "square"
        this.squareEdge = 5
        this.diameter = 5
        this.fileName = "Canvas"
    }
    draw = (e)=>{
        if(this.tool === "pen"){
            if(this.pen === "square"){
                this.ctx.fillRect(e.clientX-this.squareEdge / 2,e.clientY-this.squareEdge /2,this.squareEdge,this.squareEdge)
            }
            else if(this.pen === "diameter"){
                this.ctx.beginPath()
                this.ctx.arc(e.clientX,e.clientY, this.diameter, 0, 2 * Math.PI);
                this.ctx.fill()
            }
        }
        else if(this.tool === "eraser"){
            this.ctx.fillStyle = "white"
            this.ctx.fillRect(e.clientX-this.squareEdge / 2,e.clientY-this.squareEdge /2,this.squareEdge,this.squareEdge)
        }
    }
    drawStart = (e)=>{
        this.draw(e)
        e.target.addEventListener("mousemove",this.draw)
    }
    drawEnd = (e)=>{
        e.target.removeEventListener("mousemove",this.draw)

    }
    toolChange = (tool)=>{
        this.tool = tool
    }
    colorChange = (color)=>{
        this.ctx.fillStyle = color
        
    }
    clear = ()=>{
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    start = (canvas)=>{
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

}