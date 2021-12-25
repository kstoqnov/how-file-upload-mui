import React from 'react'
import clsx from 'clsx'
import FileUploadDefaultImage from './FileUploadDefaultImage.png'
import { Box, Typography } from '@mui/material'
import CloudUpload from '@mui/icons-material/CloudUpload';
import { FileUploadRender } from './FileUploadRender';

export type FileUploadProps = {
    imageButton?: boolean
    accept: string
    hoverLabel?: string
    dropLabel?: string
    image?: {
        url: string
        imageStyle?: {
            width?: string
            height?: string
        }
    }
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onDrop: (event: React.DragEvent<HTMLElement>) => void
}

export const FileUpload: React.FC<FileUploadProps> = ({
    accept,
    imageButton = false,
    hoverLabel = 'Click or drag to upload file',
    dropLabel = 'Drop file here',
    image: {
        url = FileUploadDefaultImage,
        imageStyle = {
            height: 'inherit',
        },
    } = {},
    onChange,
    onDrop,
}) => {

    const [imageUrl, setImageUrl] = React.useState(url);
    const [labelText, setLabelText] = React.useState<string>(hoverLabel);
    const [isDragOver, setIsDragOver] = React.useState<boolean>(false);
    const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false);

    const stopDefaults = (e: React.DragEvent) => {
        e.stopPropagation()
        e.preventDefault()
    }

    const dragEvents = {
        onMouseEnter: () => {
            setIsMouseOver(true)
        },
        onMouseLeave: () => {
            setIsMouseOver(false)
        },
        onDragEnter: (e: React.DragEvent) => {
            stopDefaults(e)
            setIsDragOver(true)
            setLabelText(dropLabel)
        },
        onDragLeave: (e: React.DragEvent) => {
            stopDefaults(e)
            setIsDragOver(false)
            setLabelText(hoverLabel)
        },
        onDragOver: stopDefaults,
        onDrop: (e: React.DragEvent<HTMLElement>) => {
            stopDefaults(e)
            setLabelText(hoverLabel)
            setIsDragOver(false)
            if (imageButton && e.dataTransfer.files[0]) {
                setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]))
            }
            onDrop(e)
        },
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (imageButton && event.target.files) {
            setImageUrl(URL.createObjectURL(event.target.files[0]))
        }

        onChange(event)
    }

    return (
        <FileUploadRender>
            <label
                htmlFor="file-upload"
                {...dragEvents}
                className={clsx('root', isDragOver && 'on-drag-over')}
            >
                <input
                    onChange={handleChange}
                    accept={accept}
                    className="hidden"
                    id="file-upload"
                    type="file"
                />

                <Box className='no-mouse-event'>
                    {imageButton && (
                        <Box position="absolute" height={imageStyle.height} width={imageStyle.width}>
                            <img
                                alt="file upload"
                                src={imageUrl}
                                style={imageStyle}
                            />
                        </Box>
                    )}

                    {(!imageButton || isDragOver || isMouseOver) && (
                        
                        <Box className="icon-text">
                            <CloudUpload fontSize="large" />
                            <Typography>{labelText}</Typography>
                        </Box>
                    )}
                </Box>
            </label>
        </FileUploadRender>
    )
}