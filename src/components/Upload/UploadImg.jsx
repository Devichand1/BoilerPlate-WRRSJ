import React, { useEffect, useState } from 'react';
import { Button, IconButton, LinearProgress } from '@material-ui/core';
import { CloudUpload, DeleteRounded } from '@material-ui/icons';
import { message } from 'antd';

const UploadImg = () => {
  const [files, setfiles] = useState([]);
  const [inputclass, setinputclass] = useState('file-input');
  const [loader, setloader] = useState(false);
  const [progress, setProgress] = React.useState(5);
  const [buffer, setBuffer] = React.useState(10);

  const handleupload = index => {
    setloader(true);
    if (index.size > 2000000) {
      setTimeout(() => {
        message.error(' failed !.. file size should not be larger than 2MB');
        setloader(false);
      }, 500);
    } else {
      setBuffer(100);
      setProgress(100);
      setTimeout(() => {
        setfiles(prev => [...prev, index]);
        setloader(false);
      }, 500);

      message.success('Uploaded Successfully');
    }

    console.log(files, index);
  };
  const handledlt = e => {
    files.splice(e, 1);
    console.log(files);
    setfiles(prev => [...prev]);
    message.success('Deleted Successfully');
  };
  const handledropover = e => {
    e.preventDefault();
    setinputclass('file-input dragover');
  };

  const handledrop = ev => {
    ev.preventDefault();
    console.log(ev.dataTransfer.files[0]);
    handleupload(ev.dataTransfer.files[0]);
  };

  return (
    <div className="upload-comp">
      <div className={inputclass}>
        <form>
          <label
            onDragEnter={() => setinputclass('file-input dragover')}
            onDragLeave={() => setinputclass('file-input')}
            onDrop={e => handledrop(e)}
            onDragOver={e => handledropover(e)}
            //  onDropCapture={(e)=>handledragover(e)}

            htmlFor="file"
          >
            <input
              onDrag={e => console.log(e.type)}
              onDrop={e => handleupload(e.target.files[0])}
              onChange={e => handleupload(e.target.files[0])}
              style={{ display: 'none' }}
              id="file"
              name="file"
              type="file"
            />
            <CloudUpload />
            <h4>Click or Drag file to Upload</h4>
            <p>file should not be larger than 2MB</p>
          </label>
        </form>
      </div>
      {loader ? (
        <LinearProgress
          style={{ marginTop: '1rem' }}
          variant="buffer"
          value={progress}
          valueBuffer={buffer}
        />
      ) : (
        <div style={{ marginTop: '1rem' }}>{}</div>
      )}{' '}
      <div className="uploadimg-list">
        {files.map((i, index) => (
          <div key={i.name}>
            <div className="imgdata">
              <img src={URL.createObjectURL(i)} alt={i.name} /> {i.name}
            </div>
            <div className="imgdlt-btn">
              <IconButton onClick={() => handledlt(index)}>
                <DeleteRounded />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImg;
