// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'

import Stack from '@mui/material/Stack'
import React, { FC } from 'react'
import { Autoplay, FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface IImgFreeSwiperProps {
  imgData: { name: string; src: string }[]
  reverseDirection?: boolean
}

const ImgFreeSwiper: FC<IImgFreeSwiperProps> = ({
  imgData,
  reverseDirection = false,
}) => {
  return (
    <Swiper
      speed={8000}
      slidesPerView={'auto'}
      spaceBetween={16}
      freeMode={true}
      navigation={false}
      loop={true}
      autoplay={{
        delay: 1,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
        reverseDirection,
      }}
      modules={[FreeMode, Autoplay]}
    >
      {imgData.map((img) => (
        <SwiperSlide key={img.name}>
          <Stack
            justifyContent={'center'}
            alignItems='center'
            height={60}
            p={1}
          >
            <img
              loading='lazy'
              alt={img.name}
              src={img.src}
              width='100%'
              height='100%'
            />
          </Stack>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImgFreeSwiper
