
// @namespace
  window.Y = window.Y || {};
  var Y = window.Y;

(function(Y) {
  function loadStyle(source, callback) {
    var s = null;

    if (source && typeof source === 'string') {
      s = document.createElement('link');
      s.setAttribute('href', source);
      s.setAttribute('rel', 'stylesheet');
      document.head.appendChild(s);
    }
    
    if (s && typeof callback === 'function') {
      s.addEventListener('load', callback);
    }
  }
  function loadScript(source, callback) {
    var s = null;
    
    if (source && typeof source === 'string') {
      s = document.createElement('script');
      s.setAttribute('src', source);
      document.head.appendChild(s);
    }
    
    if (s && typeof callback === 'function') {
      s.addEventListener('load', callback);
    }
  }
  function loadScripts(list, callback) {
    var _list = list.slice().map(function(item) {
      return {
        url: item,
        complete: false
      }
    });

    _list.forEach(function(item) {
      loadScript(item.url, function() {
        item.complete = true;
      });
    });

    var clearId = window.setInterval(function() {
      var allCompleted = _list.every(function(item) {
        return item.complete === true;
      });
      if (allCompleted) {
        window.clearInterval(clearId);
        typeof callback === 'function' && callback();
      }
    }, 100);
  }

  // IIFE 외부에서 사용
  Y.loadScript = loadScript
  Y.loadScripts = loadScripts
  Y.loadStyle = loadStyle

})(window.Y)