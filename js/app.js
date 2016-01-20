var details = {
  numChosen: 0,
  chosen: [],
  items: [],
  fresh: true,
  open: false,
  div: document.getElementById('detContainer'),
  infoDiv: document.getElementById('detailsInfo'),
  chartEl: document.getElementById('myChart'),
  detailsButton: document.createElement('h2')
};
details.showDetails = function(){
  this.detailsButton.textContent = 'Show Details';
  this.detailsButton.addEventListener('click', function(){
    if (! details.open){
      details.render();
      details.refreshButton();
    } else {
      details.detailsButton.textContent = 'Show Details';
      details.open = false;
      details.div.removeChild(details.buttonEl);
      details.detChart.destroy();
    }
  })
  this.div.appendChild(this.detailsButton);
};
details.refreshButton = function(){
  details.buttonEl = document.createElement('img');
  details.buttonEl.setAttribute('src', 'images/refresh.jpg');
  details.buttonEl.className = 'refreshImg';
  details.buttonEl.addEventListener('click', function(){details.render();})
  details.buttonEl.addEventListener('mouseover', function(){details.buttonEl.setAttribute('src', 'images/refreshO.jpg');})
  details.buttonEl.addEventListener('mouseout', function(){details.buttonEl.setAttribute('src', 'images/refresh.jpg');})
  details.div.appendChild(details.buttonEl);
}
details.render = function(){
  this.detailsButton.textContent = 'Hide Details'
  this.open = true;
  chartData.labels = [];
  chartData.datasets[0].data = [];
  chartData.datasets[1].data = [];
  this.items.forEach(function(product){
    chartData.labels.push(product.itemName);
    chartData.datasets[0].data.push(product.clickCount);
    chartData.datasets[1].data.push(product.renderCount);
  });
  this.details = document.getElementById('myChart').getContext("2d");
  if(! this.fresh){this.detChart.destroy()};
  this.detChart = new Chart(this.details).Bar(chartData, {responsive: true});
  this.fresh = false;
};
function item(name, filepath){
  this.itemName = name;
  this.filepath = filepath;
  this.renderCount = 0;
  this.clickCount = 0;
}
item.prototype.render = function() {
  var objRef = this;
  var container = document.getElementById('container');
  this.divEl = document.createElement('div');
  this.divEl.className = 'imgContainer';
  this.divEl.addEventListener('click', function(){
    objRef.clickCount += 1;
    details.numChosen += 1;
    console.log('The user has made ' + details.numChosen + ' selections.')
    refresh();
    if (details.numChosen === 15) {details.showDetails();}
  })
  container.appendChild(this.divEl);
  this.img = document.createElement('img');
  this.img.setAttribute('src', this.filepath);
  this.img.setAttribute('style', 'opacity:0.6');
  this.img.className = 'itemImg';
  this.img.addEventListener('mouseover', function(){objRef.superSizeMe(260, 280, 2, 8, 0.6, 1);})
  this.img.addEventListener('mouseout', function(){objRef.superSizeMe(280, 260, -2, 8, 1, 0.6);})
  this.divEl.appendChild(this.img);
  this.text = document.createElement('h3');
  this.text.textContent = this.itemName;
  this.text.setAttribute('style', 'opacity:0.6');
  this.divEl.appendChild(this.text);
  this.renderCount += 1;
}
item.prototype.superSizeMe = function(start, target, rate, delayRate, opacityStart, opacityTarget) {
  var delay = 0;
  var size = start;
  var opacity = opacityStart;
  var opacityInc = (opacityStart - opacityTarget)/((start - target) / rate);
  this.divEl.className = 'itemHighlight';
  while (size != target){
    delay += delayRate;
    size += rate;
    opacity += opacityInc
    this.resize(size, this, delay, opacity);
  }
}
item.prototype.resize = function(size, objRef, delay, opacity){
  var obj = objRef;
  setTimeout(function(){
    obj.divEl.setAttribute('style', 'height:' + size + 'px');
    obj.divEl.setAttribute('style', 'width:' + size + 'px');
    obj.img.setAttribute('style', 'opacity:' + opacity);
    obj.text.setAttribute('style', 'opacity:' + opacity);
  }, delay);
}
var chartData = {
  labels: [],
  datasets: [
    {
      label: "Number of Clicks",
      data: [],
      fillColor: "rgba(199,255,171,0.8)",
      strokeColor: "rgba(90,196,38,0.5)",
      highlightFill: "rgba(199,255,171,1)",
      highlightStroke: "rgba(90,196,38,0.75)"
    },
    {
      label: "Click/Render Ratio",
      data: [],
      fillColor: "rgba(151,187,205,0.5)",
      strokeColor: "rgba(151,187,205,0.8)",
      highlightFill: "rgba(151,187,205,0.75)",
      highlightStroke: "rgba(151,187,205,1)",
    }
  ]
};
function randNums(){ // Returns an array of 3 unique random numbers between 0 and 14
  var array = [0, 0, 0];
  while (array[0] === array[1] || array[1] === array[2] || array[0] === array[2]){
    array.forEach(function(zero, index){array[index] = Math.floor(Math.random() * 14)});
  }
  return array;
}
function printItems() {
  details.chosen = randNums();
  details.chosen.forEach(function(itemNum){details.items[itemNum].render()});
}
function refresh() {
  var container = document.getElementById('container');
  details.chosen.forEach(function(itemNum){container.removeChild(details.items[itemNum].divEl)});
  printItems();
}

var itemArgs = [['R2D2 Bag', 'images/bag.jpg'], ['Banana Cutter', 'images/banana.jpg'], ['Open-Toe Boots', 'images/boots.jpg'], ['Uncomfortable Chair', 'images/chair.jpg'], ['Cthulhu', 'images/cthulhu.jpg'], ['Dragon Meat', 'images/dragon.jpg'], ['Pen Utensils', 'images/pen.jpg'], ['Pizza Scissors', 'images/scissors.jpg'], ['Tauntaun Sleeping Bag', 'images/sleepingbag.jpg'], ['Baby Sweeper', 'images/sweep.png'], ['Unicorn Meat', 'images/unicorn.jpg'], ['USB Tentacle', 'images/usb.gif'], ['Water Can', 'images/water-can.jpg'], ['Wine Glass', 'images/wine-glass.jpg']];
itemArgs.forEach(function(args, index){details.items[index] = new item(args[0], args[1])});
printItems();
