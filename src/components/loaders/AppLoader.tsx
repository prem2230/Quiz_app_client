import React, { useEffect, useState } from 'react';
import { Box, keyframes, Typography } from '@mui/material';

interface LoaderProps {
    fullScreen?: boolean;
    message?: string;
}

interface BracketLoaderProps {
    size?: number;
    message?: string;
}

const leftBracketAnimation = keyframes`
  0% {
    transform: translateY(0) scale(1);
    color: #000000;
  }
  25% {
    transform: translateY(-10px) scale(1.1);
    color: #333333;
  }
  50% {
    transform: translateY(0) scale(1.2);
    color: #666666;
  }
  75% {
    transform: translateY(10px) scale(1.1);
    color: #333333;
  }
  100% {
    transform: translateY(0) scale(1);
    color: #000000;
  }
`;

const rightBracketAnimation = keyframes`
  0% {
    transform: translateY(0) scale(1);
    color: #000000;
  }
  25% {
    transform: translateY(10px) scale(1.1);
    color: #333333;
  }
  50% {
    transform: translateY(0) scale(1.2);
    color: #666666;
  }
  75% {
    transform: translateY(-10px) scale(1.1);
    color: #333333;
  }
  100% {
    transform: translateY(0) scale(1);
    color: #000000;
  }
`;

const textColorAnimation = keyframes`
  0% {
    color: #000000;
  }
  50% {
    color: #666666;
  }
  100% {
    color: #000000;
  }
`;

const BracketLoader: React.FC<BracketLoaderProps> = ({
    size = 100,
    message = "Loading"
}) => {
    const [displayText, setDisplayText] = useState(message);
    const [dotCount, setDotCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDotCount((prev) => (prev + 1) % 4);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setDisplayText(`${message}${'.'.repeat(dotCount)}`);
    }, [dotCount, message]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                minHeight: '200px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: size * 1,
                    height: size,
                }}
            >
                {/* Left bracket */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: 0,
                        fontSize: size,
                        fontWeight: 'bold',
                        animation: `${leftBracketAnimation} 2s ease-in-out infinite`,
                        lineHeight: 0.8,
                    }}
                >
                    [
                </Box>

                {/* Right bracket */}
                <Box
                    sx={{
                        position: 'absolute',
                        right: 0,
                        fontSize: size,
                        fontWeight: 'bold',
                        animation: `${rightBracketAnimation} 2s ease-in-out infinite`,
                        lineHeight: 0.8,
                    }}
                >
                    ]
                </Box>
            </Box>
            <Typography
                variant="h6"
                sx={{
                    mt: 5,
                    fontWeight: 600,
                    fontStyle: 'italic',
                    fontFamily: 'sans-serif',
                    fontSize: '1em',
                    animation: `${textColorAnimation} 2s ease-in-out infinite`,
                    letterSpacing: '1px'
                }}
            >
                {displayText}
            </Typography>
        </Box>
    );
};

const AppLoader: React.FC<LoaderProps> = ({ fullScreen = true, message }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: fullScreen ? '100vh' : '100%',
                position: fullScreen ? 'fixed' : 'relative',
                top: 0,
                left: 0,
                zIndex: fullScreen ? 9999 : 'auto',
                backgroundColor: fullScreen ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
            }}
        >
            <BracketLoader message={message} />
        </Box>
    );
};

export default AppLoader;
