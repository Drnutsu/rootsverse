import { createContext, useState, useCallback } from 'react'

import {
  getOrSetLocalStorageItem,
  stageKey,
  setLocalStorageItem
} from '@helpers/localstorage'
import { CreateModalInfoType } from '@components/game/modal/step/types'

export interface BuildingProps {
  id: number
  name: string
  x: number
  y: number
  // store all farm info
  info: CreateModalInfoType
}

export interface StageConfigProps {
  placedBuilding: { [key: string]: BuildingProps }
}

const defaultStage: StageConfigProps = {
  placedBuilding: {}
}

export interface StageContextType {
  isSandbox: boolean
  stageConfig: StageConfigProps
  // for effected tile, and rerender only specific tile to reduce the load.
  dirtyIndex: number
  isCreateMode: boolean
  startCreateBuilding: (a: BuildingProps) => void
  cancelCreateBuilding: () => void
  submitCreateBuilding: (a: CreateModalInfoType) => void
  focusedBuildingInfo: BuildingProps
}

const defaultContext: StageContextType = {
  // TODO: change it to false when complete implement blockchain store
  isSandbox: true,
  stageConfig: defaultStage,
  dirtyIndex: -1,
  isCreateMode: false,
  startCreateBuilding: () => undefined,
  cancelCreateBuilding: () => undefined,
  submitCreateBuilding: () => undefined,
  focusedBuildingInfo: null
}

export const StageContext = createContext<StageContextType>(defaultContext)

// PHASE 1: save user state on localStorage first. (Free)
// PHASE 2: let's user mint tile as NFT before be the entry of building. (On the Blockchain)

// control all stage context
export default function StateProvider({ children }) {
  const [stageConfig, setStageConfig] = useState(() =>
    getOrSetLocalStorageItem(stageKey, defaultStage)
  )

  // sandbox mode let user to play around the lands without any fee, and real transaction on the chain.
  // REMOVEME: please implement sandbox flag when blockchain smart contract is completed.
  const [
    isSandbox
    // setIsSandbox
  ] = useState(true)

  const [isCreateMode, setIsCreateMode] = useState(false)
  const [focusedBuildingInfo, setFocusedBuildingInfo] =
    useState<BuildingProps | null>(null)
  const [dirtyIndex, setDirtyIndex] = useState(-1)
  const commitBuildingPosition = (building: BuildingProps) => {
    // console.log('#log9 -> building', building)
    const updatedStage = {
      ...stageConfig,
      placedBuilding: {
        ...(stageConfig?.placedBuilding ? stageConfig.placedBuilding : {}),
        [building.id]: building
      }
    }
    const result = setLocalStorageItem<StageConfigProps>(stageKey, updatedStage)
    if (!result) console.error('ERR001: failed to save building ')
    setStageConfig(() => updatedStage)
    setDirtyIndex(() => building.id)
  }

  const startCreateBuilding = useCallback((buildingInfo: BuildingProps) => {
    setIsCreateMode(true)
    setFocusedBuildingInfo(buildingInfo)
  }, [])

  const cancelCreateBuilding = useCallback(() => {
    setIsCreateMode(false)
  }, [])

  const submitCreateBuilding = useCallback(
    (info: CreateModalInfoType) => {
      if (focusedBuildingInfo && info) {
        commitBuildingPosition({ ...focusedBuildingInfo, info })
        setIsCreateMode(false)
      }
    },
    [focusedBuildingInfo]
  )

  const context = {
    isSandbox,
    stageConfig,
    startCreateBuilding,
    cancelCreateBuilding,
    submitCreateBuilding,
    isCreateMode,
    dirtyIndex,
    focusedBuildingInfo
  }
  return (
    <StageContext.Provider value={context}>{children}</StageContext.Provider>
  )
}
