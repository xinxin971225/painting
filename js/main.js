var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

var pageWidth = document.documentElement.clientWidth
var pageHeight = document.documentElement.clientHeight
canvas.width = pageWidth
canvas.height = pageHeight
let penSize = document.querySelector('#canvasTool>#penSize')
let canvasHistory = [];
let step = -1;
//清空
  clear.onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
  }


  //download
  download.onclick = function(){
     var url = canvas.toDataURL("image/png")
     var a = document.createElement('a')
     document.body.appendChild(a)
     a.href = url 
     a.download = 'mydrawing'
     a.click()
  }

  //改变线条大小
  upLineWidth.onclick = function(){

    context.lineWidth=context.lineWidth+1

    useEraser = false
    pen.classList.add('active')
    eraser.classList.remove('active')
    penSize.innerHTML = '当前粗细:'+context.lineWidth
  }
  downLineWidth.onclick = function(){

    context.lineWidth=context.lineWidth-1
    penSize.innerHTML = '当前粗细:'+context.lineWidth
    useEraser = false
    pen.classList.add('active')
    eraser.classList.remove('active')
  }



 //画圈函数
 function drawcricle(x, y, radius) {
     context.beginPath();
     context.arc(x, y, radius, 0, Math.PI * 2);
     context.fill();
   }
   //声明
 var useEraser = false
 var drawing = false
 eraser.onclick = function(){
  useEraser = true
  eraser.classList.add('active')
  pen.classList.remove('active')
 }
 pen.onclick = function(){
     useEraser = false
        pen.classList.add('active')
        eraser.classList.remove('active')

 
 }



 //改变颜色
 function updatecolor(jscolor) {
context.fillStyle ='#' + jscolor;
context.strokeStyle ='#' + jscolor;
var nowcolor = document.querySelector('#nowcolor')
nowcolor.style.color='#' + jscolor
}

//检测设备
if(document.body.ontouchstart !== undefined){
    //手指设备
    canvas.ontouchstart= function(aaa) {

        let x = aaa.touches[0].clientX;
        let y = aaa.touches[0].clientY;

            if(useEraser){
                context.clearRect(x-10,y-10,20,20);
                drawing = true
               }else{
                drawing = true;
                drawcricle(x-0.5, y-0.5, 1);
                lastPoint = {
                 'x': x,
                 'y': y
               }
             
        }
       
      }
     
      //手指移动
      canvas.ontouchmove = function(aaa) {

        let x = aaa.touches[0].clientX;
        let y = aaa.touches[0].clientY;
        let newPoint = {
          'x': x,
          'y': y
        }

            if (useEraser) {
                if(drawing){
                 context.clearRect(x-10,y-10,20,20)
                }
              }else if(drawing){
                context.beginPath();
                context.moveTo(lastPoint.x, lastPoint.y);
                context.lineTo(newPoint.x, newPoint.y);
                context.stroke();
                context.closePath();
                lastPoint = newPoint;
              }

    }
      
      
      
      //手指松开
      canvas.ontouchend = function(aaa) {
        drawing = false;
        step++;
        if (step < canvasHistory.length) {
            canvasHistory.length = step; // 截断数组
        }
        canvasHistory.push(canvas.toDataURL()); // 添加新的绘制到历史记录
      }
     
      

}else{
    //非触屏设备
   //鼠标按下
   canvas.onmousedown = function(aaa) {
   
    let x = aaa.clientX;
    let y = aaa.clientY;
    if(useEraser){
     context.clearRect(x-10,y-10,20,20);
     drawing = true
    }else{
     drawing = true;
     drawcricle(x-0.5, y-0.5, 1);
     lastPoint = {
      'x': x,
      'y': y
    }
  
    }
   
  }
 
  //鼠标移动
  canvas.onmousemove = function(aaa) {
    let x = aaa.clientX;
    let y = aaa.clientY;
    let newPoint = {
      'x': x,
      'y': y
    }
    if (useEraser) {
      if(drawing){
       context.clearRect(x-10,y-10,20,20)
      }
    }else if(drawing){
      context.beginPath();
      context.moveTo(lastPoint.x, lastPoint.y);
      context.lineTo(newPoint.x, newPoint.y);
      context.stroke();
      context.closePath();
      lastPoint = newPoint;
    }
}
  
  
  
  //鼠标松开
  canvas.onmouseup = function(aaa) {
    drawing = false;
    step++;
    if (step < canvasHistory.length) {
    	canvasHistory.length = step; // 截断数组
    }
    canvasHistory.push(canvas.toDataURL()); // 添加新的绘制到历史记录
    
  }

}
 // 撤销方法
 canvasUndo.onclick = function() {
    if (step >= 0) {
      step--;
      context.clearRect(0, 0, canvas.width, canvas.height);
      let canvasPic = new Image();
      canvasPic.src = canvasHistory[step];
      canvasPic.addEventListener('load', () => {
          context.drawImage(canvasPic, 0, 0);
      });
    }
  }
  // 反撤销方法
  canvasRedo.onclick = function() {
    if (step < canvasHistory.length - 1) {
      step++;
      let canvasPic = new Image();
      canvasPic.src = canvasHistory[step];
      canvasPic.addEventListener('load', () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(canvasPic, 0, 0);
      });
    }
  }









 

