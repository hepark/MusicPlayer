[← 뒤로](./README.md)


# HTML5 Audio API

HTML5 [Audio 요소](https://www.w3.org/TR/html52/semantics-embedded-content.html#the-audio-element)는 웹 문서(또는 앱)에 오디오 콘텐츠를 추가할 때 사용합니다. 
([Audio Element](https://caniuse.com/#feat=audio), [MP3](https://caniuse.com/#feat=mp3) 모두 IE 9+ 지원)

```html
<audio src="media/mp3/노래.mp3" controls></audio>
```

노래 제목을 함께 표시할 경우, 피규어(figure)로서 다음과 같이 구조화 할 수 있습니다.

```html
<figure>
  <figcaption>노래 제목</figcaption>
  <audio src="media/mp3/노래.mp3" controls></audio>
</figure>
```

## 글로벌 속성

오디오 요소에 설정 가능한 전역 속성은 다음과 같습니다.

속성 | 설명
--- | ---
src | 오디오 리소스 URL을 설정합니다.
preload | 오디오 리소스 프리 로딩 방법을 설정합니다. (`metadata`, `auto`, `none`)
controls | 재생, 일시 정지, 탐색, 볼륨 컨트롤을 표시합니다.
loop | 오디오 리소스를 반복 재생 합니다. (`true`, `false`)
muted | 음소거를 설정합니다. (`true`, `false`)
currentTime | 오디오 리소스의 현재 재생시간 입니다. (읽기/쓰기 가능)
duration | 오디오 리소스의 총 재생시간(길이) 입니다. (읽기만 가능)
autoplay | 가능한 빠른 시점에 재생을 시작합니다. (⚠️ 자동 재생은 접근성 문제를 야기하므로 주의 필요)
crossorigin | 동일 출처 정책(CORS, 보안 이슈)을 처리하는 방법을 설정합니다. (`anonymous`, `use-credentials`)

## 이벤트

오디오 요소에 설정 가능한 이벤트 중 일부는 다음과 같습니다. ([미디어 이벤트](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events) 참고)

이벤트 이름 | 설명
--- | ---
canplay | 오디오 재생 가능하지만, 끝까지 재생할 수 있는 충분한 데이터가 아직 로드되지 않은 것으로 추정합니다.
canplaythrough | 오디오를 끝까지 재생할 수 있는 것으로 추정합니다.
play | 오디오 재생 시작될 때 이벤트가 발생합니다.
pause | 오디오가 일시 정지될 때 이벤트가 발생합니다.
timeupdate | currentTime이 변경(재생시간 변경) 될 때 이벤트가 발생합니다.
ended | 오디오 재생이 종료된 상태로 재생이 중지될 때 이벤트가 발생합니다.
ratechange | 재생 속도가 변경될 때 이벤트가 발생합니다.
seeking | 탐색 구간을 찾기 시작할 때 이벤트가 발생합니다. (`seeking` 값이 `true`로 변경 됨)
seeked | 탐색 구간을 찾았을 때 이벤트가 발생합니다. (`seeking` 값이 `false`로 변경 됨)
volumechange | 볼륨이 조정되면 이벤트가 발생합니다.
waiting | 일시적인 데이터 부족으로 오디오 재생이 정지되면 이벤트가 발생합니다.
playing | 일시적인 데이터 부족으로 오디오 재생을 정지된 후, 재생 준비가 되면 이벤트가 발생합니다.

## 오디오 객체를 생성 또는 참조하는 방법

방법 1

```js
// Audio 클래스를 사용해 인스턴스 생성 (IE 10+ 지원)
var audio = new Audio(resourceURL); // 오디오 리소스 URL(옵션)

// HTMLAudioElement 객체
console.log(audio);
```

방법 2

```js
// 동적으로 <audio></audio> 요소를 생성/조작한 후 문서에 삽입
var audio = document.createElement('audio');
audio.setAttribute('src', resourceURL);
document.body.append(audio);

// HTMLAudioElement 객체
console.log(audio);
```

방법 3

```js
// 문서에 이미 존재하는 <audio class="audio"></audio> 참조
var audio  = document.querySelector('.audio');

// HTMLAudioElement 객체
console.log(audio);
```

## 오디오 재생 가능 시점에서 재생하는 방법

방법 1 (권장)

```js
// 오디오 재생이 가능하나, 끝까지 재생할 수 있는 충분한 데이터가 아직 로드되지 않은 것으로 추정
audio.addEventListener('canplay', handlePlay);

// 오디오를 끝까지 재생할 수 있는 것으로 추정
audio.addEventListener('canplaythrough', handlePlay);

// 핸들러
function handlePlay(e) {
  audio.play();
}
```

방법 2

```js
audio.addEventListener('loadeddata', handlePlay);

function handlePlay(e) {
  if (audio.readyState >= 2) {
    audio.play();
  }
}

// readyState 상수 값 해설
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// HAVE_NOTHING      0 — 미디어 리소스 정보 없음
// HAVE_METADATA     1 — 미디어 리소스 메타데이터 검색 됨
// HAVE_CURRENT_DATA 2 — 미디어 리소스 현재 재생 준비 됨 (현재 프레임만)
// HAVE_FUTURE_DATA  3 — 미디어 리소스 다음 프레임까지 재생 준비 됨 (2개 이상 프레임)
// HAVE_ENOUGH_DATA  4 — 미디어 리소스를 중단없이 끝까지 재생 가능 함
```

## 오디오를 정지하는 방법

방법 1. 유틸리티 함수

```js
function stopAudio(audio) {
  audio.pause();
  audio.currentTime = 0;
}
```

방법 2. Audio 프로토타입 확장

```js
Audio.prototype.stop = function() {
  this.pause();
  this.currentTime = 0;
}
```

방법 3. Audio 클래스를 상속한 새로운 클래스 활용 (ES6 지원 브라우저에서 호환)

```js
class Y9Audio extends Audio {
  constructor(src) {
    super(src);
  }

  // 새로운 인스턴스 메서드 추가
  stop() {
    this.pause();
    this.currentTime = 0;
  }
}
```

---

ℹ️ 웹에서 오디오를 컨트롤하는 강력한 [Web Audio API](https://developer.mozilla.org/ko/docs/Web/HTML/Element/audio)를 활용할 수 있지만, [IE는 미지원](https://caniuse.com/#feat=audio-api)입니다.