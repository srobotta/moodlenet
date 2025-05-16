// import { Trans } from '@lingui/macro'
import type { FC } from 'react'
import { ReactComponent as UploadFileIcon } from '../../../../static/icons/upload-file.svg'
import { ReactComponent as UploadImageIcon } from '../../../../static/icons/upload-image.svg'
import './FileUploader.scss'

export type FileUploaderProps = {
  type?: 'file' | 'image'
  className?: string
  uploadLabel?: string
  onClick?(arg0: unknown): unknown
}

export const FileUploader: FC<FileUploaderProps> = ({
  type,
  className,
  uploadLabel,
  // onClick,
}) => {
  return (
    <div
      className={`file-uploader ${className}`}
      // className={`uploader ${isToDrop ? 'hover' : ''} ${
      //   form.values.content instanceof Blob && form.errors.content
      //     ? 'error'
      //     : ''
      // }`}
      id="drop_zone"
      // onDrop={dropHandler}
      // onDragOver={dragOverHandler}
      // onDragLeave={() => setIsToDrop(false)}
    >
      {type === 'file' ? (
        <div
          className="file upload"
          // onClick={selectFile}
          // onKeyUp={(e) => e.key === 'Enter' && selectFile()}
          tabIndex={0}
        >
          <input
            // ref={uploadFileRef}
            type="file"
            name="content"
            key="content"
            // onChange={({ target }) => {
            //   setContent(target.files?.[0])
            // }}
            hidden
          />
          <UploadFileIcon />
          <span>
            <span>{uploadLabel}</span>
            <br />
            {/* {fileMaxSize && (
      <span style={{ fontSize: '12px' }}>
        <Trans>Max size</Trans> {prettyBytes(fileMaxSize)}
      </span>
    )} */}
          </span>
        </div>
      ) : (
        <div
          className="image upload"
          // onClick={selectImage}
          tabIndex={0}
          // onKeyUp={(e) => e.key === 'Enter' && selectImage()}
        >
          <input
            // ref={uploadImageRef}
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            name="image"
            key="image"
            // onChange={({ target }) =>
            //   form.setFieldValue('image', target.files?.[0])
            // }
            hidden
          />
          <UploadImageIcon />
          <span>{uploadLabel}</span>
        </div>
      )}
    </div>
  )
}

FileUploader.defaultProps = {
  type: 'file',
}

export default FileUploader
