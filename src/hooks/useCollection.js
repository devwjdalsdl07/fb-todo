import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { appFireStore } from "../firebase/config";

export const useCollection = (transaction, userQuery) => {
  // document 들을 관리할 state
  const [documents, setDocuments] = useState(null);
  // error 처리
  const [error, setError] = useState(null);

  useEffect(() => {
    // Firebase Query 를 통한 사용자 구별 및 정렬 처리
    let qr;
    if (userQuery) {
      qr = query(
        collection(appFireStore, transaction),
        where(...userQuery),
        orderBy("createTime", "desc"),
      );
    }

    // 컬렉션의 이름을 통해서 응답을 받을 때 처리
    // onSnapShot 을 통해서 collection 참조를 보내면
    // snapshot 에 문서들을 담아서 반환합니다.
    // snapshot.docs 를 이용해서 원하는 처리를 합니다.
    const sn = onSnapshot(
      userQuery ? qr : collection(appFireStore, transaction),
      snapshot => {
        let result = [];
        snapshot.docs.forEach(item => {
          // 각각의 docs 내의 요소에 data() 메서드를
          // 이용하면 내용을 뜯을 수 있다.
          result.push({ ...item.data(), id: item.id });
        });
        // console.log("결과", result);
        setDocuments(result);
        setError(null);
      },
      err => setError(err.message),
    );
    // cleanUp 함수
    return sn;
  }, [collection]);

  return { documents, error };
};
