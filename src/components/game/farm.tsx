import { useMemo, useCallback, useState } from 'react'
import { IsometricObject } from '@drnutsu/react-isometric-tilemap'
import { Popover } from 'antd'
import Avatar from 'react-avatar'

import warehouseLv1 from '@assets/map/warehouseLv1.png'
import { ManageBuildingContent } from './popover/manageBuilding'
import { useContext } from 'react'
import { StageContext } from '@hooks/provider/stageProvider'
import { TokenBalance } from '@hooks/provider/hooks/types'
// import farmingLv1 from '@assets/map/farmingLv1.png'
// import exampleNFT from '@assets/nfts/cat.png'

export interface FarmProps {
  width: number
  height: number
  x: number
  y: number
  z: number
  index: number
}

export default function Farm({ width, height, x, y, z, index }: FarmProps) {
  const { stageConfig } = useContext(StageContext)
  const [isPopoverShow, setIsPopoverShow] = useState(false)
  const assetInfo = useMemo<TokenBalance>(() => {
    const info = stageConfig?.placedBuilding?.[index]?.info
    if (!info || !info?.asset) return null
    try {
      return JSON.parse(info?.asset) as TokenBalance
    } catch {
      return null
    }
  }, [stageConfig?.placedBuilding?.length])
  const onHide = useCallback(() => {
    setIsPopoverShow(false)
  }, [])
  const handleVisibleChange = useCallback((visible) => {
    setIsPopoverShow(true)
  }, [])
  const ManageBuilding = useCallback(
    (props) => (
      <ManageBuildingContent onHide={onHide} asset={assetInfo} {...props} />
    ),
    [assetInfo]
  )
  return (
    <>
      <Popover
        visible={isPopoverShow}
        content={ManageBuilding}
        onVisibleChange={(visible) => {
          setIsPopoverShow(visible)
        }}
        trigger='click'
      >
        <IsometricObject
          key={`object${index}`}
          x={x}
          y={y}
          z={z}
          width={width}
          height={height}
          onClick={handleVisibleChange}
          frames={[warehouseLv1]}
          contentOnTop={() => (
            <div className='absolute h-full w-full '>
              <Avatar
                className='animate-bounce'
                size='25'
                round={true}
                style={{ width: 13 }}
                src={assetInfo.logo_url}
              />
            </div>
          )}
          active
        />
      </Popover>
    </>
  )
}
