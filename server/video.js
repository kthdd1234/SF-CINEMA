const mutiply = (a, b) => {
  return a * b;
};

const square = (n) => {
  return mutiply(n, n);
};

const printSquare = (n) => {
  const squared = square(n);
  console.log(squared);
};

printSquare(4);

/* 

Call Stack 실행 순서 

1. 코드를 실행하면 실행되는 코드 자체를 말하는 메인 함수를 스택에 집어넣음
2. 그리고 나서 위에서 정의한 함수들을 정의함
3. 마지막으로 가서 printSquare 를 만나게 됨. printSquare(4) 는 함수 호출이니, 스택에 printSquare(4) 를 추가함
4. 그러면 바로 square 를 호출하게 됨. 스택에 square(n) 를 추가함
5. 이제 multiply 를 호출함. 이때 return 절을 만나서 a 와 b 를 곱한 결과를 반환함 
6. 중요한점이 무엇인가를 리턴할때마다 스택 맨 위에 있는것을 꺼내게 됨
7. multiply -> square 로 return 되고 다시 square -> printSquare 로 return 됨
8. cosole.log 를 실행(여기에 리턴은 보이지 않지만, 암묵적으로 리턴합니다.)

블로킹: 느리게 동작하는 코드

*/

console.log('인터스텔라');

setTimeout(() => {
  console.log('어벤져스');
}, 5000);

console.log('SFCINEMA');

/* 
대략적인 실행순서

1. console.log('인터스텔라') 출력
2. setTimeout 을 실행(스택에 추가되지 않고 사라져버림-> 그러다가 5초후에 마법처럼 스택에 추가됨)
3. console.log('SFCINEMA') 출력

자세한 실행순서

1. 코드를 실행하면 콘솔에 인터스텔라를 출력
2. 콜백함수와 지연시간을 setTimeout 콜에 넘기면(setTimeout 은 브라우저에서 제공하는 API)
3. 브라우저가 타이머를 실행시키고 카운트 다운(지연시간)을 시작, 이때 setTimeout 호출 자체는 완료되었다는 의미이고 스택에서 함수를 지울수 있숨
4. 콘솔에 SFCINEMA 를 출력하고 스택에서 지워짐, 이제 Web API 에서 실행하고 있는 타이머가 남았슴
5. 5초 뒤에 타이머가 종료되는데 Web API 는 갑자기 작성된 코드에 끼여들 순 없슴(어느 순간 갑자기 스택에 함수를 집어넣던가 하는 것)
6. 이제 테스크 큐와 콜백 큐가 활약할 차례?
7. 모든 Web API 는 작동이 완료되면 콜백을 테스크 큐에 밀어넣음
8. * 이벤트 루프는 이 전체 시스템에서 아주 단순한 일을 하는 작은 파트, 스택이 비워질때까지 기다린 후에 큐에 있는 콜백을 스택에 넣음/스택은 계속해서 실행됨 *
9. 스택이 비어있으면, 큐의 첫번째 콜백을 스택에 쌓아 효과적으로 실행할 수 있게 해줌
10. 그래서 스택이 비어있고 테스크 큐에는 콜백이 하나 있음(Callback function)
11. 그럼 이벤트 루프는 "어, 내가 할일이 있네. 자 이거 받아" 하며 콜백을 스택에 집어 넣음
12. 스택에 들어간 console.log('어벤져스') 를 실행하게됨.

> 모든 이런 종류의 Web API 는 동일한 방식으로 동작합니다.
  Ajax Request 는 URL 로 호출할 때 콜백을 함께 실행하게 됩니다.
  한마디로 자세한 실행순서에서 나열한 순서랑 같은 흐름임
  XHR 실행이 완료되었다면 콜백은 큐에 쌓이게 되고, 이벤트 루프가 실행되어 스택에 쌓이게 됨
  이 과정이 비동기 함수가 호출되는 방식입니다.
  
*/
