import { Button } from "./button";

export interface NavbarConfig {
    title: {
        name: string,
        align: string //  possible values: 'center', 'flexEnd', 'flexStart'; Values is based on css flexbox names
    },
    color: string,
    buttons: Button[]
}
