# 2차 프로젝트
## 목차
 - [개요](#개요)
 - [주요기능](#주요기능)
 - [팀 내 역할](#팀-내-역할)
 - [DB구성](#db구성)
 - [이슈사항](#이슈사항)

## 개요
- 기간 : 2024-07-18 ~ 2024-08-05 (2주)

- 개발인원 : 3명
   - 팀원1  : 회원가입 및 로그인, 마이페이지 구현(FE,BE)
   - 팀원2 : 게시판, 댓글, 답글, 좋아요 구현(FE)
   - 팀원3 : 게시판, 댓글, 답글, 좋아요 구현(BE)

- 기술스택   
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/HTML-D0654C?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"> <img src="https://img.shields.io/badge/Typescript-3D6AAC?style=for-the-badge&logo=Typescript&logoColor=white"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> 
<img src="https://img.shields.io/badge/-NestJs-ea2845?style=for-the-badge&logo=nestjs&logoColor=white"> <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&labelColor=52B0E7&logoColor=FFF"> <img src="https://shields.io/badge/MySQL-blue?logo=mysql&style=for-the-badge&logoColor=white&labelColor=blue"> 

- 목표
   - 1 ) 유튜브 쇼츠 형태의 무한 스크롤 게시판 구현   
   - 2 ) 소셜 인증   
   - 3 ) 댓글, 답글, 좋아요 구현

- 프론트엔드 git : https://github.com/J-non/Devops_Project_02_Front
 
## 주요기능
### 메인화면
<img src='https://github.com/user-attachments/assets/3703716a-8ff5-4362-95ec-2583500447be'/>


- 렌덤 게시글 확인 및 게시글 작성 
- 로그인 및 회원가입 이동

### 회원가입 및 로그인
<img src='https://github.com/user-attachments/assets/1ed05a1c-4b3a-43fa-b34a-2bb9975f2065' width='49%' height='500px' />
<img src='https://github.com/user-attachments/assets/bb10ba31-b08f-4fb4-a74b-68b5e7e94d0f' width='49%' height='500px' />


 - 이메일을 사용한 가입 및 인증
 - OAuth를 통한 사용자 검증 및 사용자 정보 조회

### 게시판
<img src='https://github.com/user-attachments/assets/78ce0478-153f-43ed-b6dd-961a0c9fccdf' />
<img src='https://github.com/user-attachments/assets/440781af-c7f1-42f0-bb01-889ebc87ff8e' />


 - 게시글 수정 및 삭제
 - 특정 게시글에 대한 좋아요 확인 및 설정
 - 댓글과 글 작성 및 수정, 삭제 
 - 댓글과 답글에 대한 좋아요 설정


## DB구성
<img src='https://github.com/user-attachments/assets/b4a739d2-5340-41e0-9a1a-e07fe413fdb1' />

 테이블명 |  설명 |
:------------: | :-----------: |
 user | 사용자의 정보 |
 post | 사용자가 작성한 게시글 |
post_likes | 게시글에 대한 좋아요 |
comment | 게시글에 대한 댓글|
comment_likes | 댓글에 대한 좋아요|
reply | 댓글에 대한 답글|
reply_likes | 답글에 대한 좋아요|
 

## 맡은 기능

### 백엔드 담당

- NestJS를 사용한 api구현
- Swagger를 통한 api 문서화
- REST 원칙을 최대한 준수하여 유지보수와 확장성 확보
- 데이터 파싱을 통해 클라이언트가 효율적으로 데이터를 사용할 수 있도록 개선


## 이슈사항
 이슈사항 |  해결방안|
:------------: | :-----------: |
 소셜 인증시 로그인과 회원가입 기준 모호 | DB에 저장된 사용자 정보 유무에 따라 구분 |
 서버 분리 과정에서 cookie전송 실패 | 프론트 서버를 통해 전송된 cookie 저장 |
 댓글창 스크롤시 게시판이 스크롤되는 현상 | 마우스 위치에 따라 스크롤 감지 |
