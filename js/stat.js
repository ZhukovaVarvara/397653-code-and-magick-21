'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var COLUMN_GAP = 50;
var FONT_GAP = 40;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      'rgba(0, 0, 0, 0.7)'
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      '#fff'
  );

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText(
      'Ура вы победили!',
      CLOUD_X + (3 * GAP),
      CLOUD_Y + (3 * GAP)
  );
  ctx.fillText(
      'Список результатов:',
      CLOUD_X + (3 * GAP),
      CLOUD_Y + COLUMN_GAP
  );

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var currentHeight = (BAR_HEIGHT * times[i]) / maxTime;
    ctx.fillStyle = '#000';
    ctx.fillText(
        names[i],
        CLOUD_X + FONT_GAP + (BAR_WIDTH + COLUMN_GAP) * i,
        CLOUD_HEIGHT - GAP
    );

    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + FONT_GAP + (BAR_WIDTH + COLUMN_GAP) * i,
        FONT_GAP * 2 + (BAR_HEIGHT - currentHeight)
    );

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + ((Math.random() * 100) + 1) + '%, 50%)';
    }

    ctx.fillRect(
        CLOUD_X + FONT_GAP + (BAR_WIDTH + COLUMN_GAP) * i,
        (FONT_GAP * 2) + GAP + (BAR_HEIGHT - currentHeight),
        BAR_WIDTH,
        currentHeight
    );
  }
};
