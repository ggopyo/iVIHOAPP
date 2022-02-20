# 개발모드에서 실행하기
아직 배포 전 검증과정에 있습니다. 배포가 완료되는 대로 해당 링크를 첨부하려고 합니다.

![image](https://user-images.githubusercontent.com/34387356/154851091-cfea1181-525a-4194-84f0-b89ef2631f91.png)

개발 모드에서 실행하기 위해서는 nodeJS가 설치되어 있는 환경에서 해당 코드를 다운 받아
콘솔창을 열고 frontend, backend 각각의 폴더 경로에서 package.json 파일이 있는 것을 확인하고 
npm i를 실행하여 주시면 됩니다. 

![image](https://user-images.githubusercontent.com/34387356/154851693-a9d65edb-a91e-4753-ad7a-498760c83bbd.png)

설치가 완료되면 backend,frontend 폴더에서 각각 순서대로 npm start를 실행하면 브라우저에서 
[http://localhost:3000]로 자동 연결이 되게 됩니다.

## 접속 방법
![image](https://user-images.githubusercontent.com/34387356/154850765-1c7cc8d9-2355-4779-8457-5392d5fcb23a.png)

[http://localhost:3000]에 접속한 후, 화면 중앙 [회원가입 없이 계속하기]를 클릭하시면 
기존에 등록되어 있는 계정으로 로그인이 됩니다.

## 화면 구성
![image](https://user-images.githubusercontent.com/34387356/154850743-907b0768-7a10-490f-9461-3577a9c5b483.png)

화면 상단 네비게이션 우측편에 회원 계정 상태와 각종 버튼이 있습니다.
화면 왼쪽은 나의 프로필, 화면 오른쪽은 조회할 상대방의 프로필입니다.

가운데 화면은 전체 검색을 하는 데 쓰이며 나의 데이터는 왼쪽 고정 메뉴바 상단에 조그만 검색창을 통해
검색하실 수 있습니다.

왼쪽 고정 메뉴바를 클릭하면 그 클릭된 값에 따라 화면에 표시되는 내용이 변경됩니다. 
