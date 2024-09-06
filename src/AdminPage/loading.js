import "../CSS/loading.css";

const Loading = ({ data }) => {
  return (
    <div className="loading">
      {data === "loading" ? (
        <>
          <p>업로드 중 입니다.</p>
        </>
      ) : data === "done" ? (
        <>
          <p>업로드가 완료되었습니다.</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Loading;
