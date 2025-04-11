'use client'

import { PropertyAttribute } from '@/types/types'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

interface Props {
    propertyAttributes : PropertyAttribute[];
}

const SearchResultsMap = (props : Props) => {
      const Map = useMemo(() => dynamic(
          () => import('@/components/Map/SearchMap'),
          { 
              loading: () => <p>A map is loading</p>,
              ssr: false,
          }
          ), [])
    return (
        <div style={{position : "sticky", top : 0}}>
            <Map propertyAttributes={props.propertyAttributes} zoom={10}/>

        </div>
    )
}

export default SearchResultsMap;