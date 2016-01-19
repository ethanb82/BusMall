var items = [];
var numChosen = 0;
var chosen = [];

function item(indexNum, name, filepath){
  this.indexNum = indexNum;
  this.itemName = name;
  this.filepath = filepath;
  this.renderCount = 0;
  this.clickCount = 0;
}

item.prototype.render = function() {
  var num = this.indexNum;
  console.log('Rendering ' + this.itemName);
  var container = document.getElementById('container');
  this.divEl = document.createElement('div');
  this.divEl.className = 'imgContainer';
  this.divEl.setAttribute('data', this.indexNum);
  this.divEl.addEventListener('click', function(){
    window.items[num].clickCount += 1;
    numChosen += 1;
    console.log('The user selected ' + window.items[num].itemName + ' ' + window.items[num].clickCount + ' time(s).');
    console.log('The user has made ' + numChosen + ' selections.')
    refresh();
    if (numChosen === 15) {showDetails();}
  })
  container.appendChild(this.divEl);
  this.img = document.createElement('img');
  this.img.setAttribute('src', this.filepath);
  this.img.className = 'itemImg';
  this.divEl.appendChild(this.img);
  this.renderCount += 1;
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
  chosen = randNums();
  console.log(chosen);
  items[chosen[0]].render();
  items[chosen[1]].render();
  items[chosen[2]].render();
}

function refresh() {
  var container = document.getElementById('container');
  container.removeChild(items[chosen[0]].divEl);
  container.removeChild(items[chosen[1]].divEl);
  container.removeChild(items[chosen[2]].divEl);
  printItems();
}

function showDetails() {
  var div = document.getElementById('detContainer');
  var details = document.createElement('h2');
  details.textContent = 'Show Details';
  div.appendChild(details);
}

items[0] = new item(0, 'R2D2 Bag', 'images/bag.jpg');
items[1] = new item(1, 'Banana Cutter', 'images/banana.jpg');
items[2] = new item(2, 'Open-toe Boots', 'images/boots.jpg');
items[3] = new item(3, 'Uncomfortable Chair', 'images/chair.jpg');
items[4] = new item(4, 'Cthulhu', 'images/cthulhu.jpg');
items[5] = new item(5, 'Dragon Meat', 'images/dragon.jpg');
items[6] = new item(6, 'Pen Utensils', 'images/pen.jpg');
items[7] = new item(7, 'Pizza Scissors', 'images/scissors.jpg');
items[8] = new item(8, 'Tauntaun Sleeping Bag', 'images/sleepingbag.jpg');
items[9] = new item(9, 'Baby Sweeper', 'images/sweep.png');
items[10] = new item(10, 'Unicorn Meat', 'images/unicorn.jpg');
items[11] = new item(11, 'USB Tentacle', 'images/usb.gif');
items[12] = new item(12, 'Water Can', 'images/water-can.jpg');
items[13] = new item(13, 'Wine Glass', 'images/wine-glass.jpg');

printItems();
