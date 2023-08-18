import DOMPurify from "dompurify";
import React from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { appStorage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Diary = () => {
  //ReactQuill 태그 reference 저장
  const quillRef = useRef(null);

  // Editor 에 담겨진 내용을 출력 state
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(value);
  }, [value]);

  // 이미지 핸들링
  const imageHandler = () => {
    console.log("이미지 핸들링");

    // 1. reactQuill 에디터를 가져와
    const editor = quillRef.current.getEditor();
    console.log("editor :", editor);
    // 2. image 를 저장할 input type="file" 을 즉시 생성
    const input = document.createElement("input");
    // 3. input 태그의 속성을 설정
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click(); //강제로 클릭을 시켜줌
    // 4. image 선택 시 즉 , input 요소에 이미지 처리
    input.addEventListener("change", () => {
      console.log("온체인지");
      const file = input.files[0];
      const formData = new FormData();
      // formData.append("키", 값)
      formData.append("img", file);
      // 백엔드 이미지 서버로 전송을 실행한다.
      try {
        console.log("서버로 이미지 전송 axios");
        //firebase Storage 에 업로드
        // storage 레퍼런스를 만든다.
        // ref(스토리지, 폴더명/파일명)
        const storageRef = ref(appStorage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          snapshot => {
            // 업로드 상태(%) 출력
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
            console.log("업로드 상태", progress);
          },
          err => {
            alert(err);
          },
          () => {
            console.log("업로드 완료");
            // 업로드 된 이미지의 URL 을 알아냄
            getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
              console.log(downloadUrl);
              //에디터에 코드를 삽입한다.
              // <img src=downloadurl>
              // eidtor.root.innerHTML =+`<img src=${downloadUrl}/>`;
              // 마우스 커서 위치를 알아내서 뒷쪽에 배치한다.
              const range = editor.getSelection();
              editor.insertEmbed(range.index, "image", downloadUrl);
            });
          },
        );
      } catch (err) {
        console.log(err);
      }
    });
  };

  // toolbar 설정하기
  // 화면이 갱신될 때마다 새로 정의할 필요가 없음
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
                "custom-color",
              ],
            },
            { background: [] },
          ],
          ["image", "video"],
          ["clean"],
        ],
        // handlers 를 통해서 개발자가 직접 처리하겠다.
        handlers: { image: imageHandler },
      },
    }),
    [],
  );

  return (
    <div>
      Diary
      <div style={{ background: "#fff" }}>
        <ReactQuill onChange={setValue} modules={modules} ref={quillRef} />
      </div>
      <div>실제값 : {value}</div>
      <h2>html 출력하기 :</h2>
      {/* <div dangerouslySetInnerHTML={{ __html: value }} /> */}
      {/* 내용 출력할 땐 밑 코드를 사용하자 */}
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }} />
    </div>
  );
};

export default Diary;
