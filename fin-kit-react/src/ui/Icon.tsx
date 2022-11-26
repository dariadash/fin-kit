import React from 'react'

import Array from './assets/array.svg';
import Bookmark from './assets/bookmark.svg';
import Chevron from './assets/chevron.svg';
import Export from './assets/export.svg';
import Lamp from './assets/lamp.svg';
import Lightning from './assets/lightning.svg';
import Target from './assets/target.svg';

const Icons = {
    'array': Array,
    'bookmark': Bookmark,
    'chevron': Chevron,
    'export': Export,
    'lamp': Lamp,
    'lightning': Lightning,
    'target': Target,
}

type Props = {
    icon: IconName
    size?: number
    onClick?: () => void
    style?: React.HTMLAttributes<SVGElement>
    color?: string
}

export type IconName = keyof typeof Icons

export const Icon = ({ icon, size = 24, onClick }: Props) => {
    const svgPath = Icons[icon]
    return (
        <img
            alt={''}
            src={svgPath}
            onClick={onClick}
        />
    )
}