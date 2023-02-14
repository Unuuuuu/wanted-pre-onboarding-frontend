# 원티드 프리온보딩 프론트엔드 인턴쉽 선발 과제

2023.02.20(월) - 2023.03.17(금) 4주간 진행될 [원티드 프리온보딩 프론트엔드 인턴쉽](https://www.wanted.co.kr/events/pre_ob_fe_9)의 선발 과제입니다.

과제의 자세한 스펙은 [이곳](https://github.com/walking-sunset/selection-task/)에서 확인하실 수 있습니다.

## 기술 스택

- [typescript](https://www.typescriptlang.org/)
- [react](https://reactjs.org/)
- [react router dom](https://reactrouter.com/en/main)
- [clsx](https://github.com/lukeed/clsx)
- [axios](https://axios-http.com/)
- [tailwindcss](https://tailwindcss.com/)
- [daisyui](https://daisyui.com/)
- [react hot toast](https://react-hot-toast.com/)

## 구현 사항

### 공통

- context api를 사용해 access token 상태 관리를 구현
- form validation 구현
- promise chaining을 사용한 error handling 구현

### /signup

- react router dom의 loader function을 정의하여, react component가 렌더되기 전에 local storage에 access token이 있다면 `/todo`로 redirect되도록 구현
- axios를 사용한 회원가입 http 통신 구현

### /signin

- react router dom의 loader function을 정의하여, react component가 렌더되기 전에 local storage에 access token이 있다면 `/todo`로 redirect되도록 구현
- axios를 사용한 로그인 http 통신 구현

### /todo

- react router dom의 loader function을 정의하여, react component가 렌더되기 전에 local storage에 access token이 없다면 `/signin`으로 redirect되도록 구현
- todo의 CRUD 구현
- axios를 사용한 http 통신으로 server state 업데이트 구현

## 배포 링크

https://wanted-pre-onboarding-frontend-by-unu.netlify.app

## 로컬 서버 실행 방법

```bash
echo "REACT_APP_API_URL = 'https://pre-onboarding-selection-task.shop'" > .env.local
npm install
npm start
```
