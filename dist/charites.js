(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Bit, h;

h = require('../helpers');

Bit = (function() {
  Bit.prototype.oa = {};

  function Bit(o) {
    this.o = o != null ? o : {};
    this.vars();
    this.imidiate && this.run();
  }

  Bit.prototype.vars = function() {
    this.size = this.o.size || 100;
    this.size *= h.pixel;
    this.cnt = this["default"]({
      prop: 'cnt',
      def: 0
    });
    this.oldRadius = this.radius;
    this.radius = this["default"]({
      prop: 'radius',
      def: 50
    });
    this.radius *= h.pixel;
    this.el = this.o.el || this.el || this.createContext();
    (this.o.el != null) && (this.foreignContext = true);
    this.ctx = this.ctx || this.el.getContext('2d');
    this.radius !== this.oldRadius && this.setElSize();
    this.color = this["default"]({
      prop: 'color',
      def: 'deeppink'
    });
    this.rate = this["default"]({
      prop: 'rate',
      def: .5
    });
    this.fillRate = this["default"]({
      prop: 'fillRate',
      def: .33
    });
    this.duration = this["default"]({
      prop: 'duration',
      def: 600
    });
    this.delay = this["default"]({
      prop: 'delay',
      def: 0
    });
    this.easing = this["default"]({
      prop: 'easing',
      def: 'Linear.None'
    });
    this.easingArr = this.easing.split('.');
    this.imidiate = this.o.imidiate;
    if (this.imidiate == null) {
      this.imidiate = true;
    }
    this.x = this.foreignContext ? this["default"]({
      prop: 'x',
      def: this.radius
    }) : this.radius;
    return this.y = this.foreignContext ? this["default"]({
      prop: 'y',
      def: this.radius
    }) : this.radius;
  };

  Bit.prototype.createContext = function() {
    if (this.foreignContext) {
      return;
    }
    this.el = document.createElement('canvas');
    return h.body.appendChild(this.el);
  };

  Bit.prototype.setElSize = function() {
    this.el.setAttribute('width', 2 * this.radius);
    this.el.setAttribute('height', 2 * this.radius);
    if (h.pixel > 1) {
      this.el.style.width = "" + this.radius + "px";
      this.el.style.height = "" + this.radius + "px";
    }
    return this.el;
  };

  Bit.prototype["default"] = function(o) {
    var def, prop;
    prop = o.prop;
    def = o.def;
    return this[prop] = this.oa[prop] != null ? this.oa[prop] : this[prop] != null ? this[prop] : this.o[prop] != null ? this.o[prop] : def;
  };

  return Bit;

})();

module.exports = (function() {
  return Bit;
})();


},{"../helpers":4}],2:[function(require,module,exports){
var Bit, Burst, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require('../polyfills');

h = require('../helpers');

Bit = require('./bit');

Burst = (function(_super) {
  __extends(Burst, _super);

  function Burst() {
    return Burst.__super__.constructor.apply(this, arguments);
  }

  Burst.prototype.run = function(oa) {
    var it;
    this.oa = oa != null ? oa : {};
    this.vars();
    TWEEN.remove(this.tween);
    TWEEN.remove(this.tween2);
    it = this;
    this.tween2 = new TWEEN.Tween({
      r: this.radius * this.rate
    }).to({
      r: this.radius
    }, this.duration / 2).easing(TWEEN.Easing[this.easingArr[0]][this.easingArr[1]]).onUpdate(function() {
      return it.draw2.call(this, it);
    });
    return this.tween = new TWEEN.Tween({
      r: this.radius * this.rate,
      p: 0,
      lw: this.radius * this.fillRate
    }).to({
      r: this.radius,
      p: 1,
      lw: 0
    }, this.duration / 2).easing(TWEEN.Easing[this.easingArr[0]][this.easingArr[1]]).onUpdate(function() {
      return it.draw.call(this, it);
    }).delay(this.delay).chain(this.tween2).start();
  };

  Burst.prototype.vars = function() {
    Burst.__super__.vars.apply(this, arguments);
    this.degreeRate = 1;
    this.step = (this.degreeRate * 2 * Math.PI) / this.cnt;
    this.rotateStep = this.degreeRate * 360 / this.cnt;
    this.bitWidth = this["default"]({
      prop: 'bitWidth',
      def: 1
    });
    this.initialRotation = this["default"]({
      prop: 'initialRotation',
      def: 0
    });
    return h.lock({
      lock: 'isRotationLock',
      fun: (function(_this) {
        return function() {
          return _this.initialRotation *= Math.PI / 180;
        };
      })(this)
    });
  };

  Burst.prototype.draw = function(it) {
    var angle, ctx, i, rotateAngle, x1, x2, y1, y2, _i, _ref;
    ctx = it.ctx;
    ctx.clear();
    ctx.beginPath();
    rotateAngle = 0;
    angle = it.initialRotation;
    for (i = _i = 0, _ref = it.cnt; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      x1 = it.x + (Math.cos(angle) * (it.radius * it.rate));
      y1 = it.y + (Math.sin(angle) * (it.radius * it.rate));
      x2 = it.x + (Math.cos(angle) * this.r);
      y2 = it.y + (Math.sin(angle) * this.r);
      it.drawLine({
        point1: {
          x: x1,
          y: y1
        },
        point2: {
          x: x2,
          y: y2
        },
        ctx: ctx
      });
      rotateAngle += it.rotateStep;
      angle += it.step;
    }
    ctx.stroke();
    ctx.lineWidth = it.bitWidth * h.pixel;
    ctx.strokeStyle = it.color;
    return ctx.stroke();
  };

  Burst.prototype.drawLine = function(o) {
    o.ctx.moveTo(o.point1.x, o.point1.y);
    return o.ctx.lineTo(o.point2.x, o.point2.y);
  };

  Burst.prototype.draw2 = function(it) {
    var angle, ctx, i, rotateAngle, x1, x2, y1, y2, _i, _ref;
    ctx = it.ctx;
    ctx.clear();
    ctx.beginPath();
    rotateAngle = 0;
    angle = it.initialRotation;
    for (i = _i = 0, _ref = it.cnt; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      x1 = it.x + (Math.cos(angle) * this.r);
      y1 = it.y + (Math.sin(angle) * this.r);
      x2 = it.x + (Math.cos(angle) * it.radius);
      y2 = it.y + (Math.sin(angle) * it.radius);
      it.drawLine({
        point1: {
          x: x1,
          y: y1
        },
        point2: {
          x: x2,
          y: y2
        },
        ctx: ctx
      });
      rotateAngle += it.rotateStep;
      angle += it.step;
    }
    ctx.stroke();
    ctx.lineWidth = it.bitWidth * h.pixel;
    ctx.strokeStyle = it.color;
    return ctx.stroke();
  };

  return Burst;

})(Bit);

module.exports = (function() {
  return Burst;
})();


},{"../helpers":4,"../polyfills":5,"./bit":1}],3:[function(require,module,exports){
var Burst, animationLoop, bubble1, canvas, h;

Burst = require('./bits/burst');

h = require('./helpers');

canvas = document.getElementById('js-canvas');

bubble1 = new Burst({
  radius: 100,
  duration: 1000,
  delay: 200,
  initialRotation: 45,
  cnt: 2,
  rate: 0.5
});

window.addEventListener('click', function(e) {
  var rad, size1, style1;
  style1 = h.getStyle(bubble1.el);
  size1 = parseInt(style1.width, 10);
  bubble1.el.style.position = 'absolute';
  bubble1.el.style.top = "" + (e.y - (size1 / 2)) + "px";
  bubble1.el.style.left = "" + (e.x - (size1 / 2)) + "px";
  rad = h.rand(30, 50);
  return bubble1.run({
    duration: 11400,
    radius: rad,
    rate: 0,
    bitWidth: 1,
    initialRotation: 30
  });
});

animationLoop = function(time) {
  requestAnimationFrame(animationLoop);
  return TWEEN.update(time);
};

animationLoop();


},{"./bits/burst":2,"./helpers":4}],4:[function(require,module,exports){
var Helpers;

Helpers = (function() {
  Helpers.prototype.pixel = 2;

  function Helpers(o) {
    this.o = o != null ? o : {};
  }

  Helpers.prototype.doc = document;

  Helpers.prototype.body = document.body;

  Helpers.prototype.getStyle = function(el) {
    var computedStyle;
    if (window.getComputedStyle) {
      return computedStyle = getComputedStyle(el, null);
    } else {
      return computedStyle = el.currentStyle;
    }
  };

  Helpers.prototype.rand = function(min, max) {
    return Math.floor((Math.random() * ((max + 1) - min)) + min);
  };

  Helpers.prototype.lock = function(o) {
    !this[o.lock] && o.fun();
    return this[o.lock] = true;
  };

  return Helpers;

})();

module.exports = (function() {
  return new Helpers;
})();


},{}],5:[function(require,module,exports){
module.exports = (function() {
  if (!CanvasRenderingContext2D.prototype.clear) {
    return CanvasRenderingContext2D.prototype.clear = function(preserveTransform) {
      if (preserveTransform) {
        this.save();
        this.setTransform(1, 0, 0, 1, 0, 0);
      }
      this.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (preserveTransform) {
        this.restore();
      }
    };
  }
})();


},{}]},{},[3])