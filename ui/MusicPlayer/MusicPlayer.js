/**
 * @class MusicPlayer
 */

(function(Y) {
  class MusicPlayer {
    constructor (options = {}) {
      this._userOptions = options;

      this.playerNode = null;
      this.infoNode = null;
      this.titleNode = null;
      this.progressbarNode = null;
      this.progressNode = null;
      this.audioNode = null;
      this.coverNode = null;
      this.playPauseButtonNode = null;
      this.prevButtonNode = null;
      this.nextButtonNode = null;

      this._isPlaying = false;
      this._currentIndex = 0;
    }

    static defaultProps = {
      el: null,
      playlist: [],
      autoplay: false,
      continuePlaying: true,
      onLoaded: null,
      onProgress: null,
      onEnded: null,
    }

    static mixins(...o) {
      return Object.assign({}, ...o);
    }

    _findDomNodes() {
      const {el} = this._config;
      this.playerNode = el.nodeType === 1 ? el : document.querySelector(`${el}`);

      const playerNode = this.playerNode;
      this.infoNode = playerNode.querySelector('.musicInfo');
      this.titleNode = playerNode.querySelector('.musicTitle');
      this.progressbarNode = playerNode.querySelector('.musicProgressBar');
      this.progressNode = playerNode.querySelector('.progress');
      this.audioNode = playerNode.querySelector('.audio');
      this.coverNode = playerNode.querySelector('.cover');
      this.playPauseButtonNode = playerNode.querySelector('.action-play-pause');
      this.prevButtonNode = playerNode.querySelector('.action-prev');
      this.nextButtonNode = playerNode.querySelector('.action-next');
    }

    _bindEvents() {
      const {
        audioNode,
        prevButtonNode,
        nextButtonNode,
        playPauseButtonNode,
        progressbarNode,
        _handleCanPlay,
        _handleTimeupdate,
        _handlePrev,
        _handleNext,
        _handleTogglePlayPause,
        _handleSeekingAndPlay,
        _handleEnded,
      } = this;

      audioNode.addEventListener('canplay', _handleCanPlay.bind(this));
      audioNode.addEventListener('timeupdate', _handleTimeupdate.bind(this));
      audioNode.addEventListener('ended', _handleEnded.bind(this));
      progressbarNode.addEventListener('click', _handleSeekingAndPlay.bind(this));
      prevButtonNode.addEventListener('click', _handlePrev.bind(this));
      nextButtonNode.addEventListener('click', _handleNext.bind(this));
      playPauseButtonNode.addEventListener('click', _handleTogglePlayPause.bind(this));
    }
    get continuePlaying() {
      return this._config.continuePlaying;
    }
    set continuePlaying(value) {
      this._config.continuePlaying = value;
    }
    getMusicInfo(index = this._currentIndex) {
      const { playlist } = this._config;
      const { title, singer, src, cover } = playlist[index];
      return {
        title: `${singer} — ${title}`,
        src,
        cover,
      };
    }
    changeMusicInfo(index = this._currentIndex) {
      const { audioNode, coverNode, titleNode } = this;
      const { title, cover, src } = this.getMusicInfo(index);
      titleNode.innerText = title;
      audioNode.setAttribute('src', src);
      coverNode.setAttribute('src', cover);
      coverNode.setAttribute('alt', title);
    }
    play() {
      const { audioNode, coverNode, playerNode, playPauseButtonNode } = this;
      this._isPlaying = true;
      audioNode.play();
      playerNode.classList.add('playing');
      playPauseButtonNode.setAttribute('aria-label', '곡 일시정지');
      playPauseButtonNode.setAttribute('title', '곡 일시정지');
      const icon = playPauseButtonNode.querySelector('i');
      icon.classList.remove('fa-play');
      icon.classList.add('fa-pause');
      if (coverNode.style.animation) {
        coverNode.removeAttribute('style');
      }
    }
    pause() {
      const { audioNode, playerNode, playPauseButtonNode } = this;
      this._isPlaying = false;
      audioNode.pause();
      playerNode.classList.remove('playing');
      playPauseButtonNode.setAttribute('aria-label', '곡 재생');
      playPauseButtonNode.setAttribute('title', '곡 재생');
      const icon = playPauseButtonNode.querySelector('i');
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
    }
    stop() {
      this.pause();
      this.audioNode.currentTime = 0;
      this.coverNode.style.animation = 'none';
    }
    next() {
      const { playlist } = this._config;
      this._currentIndex = ++this._currentIndex % playlist.length;
      this.changeMusicInfo();
      this._isPlaying && this.play();
    }
    prev() {
      const { playlist } = this._config;
      this._currentIndex = --this._currentIndex < 0 ? playlist.length - 1 : this._currentIndex;
      this.changeMusicInfo();
      this._isPlaying && this.play();
    }
    _handleCanPlay() {
      const { autoplay, onLoaded } = this._config;
      autoplay && this.play();
      typeof onLoaded === 'function' && onLoaded(this);
    }
    _handlePrev() {
      this.prev();
    }
    _handleNext() {
      this.next();
    }
    _handleTogglePlayPause() {
      this._isPlaying ? this.pause() : this.play();
    }
    _handleTimeupdate(e) {
      const { progressNode, audioNode, _config: { onProgress } } = this;
      const { currentTime, duration } = audioNode;
      const percent = currentTime / duration * 100;
      progressNode.style.width = `${percent}%`;
      typeof onProgress === 'function' && onProgress(percent, this);
    }
    _handleSeekingAndPlay(e) {
      const clickX = e.clientX;
      const { progressbarNode, audioNode } = this;
      const { x, width } = progressbarNode.getBoundingClientRect();
      audioNode.currentTime = (clickX - x) / width * audioNode.duration;
    }
    _handleEnded() {
      const { _config, continuePlaying } = this;
      const { playlist, onEnded } = _config;
      continuePlaying && this.next();
      typeof onEnded === 'function' && onEnded(playlist[this._currentIndex], this);
    }
    _settingCustomEvent(eventType, callback) {
      const cb = typeof callback === 'function' ? callback : null;
      if (this) {
        this._config = MusicPlayer.mixins(this._config, { [eventType]: cb });
      }
    }
    onLoaded(callback) {
      this._settingCustomEvent('onLoaded', callback);
    }
    onProgress(callback) {
      this._settingCustomEvent('onProgress', callback);
    }
    onEnded(callback) {
      this._settingCustomEvent('onEnded', callback);
    }

    init(options) {
      this._userOptions = options;
      this._config = MusicPlayer.mixins(MusicPlayer.defaultProps, this._userOptions);
      this._findDomNodes();
      this._bindEvents();
      this.changeMusicInfo();
    }
  }  

  Y.MusicPlayer = MusicPlayer;

 })(window.Y);