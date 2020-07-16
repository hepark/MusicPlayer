

(function(Y){
  'use strict';

  var mPlayer = new Y.MusicPlayer();
  fetch('/db/playList.json')
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      mPlayer.init({
        el: '#mPlayer',
        playlist: json.playlist,
      });
      mPlayer.onEnded(function(info) {
        var singer = info.singer;
        var title = info.title;
        var message = '다음 재생 곡은 ' + singer + ' — ' + title + ' 입니다.';
        Y.toast({html: message, autoHide: true});
      });
    })
  .catch(function(error) {
    Y.toast({html: `플레이리스트 요청에 실패했습니다.<br>${error.message}`, classes: 'error'});
  });
  
})(window.Y);