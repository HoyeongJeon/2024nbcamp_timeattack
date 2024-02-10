## 프로젝트 개요

로그인과 회원가입 구현하기.

## 우수상 / 코드 리뷰
![image](https://github.com/HoyeongJeon/2024nbcamp_timeattack/assets/78394999/33446b73-13c9-44af-8d2e-54922f72195b)
![image](https://github.com/HoyeongJeon/2024nbcamp_timeattack/assets/78394999/35ec46a7-86d6-4c11-9bbe-a165b5b6bee3)


## Erd

![image](https://github.com/HoyeongJeon/2024nbcamp_timeattack/assets/78394999/c0e9d14e-6b5d-498b-bfad-4d0b6768c060)

## API 명세서

auth.http 파일 참고

![image](https://github.com/HoyeongJeon/2024nbcamp_timeattack/assets/78394999/a2481212-a0ce-46f0-802f-663d31345b5e)
![image](https://github.com/HoyeongJeon/2024nbcamp_timeattack/assets/78394999/45a6c6f9-ce28-4296-a595-b447133dc65c)
![image](https://github.com/HoyeongJeon/2024nbcamp_timeattack/assets/78394999/02be7059-8b5d-405b-a4f7-5ad026c9e9bd)
![image](https://github.com/HoyeongJeon/2024nbcamp_timeattack/assets/78394999/15536dae-68d3-4e18-9db0-6cdff2964dba)
![image](https://github.com/HoyeongJeon/2024nbcamp_timeattack/assets/78394999/f359be52-8966-447a-9732-9b9aea7e403e)

## 구현 시 중요하게 생각한 부분.

1. 시간내로 완성하기
2. Passport 및 JWT를 사용해 인증 구현하기

- 로그인을 할 때 Passport와 JWT를 활용해 인증을 하는 것을 목표로 했다.

3. https 적용하기

- 보안에 관한 부분을 신경쓰기 위해 https를 적용했다.

4. 반복되는 코드를 줄이기

- 재사용성을 위해 반복되는 코드를 정리하고 common 폴더에 정리했다.

5. 접근 권한에 대한 분리

- 로그인 한 사용자가 접근할 수 있는 페이지와 없는 페이지를 Guard를 통해 구분했다.
