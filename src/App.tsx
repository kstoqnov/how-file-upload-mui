import React from 'react';
import { FileUpload } from './FileUpload/FileUpload';
import { Box } from '@mui/material';

export default function App() {

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if( event.target.files !== null && event.target?.files?.length > 0 ) {
       console.log(`Saving ${event.target.value}`)
    }
  }

  const onDrop = (event: React.DragEvent<HTMLElement>) => {
    console.log(`Drop ${event.dataTransfer.files[0].name}`)
  }

  return (
    <Box className="App">
      <FileUpload accept='image/*' onChange={onChange} onDrop={onDrop}/>
    </Box>
  );
}