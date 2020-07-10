import React from 'react';

export default function Header() {
  return (
    <div>
      <center>
        <h1 style={{}}>SF CINEMA</h1>
        <div
          style={{
            position: 'absolute',
            left: '72%',
            top: '60px',
          }}
        >
          로그인
        </div>
        <hr
          style={{
            marginRight: '25%',
            marginLeft: '25%',
          }}
        />
        <nav>
          <ul
            style={{
              listStyle: 'none',
              display: 'block',
            }}
          >
            <li
              style={{
                display: 'inline-block',
                padding: '0 24px',
              }}
            >
              외계인
            </li>
            <span>|</span>
            <li
              style={{
                display: 'inline-block',
                padding: '0 24px',
              }}
            >
              인간과 우주
            </li>
            <span>|</span>
            <li
              style={{
                display: 'inline-block',
                padding: '0 24px',
              }}
            >
              로봇 * AI
            </li>
            <span>|</span>
            <li
              style={{
                display: 'inline-block',
                padding: '0 24px',
              }}
            >
              시간 여행
            </li>
            <span>|</span>
            <li
              style={{
                display: 'inline-block',
                padding: '0 24px',
              }}
            >
              슈퍼 히어로
            </li>
          </ul>
        </nav>
      </center>
    </div>
  );
}
