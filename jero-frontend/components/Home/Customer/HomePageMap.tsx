'use client'

import { LatLons } from '@/types/types';
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

interface Props {
    latLongs: LatLons[];
}

const HomePageMap = (props : Props) => {
      const Map = useMemo(() => dynamic(
          () => import('@/components/Map/HomeMap'),
          { 
              loading: () => <p>A map is loading</p>,
              ssr: false,
          }
          ), [])
    return (
        <div style={{position : "sticky", top : 0}}>
            <Map latLongs={props.latLongs} zoom={2}/>

        </div>
    )
}

export default HomePageMap;