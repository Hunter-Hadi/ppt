import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import {
  Box,
  Button,
  ClickAwayListener,
  Fade,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useRef } from 'react'

import DevContent from '@/components/DevContent'
import { setLocalStorage } from '@/utils/localStorage'

import {
  ILandingVariantType,
  LANDING_VARIANT_CONFIG,
  LANDING_VARIANT_TO_VERSION_MAP,
  TEST_LANDING_COOKIE_NAME,
} from '../constant/landingVariant'
import useLandingABTester from '../hooks/useLandingABTester'
const DevRefreshABTestLandingCookie = () => {
  const [show, setShow] = React.useState(false)
  const {
    variant,
    setVariant,
    enabled: landingABTesrEnabled,
  } = useLandingABTester()
  const boxRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {landingABTesrEnabled && (
        <DevContent>
          <Box
            sx={{
              position: 'fixed',
              right: 0,
              bottom: 100,
              zIndex: 1201,
              width: 200,
              height: 100,
              opacity: 0.4,
              transition: 'opacity 0.3s',
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            <Tooltip
              title={<h2>landing page A/B Test variant</h2>}
              arrow
              placement='left'
            >
              <Button
                variant='contained'
                sx={{
                  position: 'absolute',
                  right: 32,
                  bottom: 0,
                  p: 1.2,
                  pl: 1.4,
                  pb: 1.4,
                  borderRadius: '50%',
                  minHeight: 'unset',
                  minWidth: 'unset',
                }}
                onClick={() => {
                  setShow(true)
                }}
              >
                <BugReportOutlinedIcon />
              </Button>
            </Tooltip>
          </Box>
          <Fade in={show} unmountOnExit>
            <Box
              sx={{
                position: 'fixed',
                right: 0,
                left: 0,
                bottom: 0,
                border: '1px solid',
                borderColor: 'divider',
                px: 4,
                py: 6,

                zIndex: 1202,
                // width: '100vw',
                bgcolor: 'white',
                boxShadow: '0px -5px 10px #23232321',
              }}
            >
              <ClickAwayListener
                onClickAway={() => {
                  setShow(false)
                }}
              >
                <Box ref={boxRef}>
                  <IconButton
                    onClick={() => {
                      setShow(false)
                    }}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                    }}
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                  <Stack spacing={1} alignItems='center' px={20}>
                    <h2>current landing variant: {variant}</h2>
                    {variant && (
                      <h2>
                        current test version:{' '}
                        {LANDING_VARIANT_TO_VERSION_MAP[variant]}
                      </h2>
                    )}
                    <Stack
                      direction={'row'}
                      spacing={2}
                      // justifyContent='space-between'
                      alignItems={'center'}
                      pr={4}
                    >
                      <Typography variant='h3'>
                        select you want to change version:
                      </Typography>
                      <Select
                        sx={{}}
                        MenuProps={{
                          disablePortal: true,
                        }}
                        value={(variant as string) ?? ''}
                        onChange={(event: SelectChangeEvent) => {
                          const newVariant = event.target
                            .value as ILandingVariantType
                          setVariant(newVariant)
                          setLocalStorage(TEST_LANDING_COOKIE_NAME, newVariant)
                        }}
                      >
                        {Object.keys(LANDING_VARIANT_CONFIG).map((variant) => {
                          return (
                            <MenuItem key={variant} value={variant}>
                              {LANDING_VARIANT_TO_VERSION_MAP[variant]}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </Stack>
                  </Stack>
                </Box>
              </ClickAwayListener>
            </Box>
          </Fade>
        </DevContent>
      )}
    </>
  )
}

export default DevRefreshABTestLandingCookie
