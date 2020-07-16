/**
 * @module ToastComponent
 */

function ToastComponent() {
  'use strict';
  function Toast(options) {
    this._config = mixins({}, Y.toast.defaultOptions, options);
    this._toastZoneNde = null;
    this._toastNode = null;
    this.create();
  }

  Toast.defaultOptions = {
    initVisible: true,
    autoHide: false,
    autoHideTime: 3000,
    html: 'Toast 컴포넌트 내용',
    classes: '',
    delay: 100,
    onOpen: null,
    onClose: null,
  };

  Toast.template = [
    '<div class="toast">\
      <div class="toast__content"></div>\
      <button type="button" class="toast__closeButton" aria-label="닫기">×</button>\
    </div >\
    ',
  ];

  Toast.prototype.create = function() { 
    this._toastZoneNode = document.querySelector('#toastZone');
    if (this._toastZoneNode) {
      this._toastZoneNode.insertAdjacentHTML('beforeend', Toast.template);
      var toastNodeList = this._toastZoneNode.querySelectorAll('.toast');
      this._toastNode = toastNodeList[toastNodeList.length - 1];
      this._toastNode.querySelector('.toast__content').innerHTML = this._config.html;
      this._toastNode.querySelector('.toast__closeButton').addEventListener('click', this.close.bind(this));
      this._config.initVisible && this.open();
      this._config.classes && this._toastNode.classList.add(this._config.classes);
    }else {
      console.warn('경고!\n문서에 <div id="toastZone"></div> 요소가 존재하지 않습니다.\n해당 요소가 존재하는지 확인 후 다시 시도해보세요.');
    }
  };

  Toast.prototype.open = function() {
    this._toastNode.classList.add('open');

    if (this._config.autoHide) {
      window.setTimeout(this.close.bind(this), this._config.autoHideTime);
    }
  };

  // Toast.prototype.close = function() {
  //   this._toastNode.classList.remove('open');
  //   window.setTimeout(function() {
  //     this.destroy(); // 파괴
  //     typeof _config.onClose === 'function' && this._config.onClose();
  //   }, 500);
  // }

  Toast.prototype.close = function() {
    var _this = this;
    var _config = this._config;
    this._toastNode.classList.remove('open');

    window.setTimeout(function() {
      _this.destroy(); // 파괴
      typeof _config.onClose === 'function' && _config.onClose();
    }, 500);
  };

  Toast.prototype.destroy = function() {
    this._toastNode.parentNode.removeChild(this._toastNode);
  }

  // Y.toast = function(options) {
  //   return new Toast(options);
  // };
  Y.toast = options => new Toast(options);


  Y.toastList = function(optionsList) {
    return optionsList.map(function(options) {
      return new Toast(options);
    });
  };
  Y.toast.defaultOptions = Toast.defaultOptions;
}
  