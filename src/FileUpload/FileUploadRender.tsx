import { Box, styled } from '@mui/material'

export const FileUploadRender = styled(Box)({
    '& .root': {
        display: 'flex',
        height: '100px',
        cursor: 'pointer',
        '&:hover p, &:hover svg, & img': {
            opacity: 1,
        },
        '& p, svg': {
            opacity: 0.4,
        },
        '&:hover img': {
            opacity: 0.3,
        },
    },
    '& .no-mouse-event': {
        pointerEvents: 'none',
    },
    '& .icon-text': {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
    },
    '& .hidden': {
        display: 'none',
    },
    '& .on-drag-over': {
        '& img': {
            opacity: 0.3,
        },
        '& p, svg': {
            opacity: 1,
        },
    },
});