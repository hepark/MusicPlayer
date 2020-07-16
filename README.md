### 수업 중 느낀 점

아래 적는 내용은, 그간 수업을 들은 후기에 가까운 듯 합니다. (:-)

코로나 때문에 몇 달 수업을 쉬는 동안, "인사이트 자바스크립트"라는 책을 읽었는데,
작년에는 3/1 지점에서 더 이상 속도가 나지 않던 책이, 올초 2번의 수업을 듣고 온라인 공부한 후에는 정말 술술 읽히더라구요.

그 후로 여러가지 스크립트 책을 읽으며,
다른 곳은 어떻게 설명했는지 비교하며 공부하는 중이었습니다. (아주 많이는 못했지만 ㅠㅠ)

하지만, 이론은 알겠는데 코드를 적으라면 아무 생각이 안 나서, 지금은 저번 수업때 알려주신 방법으로 깜지를 쓰고 있습니다.
타자 치는 것과 또 다른 느낌인데, 내가 헷갈리는 부분이 좀더 드러나는 듯 합니다.

그리고 예전에 야무님 수업 들을 때는 50% 정도만 이해하고 아주 나중에 알게 되는 경우가 많았는데,
지금은 수업 내용이 전부 이해가 되는 걸 보면, 저에게는 이 수업 방식이 훨씬 맞는 듯 합니다.
정말 감사드립니다. (-.-) (_ _) (-.-)


#  질문 1.
Toast.js 부터 거의 소스를 외우는 느낌으로 하나하나 분석하면서 작업하고 있는데,
this가 헷갈리는 거 같아요.


생성자 함수를 만들 때 this. 으로 만드는 이유 => 일반함수의 this는 window를 가르키므로(?)<br>
prototype 메소드를 정의할 때도 this.으로 만들고, => ?? <br>

아래 소스를 화살표 함수로 변환하는 작업을 해보려고 하니 안 되네요.

```javascript
Toast.prototype.close = function() {
  var _this = this;
  var _config = this._config;
  this._toastNode.classList.remove('open');

  window.setTimeout(function() {
    _this.destroy(); // 파괴
    typeof _config.onClose === 'function' && _config.onClose();
  }, 500);
};
```

구글링 하다가 더 이해가 안 되는 소스를 발견하고 포기했어요. (링크 : https://velog.io/@grinding_hannah/JavaScript-%ED%99%94%EC%82%B4%ED%91%9C%ED%95%A8%EC%88%98arrow-function-%EC%95%8C%EA%B8%B0)

```javascript
var status = "😎";

setTimeout(() => { 
  const status = "😍"; 
  
  const data = { 
    status: "🥑", 
    getStatus: function() { 
      return this.status;
    }
  }; 
  
console.log(data.getStatus.call(this));        //😎
```


#  질문 2. 

네임스페이스를 작성할 떄, 스크립트 페이지 상단마다 모두 적어놓는 게 괜찮을까요?
왠지 가독성에도 좋을 거 같고, 안전할 것 같기도 한데 이상한 코딩방식인가 싶어서 문의드립니다.

아니면 index.js 같은 곳에 한번만 명시를 하고, <br>
모든 소스에 window.Y = window.Y || {}; 이걸 적는게 나은 방식인가요?

```javascript
// @namespace
  window.Y = window.Y || {};
  var Y = window.Y;
```

감사합니다.




