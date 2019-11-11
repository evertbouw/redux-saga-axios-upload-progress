import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFiles } from "../store/upload/actionCreators";

export const App: FC = () => {
  const { status, error, progress, files } = useSelector(
    (state: any) => state.upload
  );

  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <input
          value=""
          type="file"
          multiple
          onChange={({ target: { files } }) => dispatch(uploadFiles(files!))}
        />
      </div>
      <div>Status: {status}</div>
      <div>Progress: {progress}%</div>
      <div>Files: {files.length ? files.join(", ") : "None"}</div>
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
    </div>
  );
};
