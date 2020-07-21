import React from 'react';

export default function Header() {
  return (
    <div>
      <center>
        <h1
          style={{
            padding: '15px 0 0 0',
          }}
        >
          SF CINEMA
        </h1>
        <div
          style={{
            position: 'absolute',
            left: '72%',
            top: '5%',
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
              평점이 높은순
            </li>
            <span>꒐</span>
            <li
              style={{
                display: 'inline-block',
                padding: '0 24px',
              }}
            >
              영화 개봉순
            </li>
            <span>꒐</span>
            <li
              style={{
                display: 'inline-block',
                padding: '0 24px',
              }}
            >
              운영자 추천
            </li>
            <span>꒐</span>
            <li
              style={{
                display: 'inline-block',
                padding: '0 24px',
              }}
            >
              시리즈물
            </li>
            <span>꒐</span>
            <li
              style={{
                display: 'inline-block',
                padding: '0 24px',
              }}
            >
              SF 명작
            </li>
          </ul>
        </nav>
      </center>
    </div>
  );
}
