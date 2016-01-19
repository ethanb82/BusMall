var details = {
  numChosen: 0,
  chosen: [],
  items: [],
  rowInfo: [],
  open: false,
  headers: ['Item Name', 'Clicks', '# of Renders', 'Click Ratio'],
  div: document.getElementById('detContainer'),
  infoDiv: document.getElementById('detailsInfo'),
  detailsButton: document.createElement('h2')
};
details.showDetails = function(){
  var objRef = this;
  this.detailsButton.textContent = 'Show Details';
  this.detailsButton.addEventListener('click', function(){
    if (objRef.open === false){
      objRef.render();
    } else {
      objRef.detailsButton.textContent = 'Show Details';
      objRef.clear();
    }
  })
  this.div.appendChild(this.detailsButton);
};
details.render = function(){
  this.detailsButton.textContent = 'Hide Details'
  this.open = true;
  this.details = document.createElement('table');
  this.details.className = 'detTable';
  this.infoDiv.appendChild(this.details);
  var headrow = document.createElement('tr');
  this.details.appendChild(headrow);
  for (var i = 0; i < this.headers.length; i++){
    column = document.createElement('td');
    column.className = 'detHead';
    column.textContent = this.headers[i];
    headrow.appendChild(column);
  }
  for (var i = 0; i < this.items.length; i++){
    var row = document.createElement('tr');
    this.details.appendChild(row);
    this.rowInfo[0] = this.items[i].itemName;
    this.rowInfo[1] = this.items[i].clickCount;
    this.rowInfo[2] = this.items[i].renderCount;
    var percentClick = parseFloat(Math.round((this.items[i].clickCount / this.items[i].renderCount) * 100));
    if (isNaN(percentClick)){
      this.rowInfo[3] = 'N/A';
    } else {
      this.rowInfo[3] = percentClick + '%';
    }
    for (var j = 0; j < this.rowInfo.length; j++){
      var cell = document.createElement('td');
      cell.className = 'detCell';
      cell.textContent = this.rowInfo[j];
      row.appendChild(cell);
    }
  }
};
details.clear = function(){
  this.detailsButton.textContent = 'Show Details';
  this.open = false;
  this.infoDiv.removeChild(this.details);
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
    objRef.superSizeMe(260, 320, 4, 8, 0.6, 1);
  })
  this.img.addEventListener('mouseout', function(){
    objRef.superSizeMe(320, 260, -4, 8, 1, 0.6);
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
  if (details.open === true){
    details.clear();
    details.render();
  }
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
