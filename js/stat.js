'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#fff';
var SHIFT = 10;
var COLUMN_COLOR = 'rgba(255, 0, 0, 1)';
var COLUMN_SHIFT = 50;
var FONT = '16px PT Mono';
var FONT_COLOR = '#000';
var FONT_SHIFT = 40;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var NAME = 'Вы';

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
      CLOUD_X + SHIFT,
      CLOUD_Y + SHIFT,
      SHADOW_COLOR
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      CLOUD_COLOR
  );

  ctx.font = FONT;
  ctx.fillStyle = FONT_COLOR;
  ctx.fillText(
      'Ура вы победили!',
      CLOUD_X + (3 * SHIFT),
      CLOUD_Y + (3 * SHIFT)
  );
  ctx.fillText(
      'Список результатов:',
      CLOUD_X + (3 * SHIFT),
      CLOUD_Y + COLUMN_SHIFT
  );

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var currentHeight = (BAR_HEIGHT * times[i]) / maxTime;
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(
        names[i],
        CLOUD_X + FONT_SHIFT + (BAR_WIDTH + COLUMN_SHIFT) * i,
        CLOUD_HEIGHT - SHIFT
    );

    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + FONT_SHIFT + (BAR_WIDTH + COLUMN_SHIFT) * i,
        FONT_SHIFT * 2 + (BAR_HEIGHT - currentHeight)
    );

    ctx.fillStyle = names[i] === NAME ? COLUMN_COLOR : 'hsl(240, ' + ((Math.random() * 100) + 1) + '%, 50%)';

    ctx.fillRect(
        CLOUD_X + FONT_SHIFT + (BAR_WIDTH + COLUMN_SHIFT) * i,
        (FONT_SHIFT * 2) + SHIFT + (BAR_HEIGHT - currentHeight),
        BAR_WIDTH,
        currentHeight
    );
  }
};
