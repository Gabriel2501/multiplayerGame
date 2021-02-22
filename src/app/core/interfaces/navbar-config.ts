import { Button } from "./button";

export interface NavbarConfig {
    title: {
        name: string,
        align: string //  possible values: 'center', 'flexEnd', 'flexStart'; Values is based on css flexbox names
    },
    subtitle?: {
        name: string,
        align: string,
        color: string,
    }
    color: string,
    buttons: Button[]
}
