import React from 'react'
import BasicLayout from "../layouts/BasicLayout"
import ListaE from "../components/ListaEnfermedades";
export default function ListaEnfermedades() {
    return (
        <div>
            <BasicLayout>
                <ListaE />
            </BasicLayout>
        </div>
    )
}
