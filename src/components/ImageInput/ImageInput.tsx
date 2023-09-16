import { Button } from '@mui/material'
import React, { FC } from 'react'

interface ImageInputProps {
  handleImg: React.Dispatch<React.SetStateAction<File | null>>
}

const ImageInput: FC<ImageInputProps> = ({ handleImg }) => (
  <Button variant="contained" component="label">
    Upload File
    <input
      type="file"
      accept=".png,.jpeg,.jpg"
      onChange={(e) => handleImg(e.target.files ? e.target.files[0] : null)}
      hidden
    />
  </Button>
)

export default ImageInput
