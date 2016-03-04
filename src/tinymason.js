'use strict';

var tinymason = function tinymason(params) {
  var resize, prepare, fillGrid, genClassName, //Private methods
    width, func, container, columns, clearer,
    elements = [],
    columnsNum = Infinity,
    prefix = params.prefix ? prams.prefix : 'tinymason',
    id = params.id ? params.id : Math.round(Math.random()*10000);

  resize = function tinymason_resize() {
    var columnsCalc = func(container.offsetWidth/width);
    if (columnsCalc === 0) {
      columnsCalc = 1;
    }
    if (columnsCalc !== columnsNum) {
      columnsNum = columnsCalc;
      prepare();
    }
  };

  prepare = function tinymason_prepare() {
    var c, column,
      columnWidth = 100/columnsNum;

    //Remove old columns
    while (columns.firstChild) {
      columns.removeChild(columns.firstChild);
    }

    //Create new columns
    for (c = 0; c < columnsNum; c++) {
      column = document.createElement('div');
      column.className = genClassName('column', c);
      column.style = 'float: left; width: ' + columnWidth + '%';
      columns.appendChild(column);
    }

    fillGrid(0);
  };

  fillGrid = function tinymason_fillGrid(fromElement) {
    var i, length, bestHeight, c, bestColumn,
      columnList = columns.children;
    for (i = fromElement, length = elements.length; i < length; i++) {
      bestHeight = Infinity;
      for (c = 0; c < columns; c++) {
        if (columnList[c].offsetHeight < bestHeight) {
          bestColumn = columnList[c];
          bestHeight = bestColumn.offsetHeight;
        }
      }
      bestColumn.appendChild(elements[i]);
    }
  };

  genClassName = function tinymason_genClassName(name, num) {
    var className = prefix + '-' + name + ' ' + prefix + '-' + name + '-' + id;
    return name
      ? className + ' ' + prefix + '-' + name + '-' + num
      : className;
  };

  //Validate mandatory params
  if (!params.container || (!params.minWidth && !params.maxWidth)) {
    throw {
      name: 'TinyMason Exception',
      description: 'Container and min/max width are mandatory params'
    };
  }

  //Basic configuration
  container = params.container;
  if (params.minWidth) {
    width = params.minWidth;
    func = Math.floor;
  } else {
    width = params.maxWidth;
    func = Math.ceil;
  }

  //Class replacement
  container.className = container.className
    .replace(' no-js', '')
    .replace('no-js ', '')
    .replace('no-js', '');
  container.className += ' ' + genClassName('container');

  //Load elements from container content
  while (container.firstChild) {
    elements.push(container.firstChild.cloneNode(true));
    container.removeChild(container.firstChild);
  }

  //Create the layer infraestructure
  columns = document.createElement('div');
  columns.className = genClassName('columns');
  container.appendChild(columns);
  clearer = document.createElement('div');
  clearer.className = genClassName('clearer');
  clearer.style = 'clear: left';
  container.appendChild(clearer);

  //Magic when resizing window
  window.addEventListener('resize', resize);
  resize();

  //Public API
  return {

  };
};
