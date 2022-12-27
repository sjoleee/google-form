# GOOGLE FORM

[이미지 들어갈 공간]

구글폼 클론코딩!


## 🛠 Skills: 개발환경 및 기술스택

- React.js
- TypeScript
- Redux toolkit
- Styled-components
- MUI
- React-hook-form
- Beautiful-DnD


## 📂 Directory Structure: 디렉토리 구조
```
src
 ┣ assets
 ┣ components
 ┃ ┣ AddCardButton
 ┃ ┣ Card
 ┃ ┣ CardFooter
 ┃ ┣ CardHeader
 ┃ ┣ InputCheckbox
 ┃ ┣ InputRadio
 ┃ ┣ InputSelect
 ┃ ┣ InputTextField
 ┃ ┣ ItemTypeSection
 ┃ ┣ Layout
 ┃ ┣ PreviewCard
 ┃ ┣ PreviewCardTitle
 ┃ ┗ TextFieldSection
 ┣ pages
 ┃ ┣ Form
 ┃ ┣ Preview
 ┃ ┗ Result
 ┣ store
 ┣ style
 ┣ App.tsx
 ┣ index.tsx
 ┗ react-app-env.d.ts
```

## 🌟 Key Features: 주요 기능 소개

[이미지 들어갈 공간]
- 설문지 제목 입력, 편집
- 설문지 설명 입력, 편집



 질문 추가 기능
| --- 
|  <img src="https://user-images.githubusercontent.com/82137004/209636162-cb5f2a7f-1aca-49ab-9e63-e2b2b9f0b5af.gif" width="400px" />
| 5가지 유형의 질문을 추가할 수 있음.</br>버튼 클릭시 store에 객관식 질문 하나를 추가함.


 질문 유형 변경 기능
| --- 
|  <img src="https://user-images.githubusercontent.com/82137004/209636240-a04514e2-b857-43d9-ac5b-ee43a93b8a7e.gif" width="400px" />
| 질문의 유형을 변경할 수 있음.</br>드롭다운을 통해 변경시 store에서 해당하는 질문의 type을 변경함.


 질문 복제 기능
| --- 
|  <img src="https://user-images.githubusercontent.com/82137004/209637625-51a4a20b-e66d-41e6-bc01-86e1d6776d5b.gif" width="400px" />
| 질문을 복제할 수 있음.</br>store에서 타겟 질문을 하나 더 생성하여 바로 뒤에 추가함.


 질문 삭제 기능
| --- 
|  <img src="https://user-images.githubusercontent.com/82137004/209636183-dfbb9dee-bd7c-4acb-935a-7aad64bfb6e5.gif" width="400px" />
| 질문을 삭제할 수 있음.</br>store에서 타겟 질문을 삭제함.


[이미지 들어갈 공간]
- 필수 옵션 기능

 보기 추가 및 삭제 기능
| --- 
|  <img src="https://user-images.githubusercontent.com/82137004/209637221-7488730d-80c7-4dbd-83d4-0f393bdcbdb4.gif" width="400px" />
| 객관식, 체크박스, 드롭다운의 경우, 보기를 추가 및 삭제할 수 있음.</br>store의 타겟 질문이 가진 보기 데이터를 추가 및 삭제함 


[이미지 들어갈 공간]
- 질문 및 보기 이동(드래그 앤 드롭)

[이미지 들어갈 공간]
- 새 탭에서 설문지 미리보기 기능

[이미지 들어갈 공간]
- 미리보기 입력 초기화 기능

[이미지 들어갈 공간]
- 미리보기 제출 시 결과 확인 기능

