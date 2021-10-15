import { useCallback, useMemo, ReactElement, useContext, memo } from 'react'
import IsometricMap from '@drnutsu/react-isometric-tilemap'
import { kron, flatten } from 'mathjs'
import tw from 'twin.macro'
import styled from '@emotion/styled'
import '@drnutsu/react-isometric-tilemap/build/css/index.css'

import { BlockchainContext } from '@hooks/provider/blockchainProvider'
import { StageConfigProps, StageContext } from '@hooks/provider/stageProvider'
import { toMatrix } from '@helpers/math'
import Farm from './farm'
import Floor from './floor'
import { StageProps, MapProps } from './types'

const mapWidth = 20
const mapHeight = 20

// const defaultHeights: Array<number> = [
//   7, 7, 5, 4, 4, 3, 2, 3, 2, 2, 7, 7, 5, 4, 4, 3, 2, 3, 2, 2, 7, 7, 5, 4, 4, 3,
//   2, 3, 2, 2, 7, 7, 5, 4, 4, 3, 2, 3, 2, 2, 7, 7, 5, 4, 4, 3, 2, 3, 2, 2, 5, 5,
//   5, 4, 3, 3, 2, 3, 2, 2, 5, 5, 4, 4, 3, 3, 2, 3, 1, 1, 5, 5, 3, 3, 3, 3, 2, 3,
//   1, 1, 5, 5, 3, 3, 3, 3, 2, 3, 1, 1, 4, 1, 1, 4, 3, 3, 2, 3, 1, 1
// ]

const defaultHeights: Array<number> = Array(100).fill(1) as number[]

const ThemeMap = styled('div')`
  width: ${({ width }: StageProps) => width}px;
  height: ${({ height }: StageProps) => height}px;
  margin-left: ${({ marginLeft }: StageProps) => marginLeft}px;
  ${tw`absolute flex justify-center items-center`}

  .floor {
    background: ${({ themeColor }: StageProps) =>
      themeColor.land.floorColor} !important;
    border: 1px solid white !important;
    &:hover {
      border: 5px solid yellow !important;
    }
  }
  .highlight {
    & > .floor {
      border: 5px solid yellow !important;
    }
  }

  .wall {
    &.left {
      background: ${({ themeColor }: StageProps) =>
        themeColor.land.wallColor.left};
      border: 1px solid
        ${({ themeColor }: StageProps) => themeColor.land.wallColor.left} !important;
    }
    &.right {
      background: ${({ themeColor }: StageProps) =>
        themeColor.land.wallColor.right};
      border: 1px solid
        ${({ themeColor }: StageProps) => themeColor.land.wallColor.right} !important;
    }
  }

  .water {
    & > .floor {
      background: ${({ themeColor }: StageProps) =>
        themeColor.sea.floorColor} !important;
      border: 1px solid white !important;
      &:hover {
        border: 5px solid yellow !important;
      }
    }

    & > .wall {
      &.left {
        background: ${({ themeColor }: StageProps) =>
          themeColor.sea.wallColor.left};
        border: 1px solid
          ${({ themeColor }: StageProps) => themeColor.sea.wallColor.left} !important;
      }
      &.right {
        background: ${({ themeColor }: StageProps) =>
          themeColor.sea.wallColor.right};
        border: 1px solid
          ${({ themeColor }: StageProps) => themeColor.sea.wallColor.right} !important;
      }
    }
  }
`

export interface TileUnitProps {
  index: number
  level: number
  x: number
  y: number
  z: number
  calWidth: number
  calHeight: number
  stageConfig: StageConfigProps
  dirtyIndex: number
}

const TileUnit = ({
  index,
  level,
  x,
  y,
  z,
  calWidth,
  calHeight,
  stageConfig
}: TileUnitProps) => (
  <>
    <Floor key={index} index={index} level={level} x={x} y={y} z={z} />
    {stageConfig?.placedBuilding?.[index] && (
      <Farm
        width={calWidth}
        height={calHeight}
        x={x}
        y={y}
        z={z}
        index={index}
      />
    )}
  </>
)

const MemoTileUnit = memo(TileUnit, (prevProps, nextProps) => {
  const isRender =
    nextProps?.dirtyIndex !== -1 && nextProps?.dirtyIndex !== nextProps.index
  // const isRender = nextProps?.dirtyIndex === -1
  // const isRender = true
  return isRender
})

const maxWidth = 1920

const Map = ({ themeColor }: MapProps): ReactElement => {
  const { address } = useContext(BlockchainContext)
  const { stageConfig, dirtyIndex } = useContext(StageContext)
  const width = useMemo(
    () => (window.innerWidth <= maxWidth ? window.innerWidth : maxWidth),
    []
  )
  const height = useMemo(() => window.innerHeight, [])
  const isLandscape = useMemo(() => width > height, [width, height])
  // slab size (z dimension size) per each tile.
  const slabSize = useMemo(() => (isLandscape ? 10 : 4), [isLandscape])
  // transform address hex to stage array height
  const heightArr = useMemo(() => {
    const heights = address
      ? address
          .substring(2)
          .split('')
          .reduce<number[]>((acc, c) => {
            return acc.length >= 100
              ? acc
              : [
                  ...acc,
                  parseInt(c, 16) % 7 || 1,
                  parseInt(c, 16) % 6 || 1,
                  parseInt(c, 16) % 5 || 1,
                  parseInt(c, 16) % 4 || 1
                ]
          }, [])
      : defaultHeights
    const matrixHeight = toMatrix(heights, 10).slice(1, 11)
    return flatten(
      kron(matrixHeight, [
        [1, 1],
        [1, 1]
      ])
    )
  }, [address])

  const renderTiles = useCallback(
    (heightArr) =>
      heightArr.map((level: number, index: number) => {
        const z = level
        const calWidth = width / 20
        const imageRatio = 220 / 250
        const calHeight = calWidth * imageRatio

        if (level === 0) {
          return null
        }
        const x = index % mapWidth
        const y = Math.floor(index / mapWidth)

        return (
          <MemoTileUnit
            dirtyIndex={dirtyIndex}
            key={index}
            index={index}
            level={level}
            x={x}
            y={y}
            z={z}
            calWidth={calWidth}
            calHeight={calHeight}
            stageConfig={stageConfig}
          />
        )
      }) as ReactElement[],
    [, height, mapWidth, mapHeight, stageConfig]
  )
  return (
    <div>
      <ThemeMap
        width={width}
        height={height - 60}
        themeColor={themeColor}
        // to avoid sidebar element.
        marginLeft={
          // isLandscape ? Math.max(0, (window.innerWidth - maxWidth) / 2) : 14
          -Math.max(0, (window.innerWidth - maxWidth) / 2)
        }
      >
        <IsometricMap
          mapWidth={mapWidth}
          mapHeight={mapHeight}
          slabSize={slabSize}
          tileSize={width / 20}
          offsetY={-(width / 2.5)}
        >
          {renderTiles(heightArr)}
        </IsometricMap>
      </ThemeMap>
    </div>
  )
}

Map.whyDidYouRender = true

Map.defaultProps = {
  themeColor: {
    land: {
      floorColor: 'rgba(145, 195, 117, 1)',
      highlightBorder: 'yellow',
      wallColor: {
        left: 'rgba(49, 106, 66, 1)',
        right: 'rgba(119, 152, 67, 1)'
      }
    },
    sea: {
      floorColor: 'rgba(52, 248, 213, 1)',
      highlightBorder: 'yellow',
      wallColor: {
        left: 'rgba(30, 164, 212, 1)',
        right: 'rgba(24, 192, 252, 1)'
      }
    }
  }
}

export default Map
