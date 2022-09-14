import { keyframes } from '@emotion/react';

import { useRef } from 'react';

import { Box, Flex } from '@chakra-ui/react';

export default Player;
export type { PlayerProps };

type PlayerProps = {
   audioSrc: string;
};

function Player({ audioSrc }: PlayerProps) {
   const progressBarElementRef = useRef<HTMLDivElement>(null);
   const audioElementRef = useRef<HTMLAudioElement>(null);

   // ***

   const triangleWidth = '2em';
   const VAR_DURATION = '--progress-duration';

   const animationName = keyframes`
      0% {
         width: 0;
      },
      100% {
         width: 100%;
      }
   `;
   return (
      <Flex w='full' h='70px' gap='2' align='center'>
         <Box as='button' onClick={() => audioElementRef.current!.play()}>
            <Box
               w={triangleWidth}
               h={triangleWidth}
               bgColor='currentColor'
               clipPath='polygon(100% 50%, 0% 100%, 0 0)'
            />
         </Box>
         <Box
            ref={progressBarElementRef}
            role='progressbar'
            aria-valuenow={0}
            aria-valuemax={100}
            h='.8em'
            w='full'
            borderRadius='full'
            bgColor='neutral.400'
            flex='1'
            pos='relative'
            _before={{
               content: '""',
               pos: 'absolute',
               inset: 0,
               borderRadius: 'inherit',
               bgColor: 'blue.200',

               w: 0,
               animation: `${animationName} var(${VAR_DURATION}) forwards`,
            }}
         />
         <Box
            ref={audioElementRef as any}
            as='audio'
            src={audioSrc}
            onPlaying={() =>
               progressBarElementRef.current!.style.removeProperty(VAR_DURATION)
            }
            onTimeUpdate={(event: any) => {
               const $ = function <A, B = HTMLAudioElement>(obj: A) {
                  return obj as unknown as B;
               };

               const { currentTime, duration } = $(event.currentTarget);
               const progressBarElement = $(progressBarElementRef.current);

               const progressPercentage = (currentTime / duration) * 100;

               progressBarElement.ariaValueNow = String(progressPercentage);
               progressBarElement.style.setProperty(
                  VAR_DURATION,
                  `${duration}s`,
               );
            }}
         />
      </Flex>
   );
}
