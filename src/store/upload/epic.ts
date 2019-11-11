import { Epic, ofType } from "redux-observable";
import { merge, of, Subject, Subscriber } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import {
  uploadFiles,
  uploadFilesFailed,
  uploadFilesProgress,
  uploadFilesStart,
  uploadFilesSuccess
} from "./actionCreators";
import { UPLOAD_FILES } from "./actionTypes";

const filesToFormData = (files: FileList) => {
  const data = new FormData();
  [...files].map(file => data.append("files", file));
  return data;
};

export const uploadEpic: Epic = action$ =>
  action$.pipe(
    ofType(UPLOAD_FILES),
    switchMap(({ payload: { files } }: ReturnType<typeof uploadFiles>) => {
      const progressSubject = new Subject();

      return merge(
        ajax({
          method: "POST",
          url: "/api/uploadFiles",
          body: filesToFormData(files),
          progressSubscriber: new Subscriber<ProgressEvent>({
            next: ({ total, loaded }) => {
              progressSubject.next(uploadFilesProgress((loaded * 100) / total));
            }
          })
        }).pipe(
          map(uploadFilesSuccess),
          startWith(uploadFilesStart()),
          catchError(e => of(uploadFilesFailed(e)))
        ),
        progressSubject
      );
    })
  );