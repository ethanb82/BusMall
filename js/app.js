var details = {
  numChosen: 0,
  chosen: [],
  items: [],
  rowInfo: [],
  fresh: true,
  open: false,
  headers: ['Item Name', 'Clicks', '# of Renders', 'Click Ratio'],
  div: document.getElementById('detContainer'),
  infoDiv: document.getElementById('detailsInfo'),
  chartEl: document.getElementById('myChart'),
  detailsButton: document.createElement('h2')
};
details.showDetails = function(){
  this.detailsButton.textContent = 'Show Details';
  this.detailsButton.addEventListener('click', function(){
    if (details.open === false){
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
  details.buttonEl.addEventListener('click', function(){
    details.render();
  })
  details.buttonEl.addEventListener('mouseover', function(){
    details.buttonEl.setAttribute('src', 'images/refreshO.jpg');
  })
  details.buttonEl.addEventListener('mouseout', function(){
    details.buttonEl.setAttribute('src', 'images/refresh.jpg');
  })
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
  }, this);
  this.details = document.getElementById('myChart').getContext("2d");
  if(this.fresh === false){
    console.log('refreshing chart..')
    this.detChart.destroy();
  }
  this.detChart = new Chart(this.details).Bar(chartData, {responsive: true});
  this.fresh = false;
};

function item(indexNum, name, filepath){
  this.indexNum = indexNum;
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
    console.log('The user selected ' + objRef.itemName + ' ' + objRef.clickCount + ' time(s).');
    console.log('The user has made ' + details.numChosen + ' selections.')
    refresh();
    if (details.numChosen === 15) {details.showDetails();}
  })

  container.appendChild(this.divEl);
  this.img = document.createElement('img');
  this.img.setAttribute('src', this.filepath);
  this.img.setAttribute('style', 'opacity:0.6');
  this.img.className = 'itemImg';

  this.img.addEventListener('mouseover', function(){
    objRef.superSizeMe(260, 280, 2, 8, 0.6, 1);
  })
  this.img.addEventListener('mouseout', function(){
    objRef.superSizeMe(280, 260, -2, 8, 1, 0.6);
  })

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
      fillColor: "rgba(220,220,220,0.5)",
      strokeColor: "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
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
    array[0] = Math.floor(Math.random() * 14);
    array[1] = Math.floor(Math.random() * 14);
    array[2] = Math.floor(Math.random() * 14);
  }
  return array;
}

function printItems() {
  details.chosen = randNums();
  details.items[details.chosen[0]].render();
  details.items[details.chosen[1]].render();
  details.items[details.chosen[2]].render();
}

function refresh() {
  var container = document.getElementById('container');
  container.removeChild(details.items[details.chosen[0]].divEl);
  container.removeChild(details.items[details.chosen[1]].divEl);
  container.removeChild(details.items[details.chosen[2]].divEl);
  printItems();
}

details.items[0] = new item(0, 'R2D2 Bag', 'images/bag.jpg');
details.items[1] = new item(1, 'Banana Cutter', 'images/banana.jpg');
details.items[2] = new item(2, 'Open-Toe Boots', 'images/boots.jpg');
details.items[3] = new item(3, 'Uncomfortable Chair', 'images/chair.jpg');
details.items[4] = new item(4, 'Cthulhu', 'images/cthulhu.jpg');
details.items[5] = new item(5, 'Dragon Meat', 'images/dragon.jpg');
details.items[6] = new item(6, 'Pen Utensils', 'images/pen.jpg');
details.items[7] = new item(7, 'Pizza Scissors', 'images/scissors.jpg');
details.items[8] = new item(8, 'Tauntaun Sleeping Bag', 'images/sleepingbag.jpg');
details.items[9] = new item(9, 'Baby Sweeper', 'images/sweep.png');
details.items[10] = new item(10, 'Unicorn Meat', 'images/unicorn.jpg');
details.items[11] = new item(11, 'USB Tentacle', 'images/usb.gif');
details.items[12] = new item(12, 'Water Can', 'images/water-can.jpg');
details.items[13] = new item(13, 'Wine Glass', 'images/wine-glass.jpg');

printItems();
