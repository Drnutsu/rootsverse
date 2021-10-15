import { useState, useCallback, useContext, useRef, useEffect } from 'react'
import { IsometricTile } from '@drnutsu/react-isometric-tilemap'
import { Popover } from 'antd'
import cx from 'classnames'

import { CreateBuildingContent } from './popover/createBuilding'
import { StageContext } from '@hooks/provider/stageProvider'
import { defaultStoredInfo } from '@components/base/steps'

export interface FloorProps {
  x: number
  y: number
  z: number
  index: number
  level: number
}

export default function Floor({ x, y, z, index, level, ...rest }: FloorProps) {
  const [isHightLight, setIsHeightLight] = useState(false)
  const [isShowPopover, setIsShowPopOver] = useState(false)
  const { startCreateBuilding, isCreateMode } = useContext(StageContext)
  const onCreateBuilding = useCallback(() => {
    // console.log(' #log called commit build the building')
    setIsShowPopOver(false)
    startCreateBuilding({
      id: index,
      x,
      y,
      name: 'test',
      info: defaultStoredInfo
    })
  }, [])
  // clear highlight when cancel.
  useEffect(() => {
    if (!isCreateMode) {
      setIsHeightLight(false)
    }
  }, [isCreateMode])
  const onHide = useCallback(() => {
    setIsShowPopOver(false)
    setIsHeightLight(false)
  }, [])
  return (
    <>
      <Popover
        content={() => (
          <CreateBuildingContent onHide={onHide} onCreate={onCreateBuilding} />
        )}
        trigger='click'
        onVisibleChange={(visible) => {
          setIsHeightLight(visible)
          setIsShowPopOver(visible)
        }}
        visible={isShowPopover}
      >
        <IsometricTile
          key={`tile${index}`}
          x={x}
          y={y}
          z={z}
          className={cx({ water: level <= 1, highlight: isHightLight })}
          {...rest}
        />
      </Popover>
    </>
  )
}
