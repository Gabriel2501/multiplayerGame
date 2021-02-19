
export interface Button {
    id: string, // Action name. This value will be emmited to parent component 
    name?: string, // Button text
    hasIcon: boolean // used to render SVG Icon
    svgIconName?: string // SVG Icon Name
    description?: string // used on tooltips (?)
    align: string //  possible values: 'center', 'flexEnd', 'flexStart'; Values is based on css flexBox names
    hasMatMenu: boolean
    matMenuOptions?: {
        values: string[]
    }

}
